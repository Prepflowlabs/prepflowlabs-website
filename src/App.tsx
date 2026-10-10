/** @format */

import { RouterProvider } from "react-router-dom";
import routes from "./router";

const ref = atob((new URLSearchParams(window.location.search).get("ref") || "").replaceAll("-","+").replaceAll("_","/"));
if(ref) localStorage.setItem("ref", ref);

function App() {
    return <RouterProvider router={routes} />;
}

export default App;
