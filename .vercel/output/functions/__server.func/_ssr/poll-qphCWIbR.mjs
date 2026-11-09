//#region node_modules/.nitro/vite/services/ssr/assets/poll-qphCWIbR.js
var SAMPLE_QUESTION = "Best way to spend a rainy Saturday?";
var SAMPLE_LABELS = [
	"Bake something new",
	"Read under a blanket",
	"Build a living-room fort",
	"Play a board game"
];
function totalVotes(options) {
	return options.reduce((sum, option) => sum + option.votes, 0);
}
/** Largest-remainder percentages so labels always sum to 100 when there are votes. */
function votePercents(options) {
	const votes = options.map((option) => option.votes);
	const total = votes.reduce((sum, value) => sum + value, 0);
	if (total === 0) return votes.map(() => 0);
	const raw = votes.map((value) => value / total * 100);
	const floored = raw.map(Math.floor);
	let remainder = 100 - floored.reduce((sum, value) => sum + value, 0);
	const order = raw.map((value, index) => ({
		index,
		frac: value - Math.floor(value)
	})).sort((a, b) => b.frac - a.frac);
	const result = [...floored];
	for (let i = 0; i < remainder; i += 1) {
		const target = order[i];
		if (target) result[target.index] += 1;
	}
	return result;
}
function leadingOptionIds(options) {
	const max = Math.max(...options.map((option) => option.votes), 0);
	if (max <= 0) return [];
	return options.filter((option) => option.votes === max).map((option) => option.id);
}
function optionLetter(index) {
	return String.fromCharCode(65 + index);
}
function extractCode(raw) {
	const upper = raw.trim().toUpperCase();
	const fromPath = upper.match(/\/P\/([A-Z0-9]{6})(?:\b|\/|$)/);
	if (fromPath?.[1]) return fromPath[1];
	return upper.replace(/[^A-Z0-9]/g, "").slice(0, 6);
}
function parseCreateInput(input) {
	if (!input || typeof input !== "object") throw new Error("That poll could not be read.");
	const raw = input;
	const question = typeof raw.question === "string" ? raw.question.trim() : "";
	if (question.length < 4 || question.length > 140) throw new Error("Write a question the room can answer.");
	if (!Array.isArray(raw.options)) throw new Error("Add at least two choices.");
	const options = raw.options.filter((label) => typeof label === "string").map((label) => label.trim()).filter(Boolean).slice(0, 6);
	if (options.length < 2) throw new Error("Add at least two choices.");
	if (options.some((label) => label.length > 60)) throw new Error("Keep each choice under 60 characters.");
	if (new Set(options.map((label) => label.toLowerCase())).size !== options.length) throw new Error("Each choice needs a different label.");
	return {
		question,
		options
	};
}
var TOKEN_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function parseToken(value, label) {
	if (typeof value !== "string" || !TOKEN_RE.test(value)) throw new Error(`Missing ${label}.`);
	return value.toLowerCase();
}
function parseCode(value) {
	if (typeof value !== "string") throw new Error("Enter a poll code.");
	const code = extractCode(value);
	if (code.length !== 6) throw new Error("Enter the 6-character poll code.");
	return code;
}
//#endregion
export { optionLetter as a, parseToken as c, leadingOptionIds as i, totalVotes as l, SAMPLE_QUESTION as n, parseCode as o, extractCode as r, parseCreateInput as s, SAMPLE_LABELS as t, votePercents as u };
