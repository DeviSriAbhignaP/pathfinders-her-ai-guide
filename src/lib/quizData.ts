export const personalityQuestions = [
  {
    question: "When faced with a complex problem, you prefer to:",
    options: [
      "Break it down into smaller parts and solve systematically",
      "Research existing solutions and adapt them",
      "Brainstorm creative, unconventional approaches",
      "Collaborate with others to find the best solution"
    ],
    type: "R" as const
  },
  {
    question: "In a team project, you naturally gravitate toward:",
    options: [
      "Building and testing the technical components",
      "Analyzing data and finding patterns",
      "Designing the user experience and interface",
      "Coordinating the team and managing communication"
    ],
    type: "I" as const
  },
  {
    question: "What excites you most about technology?",
    options: [
      "Making things work efficiently",
      "Discovering hidden insights in data",
      "Creating beautiful, intuitive experiences",
      "Helping people solve real-world problems"
    ],
    type: "A" as const
  },
  {
    question: "Your ideal work environment looks like:",
    options: [
      "A quiet lab or workshop with hands-on tools",
      "A research-oriented space with data access",
      "A creative studio with design tools",
      "An open, collaborative office space"
    ],
    type: "S" as const
  },
  {
    question: "When learning something new, you prefer to:",
    options: [
      "Follow structured tutorials step by step",
      "Dive into documentation and theory",
      "Experiment freely and learn by doing",
      "Learn from peers and mentors"
    ],
    type: "R" as const
  },
  {
    question: "Which type of project outcome makes you proudest?",
    options: [
      "A robust, well-engineered system",
      "An insightful analysis that drives decisions",
      "A product that users love and find delightful",
      "A solution that positively impacts communities"
    ],
    type: "I" as const
  },
  {
    question: "How do you handle tight deadlines?",
    options: [
      "Focus on the most critical technical tasks",
      "Prioritize based on data and impact analysis",
      "Find creative shortcuts without compromising quality",
      "Rally the team and delegate effectively"
    ],
    type: "A" as const
  },
  {
    question: "What kind of challenges energize you?",
    options: [
      "Debugging and optimizing performance",
      "Solving puzzles with logic and algorithms",
      "Designing something from scratch",
      "Mentoring others and sharing knowledge"
    ],
    type: "S" as const
  },
  {
    question: "Your favorite way to spend a free weekend:",
    options: [
      "Building a side project or fixing things",
      "Reading research papers or taking online courses",
      "Exploring art, music, or creative hobbies",
      "Volunteering or attending community events"
    ],
    type: "R" as const
  },
  {
    question: "Which statement resonates most with you?",
    options: [
      "I love making things work perfectly",
      "I'm driven by curiosity and discovery",
      "I want to create things that inspire",
      "I find purpose in helping others grow"
    ],
    type: "I" as const
  }
];

export const skillOptions = [
  "Python", "JavaScript/TypeScript", "Java", "C/C++", "SQL & Databases",
  "Cloud Computing", "Machine Learning/AI", "Web Development",
  "Cybersecurity", "Data Analysis", "DevOps/CI-CD", "Mobile Development",
  "Networking", "Embedded Systems", "UI/UX Design"
];

export const engineeringJobs = [
  "Software Engineer", "Data Scientist", "ML Engineer", "Frontend Developer",
  "Backend Developer", "Full Stack Developer", "DevOps Engineer", "Cloud Architect",
  "Cybersecurity Analyst", "Data Analyst", "Mobile App Developer", "Embedded Systems Engineer",
  "Network Engineer", "UI/UX Designer", "AI Research Scientist", "Site Reliability Engineer",
  "Database Administrator", "Systems Architect", "QA Engineer", "Product Manager (Tech)",
  "Blockchain Developer", "Game Developer", "IoT Engineer", "Robotics Engineer",
  "Computer Vision Engineer", "NLP Engineer", "Platform Engineer", "Security Engineer",
  "Technical Writer", "Solutions Architect"
];

// Job to recommended skills mapping
export const jobSkillMap: Record<string, string[]> = {
  "Software Engineer": ["Python", "JavaScript/TypeScript", "Java", "SQL & Databases", "DevOps/CI-CD"],
  "Data Scientist": ["Python", "SQL & Databases", "Machine Learning/AI", "Data Analysis", "Cloud Computing"],
  "ML Engineer": ["Python", "Machine Learning/AI", "Cloud Computing", "Data Analysis", "DevOps/CI-CD"],
  "Frontend Developer": ["JavaScript/TypeScript", "Web Development", "UI/UX Design", "Mobile Development"],
  "Backend Developer": ["Python", "Java", "SQL & Databases", "Cloud Computing", "DevOps/CI-CD"],
  "Full Stack Developer": ["JavaScript/TypeScript", "Python", "SQL & Databases", "Web Development", "Cloud Computing"],
  "DevOps Engineer": ["Cloud Computing", "DevOps/CI-CD", "Python", "Networking", "Cybersecurity"],
  "Cloud Architect": ["Cloud Computing", "Networking", "DevOps/CI-CD", "Cybersecurity", "SQL & Databases"],
  "Cybersecurity Analyst": ["Cybersecurity", "Networking", "Python", "Cloud Computing", "SQL & Databases"],
  "Data Analyst": ["SQL & Databases", "Python", "Data Analysis", "JavaScript/TypeScript"],
  "Mobile App Developer": ["Mobile Development", "JavaScript/TypeScript", "Java", "UI/UX Design"],
  "Embedded Systems Engineer": ["C/C++", "Embedded Systems", "Python", "Networking"],
  "Network Engineer": ["Networking", "Cybersecurity", "Cloud Computing", "Python"],
  "UI/UX Designer": ["UI/UX Design", "Web Development", "JavaScript/TypeScript", "Mobile Development"],
  "AI Research Scientist": ["Python", "Machine Learning/AI", "Data Analysis", "Cloud Computing"],
  "Site Reliability Engineer": ["DevOps/CI-CD", "Cloud Computing", "Python", "Networking"],
  "Database Administrator": ["SQL & Databases", "Cloud Computing", "Python", "Cybersecurity"],
  "Systems Architect": ["Cloud Computing", "Networking", "Java", "DevOps/CI-CD", "SQL & Databases"],
  "QA Engineer": ["Python", "JavaScript/TypeScript", "SQL & Databases", "DevOps/CI-CD"],
  "Product Manager (Tech)": ["Data Analysis", "SQL & Databases", "Web Development", "UI/UX Design"],
  "Blockchain Developer": ["JavaScript/TypeScript", "Python", "Cybersecurity", "Cloud Computing"],
  "Game Developer": ["C/C++", "JavaScript/TypeScript", "UI/UX Design", "Python"],
  "IoT Engineer": ["Embedded Systems", "Python", "Networking", "Cloud Computing"],
  "Robotics Engineer": ["C/C++", "Python", "Embedded Systems", "Machine Learning/AI"],
  "Computer Vision Engineer": ["Python", "Machine Learning/AI", "C/C++", "Data Analysis"],
  "NLP Engineer": ["Python", "Machine Learning/AI", "Data Analysis", "Cloud Computing"],
  "Platform Engineer": ["Cloud Computing", "DevOps/CI-CD", "Python", "Networking"],
  "Security Engineer": ["Cybersecurity", "Python", "Networking", "Cloud Computing", "DevOps/CI-CD"],
  "Technical Writer": ["Web Development", "Python", "UI/UX Design"],
  "Solutions Architect": ["Cloud Computing", "Networking", "SQL & Databases", "Java", "DevOps/CI-CD"],
};

// Personality type to job mapping
export const personalityJobMap: Record<string, string[]> = {
  "R": ["Software Engineer", "Backend Developer", "Embedded Systems Engineer", "DevOps Engineer", "Site Reliability Engineer", "QA Engineer", "IoT Engineer", "Robotics Engineer"],
  "I": ["Data Scientist", "AI Research Scientist", "ML Engineer", "Data Analyst", "Computer Vision Engineer", "NLP Engineer", "Systems Architect", "Solutions Architect"],
  "A": ["Frontend Developer", "UI/UX Designer", "Full Stack Developer", "Game Developer", "Mobile App Developer", "Technical Writer", "Blockchain Developer"],
  "S": ["Product Manager (Tech)", "Cloud Architect", "Network Engineer", "Platform Engineer", "Security Engineer", "Cybersecurity Analyst", "Database Administrator"],
};

// MCQ questions per skill
export function generateMCQs(skill: string): { question: string; options: string[]; correct: number; difficulty: 'easy' | 'medium' | 'hard' }[] {
  const questionBank: Record<string, { question: string; options: string[]; correct: number; difficulty: 'easy' | 'medium' | 'hard' }[]> = {
    "Python": [
      { question: "What is the output of print(type([]))?", options: ["<class 'list'>", "<class 'tuple'>", "<class 'dict'>", "<class 'set'>"], correct: 0, difficulty: "easy" },
      { question: "Which keyword is used to define a function in Python?", options: ["func", "def", "function", "define"], correct: 1, difficulty: "easy" },
      { question: "What does len() function do?", options: ["Returns length", "Returns type", "Returns sum", "Returns max"], correct: 0, difficulty: "easy" },
      { question: "Which is a mutable data type?", options: ["tuple", "str", "list", "int"], correct: 2, difficulty: "easy" },
      { question: "What is PEP 8?", options: ["A Python library", "A style guide", "A data type", "A framework"], correct: 1, difficulty: "easy" },
      { question: "What does *args do in a function?", options: ["Unpacks keyword arguments", "Accepts variable positional arguments", "Creates a generator", "Defines a decorator"], correct: 1, difficulty: "medium" },
      { question: "What is a list comprehension?", options: ["A way to sort lists", "A concise way to create lists", "A method to merge lists", "A type of loop"], correct: 1, difficulty: "medium" },
      { question: "What is the GIL in Python?", options: ["Global Import Lock", "Global Interpreter Lock", "General Input Layer", "Generic Interface Library"], correct: 1, difficulty: "medium" },
      { question: "What does the 'yield' keyword do?", options: ["Stops a function", "Creates a generator", "Returns a value", "Imports a module"], correct: 1, difficulty: "medium" },
      { question: "Which method is used to add to a set?", options: ["append()", "add()", "insert()", "push()"], correct: 1, difficulty: "medium" },
      { question: "What is a metaclass in Python?", options: ["A class that creates classes", "An abstract method", "A type of decorator", "A built-in function"], correct: 0, difficulty: "hard" },
      { question: "What is the difference between deepcopy and copy?", options: ["No difference", "deepcopy copies nested objects", "copy is faster", "deepcopy only works with lists"], correct: 1, difficulty: "hard" },
      { question: "What is monkey patching?", options: ["Fixing bugs", "Runtime modification of a class", "A design pattern", "Memory optimization"], correct: 1, difficulty: "hard" },
      { question: "What is a coroutine in Python?", options: ["A type of class", "A generalized subroutine for cooperative multitasking", "A sorting algorithm", "A file handler"], correct: 1, difficulty: "hard" },
      { question: "What does __slots__ do?", options: ["Creates time slots", "Restricts instance attributes for memory optimization", "Defines methods", "Creates iterators"], correct: 1, difficulty: "hard" },
    ],
    "JavaScript/TypeScript": [
      { question: "Which keyword declares a block-scoped variable?", options: ["var", "let", "both", "none"], correct: 1, difficulty: "easy" },
      { question: "What does === check?", options: ["Value only", "Type only", "Value and type", "Reference"], correct: 2, difficulty: "easy" },
      { question: "What is typeof null?", options: ["'null'", "'undefined'", "'object'", "'boolean'"], correct: 2, difficulty: "easy" },
      { question: "Which method adds an element to the end of an array?", options: ["push()", "pop()", "shift()", "unshift()"], correct: 0, difficulty: "easy" },
      { question: "What is NaN?", options: ["A number", "Not a Number", "Null", "Undefined"], correct: 1, difficulty: "easy" },
      { question: "What is a closure?", options: ["A syntax error", "A function with access to outer scope", "A type of loop", "An array method"], correct: 1, difficulty: "medium" },
      { question: "What does async/await do?", options: ["Creates threads", "Handles asynchronous operations", "Defines classes", "Creates events"], correct: 1, difficulty: "medium" },
      { question: "What is the event loop?", options: ["A for loop", "Handles async callbacks", "A DOM event", "A timer"], correct: 1, difficulty: "medium" },
      { question: "What is TypeScript's main advantage?", options: ["Speed", "Static type checking", "Smaller bundle", "No compilation"], correct: 1, difficulty: "medium" },
      { question: "What is destructuring?", options: ["Deleting objects", "Extracting values from objects/arrays", "Creating objects", "Merging arrays"], correct: 1, difficulty: "medium" },
      { question: "What is the Temporal Dead Zone?", options: ["Memory leak", "Period before let/const initialization", "Browser API", "Node.js feature"], correct: 1, difficulty: "hard" },
      { question: "What are generics in TypeScript?", options: ["Generic functions", "Reusable type-safe components", "Any type", "Global variables"], correct: 1, difficulty: "hard" },
      { question: "What is a WeakMap?", options: ["A slow Map", "A Map with weakly referenced keys", "A small Map", "A Map without methods"], correct: 1, difficulty: "hard" },
      { question: "What is covariance in TypeScript?", options: ["A math function", "Type compatibility in subtype direction", "Variable hoisting", "A module system"], correct: 1, difficulty: "hard" },
      { question: "What is the purpose of Symbol?", options: ["Math operations", "Create unique identifiers", "String manipulation", "Array indexing"], correct: 1, difficulty: "hard" },
    ],
  };

  // For skills without specific questions, generate generic ones
  if (!questionBank[skill]) {
    return Array.from({ length: 15 }, (_, i) => {
      const difficulty = i < 5 ? 'easy' as const : i < 10 ? 'medium' as const : 'hard' as const;
      return {
        question: `${skill} - Question ${i + 1} (${difficulty}): Which of the following best describes a ${difficulty}-level concept in ${skill}?`,
        options: [
          `Core ${skill} fundamental concept`,
          `Advanced ${skill} architecture pattern`,
          `${skill} optimization technique`,
          `${skill} debugging methodology`
        ],
        correct: difficulty === 'easy' ? 0 : difficulty === 'medium' ? 1 : 2,
        difficulty
      };
    });
  }

  return questionBank[skill];
}

export const certificationLinks: Record<string, { name: string; url: string; provider: string }[]> = {
  "Python": [
    { name: "Python (Basic)", url: "https://www.hackerrank.com/skills-verification/python_basic", provider: "HackerRank" },
    { name: "Google IT Automation with Python", url: "https://www.coursera.org/professional-certificates/google-it-automation", provider: "Google/Coursera" },
    { name: "Python Institute PCEP", url: "https://pythoninstitute.org/pcep", provider: "Python Institute" },
  ],
  "JavaScript/TypeScript": [
    { name: "JavaScript (Basic)", url: "https://www.hackerrank.com/skills-verification/javascript_basic", provider: "HackerRank" },
    { name: "freeCodeCamp JS Algorithms", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/", provider: "freeCodeCamp" },
  ],
  "Java": [
    { name: "Java (Basic)", url: "https://www.hackerrank.com/skills-verification/java_basic", provider: "HackerRank" },
    { name: "Google Associate Android Developer", url: "https://developers.google.com/certification/associate-android-developer", provider: "Google" },
  ],
  "SQL & Databases": [
    { name: "SQL (Basic)", url: "https://www.hackerrank.com/skills-verification/sql_basic", provider: "HackerRank" },
    { name: "SQL (Advanced)", url: "https://www.hackerrank.com/skills-verification/sql_advanced", provider: "HackerRank" },
  ],
  "Cloud Computing": [
    { name: "Google Cloud Digital Leader", url: "https://cloud.google.com/certification/cloud-digital-leader", provider: "Google" },
    { name: "AWS Cloud Practitioner (Free training)", url: "https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/", provider: "AWS" },
  ],
  "Machine Learning/AI": [
    { name: "Google Machine Learning Crash Course", url: "https://developers.google.com/machine-learning/crash-course", provider: "Google" },
    { name: "TensorFlow Developer Certificate", url: "https://www.tensorflow.org/certificate", provider: "Google" },
  ],
  "Web Development": [
    { name: "Responsive Web Design", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/", provider: "freeCodeCamp" },
    { name: "Google UX Design Certificate", url: "https://www.coursera.org/professional-certificates/google-ux-design", provider: "Google/Coursera" },
  ],
  "Cybersecurity": [
    { name: "Google Cybersecurity Certificate", url: "https://www.coursera.org/professional-certificates/google-cybersecurity", provider: "Google/Coursera" },
    { name: "Cybersecurity Essentials", url: "https://www.netacad.com/courses/cybersecurity/cybersecurity-essentials", provider: "Cisco" },
  ],
  "Data Analysis": [
    { name: "Google Data Analytics Certificate", url: "https://www.coursera.org/professional-certificates/google-data-analytics", provider: "Google/Coursera" },
    { name: "Problem Solving", url: "https://www.hackerrank.com/skills-verification/problem_solving_basic", provider: "HackerRank" },
  ],
  "DevOps/CI-CD": [
    { name: "Google Cloud DevOps Engineer", url: "https://cloud.google.com/certification/cloud-devops-engineer", provider: "Google" },
    { name: "Docker Essentials", url: "https://www.docker.com/get-started/", provider: "Docker" },
  ],
  "Mobile Development": [
    { name: "Associate Android Developer", url: "https://developers.google.com/certification/associate-android-developer", provider: "Google" },
    { name: "React Native (freeCodeCamp)", url: "https://www.freecodecamp.org/news/tag/react-native/", provider: "freeCodeCamp" },
  ],
  "C/C++": [
    { name: "C (Basic)", url: "https://www.hackerrank.com/skills-verification/c_basic", provider: "HackerRank" },
    { name: "C++ Institute CPA", url: "https://cppinstitute.org/cpa-c-certified-associate-programmer-certification", provider: "C++ Institute" },
  ],
  "Networking": [
    { name: "Networking Essentials", url: "https://www.netacad.com/courses/networking/networking-essentials", provider: "Cisco" },
    { name: "Google IT Support Certificate", url: "https://www.coursera.org/professional-certificates/google-it-support", provider: "Google/Coursera" },
  ],
  "Embedded Systems": [
    { name: "Introduction to Embedded Systems", url: "https://www.coursera.org/learn/introduction-embedded-systems", provider: "Coursera" },
  ],
  "UI/UX Design": [
    { name: "Google UX Design Certificate", url: "https://www.coursera.org/professional-certificates/google-ux-design", provider: "Google/Coursera" },
    { name: "freeCodeCamp Responsive Design", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/", provider: "freeCodeCamp" },
  ],
};
