import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      case "CREATE_CHAT": // Chỉnh sửa action type
        return state; // Xử lý action CREATE_CHAT nếu cần
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  const createChat = async (id) => {
    const user = doc(db, "users", id);
    const combinedId =
      currentUser.uid > id
        ? currentUser.uid + id
        : id + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error("Lỗi khi tạo chat:", err);
    }
  };

  return (
    <ChatContext.Provider value={{ data: state, dispatch, createChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
