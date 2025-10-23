'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';

// Type for show details
type Show = {
  id: number;
  name: string;
  price: number;
  ticketsLeft: number;
  image: string;
};

// Razorpay loader (keep as is)
const loadRazorpayScript = () => {
  if (document.getElementById('razorpay-script')) return;
  const script = document.createElement('script');
  script.id = 'razorpay-script';
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
        setShow(null);
      } else {
        setShow(data);
      }
      setLoading(false);
    };
    getShowDetails();
  }, [id]);

  // Safety checks
  const price = show ? Number(show.price) || 0 : 0;
  const ticketsLeft = show ? Number(show.ticketsLeft) || 0 : 0;
  const totalPrice = price * ticketCount;

  const MAX_TICKETS_PER_PERSON = 5;
  const maxAllowedTickets = Math.min(MAX_TICKETS_PER_PERSON, ticketsLeft);

  const handlePayment = async () => {
    alert('Payment integration placeholder');
  };

  if (loading)
    return <div className="text-center text-white py-20">Loading Show...</div>;
  if (!show)
    return <div className="text-center text-white py-20">Show not found.</div>;

  // ✅ Return INSIDE the component
  return (
    <div className="container mx-auto px-8 py-16 max-w-4xl">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Image section */}
        <div className="relative aspect-[2/3]">
          <Image
            src={show.image}
            alt={show.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="rounded-xl shadow-lg object-cover"
          />
        </div>

        {/* Booking section */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">{show.name}</h1>
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Tickets</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setTicketCount(prev => Math.max(1, prev - 1))}
                  className="bg-fuchsia-500 rounded-full w-8 h-8 font-bold text-white"
                >
                  -
                </button>
                <span className="text-xl font-bold w-8 text-center text-white">
                  {ticketCount}
                </span>
                <button
                  onClick={() =>
                    setTicketCount(prev => Math.min(maxAllowedTickets, prev + 1))
                  }
                  disabled={ticketCount >= maxAllowedTickets}
                  className="bg-fuchsia-500 rounded-full w-8 h-8 font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center text-2xl font-bold border-t border-white/10 pt-4">
              <span className="text-gray-300">Total</span>
              <span className="text-fuchsia-400">₹{totalPrice}</span>
            </div>

            <button
              onClick={handlePayment}
              className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold py-3 px-4 rounded-lg text-lg hover:scale-105 transition-transform"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
