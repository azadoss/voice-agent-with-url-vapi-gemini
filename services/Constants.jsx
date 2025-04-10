import {
  LayoutDashboard,
  Calendar,
  Settings,
  CreditCard,
  Logs,
  Briefcase,
  BriefcaseBusiness,
  Star,
  Bot,
  Handshake,
  Component,
  Ratio,
  Code2Icon,
  User2Icon,
  UserRoundSearch,
} from "lucide-react";

export const SideBarOptions = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    label: "Scheduled",
    icon: Calendar,
    path: "/scheduled",
  },
  {
    label: "Library",
    icon: Logs,
    path: "/library",
  },
  {
    label: "Billing",
    icon: CreditCard,
    path: "/billing",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export const AgentType = [
  {
    label: "Screening",
    value: "screening",
    icon: UserRoundSearch,
  },
  {
    label: "Technical",
    value: "technical",
    icon: Code2Icon,
  },
  {
    label: "Behavioral",
    value: "behavioral",
    icon: User2Icon,
  },
  {
    label: "Experience",
    value: "experience",
    icon: Briefcase,
  },
  {
    label: "Problem Solving",
    value: "problem-solving",
    icon: Ratio,
  },
  {
    label: "Leadership",
    value: "leadership",
    icon: BriefcaseBusiness,
  },
  {
    label: "Product",
    value: "product",
    icon: Component,
  },
  {
    label: "Sales",
    value: "sales",
    icon: Handshake,
  },
  {
    label: "Marketing",
    value: "marketing",
    icon: BriefcaseBusiness,
  },
  {
    label: "Customer Support",
    value: "customer-support",
    icon: Star,
  },
  {
    label: "HR",
    value: "hr",
    icon: BriefcaseBusiness,
  },
  {
    label: "Other",
    value: "other",
    icon: Bot,
  },
];

// export const LLM_MODEL = "google/gemini-2.5-pro-exp-03-25:free";
export const LLM_MODEL = "google/gemini-2.0-flash-exp:free";

export const QUESTIONS_PROMPT = `You are an expert recruiter.
Based on the following inputs, generate a well-structured list of high-quality interview questions:

Job Title: {{title}}

Job Description: {{description}}

Interview Duration: {{duration}}

Interview Type: {{type}},

Your task:

Analyze the job description to identify key responsibilities, required skills, and expected experience.
Generate at least 10 list of interview questions depends on interview duration
Adjust the number and depth of questions to match the interview duration.
Ensure the questions match the tone and structure of a real-life {{type}} interview.
Format your response in JSON format with array list of questions.
format: interviewQuestions=[
{
  question:'',
  type:'Technical/Behavioral/Experince/Problem Solving/Leaseship'
},{
...
}]
The goal is to create a structured, relevant, and time-optimized interview plan for a {{Title)} role.`

export const RECRUITER_PROMPT = `
# ROLE: Expert AI Recruiter & Interview Planner

# CONTEXT:
You are an expert AI Recruiter specializing in crafting effective interview question sets. Your task is to generate a structured list of interview questions for an upcoming interview conducted by an AI voice agent.

# INPUTS:
- Job Title: {{title}}
- Job Description: {{description}}
- Interview Duration: {{duration}} (e.g., "15 minutes", "30 minutes", "45 minutes", "60 minutes")
- Interview Type: {{type}} (e.g., "Screening", "Technical", "Behavioral", "Situational", "Leadership", "Final Round")

# TASK:
1.  **Analyze Job Requirements:** Carefully parse the provided {{description}} to identify:
    *   Core responsibilities and duties.
    *   Essential hard skills (e.g., software, languages, tools).
    *   Key soft skills (e.g., communication, teamwork, problem-solving).
    *   Required and preferred experience levels/types.
    *   Company culture cues (if any).
2.  **Generate Targeted Questions:** Create a list of high-quality interview questions specifically tailored to assess the candidate's suitability for the {{title}} role based on your analysis.
3.  **Adapt to Interview Constraints:**
    *   **Duration of interview:** Adjust the *number* and *depth* of questions.
        *   **Short (e.g., 15-20 min):** Focus on 5-7 high-level questions covering critical requirements, eligibility, and motivation. Primarily screening/experience-based.
        *   **Medium (e.g., 30-45 min):** Aim for 8-12 questions, allowing for a mix of behavioral, experiential, and potentially introductory technical/situational questions.
        *   **Long (e.g., 60+ min):** Generate 12-18+ questions, enabling deeper dives into technical skills, complex behavioral scenarios, problem-solving, and leadership (as appropriate for the role/type).
    *   **Type of interview:** Ensure the question style matches the interview's focus.
        *   **Screening:** Basic eligibility, interest validation, high-level experience overview.
        *   **Technical:** Skill validation, problem-solving related to specific tools/concepts mentioned in the JD.
        *   **Behavioral:** STAR method questions (Situation, Task, Action, Result) probing past behavior related to required competencies.
        *   **Situational:** Hypothetical scenarios relevant to the job's challenges.
        *   **Leadership:** Questions exploring influence, team management, strategic thinking (for relevant roles).
4.  **Categorize Questions:** For each question, assign a relevant type from categories like: "Behavioral", "Technical", "Experience", "Situational", "Motivational", "Problem Solving", "Leadership", "Cultural Fit".
5.  **Ensure Clarity for Voice Agent:** Phrase questions clearly, concisely, and professionally, suitable for delivery by an AI voice agent in a natural conversational flow. Avoid overly complex or multi-part questions where possible, or break them down logically.

# OUTPUT FORMAT:
Strictly return ONLY a valid JSON object. The value of this key must be an array of JSON objects. Each object in the array represents a single interview question and must have the following two keys:
*   question: (String) The text of the interview question.
*   type: (String) The category of the question (e.g., "Behavioral", "Technical", "Experience", "Situational", "Motivational").

# EXAMPLE OUTPUT STRUCTURE:

{
  "interviewQuestions": [
    {
      "question": "Can you walk me through your experience with [Specific Skill from JD]?",
      "type": "Experience"
    },
    {
      "question": "Tell me about a time you had to manage conflicting priorities. How did you decide what to focus on?",
      "type": "Behavioral"
    },
    {
      "question": "How would you approach debugging a [Specific Technical Problem related to JD]?",
      "type": "Technical"
    },
    {
      "question": "What motivates you to apply for this specific {{title}} role at our company?",
      "type": "Motivational"
    }
    // ... more questions depending on duration and type
  ]
}

# GOAL:
Produce a well-structured, relevant, and time-optimized set of interview questions for the specified job role {{title}} and interview parameters, ready for use by an AI voice interviewer.
`
