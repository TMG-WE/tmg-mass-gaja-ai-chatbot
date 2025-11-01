import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import axios from "axios";
import * as Speech from "expo-speech";

export default function App() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const speak = (text) => {
    try { Speech.speak(text); } catch(e){ console.warn(e); }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setChat((c) => [...c, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await axios.post("https://tmg-mass-gaja-ai-chatbot.vercel.app/chat", { message: input });
      const botMsg = { sender: "bot", text: res.data.reply };
      setChat((c) => [...c, botMsg]);
      speak(res.data.reply);
    } catch (err) {
      console.error(err);
      setChat((c) => [...c, { sender: "bot", text: "⚠️ Connection error" }]);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🤖 TMG MASS GAJA AI</Text>
      <ScrollView style={styles.chatBox}>
        {chat.map((msg, i) => (
          <View key={i} style={[styles.msg, msg.sender === "user" ? styles.user : styles.bot]}>
            <Text style={msg.sender === "user" ? styles.userText : styles.botText}>{msg.text}</Text>
          </View>
        ))}
        {loading && <Text style={styles.botText}>Typing...</Text>}
      </ScrollView>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Say or type something..."
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.button} onPress={sendMessage}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 20, paddingTop: 50 },
  title: { color: "gold", fontSize: 22, textAlign: "center", marginBottom: 15 },
  chatBox: { flex: 1 },
  msg: { padding: 10, borderRadius: 10, marginVertical: 4, maxWidth: "75%" },
  user: { alignSelf: "flex-end", backgroundColor: "gold" },
  bot: { alignSelf: "flex-start", backgroundColor: "#222" },
  userText: { color: "#000" },
  botText: { color: "#fff" },
  inputRow: { flexDirection: "row", alignItems: "center" },
  input: { flex: 1, backgroundColor: "#222", color: "#fff", borderRadius: 8, padding: 10 },
  button: { backgroundColor: "gold", padding: 10, borderRadius: 8, marginLeft: 8 },
});
