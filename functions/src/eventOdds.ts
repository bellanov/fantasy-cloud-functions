/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/https";
import {logger} from "firebase-functions/v1";

export const getEventOdds = onRequest((request, response) => {
  try {
    response.send("Hello from Event Odds!!!");
  } catch (error) {
    logger.error("Error getting event odds:", error);
    response.status(500).json({error: "Internal server error"});
  }
});
