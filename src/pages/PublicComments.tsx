import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, User, LogIn, Loader2, MessageCircle } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { commentService } from '../services/firebaseService';
import { Link } from 'react-router-dom';

export default function PublicComments() {
  const { user } = useAuth();
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = commentService.getComments(
      (data) => {
        setComments(data);
        setError(null);
      },
      (err) => {
        setError("কমেন্টগুলো লোড করতে সমস্যা হচ্ছে। (Failed to load comments.)");
        console.error(err);
      }
    );
    return () => {
      if (typeof unsubscribe === 'function') (unsubscribe as any)();
    };
  }, []);

  const handleSubmit = async () => {
    if (!newComment.trim() || !user) return;
    setIsSubmitting(true);
    try {
      await commentService.addComment(newComment, user.displayName || 'Anonymous', user.photoURL || '');
      setNewComment('');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (timestamp: any) => {
    if (!timestamp) return 'Just now';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="pt-32 pb-24 bg-primary min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24 space-y-8">
          <div className="flex items-center justify-center gap-4">
            <MessageCircle className="text-secondary" size={32} />
            <span className="text-secondary font-bold tracking-[0.4em] uppercase text-[10px]">Community Log</span>
          </div>
          <h1 className="text-6xl md:text-9xl text-white font-display uppercase tracking-tighter skew-x-[-6deg] leading-none">
            Public <br/><span className="text-secondary italic">Voices</span>.
          </h1>
          <p className="text-white/40 max-w-xl mx-auto font-medium text-lg leading-relaxed">
            Share your thoughts, prayers, and feedback with our global mission community. Your signature matters.
          </p>
        </div>

        {error && (
          <div className="mb-8 p-6 border border-red-500/20 bg-red-500/5 text-red-500 text-[10px] font-bold uppercase tracking-widest text-center skew-x-[-3deg]">
            {error}
          </div>
        )}

        {/* Comment Input */}
        <div className="bg-white/[0.02] border border-white/5 p-10 mb-16 skew-x-[-2deg] relative group overflow-hidden">
          {!user && (
            <div className="absolute inset-0 bg-primary/90 backdrop-blur-md z-10 flex flex-col items-center justify-center gap-6 text-center p-8">
              <LogIn className="text-secondary" size={32} />
              <div className="space-y-2">
                <h3 className="text-3xl font-display text-white uppercase">ENLIST TO SPEAK</h3>
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Please authorize to submit a public record.</p>
              </div>
              <Link to="/login">
                <button className="bg-white text-primary px-10 py-4 font-display text-xl uppercase skew-x-[-6deg] hover:bg-secondary transition-all">
                  Authorize Account
                </button>
              </Link>
            </div>
          )}
          
          <div className="flex gap-8">
            <div className="hidden sm:flex w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden skew-x-[-6deg]">
              {user?.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt="" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale" 
                />
              ) : (
                <User className="text-white/20" size={24} />
              )}
            </div>
            <div className="flex-grow space-y-6">
              <div className="relative">
                <textarea 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="LOG YOUR THOUGHTS..."
                  disabled={isSubmitting}
                  className="w-full h-40 bg-transparent border-b border-white/10 focus:border-secondary outline-none transition-all text-white font-bold uppercase text-xs tracking-widest p-4 resize-none"
                ></textarea>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[8px] font-bold uppercase tracking-widest text-white/20">Authorized by {user?.displayName || 'GUEST'}</span>
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting || !newComment.trim()}
                  className="bg-white text-primary px-10 py-4 font-display text-xl uppercase skew-x-[-6deg] flex items-center gap-3 disabled:opacity-50 hover:bg-secondary transition-all"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : 'Submit Record'} <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Comment List */}
        <div className="space-y-8">
          <AnimatePresence>
            {comments.map((comment, i) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/[0.02] border border-white/5 p-8 flex gap-8 skew-x-[-1deg] group hover:bg-white/[0.05] transition-all"
              >
                <div className="hidden sm:flex w-14 h-14 bg-white/5 border border-white/5 flex items-center justify-center shrink-0 overflow-hidden">
                  {comment.userAvatar ? (
                    <img 
                      src={comment.userAvatar} 
                      alt="" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all shadow-inner" 
                    />
                  ) : (
                    <User className="text-white/10" size={20} />
                  )}
                </div>
                <div className="space-y-4 flex-grow">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-xl text-white uppercase tracking-tight">{comment.userName}</span>
                      {comment.isStaff && (
                        <span className="text-[8px] uppercase font-bold text-secondary tracking-widest border border-secondary/20 px-2 py-0.5">Staff</span>
                      )}
                    </div>
                    <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest">{formatTime(comment.createdAt)}</span>
                  </div>
                  <p className="text-white/60 text-xs font-bold uppercase tracking-[0.1em] leading-loose">{comment.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {comments.length === 0 && (
            <div className="py-24 text-center border border-dashed border-white/10 skew-x-[-3deg]">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">The log is currently empty</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
