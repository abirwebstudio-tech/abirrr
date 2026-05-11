import React from 'react';
import { motion } from 'motion/react';
import { Home, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-6">
      <div className="text-center space-y-8">
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 10 }}
          transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
          className="inline-block"
        >
          <HelpCircle size={80} className="text-secondary opacity-30" />
        </motion.div>
        
        <div className="space-y-4">
          <h1 className="text-8xl font-serif font-black text-primary/10">404</h1>
          <h2 className="text-3xl font-bold text-primary">পাতাসমূহ খুঁজে পাওয়া যায়নি</h2>
          <p className="text-primary/60 max-w-sm mx-auto">
            দুঃখিত, আপনি যে পাতাটি খুঁজছেন তা আমাদের কাছে নেই। অনুগ্রহ করে মূল পাতায় ফিরে যান।
          </p>
        </div>

        <Link to="/" className="inline-block">
          <button className="bg-primary text-white px-10 py-4 rounded-full font-bold shadow-xl shadow-primary/20 flex items-center gap-2 hover:scale-105 transition-transform">
            <Home size={20} /> ফিরে যান
          </button>
        </Link>
      </div>
    </div>
  );
}
