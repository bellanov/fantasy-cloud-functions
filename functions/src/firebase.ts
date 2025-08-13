/**
 * Initialize Firebase Admin
 * This enables the initialization of various clients (i.e., Firestore)
 */
import * as admin from "firebase-admin";

// Initialize Firebase Admin
admin.initializeApp();

// Firestore Client
export const db = admin.firestore();
