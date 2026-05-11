import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { volunteerService } from '../services/firebaseService';

export default function VolunteerForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await volunteerService.submitApplication(formData);
      setSubmitted(true);
    } catch (error) {
      alert('আবেদন জমা দিতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন। (Failed to submit application. Please try again.)');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary px-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/5 border border-white/10 p-16 skew-x-[-6deg] text-center max-w-xl w-full"
        >
          <div className="w-24 h-24 bg-secondary flex items-center justify-center mx-auto mb-10 skew-x-[6deg]">
            <CheckCircle2 className="text-primary w-12 h-12" />
          </div>
          <h2 className="text-5xl font-display text-white mb-6 uppercase tracking-tight">APPLICATION <span className="text-secondary italic">logged</span></h2>
          <p className="text-white/40 font-bold uppercase tracking-widest leading-relaxed mb-10 text-xs">
            Our operatives will review your profile shortly. Thank you for choosing to be a catalyst for change.
          </p>
          <Link to="/">
            <button className="bg-white text-primary px-12 py-5 font-display text-2xl uppercase skew-x-[-6deg] hover:bg-secondary transition-all">
              Return to Hub
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-24 px-6 bg-primary min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-3 text-white/20 hover:text-white font-bold mb-12 transition-colors uppercase text-[10px] tracking-widest">
          <ArrowLeft size={16} /> BACK TO BASE
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-white/10">
          <div className="lg:col-span-1 p-10 bg-white/5 border-b lg:border-b-0 lg:border-r border-white/10">
            <span className="text-secondary text-xs font-bold uppercase tracking-[0.5em] block mb-8">Service Portal</span>
            <h1 className="text-5xl font-display uppercase text-white leading-none mb-6">VOLUNTEER <br/>APPLICATION</h1>
            <p className="text-white/40 uppercase text-[10px] font-bold tracking-widest leading-relaxed">Join the movement. Every applicant is a catalyst for change.</p>
          </div>

          <div className="lg:col-span-2 p-10 md:p-16">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest ml-2">Name / নাম</label>
                  <input 
                    required 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text" 
                    className="w-full px-6 py-5 bg-transparent border-b border-white/10 outline-none text-white font-bold uppercase text-xs tracking-widest focus:border-secondary" 
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest ml-2">Email / ইমেইল</label>
                  <input 
                    required 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email" 
                    className="w-full px-6 py-5 bg-transparent border-b border-white/10 outline-none text-white font-bold uppercase text-xs tracking-widest focus:border-secondary" 
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest ml-2">Phone / ফোন নাম্বার</label>
                <input 
                  required 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel" 
                  className="w-full px-6 py-5 bg-transparent border-b border-white/10 outline-none text-white font-bold uppercase text-xs tracking-widest focus:border-secondary" 
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest ml-2">Skills & Narrative / আপনার দক্ষতা বা অভিজ্ঞতা</label>
                <textarea 
                  required 
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="w-full h-32 px-6 py-5 bg-transparent border border-white/10 outline-none text-white font-bold uppercase text-xs tracking-widest focus:border-secondary resize-none skew-x-[-2deg]"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-white text-primary py-6 font-display text-2xl uppercase skew-x-[-6deg] hover:bg-secondary transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4"
              >
                {isSubmitting ? (
                  <>Processing <Loader2 className="animate-spin" size={24} /></>
                ) : (
                  <>Dispatch Application <Send size={24} /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
