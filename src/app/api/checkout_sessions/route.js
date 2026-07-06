import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "../../../lib/stripe";
import { ServerSideGetUser } from "@/lib/session";

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const user = await ServerSideGetUser();
    const body = await req.json();
    console.log(body);
    const { type, bookPrice,bookId,  bookTitle ,bookImage} = body;
    let lineObj;
const priceAmount = Math.round(parseFloat(bookPrice) * 100);
    if (type === "buying") {
      lineObj = {
        price_data: {
          currency: "usd",
         
          unit_amount: priceAmount,
          product_data: {
            name: bookTitle,
            images: [body?.bookImage],
          },
        },
        quantity: 1,
      };
    }
    const metaDataOj = {
        userEmail: user?.email || "",
        userId: user?.id || "",
      bookId,
      bookTitle,
      bookImage,
      amount:parseFloat(bookPrice).toFixed(2),
    };

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [lineObj],
      metadata:metaDataOj,
      mode: "payment",
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
