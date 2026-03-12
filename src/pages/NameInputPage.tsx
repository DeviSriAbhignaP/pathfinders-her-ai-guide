import { useState } from "react";
import { motion } from "framer-motion";
import { User, ArrowRight } from "lucide-react";
import GlassCard from "@/components/GlassCard";

interface NameInputPageProps {
  onSubmit: (name: string) => void;
}

const NameInputPage = ({ onSubmit }: NameInputPageProps) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) onSubmit(name.trim());
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <GlassCard className="p-8 md:p-10">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <User className="w-8 h-8 text-primary" />
            </motion.div>
            <h2 className="text-2xl font-bold text-card-foreground font-poppins">Welcome!</h2>
            <p className="text-muted-foreground mt-2 font-poppins">Tell us your name to begin your journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-lg border border-border bg-card text-card-foreground font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              autoFocus
            />
            <motion.button
              type="submit"
              disabled={!name.trim()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-semibold font-poppins disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              Enter
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default NameInputPage;
