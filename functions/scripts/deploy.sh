# !/bin/bash
# Deploy Firebase Functions

# Build Cloud Functions
npm run build;

# Start Firebase Emulators
firebase emulators:start
