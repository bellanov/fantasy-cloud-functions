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
    let limit = parseInt(request.query.limit as string) || 10;
    // Get current UTC timestamp
    const nowUtc = new Date().toISOString();
    // Get the next iteration cursor
    let startAfterId = request.query.startAfter as string;

    logger.info(`Current UTC timestamp: ${nowUtc}`);
    logger.info(`Limit set to: ${limit}`);
    logger.info(`Start after set to: ${startAfterId}`);

    // Check if cursor exists
    if (!startAfterId) {
      logger.warn("No startAfterId provided, using current UTC time.");
      startAfterId = nowUtc;
    }

    // Check if the limit is within the threshold
    if (limit > 100) {
      logger.warn("Limit exceeds 100, setting to 100.");
      limit = 100;
    }

    // Build and execute the query
    db.collection("events")
      .where("commence_time", "<", startAfterId)
      .orderBy("commence_time", "desc")
      .limit(limit)
      .get()
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
          response.json({
            nextPageToken: commenceTime,
            hasMore: snapshot.size === limit,
            data: eventsData,
          });
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
