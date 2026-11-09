import { c as parseToken, o as parseCode, s as parseCreateInput } from "./poll-qphCWIbR.mjs";
import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/polls.functions-B3LD6Wbo.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function makeCode() {
	const bytes = /* @__PURE__ */ new Uint8Array(6);
	crypto.getRandomValues(bytes);
	return Array.from(bytes, (byte) => CODE_ALPHABET[byte % 32]).join("");
}
function isUniqueViolation(error) {
	const message = error instanceof Error ? error.message : String(error);
	return /duplicate|unique/i.test(message);
}
async function readPoll(code, voterToken) {
	const { getSql } = await import("./db-By-8pUDL.mjs");
	const sql = await getSql();
	const poll = (await sql`
    select id, question from polls where id = ${code}
  `)[0];
	if (!poll) return null;
	const options = await sql`
    select id, label, position
    from poll_options
    where poll_id = ${code}
    order by position asc
  `;
	const counts = await sql`
    select option_id, count(*) as votes
    from poll_votes
    where poll_id = ${code}
    group by option_id
  `;
	const byOption = new Map(counts.map((row) => [row.option_id, Number(row.votes)]));
	let myOptionId = null;
	if (voterToken) myOptionId = (await sql`
      select option_id from poll_votes
      where poll_id = ${code} and voter_token = ${voterToken}
      limit 1
    `)[0]?.option_id ?? null;
	return {
		code: poll.id,
		question: poll.question,
		myOptionId,
		options: options.map((option) => ({
			id: option.id,
			label: option.label,
			votes: byOption.get(option.id) ?? 0
		}))
	};
}
var createPoll_createServerFn_handler = createServerRpc({
	id: "af38cadff5271c6609c77fec0328227f7da21e45d84401471c3293531c7eca68",
	name: "createPoll",
	filename: "src/lib/polls.functions.ts"
}, (opts) => createPoll.__executeServer(opts));
var createPoll = createServerFn({ method: "POST" }).validator((input) => parseCreateInput(input)).handler(createPoll_createServerFn_handler, async ({ data }) => {
	const { getSql } = await import("./db-By-8pUDL.mjs");
	const sql = await getSql();
	const hostToken = crypto.randomUUID();
	for (let attempt = 0; attempt < 5; attempt += 1) {
		const code = makeCode();
		try {
			await sql`
          insert into polls (id, question, host_token)
          values (${code}, ${data.question}, ${hostToken})
        `;
			try {
				for (let index = 0; index < data.options.length; index += 1) {
					const label = data.options[index] ?? "";
					await sql`
              insert into poll_options (id, poll_id, label, position)
              values (${crypto.randomUUID()}, ${code}, ${label}, ${index})
            `;
				}
			} catch (error) {
				await sql`delete from polls where id = ${code}`;
				throw error;
			}
			const poll = await readPoll(code, null);
			if (!poll) throw new Error("The poll did not open. Try again.");
			return {
				poll,
				hostToken
			};
		} catch (error) {
			if (!isUniqueViolation(error) || attempt === 4) throw error;
		}
	}
	throw new Error("The poll did not open. Try again.");
});
var getPoll_createServerFn_handler = createServerRpc({
	id: "b5322e4c6e8c5c0415537fc5edf42d62cb3ea8088ed3ff657752efc798fd79f5",
	name: "getPoll",
	filename: "src/lib/polls.functions.ts"
}, (opts) => getPoll.__executeServer(opts));
var getPoll = createServerFn({ method: "POST" }).validator((input) => {
	if (!input || typeof input !== "object") throw new Error("Enter a poll code.");
	const raw = input;
	return {
		code: parseCode(raw.code),
		voterToken: raw.voterToken ? parseToken(raw.voterToken, "voter") : null
	};
}).handler(getPoll_createServerFn_handler, async ({ data }) => readPoll(data.code, data.voterToken));
var castVote_createServerFn_handler = createServerRpc({
	id: "b14445d5fbda067040a7ff38ab8864227f5bb9abc7ef09e03f79f0c705101156",
	name: "castVote",
	filename: "src/lib/polls.functions.ts"
}, (opts) => castVote.__executeServer(opts));
var castVote = createServerFn({ method: "POST" }).validator((input) => {
	if (!input || typeof input !== "object") throw new Error("That vote could not be read.");
	const raw = input;
	const optionId = typeof raw.optionId === "string" ? raw.optionId.trim() : "";
	if (!/^[0-9a-f-]{36}$/i.test(optionId)) throw new Error("Pick a choice on this poll.");
	return {
		code: parseCode(raw.code),
		optionId,
		voterToken: parseToken(raw.voterToken, "voter")
	};
}).handler(castVote_createServerFn_handler, async ({ data }) => {
	const { getSql } = await import("./db-By-8pUDL.mjs");
	const inserted = await (await getSql())`
      insert into poll_votes (id, poll_id, option_id, voter_token)
      select ${crypto.randomUUID()}, p.id, o.id, ${data.voterToken}
      from polls p
      join poll_options o on o.poll_id = p.id
      where p.id = ${data.code} and o.id = ${data.optionId}
      on conflict (poll_id, voter_token) do nothing
      returning option_id
    `;
	const poll = await readPoll(data.code, data.voterToken);
	if (!poll) throw new Error("That poll is not open.");
	if (inserted.length === 0 && !poll.myOptionId) throw new Error("Pick a choice on this poll.");
	return poll;
});
var resetPoll_createServerFn_handler = createServerRpc({
	id: "edcb2dc5b59a302237d4f44293463fb9d5218efea4ed055b2ca02a39bd54dfba",
	name: "resetPoll",
	filename: "src/lib/polls.functions.ts"
}, (opts) => resetPoll.__executeServer(opts));
var resetPoll = createServerFn({ method: "POST" }).validator((input) => {
	if (!input || typeof input !== "object") throw new Error("That reset could not be read.");
	const raw = input;
	return {
		code: parseCode(raw.code),
		hostToken: parseToken(raw.hostToken, "host")
	};
}).handler(resetPoll_createServerFn_handler, async ({ data }) => {
	const { getSql } = await import("./db-By-8pUDL.mjs");
	const sql = await getSql();
	if (!(await sql`
      select id from polls where id = ${data.code} and host_token = ${data.hostToken}
    `)[0]) throw new Error("Only the phone that started this poll can reset it.");
	await sql`delete from poll_votes where poll_id = ${data.code}`;
	const poll = await readPoll(data.code, null);
	if (!poll) throw new Error("That poll is not open.");
	return poll;
});
//#endregion
export { castVote_createServerFn_handler, createPoll_createServerFn_handler, getPoll_createServerFn_handler, resetPoll_createServerFn_handler };
