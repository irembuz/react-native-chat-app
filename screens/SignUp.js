import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Button, Subheading } from "react-native-paper";
import { auth } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/core";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigation = useNavigation();

  const createAccount = async () => {
    setIsLoading(true);
    try {
      const response = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await response.user.updateProfile({ displayName: name });
      navigation.popToTop();
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
    }
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
        <Text style={styles.title}>Kayıt Ol</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry // sifre görünmez yapildi.
        />
        <View style={styles.buttonsContainer}>
          <Button compact onPress={() => navigation.navigate("SignIn")}>
            Giriş Yap
          </Button>
          <Button
            mode="contained"
            onPress={() => createAccount()}
            loading={isLoading}
          >
            Kayıt Ol
          </Button>
        </View>
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

export default SignUp;
