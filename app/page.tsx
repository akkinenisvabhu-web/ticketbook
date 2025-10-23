'use client';

import ShowCard from '@/components/ShowCard';
import { motion, Variants } from 'framer-motion';

const shows = [
  { id: 1, name: "Chatrapathi (2005)", price: 39, ticketsLeft: 50, image: "/images/show1.png" },
  { id: 2, name: "They Call Him OG", price: 29, ticketsLeft: 8, image: "/images/show2.jpg" },
  { id: 3, name: "Akhanda", price: 29, ticketsLeft: 120, image: "/images/show3.jpg" },
  { id: 4, name: "Khaleja", price: 39, ticketsLeft: 3, image: "/images/show4.jpg" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Home() {
  return (
    <main className="min-h-screen text-white p-8 md:p-12 overflow-hidden">
      <header className="text-center mb-16">
        {/* New vibrant gradient and style */}
        <h1 className="text-5xl md:text-6xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-600">
          electroflix
        </h1>
        <p className="text-lg text-gray-400 font-light">Grab your tickets before they're gone⚡</p>
      </header>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {shows.map((show) => (
          <motion.div key={show.id} variants={cardVariants}>
            <ShowCard show={show} />
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}