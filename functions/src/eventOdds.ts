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

    // Get eventId to query
    const eventId = request.query.eventId as string;

    // Get format to return
    const format = (request.query.format as string) || "american";

    logger.info(`Event ID set to: ${eventId}`);
    logger.info(`Format set to: ${format}`);

    if (!eventId) {
      logger.warn("No eventId provided");
      response.status(400).send("Bad Request: eventId is required");
      return;
    }

    // Build and execute the query
    db.collectionGroup(format)
      .where("id", "==", eventId)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          const eventsData = snapshot.docs.map((doc) => doc.data());
          response.json({
            data: eventsData,
          });
        } else {
          logger.warn("No such documents!");
          response
            .status(400)
            .send("Bad Request: Odds Format (?format) is possibly invalid.");
          return;
        }
      })
      .catch((error) => {
        logger.error("Error getting document:", error);
      });
  } catch (error) {
    logger.error("Error retrieving odds:", error);
    response.status(500).send("Internal Server Error");
  }
});
