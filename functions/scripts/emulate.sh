# !/bin/bash
# Emulate Firebase Functionality

echo "Starting Firebase Emulators"

# Build Cloud Functions
npm run build

# Start Firebase Emulators
firebase emulators:start
