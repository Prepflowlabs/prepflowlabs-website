/** @format */

import { useEffect, useRef } from "react";
import { BOXEM_STRIPE_PUBLISHABLE_KEY } from "./plan";

interface StripeEmbeddedCheckout {
    mount: (element: HTMLElement) => void;
    destroy: () => void;
}

interface StripeClient {
    createEmbeddedCheckoutPage: (options: {
        fetchClientSecret: () => Promise<string>;
        onComplete?: () => void;
    }) => Promise<StripeEmbeddedCheckout>;
}

declare global {
    interface Window {
        // Stripe.js (dahlia) is loaded by a <script> tag in index.html.
        Stripe?: (publishableKey: string) => StripeClient;
    }
}

let stripeClient: StripeClient | null = null;
// Stripe allows one embedded checkout per page. StrictMode (dev) runs the mount
// effect twice, so the second run must wait for the first creation to settle.
let checkoutCreation: Promise<void> | null = null;

function getStripe(): StripeClient | null {
    if (!stripeClient && window.Stripe) {
        stripeClient = window.Stripe(BOXEM_STRIPE_PUBLISHABLE_KEY);
    }
    return stripeClient;
}

/**
 * Stripe embedded checkout via Boxem's proxy. The session only saves a card.
 * Mount it once per attempt — remount (change `key`) to start over.
 */
export default function EmbeddedCheckout({
    fetchClientSecret,
    onComplete,
    onError,
}: {
    fetchClientSecret: () => Promise<string>;
    onComplete: () => void;
    onError: (message: string) => void;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    // Refs so the parent's re-renders don't tear down a checkout mid-entry.
    const callbacks = useRef({ fetchClientSecret, onComplete, onError });
    callbacks.current = { fetchClientSecret, onComplete, onError };

    useEffect(() => {
        let cancelled = false;
        let checkout: StripeEmbeddedCheckout | null = null;

        const start = async () => {
            while (checkoutCreation) await checkoutCreation;
            if (cancelled) return;

            const stripe = getStripe();
            if (!stripe) {
                callbacks.current.onError(
                    "The payment form couldn't load. Please refresh and try again.",
                );
                return;
            }

            let settle!: () => void;
            checkoutCreation = new Promise((resolve) => {
                settle = resolve;
            });
            try {
                const instance = await stripe.createEmbeddedCheckoutPage({
                    // Stripe swallows a rejected secret and leaves a blank
                    // frame, so report the failure ourselves.
                    fetchClientSecret: async () => {
                        try {
                            return await callbacks.current.fetchClientSecret();
                        } catch (err) {
                            if (!cancelled) {
                                callbacks.current.onError(
                                    err instanceof Error && err.message
                                        ? err.message
                                        : "Couldn't start checkout. Please try again.",
                                );
                            }
                            throw err;
                        }
                    },
                    onComplete: () => callbacks.current.onComplete(),
                });
                if (cancelled) {
                    instance.destroy();
                    return;
                }
                checkout = instance;
                if (containerRef.current) instance.mount(containerRef.current);
            } catch (err) {
                if (!cancelled) {
                    callbacks.current.onError(
                        err instanceof Error && err.message
                            ? err.message
                            : "Couldn't start checkout. Please try again.",
                    );
                }
            } finally {
                checkoutCreation = null;
                settle();
            }
        };

        start();
        return () => {
            cancelled = true;
            checkout?.destroy();
        };
    }, []);

    return <div ref={containerRef} />;
}
