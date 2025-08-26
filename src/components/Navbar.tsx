import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <header className="absolute top-0 left-0 w-full z-50 py-4 px-8">
      <div className="container mx-auto flex justify-between items-center">
        {/* Your Logo */}
        <Link href="/" className="text-2xl font-bold text-white">
          Vivah<span className="text-pink-400">.</span>mu
        </Link>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
            Log In
          </Button>
          <Button className="bg-white text-gray-900 hover:bg-gray-200">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}