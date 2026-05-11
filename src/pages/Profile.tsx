import { useAuth } from '../lib/auth';
import { motion } from 'motion/react';
import { User, Shield, Mail, Calendar, Settings, LogOut, ArrowRight, Heart, MessageSquare } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { donationService, commentService } from '../services/firebaseService';

export default function Profile() {
  const { user, role, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [userDonations, setUserDonations] = useState<any[]>([]);
  const [userComments, setUserComments] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user?.uid) {
      const unsubDonations = donationService.getUserDonations(user.uid, setUserDonations);
      const unsubComments = commentService.getUserComments(user.uid, setUserComments);
      return () => {
        if (typeof unsubDonations === 'function') unsubDonations();
        if (typeof unsubComments === 'function') unsubComments();
      };
    }
  }, [user]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className="min-h-screen bg-primary pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="relative mb-24">
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-secondary/5 rounded-full blur-3xl" />
          
          <div className="flex flex-col md:flex-row gap-12 items-center md:items-end">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative group"
            >
              <div className="w-48 h-48 border border-white/10 p-2 skew-x-[-3deg] overflow-hidden group-hover:border-secondary transition-colors duration-500">
                <div className="w-full h-full overflow-hidden">
                  <img 
                    src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`} 
                    alt={user.displayName || 'User'} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-secondary flex items-center justify-center skew-x-[12deg] shadow-2xl">
                <User size={20} className="text-primary -skew-x-[12deg]" />
              </div>
            </motion.div>

            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="space-y-1">
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-secondary text-[10px] font-bold uppercase tracking-[0.4em] block"
                >
                  Member Profile
                </motion.span>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-7xl font-display text-white uppercase leading-none"
                >
                  {user.displayName || 'Mission Operative'}
                </motion.h1>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 skew-x-[-6deg]">
                  <Shield size={14} className={`-skew-x-[-6deg] ${role === 'super-admin' ? 'text-yellow-400' : role === 'sub-admin' ? 'text-blue-400' : 'text-secondary'}`} />
                  <span className={`text-[10px] font-bold uppercase tracking-widest -skew-x-[-6deg] ${role === 'super-admin' ? 'text-yellow-400' : role === 'sub-admin' ? 'text-blue-400' : 'text-white'}`}>
                    {role === 'super-admin' ? '★ Super Admin' : role === 'sub-admin' ? '◈ Sub Admin' : '● User'}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 skew-x-[-6deg]">
                  <Calendar size={14} className="text-secondary -skew-x-[-6deg]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white -skew-x-[-6deg]">
                    Joined: {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Mission Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/[0.02] border border-white/5 p-8 skew-x-[-3deg] group hover:border-secondary transition-all">
                <Heart className="text-secondary mb-4" size={24} />
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Total Impact</h3>
                <p className="text-4xl font-display text-white">
                  ${userDonations.reduce((acc, d) => acc + d.amount, 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-white/[0.02] border border-white/5 p-8 skew-x-[-3deg] group hover:border-secondary transition-all">
                <MessageSquare className="text-secondary mb-4" size={24} />
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Voices Shared</h3>
                <p className="text-4xl font-display text-white">{userComments.length}</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="space-y-6">
              <h2 className="text-white font-display text-2xl uppercase tracking-tight flex items-center gap-3">
                <Settings size={20} className="text-secondary" />
                Recent Operations
              </h2>
              <div className="space-y-4">
                {userDonations.length === 0 && userComments.length === 0 ? (
                  <div className="py-12 border border-dashed border-white/10 text-center skew-x-[-2deg]">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Initial mission phase - No activity logs</span>
                  </div>
                ) : (
                  <>
                    {userDonations.slice(0, 3).map((d) => (
                      <div key={d.id} className="p-6 bg-white/[0.02] border border-white/5 skew-x-[-1deg] flex justify-between items-center group">
                        <div className="flex items-center gap-4">
                          <Heart size={16} className="text-secondary" />
                          <div>
                            <p className="text-white text-xs font-bold uppercase tracking-widest">Donation Executed</p>
                            <p className="text-[10px] text-white/20 font-bold uppercase">{d.createdAt?.toDate?.()?.toLocaleDateString()}</p>
                          </div>
                        </div>
                        <span className="text-xl font-display text-white group-hover:text-secondary transition-colors">${d.amount}</span>
                      </div>
                    ))}
                    {userComments.slice(0, 3).map((c) => (
                      <div key={c.id} className="p-6 bg-white/[0.02] border border-white/5 skew-x-[-1deg] flex justify-between items-center group">
                        <div className="flex items-center gap-4">
                          <MessageSquare size={16} className="text-secondary" />
                          <div>
                            <p className="text-white text-xs font-bold uppercase tracking-widest">Voice Logged</p>
                            <p className="text-[10px] text-white/20 font-bold uppercase tracking-tight truncate max-w-[200px]">{c.content}</p>
                          </div>
                        </div>
                        <span className="text-[10px] text-white/20 font-bold uppercase">{c.createdAt?.toDate?.()?.toLocaleDateString()}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-6">
            <div className="bg-white/[0.02] border border-white/5 p-8 skew-x-[-2deg] space-y-6">
              <div className="space-y-1">
                <h3 className="text-white font-display text-lg uppercase tracking-tight">Security Clearing</h3>
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-loose">Managed by Alpha Omega Trust Core Protocol</p>
              </div>
              
              <div className="space-y-3 pt-4 border-t border-white/5">
                <div className="flex items-center gap-4 text-white/40 group">
                  <Mail size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest truncate">{user.email}</span>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                {(role === 'super-admin' || role === 'sub-admin') && (
                  <Link 
                    to="/admin"
                    className="w-full bg-white text-primary p-4 skew-x-[-6deg] font-display text-lg uppercase flex items-center justify-center gap-2 hover:bg-secondary transition-all"
                  >
                    Control Panel <ArrowRight size={18} />
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="w-full border border-white/10 text-white/40 p-4 skew-x-[-6deg] font-bold uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                >
                  Execute Termination (Logout) <LogOut size={16} />
                </button>
              </div>
            </div>

            <div className="p-8 border border-white/5 bg-secondary/[0.03] skew-x-[2deg]">
              <p className="text-[10px] text-secondary font-bold uppercase tracking-[0.2em] leading-relaxed italic text-center">
                "Service to humanity is the highest form of worship. Your logs reflect your commitment to the cause."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
