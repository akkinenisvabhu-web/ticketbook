import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full mt-24 py-8 border-t border-white/10 text-center">
      <div className="container mx-auto px-8">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-6">
          {/* Internal link to the Contact Us page we will create */}
          <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
            Contact Us
          </Link>
          
          {/* External link to your Razorpay Terms page */}
          <a 
            href="https://merchant.razorpay.com/policy/RWoVUaGm0DZBGO/terms" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Terms & Conditions
          </a>

          {/* External link to your Razorpay Refunds page */}
          <a 
            href="https://merchant.razorpay.com/policy/RWoVUaGm0DZBGO/refund" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Cancellations & Refunds
          </a>

          {/* External link to your Razorpay Shipping page */}
          <a 
            href="https://merchant.razorpay.com/policy/RWoVUaGm0DZBGO/shipping" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Shipping Policy
          </a>
          
          {/* Internal link to the Privacy Policy page we will create */}
          <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
            Privacy Policy
          </Link>
        </div>
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} electroflix. All rights reserved.
        </p>
      </div>
    </footer>
  );
}