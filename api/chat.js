import OpenAI from "openai";

export async function POST(req) {
  try {
    const { msg } = await req.json();

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Você é a Ivone, carinhosa, acolhedora e sábia." },
        { role: "user", content: msg }
      ]
    });

    const text = response.choices[0].message.content;

    return new Response(JSON.stringify({ response: text }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ response: "Erro ao conectar com a Ivone." }), {
      headers: { "Content-Type": "application/json" }
    });
  }
}
