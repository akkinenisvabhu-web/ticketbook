'use client'; // This is also required because it handles the list animation logic.

import ShowCard from './ShowCard';
import { motion, Variants } from 'framer-motion';

// Define the shape of the 'show' object again for this component
type Show = {
  id: number;
  name: string;
  price: number;
  ticketsLeft: number;
  image: string;
};

// Animation settings
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

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