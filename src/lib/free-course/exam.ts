// SERVER ONLY. Holds the answer key, so never import this from a "use client" file.
// Every question is drawn from the NIFS ES course document; no outside facts.

export const EXAM_MINUTES = 10;
export const GRACE_MS = 15_000;
export const EXAM_MS = EXAM_MINUTES * 60_000;

type Q = { q: string; o: [string, string, string, string]; a: number };

// a = index of the correct option in `o` (order is shuffled per attempt before it reaches the student).
const BANK: Q[] = [
  { q: "Ergonomics is best described as:", o: ["Making the person adapt to fit the task", "Fitting the task to the person", "Reducing the number of workers on a task", "A type of exercise programme"], a: 1 },
  { q: "Another name for ergonomics is:", o: ["Human factors engineering", "Industrial accounting", "Occupational law", "Process chemistry"], a: 0 },
  { q: "Ergonomics aims to reduce which of the following?", o: ["Lighting in the workplace", "Work-related musculoskeletal disorders, fatigue and discomfort", "The need for breaks", "The number of tools at a workstation"], a: 1 },
  { q: "Which set lists the four ergonomic factors?", o: ["Body posture, movement, environmental factors, information processing", "Speed, cost, quality, delivery", "Height, weight, age, gender", "Noise, colour, layout, branding"], a: 0 },
  { q: "Which of these is an ergonomic-related disorder?", o: ["Cumulative trauma disorders", "Food poisoning", "Colour blindness", "Common cold"], a: 0 },
  { q: "Which of the following is a common symptom of an MSD?", o: ["Increased range of motion", "Numbness or tingling", "Improved strength", "Reduced fatigue"], a: 1 },
  { q: "Clicking, popping or grinding joint sounds are called:", o: ["Tenderness", "Stiffness", "Crepitus", "Swelling"], a: 2 },
  { q: "Maintaining a neutral posture means:", o: ["Working in natural, relaxed positions and avoiding awkward angles", "Holding one position as long as possible", "Keeping the wrist bent for precision", "Standing on one leg"], a: 0 },
  { q: "To reduce excessive force you should:", o: ["Lift faster", "Use larger muscles, mechanical assists or ask for help", "Use only the fingers", "Skip breaks"], a: 1 },
  { q: "Static load can be reduced by:", o: ["Holding the same position for longer", "Using jigs or clamps to reduce manual positioning", "Working faster", "Working in dim light"], a: 1 },
  { q: "Contact stress refers to:", o: ["Arguments between co-workers", "Hard or sharp surfaces pressing on the body, restricting nerves and blood flow", "Pressure to meet deadlines", "Stress from a long commute"], a: 1 },
  { q: "To allow for movement and stretching, workplaces should:", o: ["Remove all breaks", "Incorporate breaks, exercise and position changes", "Fix workers in one position", "Increase repetition"], a: 1 },
  { q: "A comfortable work environment is achieved by controlling:", o: ["Lighting (avoid glare), temperature, noise and vibration", "Only the colour of the walls", "Only the number of workers", "Only the working hours"], a: 0 },
  { q: "A desk is too high, so a worker keeps shrugging to type. What would ergonomics do?", o: ["Fit the desk to the worker", "Train the worker to shrug less", "Give the worker longer shifts", "Remove the desk"], a: 0 },
  { q: "A warehouse worker lifts boxes all day. Which item applies most directly?", o: ["Material handling equipment", "Colour of the walls", "Company logo design", "Canteen menu"], a: 0 },
  { q: "A packer repeats the same wrist motion 800 times a shift. Which hazard is this?", o: ["Repetitive movements", "Extreme temperatures", "Inadequate lighting", "Vibration"], a: 0 },
  { q: "Your wrist has been tingling for weeks after long typing sessions. What does this course say to do?", o: ["Report it early, before it becomes serious", "Wait until it stops on its own", "Ignore it if it improves with rest", "Change jobs immediately"], a: 0 },
  { q: "You use a stapler all day. Where should it sit?", o: ["Within easy reach, inside the power zone", "On the top shelf to save desk space", "On the floor under the desk", "In a locked drawer"], a: 0 },
  { q: "Fewer absences and fewer compensation claims fall under which benefit?", o: ["Lower direct and indirect costs", "Better posture and body mechanics", "Early preparedness and hazard reporting", "Longer working hours"], a: 0 },
  { q: "Which of these is a skill you gain from this course?", o: ["Identify ergonomic hazards in workstations", "Repair industrial machinery", "Prescribe medicines", "Design fire engines"], a: 0 },
];

export const TOTAL = BANK.length;

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: T[], rand: () => number): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export type PublicQuestion = { id: number; q: string; options: { i: number; t: string }[] };

/** Same seed => same question order and option order, so a refresh resumes identically. Contains no answers. */
export function buildExam(seed: number): PublicQuestion[] {
  const rand = rng(seed);
  return shuffle(BANK.map((_, id) => id), rand).map((id) => ({
    id,
    q: BANK[id].q,
    options: shuffle([0, 1, 2, 3], rand).map((i) => ({ i, t: BANK[id].o[i] })),
  }));
}

/** answers: questionId -> chosen original option index. Unanswered/invalid count as wrong. */
export function scoreExam(answers: Record<string, number>): number {
  return BANK.reduce((n, item, id) => n + (answers[String(id)] === item.a ? 1 : 0), 0);
}

export function answeredCount(answers: Record<string, number>): number {
  return BANK.reduce((n, _, id) => n + (Number.isInteger(answers[String(id)]) && answers[String(id)] >= 0 && answers[String(id)] <= 3 ? 1 : 0), 0);
}

export function deadline(startedAt: Date): number {
  return startedAt.getTime() + EXAM_MS;
}
