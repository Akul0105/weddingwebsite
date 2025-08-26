// src/components/HeroSection.tsx

import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline // Important for mobile devices
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="WedVid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          Wedding planning starts here
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8">
          From venues and save the dates to a free wedding website, a registry
          and even your cake — we are here for all the days along the way.
        </p>
        <div className="flex gap-4">
          <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-200">
            Let&#39;s go
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900">
            Find a couple
          </Button>
        </div>
      </div>
    </div>
  );
}