import client from "@/lib/mongoConnect";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
    try {
        const { priceId } = await req.json();

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '');
        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'T-shirt',
                        },
                        unit_amount: 2000,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            return_url:  `${process.env.NEXTAUTH_URL}/return?session_id={CHECKOUT_SESSION_ID}`,
        });

        return NextResponse.json({ id: session.id , client_secret: session.client_secret });
    }
    catch (error) {
        console.error(error);
        return NextResponse.json(new Error('Failed to create checkout session') , { status: 500 });
    }
}