# Security Specification for Alpha Omega Inter Church Trust

## 1. Data Invariants
- **Public Comments**: 
  - Must be created by an authenticated and verified user.
  - `userId` must match the authenticated user UID.
  - `content` must be between 1 and 2000 characters.
  - `createdAt` must be the server timestamp.
  - `userName` must be a string (max 100 chars).
- **Donations**:
  - `userId` must match the authenticated user UID if logged in.
  - `amount` must be a positive number.
  - `type` must be either 'monthly' or 'one-time'.
  - `createdAt` must be the server timestamp.

## 2. The Dirty Dozen (Threat Matrix)
| ID | Threat | Payload | Expected Result |
|----|--------|---------|-----------------|
| T1 | Shadow Update | `{ content: "Hi", isAdmin: true }` | PERMISSION_DENIED (AffectedKeys) |
| T2 | ID Spoofing | `{ userId: "victim_uid", content: "..." }` | PERMISSION_DENIED (Identity Guard) |
| T3 | PII Leak | `get(/donations/other_user_doc)` | PERMISSION_DENIED (Privacy Guard) |
| T4 | Resource Poisoning | Doc ID with 10KB junk chars | PERMISSION_DENIED (isValidId) |
| T5 | Immortal Field | `update: { createdAt: "2000-01-01" }` | PERMISSION_DENIED (Immutability) |
| T6 | Type Poisoning | `{ amount: "large_string" }` | PERMISSION_DENIED (Type Check) |
| T7 | Unverified Auth | User with `email_verified: false` | PERMISSION_DENIED (Verified Guard) |
| T8 | Query Scrape | List all donations without UID filter | PERMISSION_DENIED (Query Enforcer) |
| T9 | Logic Shortcut | `update: { amount: 99999 }` | PERMISSION_DENIED (Read-Only fields) |
| T10 | System Spoof | User writing to `/system_config` | PERMISSION_DENIED (Catch-all Deny) |
| T11 | Massive Payload | `content` with 1MB of text | PERMISSION_DENIED (Size Guard) |
| T12 | Guest Write | Writing comment without request.auth | PERMISSION_DENIED (Auth Guard) |

## 3. Test Runner (Draft Plan)
The `firestore.rules.test.ts` will use `@firebase/rules-unit-testing` to verify these 12 scenarios.
