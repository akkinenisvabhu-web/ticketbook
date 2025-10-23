'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';

// Define the shape of the 'show' object
type Show = {
  id: number;
  name: string;
  price: number;
  ticketsLeft: number;
  image: string;
};

// Helper function to load Razorpay's script
const loadRazorpayScript = () => {
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.async = true;
  document.body.appendChild(script);
};

export default function BookingPage() {
  const [show, setShow] = useState<Show | null>(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  useEffect(() => {
    loadRazorpayScript();

    const getShowDetails = async () => {
      if (!id) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('shows')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error || !data) {
        console.error("Error fetching show details:", error);
        setShow(null);
      } else {
        setShow(data);
      }
      setLoading(false);
    };

    getShowDetails();
  }, [id]);

  const handlePayment = async () => {
    if (!show) return;

    const totalPrice = show.price * ticketCount;

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: totalPrice, showId: show.id }),
    });

    const order = await res.json();
    if (!res.ok) {
      alert("Failed to create order. Please try again.");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      amount: order.amount.toString(),
      currency: order.currency,
      name: "electroflix",
      description: `Booking for ${show.name}`,
      order_id: order.id,
      handler: function (response: any) {
        // AFTER SUCCESS, REDIRECT TO TICKET PAGE
        router.push(`/ticket/${response.razorpay_order_id}?movieName=${encodeURIComponent(show.name)}&poster=${encodeURIComponent(show.image)}&tickets=${ticketCount}`);
      },
      prefill: { name: "Your Name", email: "your.email@example.com", contact: "9999999999" },
    };
    
    // @ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (loading) return <div className="text-center text-white py-20">Loading Show...</div>;
  if (!show) return <div className="text-center text-white py-20">Show not found.</div>;

  return (
    <div className="container mx-auto px-8 py-16 max-w-4xl">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <Image src={show.image} alt={show.name} width={500} height={750} className="rounded-xl shadow-lg"/>
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">{show.name}</h1>
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Tickets</span>
              <div className="flex items-center gap-4">
                <button onClick={() => setTicketCount(Math.max(1, ticketCount - 1))} className="bg-fuchsia-500 rounded-full w-8 h-8 font-bold">-</button>
                <span className="text-xl font-bold w-8 text-center">{ticketCount}</span>
                <button onClick={() => setTicketCount(Math.min(show.ticketsLeft, ticketCount + 1))} className="bg-fuchsia-500 rounded-full w-8 h-8 font-bold">+</button>
              </div>
            </div>
            <div className="flex justify-between items-center text-2xl font-bold border-t border-white/10 pt-4">
              <span className="text-gray-300">Total</span>
              <span className="text-fuchsia-400">₹{show.price * ticketCount}</span>
            </div>
            <button onClick={handlePayment} className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold py-3 px-4 rounded-lg text-lg hover:scale-105 transition-transform">
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}