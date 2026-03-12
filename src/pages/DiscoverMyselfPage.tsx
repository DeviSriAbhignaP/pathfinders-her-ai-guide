import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import { personalityQuestions, skillOptions, personalityJobMap } from "@/lib/quizData";
import type { Proficiency } from "@/lib/store";

interface DiscoverMyselfPageProps {
  onBack: () => void;
}

type Phase = 'personality' | 'skill-select' | 'skill-proficiency' | 'results';

const DiscoverMyselfPage = ({ onBack }: DiscoverMyselfPageProps) => {
  const [phase, setPhase] = useState<Phase>('personality');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [proficiency, setProficiency] = useState<Proficiency | "">("");
  const [results, setResults] = useState<{ jobs: string[]; skill: string; proficiency: Proficiency } | null>(null);

  const handlePersonalityAnswer = (optionIdx: number) => {
    const newAnswers = [...answers, optionIdx];
    setAnswers(newAnswers);

    if (currentQ < personalityQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setPhase('skill-select');
    }
  };

  const handleSkillSelect = (skill: string) => {
    setSelectedSkill(skill);
    setPhase('skill-proficiency');
  };

  const handleProficiency = (p: Proficiency) => {
    setProficiency(p);
    // Calculate personality type
    const typeCounts: Record<string, number> = { R: 0, I: 0, A: 0, S: 0 };
    answers.forEach((ans, idx) => {
      const types = ['R', 'I', 'A', 'S'];
      typeCounts[types[ans]] = (typeCounts[types[ans]] || 0) + 1;
    });
    // Also count question types
    personalityQuestions.forEach((q, idx) => {
      if (idx < answers.length) {
        typeCounts[q.type] = (typeCounts[q.type] || 0) + 1;
      }
    });

    const sorted = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]);
    const topTypes = sorted.slice(0, 2).map(([t]) => t);
    
    // Get jobs from top personality types, deduplicated
    const allJobs = new Set<string>();
    topTypes.forEach(t => {
      (personalityJobMap[t] || []).forEach(j => allJobs.add(j));
    });
    
    // Filter by skill relevance and pick 5
    const jobArray = Array.from(allJobs);
    const suggestedJobs = jobArray.slice(0, 5);

    setResults({ jobs: suggestedJobs, skill: selectedSkill, proficiency: p });
    setPhase('results');
  };

  const progress = phase === 'personality' 
    ? ((currentQ + 1) / personalityQuestions.length) * 60
    : phase === 'skill-select' ? 70
    : phase === 'skill-proficiency' ? 85
    : 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Progress bar */}
      <motion.div className="w-full max-w-2xl mb-6">
        <GlassCard className="p-3">
          <div className="flex items-center justify-between mb-2">
            <button onClick={onBack} className="text-card-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-poppins text-muted-foreground">Discover Myself</span>
            <span className="text-sm font-poppins text-primary font-semibold">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </GlassCard>
      </motion.div>

      <AnimatePresence mode="wait">
        {phase === 'personality' && (
          <motion.div
            key={`q-${currentQ}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl"
          >
            <GlassCard className="p-8">
              <p className="text-xs text-muted-foreground font-poppins mb-2">Question {currentQ + 1} of {personalityQuestions.length}</p>
              <h2 className="text-xl font-bold text-card-foreground font-poppins mb-6">
                {personalityQuestions[currentQ].question}
              </h2>
              <div className="space-y-3">
                {personalityQuestions[currentQ].options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePersonalityAnswer(idx)}
                    className="w-full text-left p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all font-poppins text-card-foreground"
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}

        {phase === 'skill-select' && (
          <motion.div
            key="skill-select"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-2xl"
          >
            <GlassCard className="p-8">
              <h2 className="text-xl font-bold text-card-foreground font-poppins mb-2">Select Your Skill</h2>
              <p className="text-muted-foreground font-poppins mb-6 text-sm">Choose one skill that best represents your expertise</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {skillOptions.map((skill) => (
                  <motion.button
                    key={skill}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSkillSelect(skill)}
                    className="p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all font-poppins text-sm text-card-foreground text-center"
                  >
                    {skill}
                  </motion.button>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}

        {phase === 'skill-proficiency' && (
          <motion.div
            key="proficiency"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-md"
          >
            <GlassCard className="p-8 text-center">
              <h2 className="text-xl font-bold text-card-foreground font-poppins mb-2">
                Your proficiency in {selectedSkill}?
              </h2>
              <p className="text-muted-foreground font-poppins mb-6 text-sm">Be honest — this helps us suggest the best fit!</p>
              <div className="space-y-3">
                {(['Beginner', 'Intermediate', 'Advanced'] as Proficiency[]).map((level) => (
                  <motion.button
                    key={level}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleProficiency(level)}
                    className="w-full p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all font-poppins text-card-foreground"
                  >
                    {level}
                  </motion.button>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}

        {phase === 'results' && results && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl"
          >
            <GlassCard className="p-8">
              <div className="text-center mb-6">
                <Sparkles className="w-10 h-10 text-primary mx-auto mb-3" />
                <h2 className="text-2xl font-bold text-card-foreground font-poppins">Your Career Matches!</h2>
              </div>

              <div className="mb-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-sm text-muted-foreground font-poppins">Your Skill</p>
                <p className="font-semibold text-card-foreground font-poppins">{results.skill} — {results.proficiency}</p>
              </div>

              <h3 className="font-semibold text-card-foreground font-poppins mb-3">Suggested Careers for You:</h3>
              <div className="space-y-3 mb-6">
                {results.jobs.map((job, i) => (
                  <motion.div
                    key={job}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border"
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="font-poppins text-card-foreground">{job}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onBack}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold font-poppins"
              >
                Back to Dashboard
              </motion.button>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiscoverMyselfPage;
