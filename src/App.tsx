/** @format */

import { RouterProvider } from "react-router-dom";
import routes from "./router";

// A malformed ?ref= makes atob throw; at module load that blanks the whole site.
try {
    const ref = atob((new URLSearchParams(window.location.search).get("ref") || "").replaceAll("-","+").replaceAll("_","/"));
    if(ref) localStorage.setItem("ref", ref);
} catch {
    // Ignore a bad or unstorable ref and keep any earlier one.
}

function App() {
    return <RouterProvider router={routes} />;
}

export default App;
