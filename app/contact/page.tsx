export default function ContactPage() {
  return (
    <div className="container mx-auto px-8 py-16 text-center max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-600">
        Contact Us
      </h1>
      <p className="text-lg text-gray-300 mb-8">
        Have questions? We're here to help!
      </p>
      <div className="bg-white/5 rounded-lg p-8 border border-white/10 text-left space-y-4">
        <div>
          <h2 className="font-bold text-xl text-white">Support Email</h2>
          <p className="text-gray-300">akkinenisvabhu@gmail.com</p>
        </div>
        <div>
          <h2 className="font-bold text-xl text-white">Support Contact Number</h2>
          <p className="text-gray-300">+91 8106912855</p>
        </div>
        <div>
          <h2 className="font-bold text-xl text-white">Business Hours</h2>
          <p className="text-gray-300">Monday - Friday, 10:00 AM - 6:00 PM (IST)</p>
        </div>
      </div>
    </div>
  );
}