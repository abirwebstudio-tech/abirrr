import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from '@firebase/rules-unit-testing';
import { readFileSync } from 'fs';
import { describe, it, beforeAll, beforeEach } from 'vitest'; // Assuming vitest is used or can be run via tsx

/**
 * FIREBASE RULES TEST SUITE
 * Verifying the Dirty Dozen threat matrix.
 */

const PROJECT_ID = 'gen-lang-client-0246547121';

describe('Alpha Omega Firestore Security Rules', () => {
  let testEnv: any;

  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: PROJECT_ID,
      firestore: {
        rules: readFileSync('DRAFT_firestore.rules', 'utf8'),
        host: '127.0.0.1',
        port: 8080,
      },
    });
  });

  beforeEach(async () => {
    await testEnv.clearFirestore();
  });

  it('T1: Should block shadow update (AffectedKeys)', async () => {
    const alice = testEnv.authenticatedContext('alice', { email_verified: true });
    await assertSucceeds(alice.storage().doc('comments/c1').set({
      userId: 'alice',
      userName: 'Alice',
      content: 'Hello',
      createdAt: new Date(),
    }));
    // Try update with extra field
    await assertFails(alice.storage().doc('comments/c1').update({
      isAdmin: true
    }));
  });

  it('T2: Should block ID spoofing', async () => {
    const malicious = testEnv.authenticatedContext('hacker', { email_verified: true });
    await assertFails(malicious.storage().doc('comments/c1').set({
      userId: 'victim',
      userName: 'Victim',
      content: 'I am hacked',
      createdAt: new Date(),
    }));
  });

  it('T7: Should block unverified users from writing', async () => {
    const unverified = testEnv.authenticatedContext('bob', { email_verified: false });
    await assertFails(unverified.storage().doc('comments/c1').set({
      userId: 'bob',
      userName: 'Bob',
      content: 'Testing',
      createdAt: new Date(),
    }));
  });

  it('T12: Should block guest write access to comments', async () => {
    const guest = testEnv.unauthenticatedContext();
    await assertFails(guest.storage().doc('comments/c1').set({
      userId: 'none',
      userName: 'None',
      content: 'Guest',
      createdAt: new Date(),
    }));
  });

  it('T6: Should block type poisoning in donations', async () => {
    const donor = testEnv.authenticatedContext('donor');
    await assertFails(donor.storage().doc('donations/d1').set({
      amount: "1000", // String instead of number
      type: 'monthly',
      createdAt: new Date()
    }));
  });
});
