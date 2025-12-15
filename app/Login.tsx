import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/Config";

type LoginProps = {
  setLoggedIn: (value: boolean) => void;
  setUserEmail: (value: string) => void;
};

export default function Login({ setLoggedIn, setUserEmail }: LoginProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleLogin(): Promise<void> {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      setUserEmail(user.email ?? email.trim());
      setLoggedIn(true);
    } catch (error: any) {
      // Покажем понятную ошибку пользователю
      if (error.code === "auth/user-not-found") {
        Alert.alert("Login failed", "No account found with this email.");
      } else if (error.code === "auth/wrong-password") {
        Alert.alert("Login failed", "Incorrect password.");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Login failed", "Invalid email address.");
      } else if (error.code === "auth/too-many-requests") {
        Alert.alert("Login failed", "Too many attempts. Try again later.");
      } else {
        Alert.alert("Login failed", String(error.message ?? error));
      }

      console.log("Auth error:", error.code, error.message);
    }
  }

  return (
    <View style={styles.box}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: { width: "100%", gap: 10 },
  title: { fontSize: 22, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: "#999", padding: 10, borderRadius: 8 },
});
