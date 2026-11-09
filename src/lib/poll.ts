export type PollOption = {
  id: string;
  label: string;
  votes: number;
};

export type PollSnapshot = {
  code: string;
  question: string;
  options: PollOption[];
  myOptionId: string | null;
};

export const MIN_OPTIONS = 2;
export const MAX_OPTIONS = 6;
export const CODE_LENGTH = 6;

export const SAMPLE_QUESTION = "Best way to spend a rainy Saturday?";
export const SAMPLE_LABELS = [
  "Bake something new",
  "Read under a blanket",
  "Build a living-room fort",
  "Play a board game",
];

export function totalVotes(options: PollOption[]): number {
  return options.reduce((sum, option) => sum + option.votes, 0);
}

/** Largest-remainder percentages so labels always sum to 100 when there are votes. */
export function votePercents(options: PollOption[]): number[] {
  const votes = options.map((option) => option.votes);
  const total = votes.reduce((sum, value) => sum + value, 0);
  if (total === 0) return votes.map(() => 0);

  const raw = votes.map((value) => (value / total) * 100);
  const floored = raw.map(Math.floor);
  let remainder = 100 - floored.reduce((sum, value) => sum + value, 0);
  const order = raw
    .map((value, index) => ({ index, frac: value - Math.floor(value) }))
    .sort((a, b) => b.frac - a.frac);

  const result = [...floored];
  for (let i = 0; i < remainder; i += 1) {
    const target = order[i];
    if (target) result[target.index] += 1;
  }
  return result;
}

export function leadingOptionIds(options: PollOption[]): string[] {
  const max = Math.max(...options.map((option) => option.votes), 0);
  if (max <= 0) return [];
  return options.filter((option) => option.votes === max).map((option) => option.id);
}

export function optionLetter(index: number): string {
  return String.fromCharCode(65 + index);
}

export function extractCode(raw: string): string {
  const upper = raw.trim().toUpperCase();
  const fromPath = upper.match(/\/P\/([A-Z0-9]{6})(?:\b|\/|$)/);
  if (fromPath?.[1]) return fromPath[1];
  return upper.replace(/[^A-Z0-9]/g, "").slice(0, CODE_LENGTH);
}

export function parseCreateInput(input: unknown): { question: string; options: string[] } {
  if (!input || typeof input !== "object") {
    throw new Error("That poll could not be read.");
  }
  const raw = input as { question?: unknown; options?: unknown };
  const question = typeof raw.question === "string" ? raw.question.trim() : "";
  if (question.length < 4 || question.length > 140) {
    throw new Error("Write a question the room can answer.");
  }
  if (!Array.isArray(raw.options)) {
    throw new Error("Add at least two choices.");
  }
  const options = raw.options
    .filter((label): label is string => typeof label === "string")
    .map((label) => label.trim())
    .filter(Boolean)
    .slice(0, MAX_OPTIONS);
  if (options.length < MIN_OPTIONS) {
    throw new Error("Add at least two choices.");
  }
  if (options.some((label) => label.length > 60)) {
    throw new Error("Keep each choice under 60 characters.");
  }
  const unique = new Set(options.map((label) => label.toLowerCase()));
  if (unique.size !== options.length) {
    throw new Error("Each choice needs a different label.");
  }
  return { question, options };
}

const TOKEN_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function parseToken(value: unknown, label: string): string {
  if (typeof value !== "string" || !TOKEN_RE.test(value)) {
    throw new Error(`Missing ${label}.`);
  }
  return value.toLowerCase();
}

export function parseCode(value: unknown): string {
  if (typeof value !== "string") throw new Error("Enter a poll code.");
  const code = extractCode(value);
  if (code.length !== CODE_LENGTH) throw new Error("Enter the 6-character poll code.");
  return code;
}
