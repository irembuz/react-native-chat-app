import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import ContactRow from "../components/ContactRow";
import Separator from "../components/Separator";
import firebase from "firebase/compat";
import { auth } from "../firebaseConfig";
import { Ionicons } from "@expo/vector-icons";

const Chats = ({ navigation }) => {
  useEffect(() => {
    const createAccount = async () => {
      const email = "irembuz7@gmail.com";
      const password = "password123";
      const messages = "Hi Irem";
      const response = await auth.signInWithEmailAndPassword(
        email,
        password,
        messages
      );
    };
    createAccount();
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigation.navigate("Chats");
      }
    });
  }, []);

  const [chats, setChats] = useState([]);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      firebase
        .firestore()
        .collection("chats")
        .where("users", "array-contains", user.email)
        .onSnapshot((snapshot) => {
          setChats(snapshot.docs);
        });
    });
  }, []);

  const handleFABPress = () => {
    if (Platform.OS === "ios") {
      Alert.prompt("Email", "Enter user email", (email) => {
        firebase
          .firestore()
          .collection("chats")
          .add({
            users: [auth?.currentUser?.email, email],
            messages: [],
          })
          .then((doc) => {
            navigation.navigate("Chat", { id: doc.id });
          });
      });
    } else {
      let email = prompt("Enter user email");
      if (email) {
        firebase
          .firestore()
          .collection("chats")
          .add({
            users: [auth?.currentUser?.email, email],
            messages: [],
          })
          .then((doc) => {
            navigation.navigate("Chat", { id: doc.id });
          });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {chats.map((chat) => (
        <React.Fragment key={chat.id}>
          <ContactRow
            name={chat.data().users.find((x) => x !== auth?.currentUser?.email)}
            subtitle={
              chat.data().messages.length === 0
                ? "No Messages Yet"
                : chat.data().messages[0].text
            }
            onPress={() => {
              navigation.navigate("Chat", { id: chat.id }); // Chat ekranina yonlendirildi.
            }}
          />
          <Separator />
        </React.Fragment>
      ))}
      <TouchableOpacity style={styles.fab} onPress={handleFABPress}>
        <View style={styles.fabContainer} onPress>
          <Ionicons name="add" size={24} color="#ffcdd2" />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    width: 56,
    height: 56,
    backgroundColor: "#f06292",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  container: {
    flex: 1,
  },
});

export default Chats;
