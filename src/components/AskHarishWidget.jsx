import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { askHarishReplies } from '../data/portfolioData';

export default function AskHarishWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi, I'm Harish's AI assistant! 👋 Ask me anything about Harish's skills, experience, or availability.", isBot: true }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const quickReplies = [
    { label: "💼 Are you available?", value: "available" },
    { label: "🚀 Best project?", value: "projects" },
    { label: "💻 Tech stack?", value: "tech" },
    { label: "📄 Grab resume?", value: "resume" },
  ];

  const handleSendMessage = (text, isQuick = false) => {
    if (!text.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { id: Date.now(), text, isBot: false }]);
    setInputVal('');
    setIsTyping(true);

    // AI logic parsing
    setTimeout(() => {
      setIsTyping(false);
      let replyKey = 'default';
      const cleanText = text.toLowerCase();

      if (isQuick) {
        replyKey = text;
      } else {
        if (cleanText.includes('avail') || cleanText.includes('hire') || cleanText.includes('job') || cleanText.includes('work')) {
          replyKey = 'available';
        } else if (cleanText.includes('project') || cleanText.includes('portfolio') || cleanText.includes('build')) {
          replyKey = 'projects';
        } else if (cleanText.includes('tech') || cleanText.includes('stack') || cleanText.includes('skill') || cleanText.includes('language')) {
          replyKey = 'tech';
        } else if (cleanText.includes('exp') || cleanText.includes('history') || cleanText.includes('company')) {
          replyKey = 'experience';
        } else if (cleanText.includes('resume') || cleanText.includes('cv')) {
          replyKey = 'resume';
        }
      }

      const responseText = askHarishReplies[replyKey] || askHarishReplies.default;
      setMessages(prev => [...prev, { id: Date.now(), text: responseText, isBot: true }]);

      // Trigger resume download if requested
      if (replyKey === 'resume') {
        setTimeout(() => {
          const a = document.createElement('a');
          a.href = '/Harish.pdf';
          a.download = 'Harish_M_Resume.pdf';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }, 1000);
      }
    }, 1000);
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
            className="glass rounded-3xl w-[350px] max-w-[calc(100vw-3rem)] h-[480px] border border-border-glow shadow-2xl flex flex-col overflow-hidden bg-white/70 backdrop-blur-2xl mb-4 text-left"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-glow-from/10 via-[#FF6B9D]/10 to-[#45E5C8]/10 border-b border-border-glow/50 px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="font-display font-bold text-xs text-text-primary tracking-wider uppercase">
                  Harish's AI Assistant
                </span>
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
                <div
                  key={msg.id}
                  className={`
                    max-w-[80%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed text-left
                    ${
                      msg.isBot
                        ? 'bg-white border border-border-glow text-text-primary self-start rounded-tl-none shadow-sm'
                        : 'bg-primary-glow-from text-white self-end rounded-tr-none shadow-sm'
                    }
                  `}
                >
                  {msg.text}
                </div>
              ))}

              {isTyping && (
                <div className="bg-white border border-border-glow text-text-primary self-start rounded-2xl rounded-tl-none px-4 py-2.5 text-xs flex gap-1 items-center shadow-sm">
                  <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:0s]" />
                  <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick replies */}
            <div className="px-4 pb-2 flex gap-1.5 flex-wrap shrink-0">
              {quickReplies.map(qr => (
                <button
                  key={qr.value}
                  onClick={() => handleSendMessage(qr.value, true)}
                  className="bg-white/60 hover:bg-primary-glow-from/15 border border-border-glow hover:border-primary-glow-from/30 rounded-full px-3 py-1 font-code text-[9px] text-text-muted hover:text-primary-glow-from transition-all cursor-pointer"
                >
                  {qr.label}
                </button>
              ))}
            </div>

            {/* Input Footer */}
            <div className="p-3 border-t border-border-glow/50 flex gap-2 shrink-0 bg-white/20">
              <input
                type="text"
                placeholder="Ask me something..."
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage(inputVal)}
                className="flex-1 glass bg-white/60 rounded-full px-4 py-2 font-body text-xs text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-primary-glow-from/50 transition-colors"
              />
              <button
                onClick={() => handleSendMessage(inputVal)}
                className="w-8 h-8 rounded-full bg-primary-glow-from text-white flex items-center justify-center hover:bg-primary-glow-from/80 transition-colors cursor-pointer text-sm shadow-md"
                aria-label="Send"
              >
                ✦
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary-glow-from via-[#FF6B9D] to-[#45E5C8] text-white flex items-center justify-center hover:shadow-[0_0_20px_rgba(108,99,255,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg relative group"
        aria-label="Ask Harish AI Assistant"
      >
        <span className="text-xl">🤖</span>
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500 border border-white"></span>
        </span>
        <span className="absolute right-16 scale-0 group-hover:scale-100 origin-right transition-all font-code text-[10px] font-bold tracking-widest bg-white/95 text-text-primary px-3 py-1.5 rounded-full border border-border-glow shadow-md whitespace-nowrap uppercase">
          Ask Harish ✨
        </span>
      </button>
    </div>
  );
}
