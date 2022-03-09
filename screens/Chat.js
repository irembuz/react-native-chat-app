import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import firebase from "firebase/compat";

const Chat = ({ route }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .doc("chats/" + route.params.id)
      .onSnapshot((doc) => {
        setMessages(
          doc.data().messages.map((message) => ({
            ...message,
            createdAt: message.createdAt.toDate(),
          }))
        );
      });
  }, [route.params.id]);

  const onSend = useCallback(
    (m = []) => {
      firebase
        .firestore()
        .doc("chats/" + route.params.id)
        .set({ messages: GiftedChat.append(messages, m) }, { merge: true });
    },
    [route.params.id, messages]
  );

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        id: 1,
      }}
    />
  );
};

export default Chat;
