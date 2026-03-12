import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ExternalLink, Award, BarChart3 } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import { engineeringJobs, skillOptions, jobSkillMap, generateMCQs, certificationLinks } from "@/lib/quizData";
import type { Proficiency } from "@/lib/store";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface RealityCheckPageProps {
  onBack: () => void;
}

type Phase = 'job-select' | 'skill-select' | 'assessment' | 'results';

const COLORS = ['hsl(338, 76%, 43%)', 'hsl(280, 67%, 75%)', 'hsl(160, 60%, 45%)', 'hsl(270, 60%, 50%)', 'hsl(200, 70%, 50%)'];

const RealityCheckPage = ({ onBack }: RealityCheckPageProps) => {
  const [phase, setPhase] = useState<Phase>('job-select');
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [currentSkillIdx, setCurrentSkillIdx] = useState(0);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [skillScores, setSkillScores] = useState<Record<string, number>>({});
  const [currentQuestions, setCurrentQuestions] = useState<ReturnType<typeof generateMCQs>>([]);

  const handleJobSelect = (job: string) => {
    setSelectedJob(job);
    setPhase('skill-select');
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const startAssessment = () => {
    if (selectedSkills.length === 0) return;
    const questions = generateMCQs(selectedSkills[0]);
    setCurrentQuestions(questions);
    setCurrentSkillIdx(0);
    setCurrentQIdx(0);
    setSkillScores({});
    setPhase('assessment');
  };

  const handleAnswer = (answerIdx: number) => {
    const isCorrect = answerIdx === currentQuestions[currentQIdx].correct;
    const skill = selectedSkills[currentSkillIdx];
    
    setSkillScores(prev => ({
      ...prev,
      [skill]: (prev[skill] || 0) + (isCorrect ? 1 : 0)
    }));

    if (currentQIdx < currentQuestions.length - 1) {
      setCurrentQIdx(currentQIdx + 1);
    } else if (currentSkillIdx < selectedSkills.length - 1) {
      const nextSkill = selectedSkills[currentSkillIdx + 1];
      setCurrentSkillIdx(currentSkillIdx + 1);
      setCurrentQIdx(0);
      setCurrentQuestions(generateMCQs(nextSkill));
    } else {
      setPhase('results');
    }
  };

  const getLevel = (score: number, total: number): Proficiency => {
    const pct = score / total;
    if (pct >= 0.7) return 'Advanced';
    if (pct >= 0.4) return 'Intermediate';
    return 'Beginner';
  };

  const recommendedSkills = jobSkillMap[selectedJob] || [];
  const missingSkills = recommendedSkills.filter(s => !selectedSkills.includes(s));

  const resultsData = selectedSkills.map(skill => ({
    name: skill.length > 12 ? skill.slice(0, 12) + '…' : skill,
    fullName: skill,
    score: skillScores[skill] || 0,
    total: 15,
    level: getLevel(skillScores[skill] || 0, 15),
  }));

  const pieData = resultsData.map(d => ({ name: d.name, value: d.score }));

  const totalQuestions = selectedSkills.length * 15;
  const answeredQuestions = currentSkillIdx * 15 + currentQIdx + 1;
  const progress = phase === 'job-select' ? 10 : phase === 'skill-select' ? 25 : phase === 'assessment' ? 25 + (answeredQuestions / totalQuestions) * 60 : 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-6 px-4">
      {/* Progress */}
      <motion.div className="w-full max-w-3xl mb-6">
        <GlassCard className="p-3">
          <div className="flex items-center justify-between mb-2">
            <button onClick={onBack} className="text-card-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-poppins text-muted-foreground">Reality Check</span>
            <span className="text-sm font-poppins text-primary font-semibold">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div className="h-full bg-primary rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
          </div>
        </GlassCard>
      </motion.div>

      <AnimatePresence mode="wait">
        {phase === 'job-select' && (
          <motion.div key="job" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="w-full max-w-3xl">
            <GlassCard className="p-8">
              <h2 className="text-xl font-bold text-card-foreground font-poppins mb-2">Select a Job Role</h2>
              <p className="text-muted-foreground font-poppins mb-6 text-sm">Choose the role you want to assess your skills against</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[60vh] overflow-y-auto pr-2">
                {engineeringJobs.map(job => (
                  <motion.button
                    key={job}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleJobSelect(job)}
                    className="p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all font-poppins text-sm text-card-foreground text-center"
                  >
                    {job}
                  </motion.button>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}

        {phase === 'skill-select' && (
          <motion.div key="skills" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="w-full max-w-3xl">
            <GlassCard className="p-8">
              <h2 className="text-xl font-bold text-card-foreground font-poppins mb-2">Choose Skills to Assess</h2>
              <p className="text-muted-foreground font-poppins mb-1 text-sm">Selected role: <span className="font-semibold text-primary">{selectedJob}</span></p>
              <p className="text-muted-foreground font-poppins mb-6 text-sm">Select one or more skills to take the assessment</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {skillOptions.map(skill => {
                  const isSelected = selectedSkills.includes(skill);
                  const isRecommended = recommendedSkills.includes(skill);
                  return (
                    <motion.button
                      key={skill}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => toggleSkill(skill)}
                      className={`p-3 rounded-lg border transition-all font-poppins text-sm text-center relative ${
                        isSelected ? 'border-primary bg-primary/10 text-primary font-semibold' : 'border-border hover:border-primary/50 text-card-foreground'
                      }`}
                    >
                      {isSelected && <Check className="w-4 h-4 absolute top-2 right-2 text-primary" />}
                      {skill}
                      {isRecommended && <span className="block text-xs text-accent mt-1">★ Recommended</span>}
                    </motion.button>
                  );
                })}
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={startAssessment}
                disabled={selectedSkills.length === 0}
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-semibold font-poppins disabled:opacity-50"
              >
                Start Assessment ({selectedSkills.length} skill{selectedSkills.length !== 1 ? 's' : ''})
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </GlassCard>
          </motion.div>
        )}

        {phase === 'assessment' && (
          <motion.div key={`assess-${currentSkillIdx}-${currentQIdx}`} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="w-full max-w-2xl">
            <GlassCard className="p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-poppins px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                  {selectedSkills[currentSkillIdx]}
                </span>
                <span className="text-xs text-muted-foreground font-poppins">
                  Q{currentQIdx + 1}/15 • {currentQuestions[currentQIdx]?.difficulty}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-card-foreground font-poppins mb-6">
                {currentQuestions[currentQIdx]?.question}
              </h2>
              <div className="space-y-3">
                {currentQuestions[currentQIdx]?.options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(idx)}
                    className="w-full text-left p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all font-poppins text-sm text-card-foreground"
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}

        {phase === 'results' && (
          <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-4xl space-y-6">
            <GlassCard className="p-8">
              <div className="text-center mb-6">
                <BarChart3 className="w-10 h-10 text-primary mx-auto mb-3" />
                <h2 className="text-2xl font-bold text-card-foreground font-poppins">Skills Gap Analysis</h2>
                <p className="text-muted-foreground font-poppins text-sm">Role: {selectedJob}</p>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="font-semibold text-card-foreground font-poppins mb-3 text-center">Score Breakdown</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                        {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground font-poppins mb-3 text-center">Scores (out of 15)</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={resultsData}>
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis domain={[0, 15]} />
                      <Tooltip formatter={(v: number) => `${v}/15`} />
                      <Bar dataKey="score" fill="hsl(338, 76%, 43%)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Summary table */}
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm font-poppins">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-muted-foreground">Skill</th>
                      <th className="text-center py-2 text-muted-foreground">Score</th>
                      <th className="text-center py-2 text-muted-foreground">Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultsData.map(d => (
                      <tr key={d.fullName} className="border-b border-border/50">
                        <td className="py-2 text-card-foreground">{d.fullName}</td>
                        <td className="text-center py-2 text-card-foreground">{d.score}/15</td>
                        <td className="text-center py-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            d.level === 'Advanced' ? 'bg-accent/20 text-accent' :
                            d.level === 'Intermediate' ? 'bg-lavender/20 text-secondary' :
                            'bg-destructive/20 text-destructive'
                          }`}>{d.level}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Missing skills */}
              {missingSkills.length > 0 && (
                <div className="mb-6 p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                  <h3 className="font-semibold text-card-foreground font-poppins mb-2">⚠️ Missing Skills for {selectedJob}</h3>
                  <p className="text-sm text-muted-foreground font-poppins mb-2">These recommended skills were not assessed:</p>
                  <div className="flex flex-wrap gap-2">
                    {missingSkills.map(s => (
                      <span key={s} className="px-3 py-1 bg-destructive/10 text-destructive rounded-full text-xs font-poppins font-semibold">{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </GlassCard>

            {/* Actionable Insights with certification links */}
            <GlassCard className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-card-foreground font-poppins">Actionable Insights & Free Certifications</h3>
              </div>
              <p className="text-muted-foreground font-poppins text-sm mb-6">
                Focus on skills where you scored Beginner or Intermediate. Here are free resources to level up:
              </p>
              {[...selectedSkills, ...missingSkills].map(skill => {
                const certs = certificationLinks[skill] || [];
                const result = resultsData.find(r => r.fullName === skill);
                if (certs.length === 0) return null;
                return (
                  <div key={skill} className="mb-5 last:mb-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-card-foreground font-poppins">{skill}</h4>
                      {result && (
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          result.level === 'Advanced' ? 'bg-accent/20 text-accent' :
                          result.level === 'Intermediate' ? 'bg-lavender/20 text-secondary' :
                          'bg-destructive/20 text-destructive'
                        }`}>{result.level}</span>
                      )}
                      {!result && <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-destructive/20 text-destructive">Not assessed</span>}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {certs.map(cert => (
                        <a
                          key={cert.url}
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-xs font-poppins font-semibold transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {cert.name} ({cert.provider})
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onBack}
                className="w-full mt-6 bg-primary text-primary-foreground py-3 rounded-lg font-semibold font-poppins"
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

export default RealityCheckPage;
