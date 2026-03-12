import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const GlassCard = ({ children, className, hover = false, onClick }: GlassCardProps) => {
  return (
    <motion.div
      className={cn("glass-card p-6", hover && "cursor-pointer", className)}
      whileHover={hover ? { scale: 1.03, boxShadow: "0 12px 40px rgba(107, 33, 168, 0.25)" } : undefined}
      whileTap={hover ? { scale: 0.98 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
