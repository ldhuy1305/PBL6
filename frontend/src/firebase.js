import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB4mmA1ix4T9rNiy5FRB7uIIAF2dJ7IJlU",
  authDomain: "pbl6-7b029.firebaseapp.com",
  projectId: "pbl6-7b029",
  storageBucket: "pbl6-7b029.appspot.com",
  messagingSenderId: "1071831459730",
  appId: "1:1071831459730:web:0f07d6737836dcdb85c34b",
  measurementId: "G-41H2GC587X",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey:
      "BObLc02v28h9krcWIjMz_eESRAXLMEG4f5Ty9S1MuTT-bqkAfkGwSpRhalZDmqF_GczF6r_ZFT6xFHX7O8jphUg",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
