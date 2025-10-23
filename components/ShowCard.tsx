'use client'; 

import Image from 'next/image';
import { motion } from 'framer-motion';

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
      className="bg-[#181818] rounded-lg overflow-hidden shadow-2xl shadow-black/50 group"
      whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
    >
      {/* POSTER SIZE CONFIRMED: aspect-[2/3] forces a 2:3 ratio, like a movie poster. */}
      <div className="relative w-full aspect-[2/3]"> 
        <Image
          src={show.image}
          alt={show.name}
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
        {showHurryUp && (
          <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
            LIMITED SEATS!
          </div>
        )}
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold text-white truncate mb-2">{show.name}</h2>
        <div className="flex justify-between items-center mb-4">
          {/* UPDATED: Changed from '$' to the Rupee symbol '₹' */}
          <p className="text-2xl font-light text-amber-400">₹{show.price}</p>
          <p className="text-xs font-medium text-gray-400">
            {show.ticketsLeft} tickets left
          </p>
        </div>
        <button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold py-3 px-4 rounded-lg group-hover:from-amber-400 group-hover:to-orange-500 transition-all duration-300">
          Book Now
        </button>
      </div>
    </motion.div>
  );
}