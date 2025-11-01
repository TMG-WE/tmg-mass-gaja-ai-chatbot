import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  // Voice input using browser SpeechRecognition
  const startVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if(!SpeechRecognition){
      alert("Speech Recognition not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setInput(text);
      sendMessage(text);
    };
    recognition.start();
  };

  // Text-to-speech
  const speak = (text) => {
    if(!window.speechSynthesis) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    window.speechSynthesis.speak(utter);
  };

  const sendMessage = async (message = input) => {
    if (!message || !message.trim()) return;
    const userMsg = { sender: "user", text: message };
    setChat((c) => [...c, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await axios.post(
        "https://tmg-mass-gaja-ai-chatbot.vercel.app/chat",
        { message }
      );
      const botReply = res.data.reply;
      setChat((c) => [...c, { sender: "bot", text: botReply }]);
      speak(botReply);
    } catch (err) {
      console.error(err);
      setChat((c) => [...c, { sender: "bot", text: "⚠️ Server error. Try later." }]);
    }
    setLoading(false);
  };

  return (
    <div className="chat-container">
      <h1 className="title">🤖 TMG MASS GAJA AI</h1>

      <div className="chat-box" id="chat-box">
        {chat.map((msg, i) => (
          <div key={i} className={`msg ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="msg bot typing">Typing...</div>}
      </div>

      <div className="input-box">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message or use mic 🎤"
        />
        <button onClick={() => sendMessage()}>Send</button>
        <button onClick={startVoice}>🎤</button>
      </div>
    </div>
  );
}

export default App;
