import { 
  collection, 
  addDoc, 
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs, 
  query, 
  orderBy, 
  serverTimestamp, 
  doc,
  DocumentData,
  onSnapshot,
  where
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null, shouldThrow = true) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  if (shouldThrow) throw new Error(JSON.stringify(errInfo));
  return errInfo;
}

// Users Service (Admin Only)
export const userService = {
  getUsers(callback: (users: any[]) => void, onError?: (error: any) => void) {
    const path = 'users';
    try {
      const q = query(collection(db, path), orderBy('createdAt', 'desc'));
      return onSnapshot(q, (snapshot) => {
        const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(users);
      }, (error) => {
        const errInfo = handleFirestoreError(error, OperationType.LIST, path, false);
        if (onError) onError(errInfo);
      });
    } catch (error) {
      const errInfo = handleFirestoreError(error, OperationType.LIST, path, false);
      if (onError) onError(errInfo);
    }
  },

  async updateUserRole(userId: string, role: 'super-admin' | 'sub-admin' | 'user') {
    const path = `users/${userId}`;
    try {
      await updateDoc(doc(db, 'users', userId), { role });
      await logService.addLog('Update User Role', `Changed role of ${userId} to ${role}`);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  async deleteUser(userId: string) {
    const path = `users/${userId}`;
    try {
      await deleteDoc(doc(db, 'users', userId));
      await logService.addLog('Delete User', `Deleted user account: ${userId}`);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  }
};

// Admin Logs Service
export const logService = {
  async addLog(action: string, details: string) {
    const path = 'logs';
    if (!auth.currentUser) return;
    try {
      await addDoc(collection(db, path), {
        adminId: auth.currentUser.uid,
        adminName: auth.currentUser.displayName || auth.currentUser.email || 'Admin',
        action,
        details,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path, false);
    }
  },

  getLogs(callback: (logs: any[]) => void, onError?: (error: any) => void) {
    const path = 'logs';
    try {
      const q = query(collection(db, path), orderBy('timestamp', 'desc'));
      return onSnapshot(q, (snapshot) => {
        const logs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(logs);
      }, (error) => {
        const errInfo = handleFirestoreError(error, OperationType.LIST, path, false);
        if (onError) onError(errInfo);
      });
    } catch (error) {
      const errInfo = handleFirestoreError(error, OperationType.LIST, path, false);
      if (onError) onError(errInfo);
    }
  }
};

// Comments Service
export const commentService = {
  getComments(callback: (comments: any[]) => void, onError?: (error: any) => void) {
    const path = 'comments';
    try {
      const q = query(collection(db, path), orderBy('createdAt', 'desc'));
      return onSnapshot(q, (snapshot) => {
        const comments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(comments);
      }, (error) => {
        const errInfo = handleFirestoreError(error, OperationType.LIST, path, false);
        if (onError) onError(errInfo);
      });
    } catch (error) {
      const errInfo = handleFirestoreError(error, OperationType.LIST, path, false);
      if (onError) onError(errInfo);
    }
  },

  async addComment(content: string, userName: string, userAvatar?: string) {
    const path = 'comments';
    if (!auth.currentUser) throw new Error("Must be logged in to comment");
    
    try {
      const commentId = `comment_${Date.now()}_${auth.currentUser.uid.slice(0, 5)}`;
      await setDoc(doc(db, path, commentId), {
        userId: auth.currentUser.uid,
        userName,
        userAvatar: userAvatar || '',
        content,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  async deleteComment(commentId: string) {
    const path = `comments/${commentId}`;
    try {
      await deleteDoc(doc(db, 'comments', commentId));
      await logService.addLog('Delete Comment', `Deleted public voice ID: ${commentId}`);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  },

  getUserComments(userId: string, callback: (comments: any[]) => void, onError?: (error: any) => void) {
    const path = 'comments';
    try {
      const q = query(collection(db, path), where('userId', '==', userId), orderBy('createdAt', 'desc'));
      return onSnapshot(q, (snapshot) => {
        const comments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(comments);
      }, (error) => {
        const errInfo = handleFirestoreError(error, OperationType.LIST, path, false);
        if (onError) onError(errInfo);
      });
    } catch (error) {
      const errInfo = handleFirestoreError(error, OperationType.LIST, path, false);
      if (onError) onError(errInfo);
    }
  }
};

// Donations Service
export const donationService = {
  async recordDonation(amount: number, type: 'monthly' | 'one-time', method: string) {
    const path = 'donations';
    try {
      const donationId = `don_${Date.now()}`;
      await setDoc(doc(db, path, donationId), {
        userId: auth.currentUser?.uid || 'guest',
        amount,
        type,
        method,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  getAllDonations(callback: (donations: any[]) => void, onError?: (error: any) => void) {
    const path = 'donations';
    try {
      const q = query(collection(db, path), orderBy('createdAt', 'desc'));
      return onSnapshot(q, (snapshot) => {
        const donations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(donations);
      }, (error) => {
        const errInfo = handleFirestoreError(error, OperationType.LIST, path, false);
        if (onError) onError(errInfo);
      });
    } catch (error) {
      const errInfo = handleFirestoreError(error, OperationType.LIST, path, false);
      if (onError) onError(errInfo);
    }
  },

  async deleteDonation(donationId: string) {
    const path = `donations/${donationId}`;
    try {
      await deleteDoc(doc(db, 'donations', donationId));
      await logService.addLog('Delete Donation', `Deleted donation record: ${donationId}`);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  },

  getUserDonations(userId: string, callback: (donations: any[]) => void, onError?: (error: any) => void) {
    const path = 'donations';
    try {
      const q = query(collection(db, path), where('userId', '==', userId), orderBy('createdAt', 'desc'));
      return onSnapshot(q, (snapshot) => {
        const donations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(donations);
      }, (error) => {
        const errInfo = handleFirestoreError(error, OperationType.LIST, path, false);
        if (onError) onError(errInfo);
      });
    } catch (error) {
      const errInfo = handleFirestoreError(error, OperationType.LIST, path, false);
      if (onError) onError(errInfo);
    }
  }
};

// Volunteers Service
export const volunteerService = {
  async submitApplication(data: { name: string, email: string, phone: string, skills: string }) {
    const path = 'volunteers';
    try {
      await addDoc(collection(db, path), {
        ...data,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  getVolunteers(callback: (volunteers: any[]) => void, onError?: (error: any) => void) {
    const path = 'volunteers';
    try {
      const q = query(collection(db, path), orderBy('createdAt', 'desc'));
      return onSnapshot(q, (snapshot) => {
        const volunteers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(volunteers);
      }, (error) => {
        const errInfo = handleFirestoreError(error, OperationType.LIST, path, false);
        if (onError) onError(errInfo);
      });
    } catch (error) {
      const errInfo = handleFirestoreError(error, OperationType.LIST, path, false);
      if (onError) onError(errInfo);
    }
  },

  async deleteVolunteer(id: string) {
    const path = `volunteers/${id}`;
    try {
      await deleteDoc(doc(db, 'volunteers', id));
      await logService.addLog('Delete Volunteer', `Deleted volunteer application: ${id}`);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  }
};

// Newsletter Service
export const newsletterService = {
  async subscribe(email: string) {
    const path = 'newsletter';
    try {
      await addDoc(collection(db, path), {
        email,
        subscribedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  getSubscribers(callback: (subscribers: any[]) => void, onError?: (error: any) => void) {
    const path = 'newsletter';
    try {
      const q = query(collection(db, path), orderBy('subscribedAt', 'desc'));
      return onSnapshot(q, (snapshot) => {
        const subscribers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(subscribers);
      }, (error) => {
        const errInfo = handleFirestoreError(error, OperationType.LIST, path, false);
        if (onError) onError(errInfo);
      });
    } catch (error) {
      const errInfo = handleFirestoreError(error, OperationType.LIST, path, false);
      if (onError) onError(errInfo);
    }
  },

  async deleteSubscriber(id: string) {
    const path = `newsletter/${id}`;
    try {
      await deleteDoc(doc(db, 'newsletter', id));
      await logService.addLog('Remove Subscriber', `Removed email from newsletter: ${id}`);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  }
};

// Report Service
export const reportService = {
  async addReport(data: { title: string, date: string, tag: string, desc: string, content: string }) {
    const path = 'reports';
    if (!auth.currentUser) throw new Error("Must be logged in to add reports");
    
    try {
      await addDoc(collection(db, path), {
        ...data,
        author: auth.currentUser.displayName || auth.currentUser.email || 'Admin',
        createdAt: serverTimestamp(),
      });
      await logService.addLog('Add Impact Report', `Created new report: ${data.title}`);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  getReports(callback: (reports: any[]) => void, onError?: (error: any) => void) {
    const path = 'reports';
    try {
      const q = query(collection(db, path), orderBy('createdAt', 'desc'));
      return onSnapshot(q, (snapshot) => {
        const reports = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(reports);
      }, (error) => {
        const errInfo = handleFirestoreError(error, OperationType.LIST, path, false);
        if (onError) onError(errInfo);
      });
    } catch (error) {
      const errInfo = handleFirestoreError(error, OperationType.LIST, path, false);
      if (onError) onError(errInfo);
    }
  },

  async deleteReport(id: string) {
    const path = `reports/${id}`;
    try {
      await deleteDoc(doc(db, 'reports', id));
      await logService.addLog('Delete Report', `Removed impact report ID: ${id}`);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  }
};
