import { Text, View, StyleSheet, Alert, Button, TextInput } from "react-native";
import { firestore, collection, addDoc, serverTimestamp, MESSAGES,ROOMS } from "../../firebase/Config";
import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { FlatList } from "react-native";
import { query, orderBy } from "firebase/firestore";
import Login from "../Login";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/Config";
import { doc, deleteDoc } from "firebase/firestore";



export default function Index() {

  type Message = {
    id: string;
    text: string;
    user?: string;
    createdAt?: any;
    userId
?: string;
  };
  const [messages, setMessages] = useState<Message[]>([]);

  const [newMessage, setNewMessage] = useState<string>("");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [currentRoom, setCurrentRoom] = useState<string>("general");



 async function handleDelete(id: string): Promise<void> {
  try {
    await deleteDoc(
      doc(firestore, ROOMS, currentRoom, MESSAGES, id)
    );
  } catch (err) {
    console.error("Failed to delete", err);
  }
}




async function handleSend(): Promise<void> {
  if (!newMessage.trim()) return;

  try {
    const colRef = collection(
      firestore,
      ROOMS,
      currentRoom,
      MESSAGES
    );

    await addDoc(colRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: userEmail || "unknown",
      userId: auth.currentUser?.uid,
    });

    setNewMessage("");
  } catch (err) {
    console.error("Failed to save message", err);
  }
}



useEffect(() => {
  const q = query(
    collection(firestore, ROOMS, currentRoom, MESSAGES),
    orderBy("createdAt", "asc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const list = snapshot.docs.map((doc) => {
      const data = doc.data() as any;
      return {
        id: doc.id,
        text: data.text ?? "",
        user: data.user ?? "unknown",
        createdAt: data.createdAt ?? null,
      };
    });

    setMessages(list);
  });

  return () => unsubscribe();
}, [currentRoom]);
  if (!loggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Chat app</Text>
        <Login setLoggedIn={setLoggedIn} setUserEmail={setUserEmail} />
      </View>
    );
  }




  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat app</Text>
  
<View style={styles.roomsRow}>
    <Button title="General" onPress={() => setCurrentRoom("general")} />
    <Button title="Family" onPress={() => setCurrentRoom("family")} />
    <Button title="Friends" onPress={() => setCurrentRoom("friends")} />
  </View>



      <TextInput style={styles.input} placeholder="type hear"
        value={newMessage}
        onChangeText={setNewMessage}></TextInput>


      <Button title='Send' onPress={handleSend} />
      <Button
        title="Logout"
        onPress={async () => {
          await signOut(auth);
          setLoggedIn(false);
          setUserEmail("");
        }}
      />

      <FlatList
        style={{ width: "100%", marginTop: 20 }}
        data={messages}
        keyExtractor={(item) => item.id}
       renderItem={({ item }) => {
  const isMine = item.user === userEmail;

  const time =
    item.createdAt?.toDate
      ? item.createdAt.toDate().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

  return (
    <View
    
      style={[
        styles.messageBubble,
        isMine ? styles.myMessage : styles.otherMessage,
      ]}
    >
      <Text style={styles.user}>{item.user}</Text>
      <Text style={styles.text}>{item.text}</Text>
      <Text style={styles.time}>{time}</Text>

      <Button
        title="Delete"
        onPress={() => handleDelete(item.id)}
      />
    </View>
  );
}}


      />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    padding: 10,
    width: "80%",
    marginBottom: 10,
  },
  message: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    width: "90%",
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    width: "100%",
  },
  messageBubble: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: "80%",
    marginHorizontal: 10,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5EA",
  },
  user: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    marginBottom: 5,
  },
  time: {
    fontSize: 12,
    color: "#666",
  },
  roomsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 10,
  },
});
