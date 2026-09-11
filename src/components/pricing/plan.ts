/** @format */

/**
 * Single source of truth for the prep-center plan shown on /pricing and in
 * sign-up. What a tenant is actually charged is set by ops in core-dashboard
 * (tenants.monthly_amount) — keep this in step with what they enter.
 */

export type BillingInterval = "monthly" | "annual";

export const PLAN = {
    name: "Prepflow WMS",
    description:
        "Everything your prep center needs to run inbound, storage and shipments on one platform.",
    monthlyPrice: 499,
    annualMonthlyPrice: 400,
    annualTotal: 4800,
    annualSavingsLabel: "Save 20%",
};

export const PLAN_FEATURES = [
    "Client management & client portal",
    "Inventory management",
    "FBA, FBM, WFS, Shopify shipments",
    "KPIs & analytics",
    "Automated client billing",
    "Employee management",
    "Communications package included",
];

/** Informational only for now — overage isn't metered or billed yet. */
export const PLAN_LIMITS = [
    {
        amount: "60,000",
        label: "units / month included",
        overage: "then $0.01 per unit",
    },
    {
        amount: "100",
        label: "client seats included",
        overage: "then $15 per seat",
    },
];

export const PLAN_EXTRAS = [
    "Support tickets & announcements",
    "Client messaging",
    "No add-ons or per-feature upsells",
    "Money-back guarantee",
];

// Draft copy — the guarantee terms still need sign-off from Boxem.
export const PRICING_FAQS = [
    {
        question: "Is there a money-back guarantee?",
        answer: "Yes. If Prepflow isn't the right fit for your prep center, get in touch and we'll refund you.",
    },
    {
        question: "When will I be charged?",
        answer: "You add your card when you sign up, but you won't be charged until your account is set up and ready to use. After that you're billed monthly, or once a year on the annual plan.",
    },
    {
        question: "Do you offer a discount for annual billing?",
        answer: "Yes. Paying annually brings the price down to $400 a month, billed as $4,800 once a year. That's 20% off monthly pricing.",
    },
    {
        question: "What counts as a seat?",
        answer: "Each active client account in your Prepflow workspace. Up to 100 are included, and each one beyond that is $15 a month.",
    },
    {
        question: "What happens if I process more than 60,000 units in a month?",
        answer: "Nothing stops working. Units over 60,000 in a month are billed at $0.01 each.",
    },
    {
        question: "Is the communications package extra?",
        answer: "No. Support tickets, announcements and client messaging are included in the plan.",
    },
];

export const BOXEM_TERMS_URL = "https://www.boxem.com/terms-conditions";

// Boxem's publishable key — tenant billing runs on Boxem's Stripe account.
// Same key as dashboard/src/pages/admin/billing-add-ons/AdminSettingsBilling.tsx.
export const BOXEM_STRIPE_PUBLISHABLE_KEY =
    "pk_live_51Oe0GlHvfDWYrqmfIE2P8WdVfM3wwGJfdbKSWeyPIQgT7FjuTLqfiIHSpuAfHpB6T0mvpaeWJbwHPaO6xke7RNHO00mSVtkR5q";

export function parseInterval(
    value: string | null | undefined,
): BillingInterval | null {
    return value === "monthly" || value === "annual" ? value : null;
}

export function formatUsd(amount: number) {
    return `$${amount.toLocaleString("en-US")}`;
}
