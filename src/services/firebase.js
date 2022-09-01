import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4qyiBmtX2QdtfQPJky_x4arg83-NoY2g",
  authDomain: "meet-941d4.firebaseapp.com",
  projectId: "meet-941d4",
  storageBucket: "meet-941d4.appspot.com",
  messagingSenderId: "172469628091",
  appId: "1:172469628091:web:10c36cb3dd98da0cc68d9e",
  measurementId: "G-422DPM8BZ9",
  // TODO: Add your Firebase configuration here
};


const app = initializeApp(firebaseConfig);
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

const db = getFirestore(app);
function getMessages(roomId, callback) {
  return onSnapshot(
    query(
      collection(db, "chat-rooms", roomId, "messages"),
      orderBy("timestamp", "asc")
    ),
    (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(messages);
    }
  );
}


// ...
async function sendMessage(roomId, user, text) {
  try {
    await addDoc(collection(db, "chat-rooms", roomId, "messages"), {
      uid: user.uid,
      displayName: user.displayName,
      text: text.trim(),
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error(error);
  }
}

async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const { user } = await signInWithPopup(auth, provider);

    return { uid: user.uid, displayName: user.displayName };
  } catch (error) {
    if (error.code !== "auth/cancelled-popup-request") {
      console.error(error);
    }

    return null;
  }
}

export { loginWithGoogle, sendMessage, getMessages };