import ShowCard from '@/components/ShowCard';
import { supabase } from '@/lib/supabaseClient';

// This function adds detailed logging to find the error.
async function getShows() {
  console.log("--- Starting Supabase Fetch Test ---");

  // Test 1: Check if environment variables are loaded
  const urlLoaded = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const keyLoaded = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  console.log(`Supabase URL loaded: ${urlLoaded}`);
  console.log(`Supabase Key loaded: ${keyLoaded}`);

  if (!urlLoaded || !keyLoaded) {
    console.error("🔴 CRITICAL: Environment variables are NOT loaded. Check your .env.local file and restart the server.");
    return [];
  }

  // Test 2: Attempt to fetch data
  const { data, error } = await supabase
    .from('shows')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    // This will print the exact error from Supabase
    console.error("🔴 Supabase fetch FAILED. Full error object:", JSON.stringify(error, null, 2));
    return [];
  }

  if (!data || data.length === 0) {
    console.warn("🟡 Fetch successful, but NO DATA was returned. Check two things:");
    console.warn("1. Is your 'shows' table in Supabase completely empty?");
    console.warn("2. Is Row Level Security (RLS) enabled on the 'shows' table? If so, disable it for this test.");
  } else {
    console.log("✅ Fetch SUCCESSFUL! Data received:", data);
  }
  
  console.log("--- Test Complete ---");
  return data || [];
}

export default async function Home() {
  const shows = await getShows();

  return (
    <main className="min-h-screen text-white p-8 md:p-12 overflow-hidden">
      <header className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-600">
          electroflix
        </h1>
        <p className="text-lg text-gray-400 font-light">Grab your tickets before they're gone ⚡</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {shows && shows.length > 0 ? (
          shows.map((show) => <ShowCard key={show.id} show={show} />)
        ) : (
          <p className="col-span-full text-center text-gray-400">Could not load shows. Check the terminal for errors.</p>
        )}
      </div>
    </main>
  );
}