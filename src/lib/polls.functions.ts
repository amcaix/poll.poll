import { createServerFn } from "@tanstack/react-start";
import {
  parseCode,
  parseCreateInput,
  parseToken,
  type PollSnapshot,
} from "@/lib/poll";

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

type CountRow = { option_id: string; votes: number };
type OptionRow = { id: string; label: string; position: number };

function makeCode(): string {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => CODE_ALPHABET[byte % CODE_ALPHABET.length]).join("");
}

function isUniqueViolation(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /duplicate|unique/i.test(message);
}

async function readPoll(code: string, voterToken: string | null): Promise<PollSnapshot | null> {
  const { getSql } = await import("@/lib/db");
  const sql = await getSql();
  const polls = await sql<{ id: string; question: string }>`
    select id, question from polls where id = ${code}
  `;
  const poll = polls[0];
  if (!poll) return null;

  const options = await sql<OptionRow>`
    select id, label, position
    from poll_options
    where poll_id = ${code}
    order by position asc
  `;
  const counts = await sql<CountRow>`
    select option_id, count(*) as votes
    from poll_votes
    where poll_id = ${code}
    group by option_id
  `;
  const byOption = new Map(counts.map((row) => [row.option_id, Number(row.votes)]));

  let myOptionId: string | null = null;
  if (voterToken) {
    const mine = await sql<{ option_id: string }>`
      select option_id from poll_votes
      where poll_id = ${code} and voter_token = ${voterToken}
      limit 1
    `;
    myOptionId = mine[0]?.option_id ?? null;
  }

  return {
    code: poll.id,
    question: poll.question,
    myOptionId,
    options: options.map((option) => ({
      id: option.id,
      label: option.label,
      votes: byOption.get(option.id) ?? 0,
    })),
  };
}

export const createPoll = createServerFn({ method: "POST" })
  .validator((input: unknown) => parseCreateInput(input))
  .handler(async ({ data }) => {
    const { getSql } = await import("@/lib/db");
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
        return { poll, hostToken };
      } catch (error) {
        if (!isUniqueViolation(error) || attempt === 4) throw error;
      }
    }
    throw new Error("The poll did not open. Try again.");
  });

export const getPoll = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    if (!input || typeof input !== "object") throw new Error("Enter a poll code.");
    const raw = input as { code?: unknown; voterToken?: unknown };
    return {
      code: parseCode(raw.code),
      voterToken: raw.voterToken ? parseToken(raw.voterToken, "voter") : null,
    };
  })
  .handler(async ({ data }) => readPoll(data.code, data.voterToken));

export const castVote = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    if (!input || typeof input !== "object") throw new Error("That vote could not be read.");
    const raw = input as { code?: unknown; optionId?: unknown; voterToken?: unknown };
    const optionId = typeof raw.optionId === "string" ? raw.optionId.trim() : "";
    if (!/^[0-9a-f-]{36}$/i.test(optionId)) throw new Error("Pick a choice on this poll.");
    return {
      code: parseCode(raw.code),
      optionId,
      voterToken: parseToken(raw.voterToken, "voter"),
    };
  })
  .handler(async ({ data }) => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const inserted = await sql<{ option_id: string }>`
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
    if (inserted.length === 0 && !poll.myOptionId) {
      throw new Error("Pick a choice on this poll.");
    }
    return poll;
  });

export const resetPoll = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    if (!input || typeof input !== "object") throw new Error("That reset could not be read.");
    const raw = input as { code?: unknown; hostToken?: unknown };
    return {
      code: parseCode(raw.code),
      hostToken: parseToken(raw.hostToken, "host"),
    };
  })
  .handler(async ({ data }) => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const hosts = await sql<{ id: string }>`
      select id from polls where id = ${data.code} and host_token = ${data.hostToken}
    `;
    if (!hosts[0]) throw new Error("Only the phone that started this poll can reset it.");
    await sql`delete from poll_votes where poll_id = ${data.code}`;
    const poll = await readPoll(data.code, null);
    if (!poll) throw new Error("That poll is not open.");
    return poll;
  });
