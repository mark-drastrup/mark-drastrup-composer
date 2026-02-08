"use server";

import stripe from "@/lib/stripe";
import baseUrl from "@/lib/baseUrl";

export async function createStripeCheckout(courseId: string, userId: string) {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Mark's First Course",
              description: "This is going to be a super exciting course",
            },
            unit_amount: 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}`,
      cancel_url: `${baseUrl}`,
      metadata: {
        courseId: courseId,
        userId: userId,
      },
    });
    return { url: session.url };
  } catch (error) {
    console.error("Error in createStripeCheckout:", error);
    throw new Error("Failed to create checkout session");
  }
}
