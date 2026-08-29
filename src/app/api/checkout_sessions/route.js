import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "../../../lib/stripe";
import { ServerSideGetUser } from "@/lib/session";
import { GetPurchasedBookByRead } from "@/lib/api/purchasedBooks/data";
import { GetEBooksById } from "@/lib/api/book";

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const user = await ServerSideGetUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    
    const { type, bookId,  bookTitle ,bookImage} = body;

    const book = await GetEBooksById(bookId);
    if (!book || typeof book.price === "undefined") {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }


if (user.role === "admin") {
  return NextResponse.json(
    { error: "Admins are not permitted to purchase books." },
    { status: 403 }
  );
}


if (user.role === "writer" ) {
  return NextResponse.json(
    { error: "You cannot purchase your own book." },
    { status: 403 }
  );
}

// Block duplicate purchase
    const existing = await GetPurchasedBookByRead(user.id, bookId);
    if (existing?._id) {
      return NextResponse.json(
        { error: "You already own this book." },
        { status: 409 }
      );
    }

 const priceAmount = Math.round(parseFloat(book.price) * 100);


    let lineObj;


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
      amount:Number(book.price).toFixed(2),
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
