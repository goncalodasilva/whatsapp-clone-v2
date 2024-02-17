import * as functions from "firebase-functions";
import {getMessaging} from "firebase-admin/messaging";
import * as admin from "firebase-admin";
import * as crypto from "crypto";
import * as Pusher from "pusher";
import {DocumentReference} from "firebase-admin/firestore";

admin.initializeApp();


exports.onMessageCreate = functions.region("europe-west2").firestore
  .document("messages/{messageId}")
  .onCreate((snap) => {
    // Get the document that was written to the Firestore.
    const newMessage = snap.data();

    // Log the document that triggered the function.
    console.log("New message created: ", newMessage);

    // You can perform other actions based on the document data.
    // ...

    return null;
  });

exports.onMessageAddedToChat = functions.region("europe-west2").firestore
  .document("chats/{chatId}")
  .onUpdate((change, context) => {
    const encryptedId = encrypt(context.params.chatId);
    console.log(encryptedId);
    const pusher = new Pusher({
      appId: "1297782",
      key: "0b13950db72a15911ff2",
      secret: "2c8c57ccf3c0e8f94031",
      cluster: "eu",
      useTLS: true,
    });
    pusher.trigger(encryptedId, "message-updates", {});
    // Create a list containing up to 500 registration tokens.
    // These registration tokens come from the client FCM SDKs.

    const userIds = change.after.data().users as DocumentReference[];

    const sendMulticastMessage = async () => {
      const tokens = await getTokens(userIds);

      const registrationTokens = tokens;

      const message = {
        data: {score: "850", time: "2:45"},
        tokens: registrationTokens,
      };
      console.info("Sending message", message);

      getMessaging()
        .sendMulticast(message)
        .then((response) => {
          console.log(response.successCount +
            " messages were sent successfully");
          console.log(response);
        });
    };

    sendMulticastMessage();
  });

const encrypt = (text: string): string => {
  const hash = crypto.createHash("sha256");
  hash.update(text);
  return hash.digest("hex");
};

const getTokens = async (userIds: DocumentReference[]): Promise<string[]> => {
  const db = admin.firestore();
  const tokens: string[] = await Promise.all(userIds
    .map(async (userId): Promise<string> => {
      const doc = await db.collection("fcmTokens").doc(userId.id).get();
      if (doc.exists) {
        const token = doc.data()?.token;
        console.log(token);
        return token || "";
      } else {
        console.log("No such document!");
        return "";
      }
    }));
  return tokens.filter((token) => token !== "");
};
