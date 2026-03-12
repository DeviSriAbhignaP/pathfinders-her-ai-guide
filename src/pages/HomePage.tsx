import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import GlassCard from "@/components/GlassCard";

interface HomePageProps {
  onStart: () => void;
}

const HomePage = ({ onStart }: HomePageProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl w-full"
      >
        <GlassCard className="text-center p-8 md:p-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold font-poppins text-gradient">
              PathFindHers
            </h1>
            <Sparkles className="w-8 h-8 text-primary" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl font-semibold text-card-foreground mb-4 font-poppins"
          >
            AI-powered career guidance for engineers — empowering women to succeed
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-muted-foreground mb-8 font-poppins leading-relaxed"
          >
            A structured, step-by-step roadmap to help women identify their inner strengths,
            acquire the right skills, and embark on a fulfilling career journey without confusion.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg font-poppins shadow-lg hover:shadow-xl transition-shadow"
          >
            Start My Path
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default HomePage;
