'use client'; // This component handles the animations, so it must be a client component.

import ShowCard from './ShowCard';
import { motion, Variants } from 'framer-motion';

// Define the shape of the 'show' object
type Show = {
  id: number;
  created_at: string;
  name: string;
  price: number;
  ticketsLeft: number;
  image: string;
};

// Animation settings for the grid container
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// Animation settings for each individual card
const cardVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function ShowList({ shows }: { shows: Show[] }) {
  return (
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
  );
}