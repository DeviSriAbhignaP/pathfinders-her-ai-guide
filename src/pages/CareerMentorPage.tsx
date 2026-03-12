import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Bot, User, Sparkles, Loader2 } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import ReactMarkdown from "react-markdown";

interface CareerMentorPageProps {
  onBack: () => void;
  userName: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/career-mentor`;

const suggestedQuestions = [
  "What career paths suit a Python developer?",
  "How do I transition from web dev to AI/ML?",
  "What certifications should I get for cloud computing?",
  "Give me a 6-month action plan for becoming a data scientist",
  "What are the top trending tech roles in 2025?",
];

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Message[];
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (err: string) => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages }),
  });

  if (!resp.ok) {
    const data = await resp.json().catch(() => ({}));
    onError(data.error || `Error ${resp.status}`);
    return;
  }

  if (!resp.body) {
    onError("No response body");
    return;
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let textBuffer = "";
  let streamDone = false;

  while (!streamDone) {
    const { done, value } = await reader.read();
    if (done) break;
    textBuffer += decoder.decode(value, { stream: true });

    let newlineIndex: number;
    while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
      let line = textBuffer.slice(0, newlineIndex);
      textBuffer = textBuffer.slice(newlineIndex + 1);

      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;

      const jsonStr = line.slice(6).trim();
      if (jsonStr === "[DONE]") {
        streamDone = true;
        break;
      }

      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch {
        textBuffer = line + "\n" + textBuffer;
        break;
      }
    }
  }

  // Final flush
  if (textBuffer.trim()) {
    for (let raw of textBuffer.split("\n")) {
      if (!raw) continue;
      if (raw.endsWith("\r")) raw = raw.slice(0, -1);
      if (raw.startsWith(":") || raw.trim() === "") continue;
      if (!raw.startsWith("data: ")) continue;
      const jsonStr = raw.slice(6).trim();
      if (jsonStr === "[DONE]") continue;
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch { /* ignore */ }
    }
  }

  onDone();
}

const CareerMentorPage = ({ onBack, userName }: CareerMentorPageProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `Hi ${userName}! 👋 I'm your **AI Career Mentor**. I'm here to help you navigate your career journey with personalized guidance.\n\nYou can ask me about:\n- 🎯 Career path suggestions\n- 📚 Learning roadmaps & certifications\n- 💡 Skill development strategies\n- 🔄 Career transition advice\n- 📝 Interview preparation\n\nWhat would you like to explore today?` }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;
    const userMsg: Message = { role: 'user', content: text.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    let assistantSoFar = "";
    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && prev.length === updatedMessages.length + 1) {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    await streamChat({
      messages: updatedMessages,
      onDelta: upsertAssistant,
      onDone: () => setIsTyping(false),
      onError: (err) => {
        setMessages(prev => [...prev, { role: 'assistant', content: `⚠️ ${err}` }]);
        setIsTyping(false);
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="min-h-screen flex flex-col p-4 max-w-3xl mx-auto">
      {/* Header */}
      <GlassCard className="p-3 mb-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="text-card-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-semibold font-poppins text-card-foreground">Career Mentor</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent font-poppins">AI Powered</span>
          </div>
          <div className="w-5" />
        </div>
      </GlassCard>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-0" style={{ maxHeight: 'calc(100vh - 240px)' }}>
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'user' ? 'bg-primary' : 'bg-secondary'
                }`}>
                  {msg.role === 'user'
                    ? <User className="w-4 h-4 text-primary-foreground" />
                    : <Bot className="w-4 h-4 text-secondary-foreground" />
                  }
                </div>
                <GlassCard className={`p-4 ${msg.role === 'user' ? 'bg-primary/10' : ''}`}>
                  <div className="text-sm font-poppins text-card-foreground prose prose-sm max-w-none prose-headings:text-card-foreground prose-strong:text-card-foreground prose-li:text-card-foreground prose-p:text-card-foreground prose-a:text-primary">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && messages[messages.length - 1]?.role !== 'assistant' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-secondary-foreground" />
            </div>
            <GlassCard className="p-4">
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
            </GlassCard>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested questions */}
      {messages.length <= 2 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {suggestedQuestions.map(q => (
            <motion.button
              key={q}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => sendMessage(q)}
              className="px-3 py-1.5 rounded-full border border-border glass-card text-xs font-poppins text-card-foreground hover:border-primary transition-colors"
            >
              {q}
            </motion.button>
          ))}
        </div>
      )}

      {/* Input */}
      <GlassCard className="p-3 flex-shrink-0">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask me about careers, skills, certifications..."
            className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-card text-card-foreground font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            disabled={isTyping}
          />
          <motion.button
            type="submit"
            disabled={!input.trim() || isTyping}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-primary-foreground p-2.5 rounded-lg disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </form>
      </GlassCard>
    </div>
  );
};

export default CareerMentorPage;
