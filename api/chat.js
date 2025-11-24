export default async function handler(req, res) {
  // Simple in-memory memory (resets each deploy)
  global.memory = global.memory || [];

  if (req.method === "POST") {
    const { message } = req.body;
    memory.push({ message, time: Date.now() });
    return res.status(200).json({
      reply: "Olá, eu sou a Ivone protótipo! Você disse: " + message,
      memory
    });
  }
  return res.status(200).json({ status: "OK", memory });
}
