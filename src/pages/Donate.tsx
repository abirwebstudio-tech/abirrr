import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, Heart, Check, ArrowRight, Loader2, PartyPopper } from 'lucide-react';
import { donationService } from '../services/firebaseService';

const PRESETS = [10, 25, 50, 100, 250];

export default function Donate() {
  const [type, setType] = useState<'one-time' | 'monthly'>('monthly');
  const [amount, setAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState('');
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAmountSelect = (val: number) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setAmount(null);
  };

  const handleCompleteDonation = async () => {
    const finalAmount = amount || parseFloat(customAmount);
    if (!finalAmount || finalAmount <= 0) return;

    setIsSubmitting(true);
    try {
      await donationService.recordDonation(finalAmount, type, 'card');
      setStep(3); // Success step
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-40 pb-24 px-6 min-h-screen bg-primary">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="space-y-4">
            <span className="text-secondary text-xs font-bold uppercase tracking-[0.5em] block">Sustaining Hope</span>
            <h1 className="text-6xl md:text-9xl leading-none select-none">
              CONTRIBUTE <br/>
              FOR <span className="text-secondary italic font-serif lowercase">impact</span>.
            </h1>
          </div>
          <p className="text-white/40 max-w-sm text-xs font-bold uppercase tracking-widest leading-relaxed">
            Your generosity directly impacts the lives of children and families across Bangladesh. Direct investment into human dignity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-white/10">
          {/* Donation Form */}
          <div className="lg:col-span-2 p-8 md:p-16 border-b lg:border-b-0 lg:border-r border-white/10">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-12"
                >
                  {/* Frequency Toggle */}
                  <div className="flex bg-white/5 p-1 skew-x-[-6deg]">
                    <button
                      onClick={() => setType('monthly')}
                      className={`flex-1 py-4 font-display text-xl uppercase transition-all ${type === 'monthly' ? 'bg-secondary text-primary' : 'text-white/40 hover:text-white'}`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setType('one-time')}
                      className={`flex-1 py-4 font-display text-xl uppercase transition-all ${type === 'one-time' ? 'bg-secondary text-primary' : 'text-white/40 hover:text-white'}`}
                    >
                      Single
                    </button>
                  </div>

                  {/* Preset Amounts */}
                  <div className="grid grid-cols-3 gap-4">
                    {PRESETS.map((val) => (
                      <button
                        key={val}
                        onClick={() => handleAmountSelect(val)}
                        className={`py-8 font-display text-4xl border-2 transition-all skew-x-[-6deg] ${amount === val ? 'border-secondary bg-secondary text-primary' : 'border-white/10 text-white/40 hover:border-white/30'}`}
                      >
                        {val}
                      </button>
                    ))}
                    <div className="relative col-span-3">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary font-display text-2xl">$</span>
                      <input
                        type="number"
                        placeholder="CUSTOM AMOUNT"
                        value={customAmount}
                        onChange={handleCustomChange}
                        className="w-full pl-12 pr-6 py-6 bg-transparent border-b-2 border-white/10 focus:border-secondary outline-none font-display text-3xl text-white uppercase tracking-widest placeholder:text-white/10"
                      />
                    </div>
                  </div>

                  <button 
                    onClick={() => setStep(2)}
                    className="w-full bg-white text-primary py-6 font-display text-2xl uppercase skew-x-[-6deg] hover:bg-secondary transition-all flex items-center justify-center gap-4"
                  >
                    Next Step <ArrowRight size={24} />
                  </button>
                </motion.div>
              ) : step === 2 ? (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-12"
                >
                  <div className="space-y-6">
                    <h3 className="text-3xl font-display uppercase text-white">Payment Method</h3>
                    <div className="space-y-4">
                      <div className="bg-white/5 p-6 flex items-center justify-between border border-white/10 skew-x-[-6deg]">
                        <div className="flex items-center gap-4">
                          <CreditCard className="text-secondary" />
                          <span className="font-display text-xl uppercase text-white">Credit / Debit Card</span>
                        </div>
                        <Check className="text-secondary" />
                      </div>
                      <p className="text-[10px] text-white/20 uppercase font-bold tracking-[0.2em] text-center">Secure SSL encrypted transaction</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" placeholder="FIRST NAME" className="w-full px-6 py-5 bg-transparent border-b border-white/10 outline-none text-[10px] tracking-widest uppercase font-bold text-white focus:border-secondary" required />
                    <input type="text" placeholder="LAST NAME" className="w-full px-6 py-5 bg-transparent border-b border-white/10 outline-none text-[10px] tracking-widest uppercase font-bold text-white focus:border-secondary" required />
                    <input type="email" placeholder="EMAIL ADDRESS" className="w-full px-6 py-5 bg-transparent border-b border-white/10 outline-none text-[10px] tracking-widest uppercase font-bold text-white focus:border-secondary col-span-full" required />
                  </div>

                  <div className="flex flex-col gap-4">
                    <button 
                      onClick={handleCompleteDonation}
                      disabled={isSubmitting}
                      className="w-full bg-secondary text-primary py-6 font-display text-2xl uppercase skew-x-[-6deg] disabled:opacity-50 flex items-center justify-center transition-all"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" /> : 'Confirm Donation'}
                    </button>
                    <button onClick={() => setStep(1)} className="text-[10px] text-white/30 uppercase font-bold tracking-widest hover:text-white transition-colors">Return to Selection</button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20 space-y-8"
                >
                  <div className="w-24 h-24 bg-secondary rounded-none flex items-center justify-center mx-auto skew-x-[-12deg]">
                    <PartyPopper className="text-primary w-12 h-12" />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-6xl font-display uppercase text-white">Processed.</h2>
                    <p className="text-white/40 uppercase text-[10px] font-bold tracking-widest leading-relaxed max-w-sm mx-auto">Your contribution is being routed to the field. Impact report pending.</p>
                  </div>
                  <button 
                    onClick={() => setStep(1)}
                    className="bg-white text-primary px-16 py-5 font-display text-xl uppercase skew-x-[-6deg] hover:bg-secondary transition-all"
                  >
                    Done
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Impact Sidebar */}
          <div className="p-8 md:p-16 flex flex-col justify-start gap-12 bg-white/5">
            <div className="space-y-8">
              <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-secondary">Allocation Roadmap</h3>
              <ul className="space-y-10">
                {[
                  { label: 'Direct Aid', val: '82%', desc: 'Food, medicine, and emergency kits' },
                  { label: 'Sustainability', val: '12%', desc: 'Long-term community building' },
                  { label: 'Operations', val: '6%', desc: 'Highly efficient management' }
                ].map((item) => (
                  <li key={item.label} className="space-y-3">
                    <div className="flex justify-between items-end">
                      <span className="text-white text-lg font-display uppercase">{item.label}</span>
                      <span className="text-secondary font-display text-xl">{item.val}</span>
                    </div>
                    <div className="w-full h-[2px] bg-white/10 relative">
                      <div className="absolute top-0 left-0 h-full bg-secondary" style={{ width: item.val }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 border-t border-white/10 pt-12">
              <p className="text-xl text-white font-serif italic leading-snug group-hover:text-secondary transition-colors">"My $25 donation provided school kits for 10 children. Impact felt real."</p>
              <p className="text-[10px] font-bold mt-6 uppercase tracking-widest text-secondary">— Sarah J., Monthly Donor</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
