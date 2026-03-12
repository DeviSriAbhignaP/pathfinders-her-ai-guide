import { motion } from "framer-motion";
import { Compass, BarChart3, MessageCircle, Sparkles } from "lucide-react";
import GlassCard from "@/components/GlassCard";

interface DashboardPageProps {
  name: string;
  onNavigate: (page: 'discover' | 'reality' | 'mentor') => void;
}

const cards = [
  {
    id: 'discover' as const,
    icon: Compass,
    title: "Discover Myself",
    description: "Uncover your personality type and find the perfect engineering career that matches your strengths.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 'reality' as const,
    icon: BarChart3,
    title: "Reality Check",
    description: "Assess your current skills, identify gaps, and get actionable insights with free certification links.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: 'mentor' as const,
    icon: MessageCircle,
    title: "Career Mentor",
    description: "Chat with AI for personalized career guidance, strategies, and step-by-step action plans.",
    gradient: "from-violet-500 to-purple-500",
  },
];

const DashboardPage = ({ name, onNavigate }: DashboardPageProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <GlassCard className="inline-block px-8 py-4 mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold text-card-foreground font-poppins">
              Welcome, {name}!
            </h1>
          </div>
        </GlassCard>
        <p className="text-primary-foreground/80 font-poppins text-lg">Choose your path to career success</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {cards.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.15 }}
          >
            <GlassCard
              hover
              onClick={() => onNavigate(card.id)}
              className="h-full flex flex-col items-center text-center p-8"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-5`}>
                <card.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground font-poppins mb-3">{card.title}</h3>
              <p className="text-muted-foreground font-poppins text-sm leading-relaxed">{card.description}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
