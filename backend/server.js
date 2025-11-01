import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const app = express();
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://tmg-mass-gaja-ai-chatbot-ah2y.vercel.app/"
  ]
}));
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.TMG_MASS_GAJA,
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if(!message) return res.status(400).json({ error: "No message provided" });
    const completion = await client.chat.completions.create({
      model: "gpt-5-turbo",
      messages: [{ role: "user", content: message }],
    });
    const reply = completion.choices?.[0]?.message?.content ?? "Sorry, no reply.";
    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`✅ Server running on port ${port}`));
