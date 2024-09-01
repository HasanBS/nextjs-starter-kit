import { Plan } from "@/models/enums/planEnums";
import { plans } from "@/models/plans";
import { User } from "@/models/User";
import mongoose from "mongoose";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '');
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? '';

export async function POST(req: Request) {
    await mongoose.connect(process.env.MONGODB_URI ?? '');

    const body = await req.text(); // `.text()` to directly get the raw body string
    const sig = headers().get('stripe-signature') ?? '';

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err) {
        console.error(`Webhook Error: ${(err as Error).message}`);
        return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
    }

    const data = event.data;
    const eventType = event.type;

    try {
        switch (eventType) {
            case 'checkout.session.completed': {
                // First payment is successful and a subscription is created (if mode was set to "subscription" in ButtonCheckout)
                // ✅ Grant access to the product
                let user;
                const session = await stripe.checkout.sessions.retrieve(
                    (data.object as Stripe.PaymentIntent).id,
                    {
                        expand: ['line_items']
                    }
                );
                const customerId = session?.customer as string;
                const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer;
                const priceId = session?.line_items?.data?.[0]?.price?.id ?? null;
                const plan = plans.find((p) => p.priceId === priceId);

                if (customer.email) {
                    user = await User.findOne({ email: customer.email });

                    if (!user) {
                        user = await User.create({
                            email: customer.email,
                            name: customer.name,
                            customerId,
                            subscriptionPlan: plan?.planName || Plan.Free
                        });
                    }

                    else {
                        // If the user exists, update their subscription plan
                        user.subscriptionPlan = plan?.planName || user.subscriptionPlan;
                        user.priceId = priceId;
                        user.hasAccess = true;
                        await User.updateOne({ email: customer.email }, { subscriptionPlan: user.subscriptionPlan, priceId: user.priceId, hasAccess: user.hasAccess });
                    }
                }
                else {
                    console.error('No user found');
                    throw new Error('No user found');
                }

                // Extra: >>>>> send email to dashboard <<<<<
                break;
            }
            case 'customer.subscription.updated': {
                const subscription = data.object as Stripe.Subscription;
                const user = await User.findOne({ customerId: subscription.customer });

                if (user) {
                    const newPriceId = subscription.items.data[0].price.id;
                    const newPlan = plans.find((p) => p.priceId === newPriceId);
                    user.priceId = newPriceId;
                    user.subscriptionPlan = newPlan?.planName || user.subscriptionPlan;
                    user.hasAccess = true;
                    await User.updateOne({ customerId: subscription.customer }, { subscriptionPlan: user.subscriptionPlan, priceId: user.priceId, hasAccess: user.hasAccess });
                }
                break;
            }

            case 'customer.subscription.deleted': {
                // ❌ Revoke access to the product
                // The customer might have changed the plan (higher or lower plan, cancel soon etc...)
                const subscription = await stripe.subscriptions.retrieve(
                    (data.object as Stripe.Subscription).id
                );
                const user = await User.findOne({
                    customerId: subscription.customer
                });

                // Revoke access to your product
                //? user.hasAccess = false;
                user.subscriptionPlan = Plan.Free;
                await User.updateOne({ customerId: subscription.customer }, { subscriptionPlan: user.subscriptionPlan });
                break;
            }
            // ... handle other event types
            default:
                console.warn(`Unhandled event type: ${eventType}`);
                return NextResponse.json({ error: 'Unhandled event type' }, { status: 400 });
        }
        console.log(`Event received: ${event.type}`);
        return NextResponse.json({ received: true }, { status: 200 });

    } catch (error) {
        console.error(`Error handling event: ${error}`);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
