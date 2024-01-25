import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'
import { db } from "../firebaseConfig";

import { DocumentData, DocumentReference, DocumentSnapshot, QueryDocumentSnapshot, Timestamp, addDoc, arrayUnion, collection, doc, getDoc, query, updateDoc } from "firebase/firestore";

export const enum MessageStatus {
  SYNCED,
  NON_SYNCED
}
export type Message = {
  id: string,
  content: string,
  seen?: Date,
  sender: string,
  sent: Date,
  status: MessageStatus
}

export type FirebaseMessage = {
  id: string,
  content: string,
  seen?: Timestamp,
  sender: string,
  sent: Timestamp,
}

export type MessageRef = {
  reference: DocumentReference,
  timestamp: Timestamp
}

export type Chat = {
  id: string,
  title?: string,
  messages: MessageRef[],
}

export const getUserChats = async (uid: string): Promise<Chat[]> => {
  let userChats: Chat[] = [];

  const userSnap = await getDoc(doc(db, "users", uid));
  if (userSnap.exists() && userSnap.data() && userSnap.data().chats) {
    const chatsRef: DocumentReference[] = userSnap.data().chats;
    const chatsSnap: (QueryDocumentSnapshot<DocumentData, DocumentData> | null)[] =
      await Promise.all(chatsRef.map(async (chatRef) => {
        const chatSnap = await getDoc(chatRef);
        if (chatSnap.exists()) {
          return chatSnap;
        } else {
          console.log("No such document")
          return null;
        }
      }));

    userChats = [...chatsSnap.filter(chat => !!chat).map(chatSnap => {
      return {
        id: chatSnap?.id,
        title: chatSnap?.data().title,
        messages: chatSnap?.data().messages
          .sort((a: MessageRef, b: MessageRef): number =>
            a.timestamp.toDate().getTime() - b.timestamp.toDate().getTime()),
      } as Chat
    })];
    userChats.sort((c1: Chat, c2: Chat): number => {
      const c1Ts = c1.messages[0]?.timestamp.toDate().getTime();
      const c2Ts = c2.messages[0]?.timestamp.toDate().getTime();
      return c2Ts - c1Ts;
    })
  } else {
    console.error("Not found!");
  }
  return userChats;
};

export const getLatestMessages = async (chat: Chat): Promise<Message[]> => {
  let messages: Message[] = [];
  const latestMessagesRef: DocumentReference[] = chat.messages.slice(0, 5).map(msg => msg.reference);
  const messagesSnap: (QueryDocumentSnapshot<DocumentData, DocumentData> | null)[] =
    await Promise.all(latestMessagesRef.map(async (msgRef) => {
      const msgSnap = await getDoc(msgRef);
      if (msgSnap.exists()) {
        return msgSnap;
      } else {
        console.log("No such message")
        return null;
      }
    }));

  messages = [...messagesSnap
    .map(msgSnap => {
      // ---- Field Validations ----
      if (!msgSnap) {
        return null;
      }
      if (!msgSnap.data().content ||
        !msgSnap.data().sender ||
        !msgSnap.data().sent) {
        return null;
      }
      // ---------------------------
      return {
        id: msgSnap.id,
        content: msgSnap.data().content as string,
        seen: (msgSnap.data().seen as Timestamp | null)?.toDate() as Date | null,
        sender: msgSnap.data().sender as string,
        sent: (msgSnap.data().sent as Timestamp).toDate() as Date,
        status: MessageStatus.SYNCED
      } as Message;
    })
    .filter(msg => !!msg)
    .map((msg): Message => msg as Message)];

  return messages;
};

export const postMessageToServer = async (message: Message, chatId: string): Promise<void> => {
  // convert message type
  const firebaseMessage: FirebaseMessage = {
    id: message.id,
    content: message.content,
    sender: message.sender,
    sent: Timestamp.fromDate(message.sent),
  }
  // post message
  let msgRef: DocumentReference;
  try {
    msgRef = await addDoc(collection(db, "messages"), firebaseMessage);
  } catch (e) {
    console.error("Error sending message", e);
    return;
  }
  // add message ref to chat
  const messageRef: MessageRef = {
    reference: msgRef,
    timestamp: firebaseMessage.sent,
  }
  try {
    const chatRef: DocumentReference<DocumentData, DocumentData> = doc(db, 'chats', chatId);
    await updateDoc(chatRef, {messages: arrayUnion(messageRef)});
  } catch (e) {
    console.error("Error sending message", e);
    return;
  }
  message.status = MessageStatus.SYNCED
}