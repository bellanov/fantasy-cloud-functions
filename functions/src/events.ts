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
export const getEvents = onRequest(async (request, response) => {
  try {
    logger.info("Retrieving Events Data");

    // Get limit from query params, default to 10
    const limit = parseInt(request.query.limit as string) || 10;
    logger.info(`Limit set to: ${limit}`);

    // Build and execute the query
    db.collection("events").limit(limit).get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          const eventsData = snapshot.docs.map((doc) => doc.data());

          /** Start Pagination
          * 1. Get the last item from the events collection
          * 2. Store the commence_time in a variable
          * 3. Use this variable as the startAfter future queries
          */
         // Get the last document for the next page token
          const lastDoc = snapshot.docs[snapshot.docs.length - 1];
          const commenceTime = lastDoc.data().commence_time;
          response.json({"data": eventsData, "nextPageToken": commenceTime, "hasMore": snapshot.size === limit});
        } else {
          logger.warn("No such documents!");
        }
      })
      .catch((error) => {
        logger.error("Error getting document:", error);
      });
  } catch (error) {
    logger.error("Error retrieving events:", error);
    response.status(500).send("Internal Server Error");
  }
});


