# Fantasy Cloud Functions

Firebase Cloud Functions that query Firestore for FantasyAce. The project contains 4 main cloud functions written in TypeScript that interact with Firestore collections for sports data, events, event odds, and account quotas.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Prerequisites and Setup
- **Node.js**: Project requires Node.js 22 (specified in package.json), but works with Node.js 20 with warnings
- **Firebase CLI**: Installation is problematic globally. Use npx or install locally in functions directory
- **Working Directory**: Always work from `/functions` subdirectory for builds and development

### Bootstrap and Build Process
1. Navigate to functions directory: `cd /home/runner/work/fantasy-cloud-functions/fantasy-cloud-functions/functions`
2. Install dependencies: `npm install` -- takes ~30 seconds. NEVER CANCEL. Set timeout to 120+ seconds.
3. Build the project: `npm run build` -- takes <5 seconds. Uses TypeScript compiler (tsc).
4. Lint code: `npm run lint` -- takes <10 seconds. Uses ESLint with TypeScript support.
5. Format code: `npm run format` -- takes ~10 seconds. Runs Prettier then ESLint --fix.

### Build Commands Validation
All commands have been validated and work correctly:
- `npm install`: 24 seconds actual time, shows Node.js version warning but succeeds
- `npm run build`: <5 seconds, compiles TypeScript to JavaScript in `/lib` directory
- `npm run lint`: <10 seconds, ESLint passes with TypeScript version warning
- `npm run format`: ~10 seconds, Prettier + ESLint fix both succeed

### Development Workflow
- **ALWAYS** run `npm run build` after making TypeScript changes
- **ALWAYS** run `npm run format` before committing (CI will fail otherwise)
- **ALWAYS** run `npm run lint` to check for issues
- Built files are generated in `/functions/lib/` directory
- Source files are in `/functions/src/` directory

### Firebase CLI Limitations
- **CRITICAL**: Global Firebase CLI installation hangs and is unreliable
- Firebase emulator commands (`npm run serve`, `npm run shell`) require Firebase CLI
- Deployment commands (`npm run deploy`, `npm run logs`) require Firebase CLI and authentication
- **WORKAROUND**: Focus on TypeScript development, building, and testing without emulator for validation

## Validation and Testing

### Manual Validation Steps
After making changes to cloud functions:
1. Run `npm run build` to ensure TypeScript compiles without errors
2. Check that output files are generated in `/functions/lib/`
3. Run `node lib/index.js` to verify the compiled code can execute
4. Examine the function exports in `lib/index.js` to ensure proper structure

### Code Quality Validation
- **CRITICAL**: Always run `npm run format` before finalizing changes
- Run `npm run lint` to catch TypeScript and ESLint issues
- Both commands must pass for CI builds to succeed

### Expected Warnings (Normal and Safe to Ignore)
- Node.js version warnings when using Node 20 instead of Node 22
- TypeScript version warnings from ESLint (5.9.2 vs supported <5.2.0)
- Deprecated package warnings during npm install

## Project Structure and Key Files

### Source Code Organization
```
/functions/src/
├── index.ts          # Main exports and global Firebase function settings
├── firebase.ts       # Firebase Admin initialization and Firestore client
├── account.ts        # getAccountQuota function - queries account/requests document
├── events.ts         # getEvents function - paginated events query with filtering
├── eventOdds.ts      # getEventOdds function - event odds data queries
└── sports.ts         # getSports function - sports data queries
```

### Configuration Files
```
/functions/
├── package.json      # Dependencies, scripts, and Node.js 22 requirement
├── tsconfig.json     # TypeScript compilation settings
├── .eslintrc.js      # ESLint configuration with Google style guide
└── .gitignore        # Excludes node_modules, lib/, logs

/                     # Project root
├── firebase.json     # Firebase project configuration with build/lint predeploy
├── .firebaserc       # Firebase project ID (odds-data-poc-1747866680)
└── README.md         # Basic project description
```

### Generated Files (After Build)
```
/functions/lib/       # Generated JavaScript files and source maps
├── index.js          # Compiled main exports
├── firebase.js       # Compiled Firebase configuration
├── account.js        # Compiled account function
├── events.js         # Compiled events function
├── eventOdds.js      # Compiled event odds function
└── sports.js         # Compiled sports function
```

## Cloud Functions Overview

### Function Details
1. **getAccountQuota**: HTTP trigger that queries `account/requests` Firestore document
2. **getEvents**: HTTP trigger with pagination, filtering by sport_key and commence_time
3. **getEventOdds**: HTTP trigger for retrieving event betting odds data
4. **getSports**: HTTP trigger for retrieving available sports data

### Common Development Patterns
- All functions use `onRequest` from `firebase-functions/https`
- Firestore client imported from `./firebase.ts`
- Consistent error handling with logger from `firebase-functions/v1`
- Functions return JSON responses with structured data

## Common Commands Reference

### Essential Development Commands
```bash
# Navigate to functions directory (ALWAYS required first)
cd /home/runner/work/fantasy-cloud-functions/fantasy-cloud-functions/functions

# Install dependencies (run once or after package.json changes)
npm install  # ~30 seconds, NEVER CANCEL, timeout 120+ seconds

# Build TypeScript (run after any source changes)
npm run build  # <5 seconds

# Check code quality
npm run lint  # <10 seconds
npm run format  # ~10 seconds, REQUIRED before commits

# Alternative build commands
npm run build:watch  # Continuous compilation during development
```

### File Locations for Quick Reference
- **Main entry point**: `/functions/src/index.ts`
- **Function implementations**: `/functions/src/*.ts`
- **Compiled output**: `/functions/lib/`
- **Dependencies**: `/functions/package.json`
- **TypeScript config**: `/functions/tsconfig.json`
- **Linting config**: `/functions/.eslintrc.js`

## Troubleshooting

### Known Issues and Solutions
1. **Node.js version warning**: Expected behavior, project works with Node 20 despite requiring Node 22
2. **Firebase CLI installation hangs**: Avoid global installation, focus on TypeScript development
3. **TypeScript/ESLint version warning**: Expected behavior, linting still works correctly
4. **Long npm install times**: Normal, packages include Firebase and TypeScript tooling

### Emergency Commands
- **Revert build**: `rm -rf /functions/lib` then `npm run build`
- **Clean install**: `rm -rf /functions/node_modules` then `npm install`
- **Check syntax only**: `npx tsc --noEmit` (validates TypeScript without generating files)

## CRITICAL Timing and Timeout Information

**NEVER CANCEL long-running commands. Use these exact timeout values:**

- `npm install`: 120+ seconds timeout (actual: ~24 seconds)
- `npm run build`: 30+ seconds timeout (actual: <5 seconds)  
- `npm run lint`: 30+ seconds timeout (actual: <10 seconds)
- `npm run format`: 30+ seconds timeout (actual: ~10 seconds)

**NEVER CANCEL**: All npm commands may appear to hang but are working. Always wait for completion.