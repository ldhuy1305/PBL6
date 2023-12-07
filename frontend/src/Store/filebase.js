import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyCm5WXRUAC2H8zWksMuRFgRkdXEyI8qupo",
  authDomain: "api-notify-70b0b.firebaseapp.com",
  projectId: "api-notify-70b0b",
  storageBucket: "api-notify-70b0b.appspot.com",
  messagingSenderId: "778661969135",
  appId: "1:778661969135:web:e7bb463b3b6bfe76c52f1a"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


export { database };
