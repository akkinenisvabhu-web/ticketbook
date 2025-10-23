import { supabase } from '@/lib/supabaseClient';
import ShowList from '@/components/ShowList';

// This is a Server Component. Its primary job is to fetch data.
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
  const shows = await getShows();

  return (
    // Added a subtle background texture for a more premium feel
    <main className="min-h-screen text-white p-8 md:p-12 overflow-hidden bg-stone-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <header className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-600">
          electroflix
        </h1>
        <p className="text-lg text-gray-400 font-light tracking-wide">
          The ultimate movie ticket destination ⚡
        </p>
      </header>

      {/* Pass the server-fetched data to the client component for rendering */}
      {shows && shows.length > 0 ? (
        <ShowList shows={shows} />
      ) : (
        <p className="col-span-full text-center text-gray-400">
          Could not load shows at the moment.
        </p>
      )}
    </main>
  );
}