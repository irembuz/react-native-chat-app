import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Separator from "../components/Separator";
import ContactRow from "../components/ContactRow";
import { Ionicons } from "@expo/vector-icons";
import Cell from "../components/Cell";
import { displayName } from "react-native/Libraries/Text/TextAncestor";
import { auth } from "../firebaseConfig";

const Settings = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setName(user?.displayName ?? ""); // null gelebilir bu yuzden ? koyuldu.
      setEmail(user?.email ?? "");
      user.displayName;
      user.email;
    });
  }, []);

  return (
    <View>
      <ContactRow name={name} subtitle={email} style={styles.contactRow} />
      <Separator />
      <Cell
        title="Logout"
        icon="log-out-outline"
        tintColor="#ec407a"
        onPress={() => {
          navigation.navigate("SignIn");
        }}
      />
      <Cell
        title="Help"
        icon="information-outline"
        tintColor="red"
        onPress={() => {
          alert("Ben geldim diye mi kasıldınız!");
        }}
        style={{ marginTop: 20 }}
      />
      <Cell
        title="Tell a friend"
        icon="heart-outline"
        tintColor="green"
        onPress={() => {
          alert("Cenazem mi var ışıl ışılsınız!");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contactRow: {
    backgroundColor: "white",
    marginTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth, // Çizgi eklendi
    borderColor: "#E2E2E2",
  },
});

export default Settings;
