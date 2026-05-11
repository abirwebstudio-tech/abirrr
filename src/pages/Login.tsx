import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, Chrome, Linkedin, Facebook, Twitter, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';

const SOCIAL_PROVIDERS = [
  { id: 'google', name: 'Google', icon: Chrome, color: 'hover:bg-red-50 hover:text-red-600' },
];

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const { user, loginWithGoogle, loginWithFacebook, loginWithTwitter, loginWithLinkedIn } = useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleSocialLogin = async (id: string) => {
    setAuthError(null);
    try {
      switch (id) {
        case 'google': await loginWithGoogle(); break;
        case 'facebook': await loginWithFacebook(); break;
        case 'twitter': await loginWithTwitter(); break;
        case 'linkedin': await loginWithLinkedIn(); break;
        default: break;
      }
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        setAuthError('পপআপটি বন্ধ হয়ে গেছে। (Login popup closed)');
      } else if (error.code === 'auth/cancelled-popup-request') {
        console.log('Popup request cancelled');
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        setAuthError('এই ইমেইল দিয়ে অন্য একটি সোশ্যাল মিডিয়া অ্যাকাউন্টে লগইন করা আছে। (Email already in use with another provider)');
      } else if (error.code === 'auth/unauthorized-domain') {
        setAuthError(`ডোমেইন অনুমোদিত নয়। দয়া করে ফায়ারবেস কনসোলে এই ডোমেইনটি যোগ করুন: ${window.location.hostname} (Domain not authorized. Please add ${window.location.hostname} to authorized domains in Firebase Console)`);
      } else {
        setAuthError(`লগইন ব্যর্থ হয়েছে: ${error.code || error.message} (Login failed)`);
        console.error("Login failed", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-12 px-6 bg-primary">
      <Link to="/" className="fixed top-8 left-8 flex items-center gap-3 text-white/20 hover:text-white transition-colors font-bold uppercase text-[10px] tracking-widest">
        <ArrowLeft size={16} /> Return to Mission
      </Link>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-xl bg-surface border border-white/10 p-12 md:p-20 skew-x-[-3deg]"
      >
        <div className="space-y-4 mb-16">
          <span className="text-secondary text-xs font-bold uppercase tracking-[0.5em] block">Authentication Portal</span>
          <h1 className="text-5xl md:text-7xl font-display uppercase text-white leading-none">
            {isLogin ? 'SECURE ACCESS' : 'JOIN THE MOVEMENT'}
          </h1>
          <p className="text-white/40 uppercase text-[10px] font-bold tracking-widest leading-relaxed">
            {isLogin ? 'Direct terminal access to your impact dashboard.' : 'Registration for global change catalysts.'}
          </p>
        </div>

        {/* Status Notice */}
        <div className="mb-12 p-5 bg-secondary/5 border border-secondary/20 flex items-center gap-4 skew-x-[-3deg]">
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">
             আপাতত শুধুমাত্র জিমেইল লগইন চালু <br className="md:hidden" />
             <span className="opacity-60 ml-2">(Only Gmail Login Active)</span>
          </span>
        </div>

        {authError && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-10 p-6 bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-bold uppercase tracking-widest text-center"
          >
            {authError}
          </motion.div>
        )}

        {/* Social Logins */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {SOCIAL_PROVIDERS.map((provider) => (
            <button
              key={provider.id}
              onClick={() => handleSocialLogin(provider.id)}
              className="group flex items-center justify-between p-5 border border-white/20 hover:border-secondary/50 transition-all bg-white/10 active:scale-95"
            >
              <div className="flex items-center gap-4">
                <provider.icon size={20} className="text-secondary" />
                <span className="text-[12px] font-bold uppercase tracking-widest text-white group-hover:text-secondary">{provider.name}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="relative mb-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <div className="relative flex justify-center text-[8px] uppercase tracking-[0.4em] font-bold text-white/10 bg-surface px-6">
            Internal Credentials
          </div>
        </div>

        {/* Form */}
        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          {!isLogin && (
            <div className="relative">
              <input type="text" placeholder="FULL NAME" className="w-full px-6 py-5 bg-transparent border-b border-white/10 outline-none text-white font-bold uppercase text-xs tracking-widest focus:border-secondary transition-all" />
            </div>
          )}
          <div className="relative">
            <input type="email" placeholder="EMAIL ADDRESS" className="w-full px-6 py-5 bg-transparent border-b border-white/10 outline-none text-white font-bold uppercase text-xs tracking-widest focus:border-secondary transition-all" />
          </div>
          <div className="relative">
            <input type="password" placeholder="PASSWORD" className="w-full px-6 py-5 bg-transparent border-b border-white/10 outline-none text-white font-bold uppercase text-xs tracking-widest focus:border-secondary transition-all" />
          </div>

          <div className="flex items-center justify-between">
            <button 
              type="button"
              className="text-[10px] font-bold text-white/20 uppercase tracking-widest hover:text-white transition-colors"
            >
              Recover Password
            </button>
          </div>

          <button className="w-full bg-white text-primary py-6 font-display text-2xl uppercase skew-x-[-6deg] hover:bg-secondary transition-all active:translate-y-1">
            {isLogin ? 'Authorize' : 'Register'}
          </button>
        </form>

        <div className="mt-16 pt-12 border-t border-white/5 text-center">
          <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">
            {isLogin ? "No identity recorded?" : "Existing operative?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-4 text-secondary hover:text-white transition-colors underline underline-offset-8"
            >
              {isLogin ? 'REGISTER' : 'LOGIN'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
