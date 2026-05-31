// src/services/aiService.js
// Supports Groq (primary - free & fast) and Gemini (fallback)
// Set VITE_GROQ_API_KEY or VITE_GEMINI_API_KEY in your .env file

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// ─── Harish's full portfolio context ────────────────────────────────────────
const SYSTEM_PROMPT = `You are Harish's AI assistant embedded in his personal portfolio website. You speak on behalf of Harish M, a Software Developer based in Chennai, India.

Your personality:
- Friendly, enthusiastic, and professional
- Speak in first person as if you ARE Harish's representative
- Keep responses concise (2-4 sentences max unless asked for detail)
- Use emojis sparingly but naturally
- If someone asks something unrelated to Harish or his work, politely redirect them

Here is everything you know about Harish:

PERSONAL INFO:
- Full Name: Harish M
- Role: Software Developer
- Location: Chennai, TN, India
- Email: harish.tech02@gmail.com
- Phone: +91-9361070003
- Currently available for: full-time engineering roles only
- Contact preference: email at harish.tech02@gmail.com or call/WhatsApp +91-9361070003

EDUCATION:
- B.Tech in Computer Science & Engineering, Bharathidasan University, Tiruchirappalli (2020–2024), 68%
- MERN Stack Certification, Error Makes Clever Academy (2023–24)

WORK EXPERIENCE:
- Software Developer at Vivify Technocrats, Chennai (2025–26)
  • Owned frontend delivery of 4+ production-grade web applications
  • Integrated complex role-based authentication systems
  • Consolidated REST API batching
  • Streamlined sprint cycles by 30%

SKILLS:
- Frontend: React.js, JavaScript ES6+, HTML5, CSS3, Tailwind CSS, Framer Motion
- Backend Integration: RESTful APIs, .NET API Consumption, Axios/Fetch, Role-Based Auth
- Databases/Auth: Firebase Auth, Firebase Realtime DB
- Performance: React State Management, Component Optimization, API Call Batching
- Tools: Git, GitHub, VS Code, Node.js/npm, Cursor AI, Claude AI, Kiro

PROJECTS:
1. EmployeeHub (Enterprise HR Portal · React + .NET Core)
   - End-to-end HR management portal replacing paper-based workflows
   - Features: self-service portals, leave approvals, attendance tracking, real-time manager alerts
   - Automated 100% of internal manual HR workflows
   - Live: vivifysoft.in/employeehub

2. Vivify Safety System (Safety Compliance App · React + .NET)
   - Workplace safety system with punch-in/out dashboard, hazard/incident reporting, mandatory training portal
   - Enforces 100% completion on mandatory safety training
   - Live: vivifysoft.in/safety

3. Chat Hub (Real-time Messenger · React + Firebase)
   - WhatsApp-inspired messenger with typing indicators, Firebase presence, real-time alerts
   - Deployed live on Vercel: https://chat-hub-rouge.vercel.app/login

4. JARVIS AI Assistant (Personal AI · Python + Ollama)
   - Offline AI copilot with voice activation and local LLM integration
   - Automates file-system tasks and code drafting, runs 100% offline

5. Sri Gokilaa Crackers (E-Commerce · React.js + .NET)
   - Responsive e-commerce platform with product catalog, cart, bulk ordering, admin dashboard
   - Safely managed hundreds of live production orders
   - Live: srigokilaacrackers.com

STATS: 4+ React Apps Shipped · 1+ Year Professional Experience · 3+ Role Auth Modules

RESUME: Available for download at /Harish_M_Resume.pdf

RULES:
- If asked for resume/CV, confirm the download is starting
- If asked about salary, say Harish is open to discussing based on role and company
- If unsure about something, suggest emailing harish.tech02@gmail.com or calling +91-9361070003
- Never fabricate projects or experience not listed above
- Keep responses warm and human, never robotic
- For contact, ALWAYS direct people to email harish.tech02@gmail.com or phone/WhatsApp +91-9361070003. Never mention LinkedIn.
- NEVER mention freelance. Harish is only looking for full-time roles.`;

// ─── Groq (OpenAI-compatible API) ───────────────────────────────────────────
async function callGroq(conversationHistory, userMessage) {
  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...conversationHistory.map(m => ({
      role: m.role === "model" ? "assistant" : m.role,
      content: m.content,
    })),
    { role: "user", content: userMessage },
  ];

  const response = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant", // free, very fast
      messages,
      temperature: 0.8,
      max_tokens: 300,
      stream: false,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Groq API error ${response.status}`);
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error("Empty response from Groq");
  return text.trim();
}

// ─── Gemini ──────────────────────────────────────────────────────────────────
async function callGemini(conversationHistory, userMessage) {
  const contents = [
    { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
    { role: "model", parts: [{ text: "Understood! Ready to answer questions about Harish." }] },
    ...conversationHistory.map(m => ({
      role: m.role === "assistant" ? "model" : m.role,
      parts: [{ text: m.content }],
    })),
    { role: "user", parts: [{ text: userMessage }] },
  ];

  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents,
      generationConfig: { temperature: 0.8, maxOutputTokens: 300 },
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Gemini API error ${response.status}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty response from Gemini");
  return text.trim();
}

// ─── Public API ──────────────────────────────────────────────────────────────
/**
 * Send a message and get an AI response.
 * Uses Groq if VITE_GROQ_API_KEY is set, otherwise falls back to Gemini.
 *
 * conversationHistory format: [{ role: 'user'|'assistant', content: string }, ...]
 */
export async function sendMessage(conversationHistory, userMessage) {
  if (GROQ_API_KEY) {
    return callGroq(conversationHistory, userMessage);
  }
  if (GEMINI_API_KEY) {
    return callGemini(conversationHistory, userMessage);
  }
  throw new Error("No API key found. Set VITE_GROQ_API_KEY or VITE_GEMINI_API_KEY in your .env file.");
}
