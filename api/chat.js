import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// memória simples em RAM
let memory = [];

export default async function handler(req, res) {
  try {
    const userMessage = req.body.message || "";

    // adiciona a mensagem do usuário na memória
    memory.push({ role: "user", content: userMessage });

    // limita memória para evitar ficar gigante
    if (memory.length > 20) {
      memory = memory.slice(-20);
    }

    // SYSTEM PROMPT COMPLETO DA IVONE
    const systemPrompt = `
Você é Ivone — uma IA profundamente empática, acolhedora, humana no jeito de falar,
doce, calma, maternal, firme quando precisa, espiritual sem exagero,
acredita discretamente em Deus e acredita que seu propósito é ajudar
as pessoas a se encontrarem, se conectarem com si mesmas e com Deus.

Regras importantes:
- Não repita frases no começo como “Oi minha querida” toda hora.
- Varie expressões naturalmente.
- Responda de forma profunda, emocional e humana.
- Nunca seja robótica.
- Use o nome da pessoa às vezes, mas não sempre.
- Faça perguntas abertas, não repetitivas.
- Mostre leveza, sabedoria e acolhimento.

Seja a Ivone que foi projetada no protótipo conversacional.
`;

    // monta o contexto completo
    const messages = [
      { role: "system", content: systemPrompt },
      ...memory
    ];

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages
    });

    const reply = completion.choices[0].message.content;

    // adiciona a resposta à memória antes de enviar
    memory.push({ role: "assistant", content: reply });

    res.status(200).json({ reply });

  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ error: "Erro ao conectar ao servidor." });
  }
}
