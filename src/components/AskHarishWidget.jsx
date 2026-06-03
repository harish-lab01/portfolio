import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessage } from '../services/geminiService';

// Fallback replies when API key is missing or API fails
const FALLBACK_REPLIES = {
  available: "Absolutely! I'm currently looking for full-time software development roles. Reach me at harish.tech02@gmail.com or call/WhatsApp +91-9361070003 — let's talk! 🚀",
  projects: "My proudest work is EmployeeHub — a full HR management portal built with React.js + .NET Core that automated 100% of Vivify's paper workflows. Check it out at vivifysoft.in/employeehub 💼",
  tech: "My core stack is React.js, JavaScript ES6+, Tailwind CSS, and .NET Core REST APIs. I build full-stack web apps end-to-end — from pixel-perfect UI to API integration. Big fan of Framer Motion for animations! ✨",
  experience: "I have 1+ year of professional experience at Vivify Technocrats in Chennai, where I delivered 4+ production web modules across e-commerce, HR, and safety compliance domains. 🏢",
  resume: "Downloading my resume now! Hope we get a chance to discuss how I can bring value to your team. 📄",
  default: "Great question! You can reach Harish directly at harish.tech02@gmail.com or call/WhatsApp him at +91-9361070003 — he responds fast! 😊",
};

function getFallbackReply(text) {
  const t = text.toLowerCase();
  // Check experience first — "work experience", "history", "company" should not bleed into "available"
  if (t.includes('experience') || t.includes('history') || t.includes('company') || t.includes('work exp') || t.includes('vivify')) return FALLBACK_REPLIES.experience;
  if (t.includes('avail') || t.includes('hire') || t.includes('job') || t.includes('work') || t.includes('opportunit')) return FALLBACK_REPLIES.available;
  if (t.includes('project') || t.includes('portfolio') || t.includes('build') || t.includes('app')) return FALLBACK_REPLIES.projects;
  if (t.includes('tech') || t.includes('stack') || t.includes('skill') || t.includes('language') || t.includes('react') || t.includes('framework')) return FALLBACK_REPLIES.tech;
  if (t.includes('resume') || t.includes('cv') || t.includes('download')) return FALLBACK_REPLIES.resume;
  return FALLBACK_REPLIES.default;
}

const QUICK_REPLIES = [
  { label: "💼 Available for hire?", value: "Are you currently available for hire?" },
  { label: "🚀 Best project?", value: "What's your best project?" },
  { label: "💻 Tech stack?", value: "What's your tech stack?" },
  { label: "📄 Grab resume", value: "Can I download your resume?" },
  { label: "🏢 Work experience?", value: "Tell me about your work experience" },
  { label: "📬 Contact info?", value: "How can I contact Harish?" },
];

export default function AskHarishWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Harish's AI assistant 👋 I know everything about his skills, projects, and experience. What would you like to know?",
      isBot: true,
      isTyping: false,
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Conversation history for Gemini (excludes the initial greeting)
  const conversationHistory = useRef([]);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Animate bot message character by character
  const animateBotMessage = useCallback((fullText, msgId) => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setMessages(prev =>
        prev.map(m =>
          m.id === msgId ? { ...m, text: fullText.slice(0, i), isTyping: i < fullText.length } : m
        )
      );
      if (i >= fullText.length) clearInterval(interval);
    }, 18); // ~18ms per char ≈ smooth typewriter
  }, []);

  const handleSendMessage = useCallback(async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    setInputVal('');
    setIsLoading(true);

    // Add user message
    const userMsgId = Date.now();
    setMessages(prev => [...prev, { id: userMsgId, text: trimmed, isBot: false }]);

    // Add placeholder bot message with typing indicator
    const botMsgId = userMsgId + 1;
    setMessages(prev => [...prev, { id: botMsgId, text: '', isBot: true, isTyping: true, isLoading: true }]);

    try {
      // Call Gemini with full conversation history
      const reply = await sendMessage(conversationHistory.current, trimmed);

      // Update conversation history for context continuity
      conversationHistory.current = [
        ...conversationHistory.current,
        { role: 'user', content: trimmed },
        { role: 'assistant', content: reply },
      ];

      // Replace loading indicator with animated text
      setMessages(prev =>
        prev.map(m => m.id === botMsgId ? { ...m, text: '', isLoading: false } : m)
      );
      animateBotMessage(reply, botMsgId);

      // Auto-trigger resume download if relevant
      if (
        trimmed.toLowerCase().includes('resume') ||
        trimmed.toLowerCase().includes('cv') ||
        trimmed.toLowerCase().includes('download')
      ) {
        setTimeout(() => {
          const a = document.createElement('a');
          a.href = '/Harish_M_Resume.pdf';
          a.download = 'Harish_M_Resume.pdf';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }, 1200);
      }
    } catch (err) {
      console.warn('Gemini API error, using fallback:', err.message);
      const fallback = getFallbackReply(trimmed);
      setMessages(prev =>
        prev.map(m => m.id === botMsgId ? { ...m, text: '', isLoading: false } : m)
      );
      animateBotMessage(fallback, botMsgId);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, animateBotMessage]);

  const handleOpen = () => {
    setIsOpen(v => !v);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-body select-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 50 }}
            transition={{ type: 'spring', stiffness: 260, damping: 25 }}
            className="glass rounded-3xl w-[360px] max-w-[calc(100vw-3rem)] h-[500px] border border-border-glow shadow-2xl flex flex-col overflow-hidden bg-white/70 backdrop-blur-2xl mb-4 text-left"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-glow-from/10 via-[#FF6B9D]/10 to-[#45E5C8]/10 border-b border-border-glow/50 px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-glow-from via-[#FF6B9D] to-[#45E5C8] flex items-center justify-center text-sm">
                    🤖
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border border-white" />
                </div>
                <div>
                  <span className="font-display font-bold text-xs text-text-primary tracking-wider uppercase block">
                    Harish's AI Assistant
                  </span>
                  <span className="font-code text-[9px] text-green-500">● Online · Powered by Gemini</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-text-muted/10 hover:bg-text-muted/20 text-text-muted hover:text-text-primary flex items-center justify-center transition-all cursor-pointer font-code text-xs"
                aria-label="Close Chat"
              >
                ✕
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 min-h-0 scrollbar-hide">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div
                    className={`
                      max-w-[82%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed
                      ${msg.isBot
                        ? 'bg-white border border-border-glow text-text-primary rounded-tl-none shadow-sm'
                        : 'bg-primary-glow-from text-white rounded-tr-none shadow-sm'
                      }
                    `}
                  >
                    {msg.isLoading ? (
                      /* Thinking dots */
                      <span className="flex gap-1 items-center py-0.5">
                        <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:0s]" />
                        <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:0.4s]" />
                      </span>
                    ) : (
                      <>
                        {msg.text}
                        {/* Blinking cursor while typing */}
                        {msg.isTyping && (
                          <span className="inline-block w-0.5 h-3 bg-primary-glow-from ml-0.5 animate-pulse align-middle" />
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Quick replies */}
            <div className="px-4 pb-2 flex gap-1.5 flex-wrap shrink-0">
              {QUICK_REPLIES.map(qr => (
                <button
                  key={qr.value}
                  onClick={() => handleSendMessage(qr.value)}
                  disabled={isLoading}
                  className="bg-white/60 hover:bg-primary-glow-from/15 border border-border-glow hover:border-primary-glow-from/30 rounded-full px-3 py-1 font-code text-[9px] text-text-muted hover:text-primary-glow-from transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {qr.label}
                </button>
              ))}
            </div>

            {/* Input Footer */}
            <div className="p-3 border-t border-border-glow/50 flex gap-2 shrink-0 bg-white/20">
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask me anything about Harish..."
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSendMessage(inputVal)}
                disabled={isLoading}
                className="flex-1 glass bg-white/60 rounded-full px-4 py-2 font-body text-xs text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-primary-glow-from/50 transition-colors disabled:opacity-60"
              />
              <button
                onClick={() => handleSendMessage(inputVal)}
                disabled={isLoading || !inputVal.trim()}
                className="w-8 h-8 rounded-full bg-primary-glow-from text-white flex items-center justify-center hover:bg-primary-glow-from/80 transition-all cursor-pointer text-sm shadow-md disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
                aria-label="Send"
              >
                {isLoading ? (
                  <span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  '✦'
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={handleOpen}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary-glow-from via-[#FF6B9D] to-[#45E5C8] text-white flex items-center justify-center shadow-lg relative group"
        aria-label="Ask Harish AI Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-lg font-bold"
            >
              ✕
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-xl"
            >
              🤖
            </motion.span>
          )}
        </AnimatePresence>

        {/* Online indicator */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500 border border-white" />
          </span>
        )}

        {/* Tooltip */}
        {!isOpen && (
          <span className="absolute right-16 scale-0 group-hover:scale-100 origin-right transition-all font-code text-[10px] font-bold tracking-widest bg-white/95 text-text-primary px-3 py-1.5 rounded-full border border-border-glow shadow-md whitespace-nowrap uppercase">
            Ask Harish ✨
          </span>
        )}
      </motion.button>
    </div>
  );
}
