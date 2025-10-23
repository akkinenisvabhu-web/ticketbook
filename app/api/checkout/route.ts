import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// THE FIX IS HERE: Add the "export" keyword
export async function POST(request: Request) {
  const { price, showId } = await request.json();
  const amountInPaise = Math.round(price * 100);

  const options = {
    amount: amountInPaise.toString(),
    currency: 'INR',
    receipt: `receipt_order_${new Date().getTime()}`,
    notes: {
      showId: showId,
    }
  };

  try {
    const response = await razorpay.orders.create(options);
    return NextResponse.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}