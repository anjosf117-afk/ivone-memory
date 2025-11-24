import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  try {
    const message = req.body.message || "";

    const completion = await client.chat.completions.create({
      model: "gpt-40-mini",
      messages: [
        { role: "system", content: "Você é a Ivone, uma IA empática e acolhedora." },
        { role: "user", content: message }
      ]
    });

    const reply = completion.choices[0].message.content;
    res.status(200).json({ reply });

  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ error: "Erro ao conectar ao servidor." });
  }
}
