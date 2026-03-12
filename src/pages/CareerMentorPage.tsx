import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Bot, User, ChevronDown, ChevronUp, Sparkles, Loader2 } from "lucide-react";
import GlassCard from "@/components/GlassCard";

interface CareerMentorPageProps {
  onBack: () => void;
  userName: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface CareerPath {
  title: string;
  summary: string;
  details: string;
}

const suggestedQuestions = [
  "What career paths suit a Python developer?",
  "How do I transition from web dev to AI/ML?",
  "What certifications should I get for cloud computing?",
  "Give me a 6-month action plan for becoming a data scientist",
  "What are the top trending tech roles in 2025?",
];

// Local AI simulation for career guidance
function generateMentorResponse(query: string, userName: string): string {
  const q = query.toLowerCase();

  if (q.includes('career path') || q.includes('career') || q.includes('suit') || q.includes('option')) {
    return `Great question, ${userName}! 🌟 Based on common career trajectories, here are some paths to explore:

**1. Software Development Engineer**
A versatile role focusing on building scalable applications. Start with strong fundamentals in data structures and one primary language.

**2. Data Science & Analytics**
Perfect if you love finding patterns in data. Requires Python, SQL, and statistical knowledge. Many free courses available on Google and Coursera.

**3. Cloud & DevOps Engineering**
High demand role focused on infrastructure automation. AWS and Google Cloud offer free training paths.

**4. AI/ML Engineering**
The cutting edge of tech! Combines programming with mathematics. Google's ML Crash Course is a great free starting point.

**5. Cybersecurity**
Critical and growing field. Start with Cisco's free Networking Essentials and work toward security certifications.

💡 **Action Step:** Pick the one that excites you most, then take one free course this week to test your interest!`;
  }

  if (q.includes('transition') || q.includes('switch') || q.includes('move to') || q.includes('change')) {
    return `Transitioning careers is absolutely doable, ${userName}! Here's a structured approach:

**Short-term (1-3 months):**
- Identify transferable skills from your current role
- Take 1-2 foundational courses in your target area
- Build a small portfolio project

**Medium-term (3-6 months):**
- Complete a certification (many are free!)
- Contribute to open-source projects in the new domain
- Network with professionals already in the role

**Long-term (6-12 months):**
- Apply for junior/transition roles
- Continue building expertise through projects
- Consider mentorship programs for women in tech

🎯 **Free Resources:**
- Google Career Certificates (Coursera)
- freeCodeCamp learning paths
- HackerRank skill certifications

Would you like me to create a specific action plan for your target role?`;
  }

  if (q.includes('certification') || q.includes('certificate')) {
    return `Here are top free/affordable certifications by field, ${userName}:

**Cloud Computing:**
- ☁️ Google Cloud Digital Leader (free training)
- ☁️ AWS Cloud Practitioner (free training materials)

**Data & AI:**
- 🤖 Google Machine Learning Crash Course (free)
- 📊 Google Data Analytics Certificate

**Programming:**
- 💻 HackerRank Python/JS/SQL Certifications (free)
- 💻 freeCodeCamp Full Stack (free)

**Security:**
- 🔐 Google Cybersecurity Certificate
- 🔐 Cisco Networking Essentials (free)

**UX Design:**
- 🎨 Google UX Design Certificate

💡 **Pro Tip:** Start with HackerRank certifications — they're quick, free, and recognized by many employers!`;
  }

  if (q.includes('action plan') || q.includes('roadmap') || q.includes('plan')) {
    return `Here's your personalized action plan, ${userName}! 🗺️

**Week 1-2: Foundation**
- [ ] Choose your target role and research requirements
- [ ] Sign up for one free course (Google/freeCodeCamp)
- [ ] Set up your GitHub profile

**Week 3-4: Build Skills**
- [ ] Complete the first module of your chosen course
- [ ] Solve 10 problems on HackerRank
- [ ] Start a mini-project related to your target role

**Month 2: Apply & Network**
- [ ] Get at least one free certification
- [ ] Build a portfolio project
- [ ] Join women-in-tech communities (Women Who Code, AnitaB.org)

**Month 3: Level Up**
- [ ] Complete your primary course
- [ ] Contribute to an open-source project
- [ ] Start applying for roles or internships

**Month 4-6: Specialize**
- [ ] Take an intermediate course
- [ ] Build 2-3 substantial projects
- [ ] Practice system design and interviews

🌟 **Remember:** Progress > Perfection. Every small step counts!`;
  }

  if (q.includes('trend') || q.includes('2025') || q.includes('demand') || q.includes('hot')) {
    return `Great question about trends, ${userName}! 🔥 Here are the top tech roles in 2025:

**1. AI/ML Engineer** — Highest demand, competitive salaries
**2. Cloud Security Engineer** — As cloud adoption grows, so does need for security
**3. Data Engineer** — Building the pipelines that power AI
**4. Full Stack Developer** — Always in demand, especially with AI integration skills
**5. DevOps/Platform Engineer** — Critical for modern software delivery

**Emerging Areas:**
- 🧬 AI Ethics & Governance
- 🌐 Edge Computing
- 🤖 Prompt Engineering & AI Product Management

**Skills to invest in:**
- Python + SQL (universal foundation)
- Cloud platforms (AWS/GCP/Azure)
- AI/ML fundamentals
- System design & architecture

💡 **Quick Win:** Add AI-related skills to your existing expertise — it makes any profile more competitive!`;
  }

  if (q.includes('interview') || q.includes('prepare')) {
    return `Interview prep strategy for you, ${userName}! 💪

**Technical Preparation:**
- Practice on LeetCode/HackerRank (start with Easy, do 2/day)
- Study system design (free: System Design Primer on GitHub)
- Review core CS concepts relevant to your target role

**Behavioral Preparation:**
- Prepare 5-7 STAR format stories
- Research the company's tech stack and culture
- Prepare thoughtful questions about the role

**Mock Interview Resources (Free):**
- Pramp (free peer mock interviews)
- interviewing.io (practice with engineers)
- YouTube channels: TechLead, Clément Mihailescu

**Day-of Tips:**
- Think aloud during coding problems
- Ask clarifying questions before solving
- It's okay to say "Let me think about this"

🌟 **Confidence Tip:** You belong in that interview room. Your unique perspective as a woman in tech is a strength!`;
  }

  return `Thanks for your question, ${userName}! 💜

That's a great topic. Here's what I'd suggest:

**Key Points:**
- Start by identifying your current strongest skills and interests
- Look for roles that combine multiple skills you enjoy
- Focus on one learning path at a time to avoid overwhelm

**Recommended Next Steps:**
1. Take the "Discover Myself" quiz to understand your personality type
2. Use "Reality Check" to identify specific skill gaps
3. Pick one free certification to start with

**Free Resources:**
- 🎓 Google Career Certificates
- 💻 freeCodeCamp.org
- 🏆 HackerRank skill certifications
- 📚 Coursera (many free courses available)

Would you like me to dive deeper into any specific area? I can help with:
- Career path planning
- Skill development roadmaps
- Interview preparation
- Certification recommendations

Just ask! 😊`;
}

const CareerMentorPage = ({ onBack, userName }: CareerMentorPageProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `Hi ${userName}! 👋 I'm your AI Career Mentor. I'm here to help you navigate your career journey with personalized guidance.\n\nYou can ask me about:\n- 🎯 Career path suggestions\n- 📚 Learning roadmaps & certifications\n- 💡 Skill development strategies\n- 🔄 Career transition advice\n- 📝 Interview preparation\n\nWhat would you like to explore today?` }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [expandedPaths, setExpandedPaths] = useState<Set<number>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: 'user', content: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));
    
    const response = generateMentorResponse(text, userName);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsTyping(false);
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
                  <div className="text-sm font-poppins text-card-foreground whitespace-pre-line leading-relaxed">
                    {msg.content.split('\n').map((line, li) => {
                      // Simple markdown-like rendering
                      if (line.startsWith('**') && line.endsWith('**')) {
                        return <p key={li} className="font-bold mt-2 first:mt-0">{line.replace(/\*\*/g, '')}</p>;
                      }
                      if (line.startsWith('- ')) {
                        return <p key={li} className="ml-3">{line}</p>;
                      }
                      return <p key={li} className={line === '' ? 'h-2' : ''}>{line}</p>;
                    })}
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
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
