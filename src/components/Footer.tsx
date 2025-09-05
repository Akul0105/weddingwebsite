'use client';

// src/components/Footer.tsx

import { motion } from 'framer-motion';

export function Footer() {
    return (
        <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-400">
            {/* Main Footer */}
            <div className="py-12">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <p className="font-bold text-2xl text-white mb-2">Vivah.mu</p>
                        <p className="text-gray-400 mb-6">Your perfect wedding starts here</p>
                        <p className="text-gray-500 mb-6">&copy; {new Date().getFullYear()} All Rights Reserved.</p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <a href="#" className="hover:text-white transition-colors">About</a>
                            <a href="#" className="hover:text-white transition-colors">Contact</a>
                            <a href="#" className="hover:text-white transition-colors">For Vendors</a>
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </footer>
    )
}