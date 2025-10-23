'use client';

import { useParams, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { QRCodeCanvas } from 'qrcode.react';

export default function TicketPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const orderId = params.orderId as string;
  const movieName = searchParams.get('movieName');
  const poster = searchParams.get('poster');
  const tickets = searchParams.get('tickets');

  if (!orderId || !movieName || !poster) {
    return <div className="text-center text-white py-20">Invalid ticket details.</div>;
  }

  const qrCodeValue = `electroflix-order-${orderId}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12">
      <h1 className="text-3xl font-bold text-white mb-4">Payment Successful!</h1>
      <p className="text-gray-300 mb-8">Here is your ticket. Enjoy the show!</p>
      
      {/* The Ticket Stub */}
      <div className="w-full max-w-sm bg-gray-800 rounded-2xl shadow-2xl border border-fuchsia-500/50 overflow-hidden flex flex-col">
        <div className="relative h-48">
          <Image src={poster} alt={movieName} layout="fill" objectFit="cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-800"></div>
          <h2 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{movieName}</h2>
        </div>
        <div className="p-6 flex-grow flex flex-col items-center justify-center">
          <h3 className="text-lg font-bold text-fuchsia-400 mb-4">SCAN AT ENTRY</h3>
          <div className="bg-white p-2 rounded-lg">
            <QRCodeCanvas value={qrCodeValue} size={160} bgColor="#ffffff" fgColor="#000000" />
          </div>
          <div className="text-center text-gray-400 mt-6 w-full border-t border-dashed border-gray-600 pt-6">
            <p><span className="font-bold text-white">{tickets}</span> Ticket(s)</p>
            <p className="text-xs mt-2">Order ID: {orderId}</p>
          </div>
        </div>
        <div className="bg-fuchsia-600 text-center py-2 text-white font-bold text-lg tracking-widest">
          electroflix
        </div>
      </div>
    </div>
  );
}