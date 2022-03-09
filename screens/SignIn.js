import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Text, View, StyleSheet, TextInput, Platform } from "react-native";
import { Button, Subheading } from "react-native-paper";
import { auth } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/core";
import SocialButton from "../components/SocialButton";
import {
  signInWithEmailAndPassword,
  continueWithGoogle,
} from "../actions/UserActions";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const signIn = async () => {
    setIsLoading(true);
    try {
      await auth.signInWithEmailAndPassword(email, password);
      navigation.popToTop();
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
    }
  };

  const continueWithGoogleHandler = (e) => {
    e.preventDefault();
    dispatch(continueWithGoogle(navigation));
  };

  return (
    <View style={styles.container}>
      {!!error && (
        <Subheading
          style={{ color: "red", textAlign: "center", marginBottom: 16 }}
        >
          {error}
        </Subheading>
      )}

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Giriş Yap</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry // sifre görünmez yapildi.
        />
        <View style={styles.buttonsContainer}>
          <Button compact onPress={() => navigation.navigate("SignUp")}>
            Kayıt Ol
          </Button>
          <Button mode="contained" onPress={() => signIn()} loading={isLoading}>
            Giriş Yap
          </Button>
        </View>
        <SocialButton
          onPress={
            Platform.OS === "web"
              ? continueWithGoogleHandler
              : continueWithGoogleHandler
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f06292",
    flex: 1,
  },
  title: {
    fontSize: 36,
    color: "#ffcdd2",
    fontWeight: "800", // Yazi kalinligi ayarlandi.
    marginBottom: 16,
  },
  contentContainer: {
    padding: 32,
  },
  input: {
    backgroundColor: "#ffcdd2",
    fontSize: 15,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 6,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
  },
});

export default SignIn;
