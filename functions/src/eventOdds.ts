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
import {db} from "./firebase";


// Define the Cloud Function
export const getEventOdds = onRequest(async (request, response) => {
  try {
    logger.info("Retrieving Event Odds Data");

    // Build and execute the query
    db.collection("sports").get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          const eventOddsData = snapshot.docs.map((doc) => doc.data());
          response.json({"data": eventOddsData});
        } else {
          logger.warn("No such document!");
        }
      })
      .catch((error) => {
        logger.error("Error getting document:", error);
      });
  } catch (error) {
    logger.error("Error creating user:", error);
    response.status(500).send("Internal Server Error");
  }
});
