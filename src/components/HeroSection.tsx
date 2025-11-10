// src/components/HeroSection.tsx
'use client';

import { SearchBar } from '@/components/SearchBar';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        key="hero-video"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        onLoadedData={() => {
          if (videoRef.current) {
            videoRef.current.play().catch(console.error);
          }
        }}
      >
        <source src="/WedVid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Wedding planning starts here
          </motion.h1>
        </motion.div>
        
        <motion.p 
          className="text-lg md:text-xl max-w-2xl mb-8 text-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          From venues and save the dates to a free wedding website, a registry
          and even your cake — we are here for all the days along the way.
        </motion.p>

        {/* SearchBar below the intro text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-xl"
        >
          <SearchBar />
        </motion.div>
      </div>
    </div>
  );
}
