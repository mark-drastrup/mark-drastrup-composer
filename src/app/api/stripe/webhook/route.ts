import { createAdminClient } from "@/lib/supabase/admin";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover" as Stripe.LatestApiVersion,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!signature) {
      return new NextResponse("No signature found", { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error(`Webhook signature verification failed: ${errorMessage}`);

      return new NextResponse(`Webhook Error: ${errorMessage}`, {
        status: 400,
      });
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // Get the courseId, userId and email from the metadata
      const courseId = session.metadata?.courseId;
      const email = session.customer_details?.email;

      if (!courseId || !email) {
        return new NextResponse("Missing metadata", { status: 400 });
      }

      const supabase = await createAdminClient();

      let userId;

      // Check if the user already exists
      const { data: existingUserId, error } = await supabase.rpc(
        "get_user_id_by_email",
        {
          email: email,
        }
      );

      if (error) {
        console.error("Error fetching user by email:", error);
        return new NextResponse("Error fetching user", { status: 500 });
      }

      if (existingUserId.length) {
        userId = existingUserId[0].id;
      } else {
        const { data: newUser, error: createUserError } =
          await supabase.auth.admin.createUser({
            email,
            email_confirm: true,
          });

        if (createUserError) {
          console.error("Error creating user:", createUserError);
          return new NextResponse(
            JSON.stringify({ error: "Error creating user" }),
            { status: 500 }
          );
        }

        userId = newUser.user?.id;

        if (!userId) {
          console.error(
            "User creation succeeded, but no user ID was returned."
          );
          return new NextResponse(
            JSON.stringify({ error: "User creation failed" }),
            { status: 500 }
          );
        }

        const { error: otpError } = await supabase.auth.signInWithOtp({
          email,
        });

        if (otpError) {
          console.error("Error signing in user with OTP:", {
            email,
            error: otpError,
          });
          return new NextResponse(
            JSON.stringify({ error: "Error signing in user" }),
            { status: 500 }
          );
        }
      }

      // TODO: Implement enrollment logic
      // await supabase.from('enrollments').insert({
      //   student_id: userId,
      //   course_id: courseId,
      //   stripe_payment_intent_id: paymentIntent.id,
      //   status: 'active',
      // });

      return new NextResponse(null, { status: 200 });
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("Error in webhook handler:", error);
    return new NextResponse("Webhook handler failed", { status: 500 });
  }
}
