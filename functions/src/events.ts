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

export const getEvents = onRequest((request, response) => {
  try {
    response.send("Hello from Events!!!");
  } catch (error) {
    logger.error("Error getting events:", error);
    response.status(500).json({error: "Internal server error"});
  }
});
