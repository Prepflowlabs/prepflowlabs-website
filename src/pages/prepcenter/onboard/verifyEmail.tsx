/** @format */

import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { apiRequest } from "../../../utils/api/apiRequest";
import LoadingWheel from "../../../components/LoadingWheel";
import OnboardLayout from "./components/OnboardLayout";

const RESEND_COOLDOWN_SECONDS = 60;

export default function VerifyEmail() {
    const { tenant } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const interval = searchParams.get("interval");
    const billingUrl = `/prepcenter/onboard/${tenant}/billing${
        interval ? `?interval=${interval}` : ""
    }`;

    const [emailHint, setEmailHint] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [code, setCode] = useState("");
    const [verifying, setVerifying] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [notice, setNotice] = useState<string | null>(null);
    const [cooldown, setCooldown] = useState(
        searchParams.get("sent") === "1" ? RESEND_COOLDOWN_SECONDS : 0,
    );

    useEffect(() => {
        const load = async () => {
            const res = await apiRequest(`/core/tenants/${tenant}/billing`);
            if (res?.status !== "success") {
                navigate("/not-found");
                return;
            }
            if (res.data.email_verified || res.data.signup_complete) {
                navigate(billingUrl, { replace: true });
                return;
            }
            setEmailHint(res.data.email_hint);
            setLoading(false);
        };
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tenant]);

    useEffect(() => {
        if (cooldown <= 0) return;
        const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
        return () => clearTimeout(timer);
    }, [cooldown]);

    const verify = async (value: string) => {
        if (value.length !== 6 || verifying) return;
        setError(null);
        setNotice(null);
        setVerifying(true);
        const res = await apiRequest(
            `/core/tenants/${tenant}/verify-email`,
            "POST",
            { code: value },
        );
        if (res?.status === "success") {
            navigate(billingUrl);
            return;
        }
        setError(
            res?.errors?.[0] ??
                res?.data?.message ??
                "Something went wrong. Please try again.",
        );
        setVerifying(false);
    };

    const resend = async () => {
        if (cooldown > 0) return;
        setError(null);
        setNotice(null);
        const res = await apiRequest(
            `/core/tenants/${tenant}/verify-email/resend`,
            "POST",
        );
        if (res?.status === "success") {
            if (res.data?.email_verified) {
                navigate(billingUrl);
                return;
            }
            setNotice("We sent you a new code.");
            setCode("");
            setCooldown(RESEND_COOLDOWN_SECONDS);
            return;
        }
        setError(
            res?.errors?.[0] ??
                res?.data?.message ??
                "We couldn't send a new code. Please try again.",
        );
    };

    return (
        <OnboardLayout step={2}>
            {loading ? (
                <div className="flex justify-center pt-32">
                    <LoadingWheel />
                </div>
            ) : (
                <div className="mx-auto max-w-lg">
                    <section className="rounded-[20px] border border-white/80 bg-white/85 p-6 shadow-[0_24px_60px_-20px_rgba(24,33,69,0.25)] ring-1 ring-slate-900/5 backdrop-blur-xl sm:p-10">
                        <h1 className="text-2xl font-semibold tracking-tight text-[#182145]">
                            Check your email
                        </h1>
                        <p className="mt-1 text-sm text-slate-600">
                            We sent a 6-digit code to{" "}
                            <span className="font-medium text-[#182145]">
                                {emailHint ?? "your email"}
                            </span>
                            . Enter it below to verify your email.
                        </p>

                        <form
                            className="mt-8"
                            onSubmit={(e) => {
                                e.preventDefault();
                                verify(code);
                            }}
                        >
                            <label
                                htmlFor="verification-code"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Verification code
                            </label>
                            <input
                                id="verification-code"
                                type="text"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                autoFocus
                                maxLength={6}
                                value={code}
                                onChange={(e) => {
                                    const next = e.target.value
                                        .replace(/\D/g, "")
                                        .slice(0, 6);
                                    setCode(next);
                                    // Submit as soon as the last digit lands.
                                    if (next.length === 6) verify(next);
                                }}
                                placeholder="123456"
                                className="mt-2 block w-full rounded-md bg-white px-3 py-2.5 text-center text-2xl font-semibold tracking-[0.5em] text-[#182145] outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-accent"
                            />

                            {error && (
                                <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                                    {error}
                                </div>
                            )}
                            {notice && !error && (
                                <div className="mt-4 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                                    {notice}
                                </div>
                            )}

                            <div className="mt-8 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-sm text-slate-600">
                                    Didn't get it?{" "}
                                    {cooldown > 0 ? (
                                        <span className="text-slate-400">
                                            Resend code in {cooldown}s
                                        </span>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={resend}
                                            className="cursor-pointer font-medium text-accent underline underline-offset-2"
                                        >
                                            Resend code
                                        </button>
                                    )}
                                </p>
                                <button
                                    type="submit"
                                    disabled={code.length !== 6 || verifying}
                                    className="inline-flex cursor-pointer items-center justify-center gap-x-2 rounded-xl bg-[linear-gradient(60deg,#C33764,#302B63)] px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {verifying && (
                                        <LoadingWheel color="white" />
                                    )}
                                    <span>Verify email</span>
                                    {!verifying && <FaChevronRight size={12} />}
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            )}
        </OnboardLayout>
    );
}
