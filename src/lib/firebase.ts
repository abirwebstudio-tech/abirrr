import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDocFromServer, 
  initializeFirestore,
  type FirestoreSettings
} from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// Initialize Firestore with specific settings to resolve connectivity issues
const firestoreSettings: any = {
  experimentalForceLongPolling: true,
};

// Use initializeFirestore to apply the settings
export const db = initializeFirestore(app, firestoreSettings, firebaseConfig.firestoreDatabaseId);

export const auth = getAuth(app);

// Initialize Analytics if supported
export const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

// Connectivity Test
async function testConnection() {
  console.log(`Checking Firestore connection for project: ${firebaseConfig.projectId}...`);
  try {
    // Attempting a read to verify connection
    await getDocFromServer(doc(db, 'system', 'connection-test'));
    console.log("Firebase connection established successfully.");
  } catch (error: any) {
    if (error?.message?.includes('the client is offline') || error?.code === 'unavailable') {
      console.error("FIREBASE ERROR: Could not reach backend. Possible causes:\n1. Firestore is not enabled in your project\n2. Database ID is incorrect or database doesn't exist\n3. Network connectivity issues (e.g. firewall/proxy)\n4. Project ID is incorrect\n\nTry enabling experimentalForceLongPolling in /src/lib/firebase.ts if you continue to see this.");
    } else if (error?.code === 'permission-denied') {
      console.warn("Firestore connected, but 'system' collection is restricted (this is expected if rules are deployed).");
    } else {
      console.error("Firestore connectivity error:", error.code, error.message);
    }
  }
}

// testConnection(); // Commented out to prevent blocking issues at startup if connectivity is poor
