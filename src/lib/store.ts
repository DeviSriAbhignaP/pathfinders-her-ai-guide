// Simple state management for the app

export type Proficiency = 'Beginner' | 'Intermediate' | 'Advanced';

export interface UserState {
  name: string;
  personalityAnswers: number[];
  selectedSkill: string;
  skillProficiency: Proficiency;
  suggestedJobs: string[];
  // Reality check
  selectedJob: string;
  selectedAssessSkills: string[];
  assessmentResults: Record<string, { score: number; level: Proficiency }>;
  // Navigation
  currentPage: 'home' | 'name' | 'dashboard' | 'discover' | 'reality' | 'mentor';
  setName: (name: string) => void;
  setPage: (page: UserState['currentPage']) => void;
  setPersonalityAnswers: (answers: number[]) => void;
  setSelectedSkill: (skill: string) => void;
  setSkillProficiency: (p: Proficiency) => void;
  setSuggestedJobs: (jobs: string[]) => void;
  setSelectedJob: (job: string) => void;
  setSelectedAssessSkills: (skills: string[]) => void;
  setAssessmentResults: (results: Record<string, { score: number; level: Proficiency }>) => void;
  reset: () => void;
}

// We'll use zustand but install it first - for now use React context instead
// Simple global store using localStorage
const STORE_KEY = 'pathfindhers_state';

export function saveToStorage(data: Partial<UserState>) {
  const existing = getFromStorage();
  localStorage.setItem(STORE_KEY, JSON.stringify({ ...existing, ...data }));
}

export function getFromStorage(): Partial<UserState> {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function clearStorage() {
  localStorage.removeItem(STORE_KEY);
}
