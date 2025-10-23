import { supabase } from '@/lib/supabaseClient';
import ShowList from '@/components/ShowList'; // Import our new wrapper component

// This function fetches the show data from your Supabase database.
async function getShows() {
  const { data, error } = await supabase
    .from('shows')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error("Error fetching shows:", error.message);
    return [];
  }
  return data;
}

export default async function Home() {
  // 1. Fetch the data on the server
  const shows = await getShows();

  return (
    <main className="min-h-screen text-white p-8 md:p-12 overflow-hidden">
      <header className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-600">
          electroflix
        </h1>
        <p className="text-lg text-gray-400 font-light">Grab your tickets before they're gone ⚡</p>
      </header>

      {/* 2. Pass the data to the client component to handle rendering and animations */}
      {shows && shows.length > 0 ? (
        <ShowList shows={shows} />
      ) : (
        <p className="col-span-full text-center text-gray-400">Could not load shows at the moment.</p>
      )}
    </main>
  );
}