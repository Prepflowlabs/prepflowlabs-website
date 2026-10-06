

export const apiRequest = async (
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
    body?: any,
    isFormData: boolean = false,
    additionalData?: Record<string, any>,
    blobData: boolean = false,
    signal?: AbortSignal
) => {
    const url =
    endpoint.startsWith('http://') || endpoint.startsWith('https://')
        ? endpoint
        : `https://api.urvadevelopments.com/api/v1${endpoint}`;
        // : `http://127.0.0.1:8080/api/v1${endpoint}`;

    try {

        let requestBody: any;

        if (isFormData) {
            const formData = new FormData();

            if (body instanceof FileList || Array.isArray(body)) {
                Array.from(body).forEach((file, index) => {
                    formData.append(`file${index + 1}`, file);
                });
            } else if (body instanceof File) {
                formData.append("file", body);
            }

            if (additionalData) {
                Object.entries(additionalData).forEach(([key, value]) => {
                    if (Array.isArray(value) || typeof value === "boolean" || typeof value === "number") {
                        formData.append(key, JSON.stringify(value));
                    } else {
                        formData.append(key, value);
                    }
                });
            }

            requestBody = formData;
        } else {
            requestBody = body ? JSON.stringify(body) : undefined;
        }

        const response = await fetch(url, {
            method,
            body: requestBody,
            signal
        });

        let data;
        const contentType = response.headers.get("content-type") || "";

        if (contentType.includes("application/json")) {
            // Always parse JSON if server says it's JSON
            data = await response.json();
        } else if (blobData) {
            // Otherwise, if caller expected blob
            data = await response.blob();
        } else {
            // Fallback
            data = await response.text();
        }

        return data;
        
    } catch (error) {
        return { data: { status: "failed", message: String(error) } };
    }
};

