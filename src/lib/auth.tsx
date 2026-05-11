import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  TwitterAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  signOut, 
  User
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  serverTimestamp, 
  collection, 
  query, 
  where, 
  limit, 
  getDocs 
} from 'firebase/firestore';
import { auth, db } from './firebase';

export type UserRole = 'super-admin' | 'sub-admin' | 'user';

// This email is always treated as super-admin, no matter what
export const SUPER_ADMIN_EMAIL = 'abirwebstudio@gmail.com';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  loginWithTwitter: () => Promise<void>;
  loginWithLinkedIn: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser); // Set user immediately for basic UI
        try {
          // Wrap database fetch in a promise with timeout to prevent hanging the whole app
          const hydrateProfile = async () => {
            const userRef = doc(db, 'users', authUser.uid);
            const userSnap = await getDoc(userRef);
            
            // Hardcoded super-admin: this email is ALWAYS super-admin
            const isSuperAdminEmail = authUser.email === SUPER_ADMIN_EMAIL;

            if (userSnap.exists()) {
              const currentRole = userSnap.data().role as UserRole;
              // If this is the super-admin email but somehow stored with wrong role, fix it
              if (isSuperAdminEmail && currentRole !== 'super-admin') {
                await setDoc(userRef, { ...userSnap.data(), role: 'super-admin' }, { merge: true });
                setRole('super-admin');
              } else {
                setRole(currentRole);
              }
            } else {
              // New user — assign role
              let assignedRole: UserRole = 'user';
              
              if (isSuperAdminEmail) {
                // Hardcoded super-admin email always gets super-admin
                assignedRole = 'super-admin';
              } else {
                // For other users, check if collection is empty (first ever user)
                try {
                  const q = query(collection(db, 'users'), where('role', 'in', ['super-admin', 'sub-admin', 'user']), limit(1));
                  const existingSnap = await getDocs(q);
                  assignedRole = existingSnap.empty ? 'super-admin' : 'user';
                } catch (err) {
                  console.warn("First user check failed", err);
                }
              }
              
              await setDoc(userRef, {
                email: authUser.email,
                displayName: authUser.displayName,
                photoURL: authUser.photoURL,
                role: assignedRole,
                createdAt: serverTimestamp()
              });
              setRole(assignedRole);
            }
          };

          // Try to hydrate but don't block for more than 5 seconds
          await Promise.race([
            hydrateProfile(),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
          ]).catch(err => console.warn("Dabase hydration took too long or failed", err));

        } catch (error) {
          console.error("Auth hydration error:", error);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const loginWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const loginWithTwitter = async () => {
    const provider = new TwitterAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const loginWithLinkedIn = async () => {
    const provider = new OAuthProvider('linkedin.com');
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      role, 
      loading, 
      loginWithGoogle, 
      loginWithFacebook, 
      loginWithTwitter, 
      loginWithLinkedIn, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
