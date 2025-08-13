import {onRequest} from "firebase-functions/https";
import {logger} from "firebase-functions/v1";
import {db} from "./fire";


// Create a new document in Firestore
export const getAccountQuota = onRequest(async (request, response) => {
  try {
    logger.info("Retrieving Account Quota");

    db.collection("account").doc("requests").get()
      .then((doc) => {
        if (doc.exists) {
          logger.info("Document data:", doc.data());
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
