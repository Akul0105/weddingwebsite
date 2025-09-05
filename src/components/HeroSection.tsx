'use client';

// src/components/HeroSection.tsx

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays when component mounts
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
        key="hero-video" // Force re-render when component mounts
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        onLoadedData={() => {
          // Ensure video plays when loaded
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
        
        <motion.div 
          className="flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              className="bg-white text-gray-900 hover:bg-gray-200 shadow-lg hover:shadow-xl transition-all duration-300" 
              asChild
            >
              <Link href="/vendors">
                Let&#39;s go
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}