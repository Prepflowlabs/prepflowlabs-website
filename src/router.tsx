/** @format */

import { createBrowserRouter, redirect } from "react-router-dom";
// NOTE: The individuals (Prepflowlabs) landing lives at ./pages/home/page and is
// intentionally kept on disk but unrouted. To bring it back, re-import HomePage and
// map it to a route (e.g. "/" or "/individuals").
import PrepcenterHomePage from "./pages/prepcenter/home/page";
import ClientManagement from "./pages/prepcenter/client-management/page";
import PrepCenterInventoryManagement from "./pages/prepcenter/inventory-management/page";
import PrepcenterShipments from "./pages/prepcenter/shipments/page";
import PrepcenterKPIS from "./pages/prepcenter/kpis/page";
import PrepcenterBilling from "./pages/prepcenter/billing/page";
import PrepcenterReferrals from "./pages/prepcenter/affiliates/page";
import PrepcenterEmployees from "./pages/prepcenter/employees/page";
import PricingPage from "./pages/pricing/page";
import PrepcenterRegister from "./pages/prepcenter/register/page";
import PrepcenterContact from "./pages/prepcenter/contact/page";
import NotFound from "./pages/notfound/page";
import PrivacyPolicy from "./pages/privacy-policy/page";
import OnboardCompany from "./pages/prepcenter/onboard/onboardCompany";
import SetupDomain from "./pages/prepcenter/onboard/setupDomain";
import BillingSetup from "./pages/prepcenter/onboard/billingSetup";
import VerifyEmail from "./pages/prepcenter/onboard/verifyEmail";
import WalmartIntegrationPage from "./pages/prepcenter/integrations/walmart/page";

const routes = createBrowserRouter([
    { path: "/", element: <PrepcenterHomePage /> },
    { path: "/pricing", element: <PricingPage /> },

    // The WMS landing now lives at "/"; keep this path working for old inbound links.
    { path: "/prepcenter", loader: async () => redirect("/") },
    { path: "/contact", element: <PrepcenterContact /> },
    { path: "/prepcenter/client-management", element: <ClientManagement /> },
    {
        path: "/prepcenter/inventory-management",
        element: <PrepCenterInventoryManagement />,
    },
    { path: "/prepcenter/shipments", element: <PrepcenterShipments /> },
    { path: "/prepcenter/kpis", element: <PrepcenterKPIS /> },
    { path: "/prepcenter/billing", element: <PrepcenterBilling /> },
    { path: "/prepcenter/affiliates", element: <PrepcenterReferrals /> },
    { path: "/prepcenter/employees", element: <PrepcenterEmployees /> },
    { path: "/prepcenter/register", element: <PrepcenterRegister /> },

    {
        path: "/prepcenter/walmart-integration",
        element: <WalmartIntegrationPage />,
    },

    { path: "/prepcenter/onboard", element: <OnboardCompany /> },
    { path: "/prepcenter/onboard/:tenant/verify", element: <VerifyEmail /> },
    { path: "/prepcenter/onboard/:tenant/billing", element: <BillingSetup /> },
    { path: "/prepcenter/onboard/:tenant/domains", element: <SetupDomain /> },

    { path: "/privacy-policy", element: <PrivacyPolicy /> },

    { path: "/logout", loader: async () => redirect("/") },
    { path: "*", element: <NotFound /> },
]);

export default routes;
