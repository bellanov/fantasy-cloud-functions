/**
 * Retrieve Account Quota.
 * Query Firestore for account quota information.
 */
import {onRequest} from "firebase-functions/https";
import {logger} from "firebase-functions/v1";
import {db} from "./firebase";


// Define the Cloud Function
export const getAccountQuota = onRequest(async (request, response) => {
  try {
    logger.info("Retrieving Account Quota");

    // Build and execute the query
    db.collection("account").doc("requests").get()
      .then((doc) => {
        if (doc.exists) {
          response.json({"accountQuota": doc.data()});
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
