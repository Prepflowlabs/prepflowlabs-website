/** @format */

import { useState, type ReactNode } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { apiRequest } from "../../../utils/api/apiRequest";
import { FileUpload } from "../../../utils/files/fileUpload";
import LoadingWheel from "../../../components/LoadingWheel";
import {
    PLAN,
    formatUsd,
    parseInterval,
    type BillingInterval,
} from "../../../components/pricing/plan";
import OnboardLayout from "./components/OnboardLayout";

export const onboardCompany = async (
    first_name: string,
    last_name: string,
    email: string,
    company_name: string,
    domain: string,
    logo_file: File | null,
    password: string,
    confirm_password: string,
    accent_color: string,
    billing_interval: BillingInterval,
) => {
    return apiRequest("/core/tenants/onboard", "POST", logo_file, true, {
        first_name,
        last_name,
        email,
        company_name,
        domain,
        password,
        confirm_password,
        accent_color,
        billing_interval,
    });
};

const INPUT_CLASS =
    "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-accent sm:text-sm/6";

function Field({
    label,
    htmlFor,
    className,
    children,
}: {
    label: string;
    htmlFor: string;
    className: string;
    children: ReactNode;
}) {
    return (
        <div className={className}>
            <label
                htmlFor={htmlFor}
                className="block text-sm/6 font-medium text-gray-900"
            >
                {label}
            </label>
            <div className="mt-2">{children}</div>
        </div>
    );
}

/** Sign-up account step. People arrive from the plan card on /pricing with
 *  ?interval=, which is carried through to the payment step (billingSetup.tsx).
 *  To change plan they go back via the "Plan" step. */
export default function OnboardCompany() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const interval: BillingInterval =
        parseInterval(searchParams.get("interval")) ?? "monthly";
    const planSummary =
        interval === "annual"
            ? `Annual plan (${formatUsd(PLAN.annualTotal)}/year)`
            : `Monthly plan (${formatUsd(PLAN.monthlyPrice)}/month)`;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [domain, setDomain] = useState("");
    const [accentColor, setAccentColor] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [resumeTenant, setResumeTenant] = useState<string | null>(null);

    const handleSave = async () => {
        setError(null);
        setResumeTenant(null);

        if (!firstName) return setError("First name is required");
        if (!lastName) return setError("Last name is required");
        if (!email) return setError("Email is required");
        if (!companyName) return setError("Company name is required");
        if (!domain) return setError("Domain is required");
        if (!accentColor) return setError("Accent color is required");
        if (!selectedFile) return setError("Company logo is required");
        if (!password) return setError("Password is required");
        if (!confirmPassword) return setError("Please confirm your password");
        if (password !== confirmPassword)
            return setError("Passwords do not match");

        setLoading(true);

        try {
            const data = await onboardCompany(
                firstName,
                lastName,
                email,
                companyName,
                domain,
                selectedFile,
                password,
                confirmPassword,
                accentColor,
                interval,
            );

            if (data?.status === "success") {
                // The API normalises the domain (www., scheme, subdomains).
                const tenant = data.data?.tenant ?? domain.trim().toLowerCase();
                navigate(
                    `/prepcenter/onboard/${tenant}/verify?interval=${interval}&sent=1`,
                );
                return;
            }
            // Same email + domain, not paid yet: an abandoned sign-up.
            setResumeTenant(data?.data?.resume_tenant ?? null);
            // apiRequest reports network failures as { data: { message } }.
            setError(
                data?.errors?.[0] ??
                    data?.message ??
                    data?.data?.message ??
                    "Something went wrong. Please try again.",
            );
        } catch {
            setError("Network error. Please try again.");
        }

        setLoading(false);
    };

    return (
        <OnboardLayout step={2}>
            <div className="mx-auto max-w-2xl">
                <section className="rounded-[20px] border border-white/80 bg-white/85 p-6 shadow-[0_24px_60px_-20px_rgba(24,33,69,0.25)] ring-1 ring-slate-900/5 backdrop-blur-xl sm:p-10">
                    <h1 className="text-2xl font-semibold tracking-tight text-[#182145]">
                        Create your account
                    </h1>
                    <p className="mt-1 text-sm text-slate-600">
                        Tell us about your prep center. You're signing up for
                        the{" "}
                        <span className="font-medium text-[#182145]">
                            {planSummary}
                        </span>
                        , and you'll add billing on the next step.
                    </p>

                    <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                        <Field
                            label="First name"
                            htmlFor="first-name"
                            className="sm:col-span-3"
                        >
                            <input
                                id="first-name"
                                type="text"
                                autoComplete="given-name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className={INPUT_CLASS}
                            />
                        </Field>
                        <Field
                            label="Last name"
                            htmlFor="last-name"
                            className="sm:col-span-3"
                        >
                            <input
                                id="last-name"
                                type="text"
                                autoComplete="family-name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className={INPUT_CLASS}
                            />
                        </Field>
                        <Field
                            label="Email address"
                            htmlFor="email"
                            className="sm:col-span-4"
                        >
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={INPUT_CLASS}
                            />
                        </Field>
                        <Field
                            label="Company name"
                            htmlFor="company-name"
                            className="col-span-full"
                        >
                            <input
                                id="company-name"
                                type="text"
                                autoComplete="organization"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className={INPUT_CLASS}
                            />
                        </Field>
                        <Field
                            label="Domain"
                            htmlFor="domain"
                            className="sm:col-span-3"
                        >
                            <input
                                id="domain"
                                type="text"
                                value={domain}
                                onChange={(e) => setDomain(e.target.value)}
                                className={INPUT_CLASS}
                                placeholder="urvafreight.com"
                            />
                        </Field>
                        <Field
                            label="Accent color"
                            htmlFor="accent-color"
                            className="sm:col-span-3"
                        >
                            <input
                                id="accent-color"
                                type="text"
                                value={accentColor}
                                onChange={(e) => setAccentColor(e.target.value)}
                                className={INPUT_CLASS}
                                placeholder="#9e7ad8"
                            />
                        </Field>

                        <div className="col-span-full">
                            <p className="block text-sm/6 font-medium text-gray-900">
                                Company logo
                            </p>
                            <p className="text-sm text-slate-600">
                                Upload your logo with a clear/invisible
                                background. Ideally no text on the logo.
                            </p>
                            <FileUpload
                                selectedFile={selectedFile}
                                setSelectedFile={setSelectedFile}
                                fileType={"Any"}
                            />
                        </div>

                        <Field
                            label="Password"
                            htmlFor="password"
                            className="sm:col-span-3"
                        >
                            <input
                                id="password"
                                type="password"
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={INPUT_CLASS}
                            />
                        </Field>
                        <Field
                            label="Confirm password"
                            htmlFor="confirm-password"
                            className="sm:col-span-3"
                        >
                            <input
                                id="confirm-password"
                                type="password"
                                autoComplete="new-password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                className={INPUT_CLASS}
                            />
                        </Field>
                    </div>

                    {error && (
                        <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                            {error}
                            {resumeTenant && (
                                <>
                                    {" "}
                                    <a
                                        href={`/prepcenter/onboard/${resumeTenant}/verify?interval=${interval}`}
                                        className="font-medium underline underline-offset-2"
                                    >
                                        Continue your sign-up
                                    </a>
                                </>
                            )}
                        </div>
                    )}

                    <div className="mt-8 flex justify-end">
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={loading}
                            className="group relative inline-flex items-center justify-center gap-x-2 overflow-hidden rounded-xl bg-[linear-gradient(60deg,#C33764,#302B63)] px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                        >
                            {loading && <LoadingWheel color="white" />}
                            <span>Continue to billing</span>
                            {!loading && <FaChevronRight size={12} />}
                        </button>
                    </div>
                </section>
            </div>
        </OnboardLayout>
    );
}
