'use client'; // This must be a client component for the hover animation.

import Image from 'next/image';
import { motion } from 'framer-motion';

// Define the data structure for a single show
type ShowType = {
  id: number;
  name: string;
  price: number;
  ticketsLeft: number;
  image: string;
};

export default function ShowCard({ show }: { show: ShowType }) {
  const showHurryUp = show.ticketsLeft < 10;

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden group border border-white/10"
      whileHover={{ y: -8, scale: 1.02, transition: { type: 'spring', stiffness: 300 } }}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
      <div className="relative bg-black rounded-xl">
        <div className="relative w-full aspect-[2/3]">
          <Image src={show.image} alt={show.name} layout="fill" objectFit="cover" className="rounded-t-xl" />
          {showHurryUp && <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">LOW STOCK</div>}
        </div>
        <div className="p-4 bg-white/5 backdrop-blur-md border-t border-white/10">
          <h2 className="text-lg font-bold text-white truncate mb-2">{show.name}</h2>
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl font-bold text-fuchsia-400">₹{show.price}</p>
            <p className="text-xs font-medium text-gray-400">{show.ticketsLeft} left</p>
          </div>
          <button
            disabled={show.ticketsLeft === 0}
            className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold py-2.5 px-4 rounded-lg group-hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {show.ticketsLeft === 0 ? 'Sold Out' : 'Details'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}