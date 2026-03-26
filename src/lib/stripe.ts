import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-03-25.dahlia",
});

/** Check if Stripe is configured (not placeholder) */
export function isStripeConfigured(): boolean {
  const key = process.env.STRIPE_SECRET_KEY || "";
  return !!key && !key.includes("placeholder");
}
