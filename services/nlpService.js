/**
 * nlpService.js
 * Usa OpenAI GPT-4o mini para analizar el sentimiento de comentarios
 * hacia docentes en español. Devuelve un JSON estructurado.
 */
const { OpenAI } = require("openai");

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Palabras vacías para extracción local de keywords
const STOPWORDS = new Set([
  "el", "la", "los", "las", "un", "una", "de", "del", "al", "en", "que",
  "y", "a", "es", "se", "no", "lo", "su", "por", "con", "para", "como",
  "mas", "pero", "sus", "le", "me", "si", "ya", "muy", "fue", "hay",
  "ser", "son", "te", "mi", "nos", "hace", "este", "esta", "ese", "esa",
  "tambien", "cuando", "todo", "porque", "siempre", "sobre", "entre", "sin",
]);

function extraerKeywords(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 3 && !STOPWORDS.has(w))
    .slice(0, 5);
}

const SYSTEM_PROMPT = `Eres un analizador de sentimientos especializado en comentarios estudiantiles sobre docentes universitarios en español.

Analiza el comentario y responde ÚNICAMENTE con un objeto JSON válido con esta estructura exacta:
{
  "sentiment": "positivo" | "negativo" | "neutro",
  "score": número entre -1.0 (muy negativo) y 1.0 (muy positivo),
  "confianza": número entre 0.0 y 1.0 indicando qué tan claro es el sentimiento,
  "razon": string corto explicando el sentimiento detectado (máx 15 palabras)
}

Reglas:
- "positivo" si el comentario elogia, valora o expresa satisfacción con el docente.
- "negativo" si el comentario critica, expresa insatisfacción o frustración.
- "neutro" si el comentario es descriptivo, ambivalente o no expresa emoción clara.
- No incluyas texto fuera del JSON.`;

// ── Función principal exportada ──────────────────────────────────────────────
async function analizarComentario(comentario) {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0,   // máxima consistencia
    max_tokens: 150,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user",   content: comentario },
    ],
  });

  const texto = response.choices[0].message.content.trim();

  let parsed;
  try {
    // Limpiar posibles bloques markdown ```json ... ```
    const limpio = texto.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
    parsed = JSON.parse(limpio);
  } catch {
    throw new Error(`Respuesta inválida de OpenAI: ${texto}`);
  }

  const { sentiment, score, confianza } = parsed;

  // Validaciones básicas
  if (!["positivo", "negativo", "neutro"].includes(sentiment)) {
    throw new Error(`Sentimiento desconocido: ${sentiment}`);
  }

  return {
    sentiment,
    score:     parseFloat(Number(score).toFixed(4)),
    confianza: parseFloat(Number(confianza).toFixed(4)),
    keywords:  extraerKeywords(comentario),
    razon:     parsed.razon ?? "",
  };
}

module.exports = { analizarComentario };
