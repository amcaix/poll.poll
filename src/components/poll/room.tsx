import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Copy, RotateCcw, Share2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { OptionRow } from "@/components/poll/option-row";
import { PollShell } from "@/components/poll/shell";
import { getVoterToken, readHostToken } from "@/lib/poll-client";
import { extractCode, leadingOptionIds, totalVotes, votePercents, type PollSnapshot } from "@/lib/poll";
import { castVote, getPoll, resetPoll } from "@/lib/polls.functions";

type RoomStatus = "loading" | "ready" | "missing" | "error";

function messageFrom(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}

export function PollRoom({ code }: { code: string }) {
  const normalized = extractCode(code);
  const [status, setStatus] = useState<RoomStatus>("loading");
  const [poll, setPoll] = useState<PollSnapshot | null>(null);
  const [isHost, setIsHost] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [origin, setOrigin] = useState("");
  const busyRef = useRef(false);

  const load = useCallback(async () => {
    if (normalized.length !== 6) {
      setStatus("missing");
      return;
    }
    const snapshot = await getPoll({
      data: { code: normalized, voterToken: getVoterToken() },
    });
    if (!snapshot) {
      setPoll(null);
      setStatus("missing");
      return;
    }
    setPoll(snapshot);
    setStatus("ready");
    setError(null);
  }, [normalized]);

  useEffect(() => {
    setOrigin(window.location.origin);
    setIsHost(Boolean(readHostToken(normalized)));
  }, [normalized]);

  useEffect(() => {
    let stop = false;
    const tick = async () => {
      if (busyRef.current || document.hidden) return;
      try {
        await load();
      } catch (caught) {
        if (stop) return;
        setPoll((current) => {
          if (!current) setStatus("error");
          return current;
        });
        setError(messageFrom(caught, "Could not refresh the poll."));
      }
    };
    void tick();
    const id = window.setInterval(() => {
      void tick();
    }, 1500);
    return () => {
      stop = true;
      window.clearInterval(id);
    };
  }, [load]);

  const shareUrl = `${origin}/p/${normalized}`;
  const total = poll ? totalVotes(poll.options) : 0;
  const percents = poll ? votePercents(poll.options) : [];
  const leaders = poll ? leadingOptionIds(poll.options) : [];
  const uniqueLead = leaders.length === 1 ? leaders[0] : null;
  const votedLabel = poll?.options.find((option) => option.id === poll.myOptionId)?.label;

  async function vote(optionId: string) {
    if (!poll || poll.myOptionId || busyRef.current) return;
    busyRef.current = true;
    setBusy(true);
    setError(null);
    setPoll({
      ...poll,
      myOptionId: optionId,
      options: poll.options.map((option) =>
        option.id === optionId ? { ...option, votes: option.votes + 1 } : option,
      ),
    });
    try {
      const next = await castVote({
        data: { code: normalized, optionId, voterToken: getVoterToken() },
      });
      setPoll(next);
    } catch (caught) {
      setError(messageFrom(caught, "That vote did not go through."));
      try {
        await load();
      } catch {
        // The optimistic vote stays until the next refresh.
      }
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  }

  async function share() {
    const url = `${window.location.origin}/p/${normalized}`;
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: poll?.question ?? "Show of Hands",
          text: "Vote in this poll. One vote per phone.",
          url,
        });
        return;
      } catch (caught) {
        if (caught instanceof Error && caught.name === "AbortError") return;
      }
    }
    await copyLink();
  }

  async function copyLink() {
    const url = `${window.location.origin}/p/${normalized}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Copy the link below and send it.");
    }
  }

  async function reset() {
    const hostToken = readHostToken(normalized);
    if (!hostToken) return;
    busyRef.current = true;
    setBusy(true);
    setError(null);
    try {
      const next = await resetPoll({ data: { code: normalized, hostToken } });
      setPoll({ ...next, myOptionId: null });
      setConfirmReset(false);
    } catch (caught) {
      setError(messageFrom(caught, "The votes could not be cleared."));
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  }

  return (
    <PollShell
      action={
        <Link to="/" className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground">
          New question
        </Link>
      }
    >
      {status === "loading" && !poll ? (
        <p className="text-base text-muted-foreground">Opening the poll…</p>
      ) : null}

      {status === "missing" ? (
        <div className="flex flex-col gap-4">
          <h1 className="font-display text-3xl font-medium tracking-tight">No poll with that code</h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Check the 6 characters and try again, or start a new question.
          </p>
          <Button asChild className="w-full sm:w-auto">
            <Link to="/">Back home</Link>
          </Button>
        </div>
      ) : null}

      {status === "error" && !poll ? (
        <div className="flex flex-col gap-4">
          <h1 className="font-display text-3xl font-medium tracking-tight">The poll did not load</h1>
          <p className="text-sm leading-relaxed text-muted-foreground">{error}</p>
          <Button type="button" className="w-full sm:w-auto" onClick={() => void load()}>
            Try again
          </Button>
        </div>
      ) : null}

      {poll ? (
        <div className="flex flex-col gap-8">
          <header className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
                Live poll
              </p>
              <p className="flex items-center gap-2 text-sm text-muted-foreground" aria-live="polite">
                <span className="relative flex size-2" aria-hidden>
                  <span className="live-ping absolute inline-flex size-full rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
                <span className="tabular-nums font-medium text-foreground">
                  {total} {total === 1 ? "vote" : "votes"}
                </span>
              </p>
            </div>
            <h1 className="font-display text-3xl leading-tight font-medium tracking-tight text-foreground sm:text-4xl">
              {poll.question}
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {votedLabel
                ? `You voted for ${votedLabel}. This phone is locked.`
                : "Pick one. Other phones see the bars move as they vote."}
            </p>
          </header>

          <section className="flex flex-col gap-4 rounded-xl bg-card p-4 shadow-[var(--shadow-border)] sm:p-5">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
                Share this poll
              </p>
              <p
                className="font-display text-4xl tracking-[0.22em] text-foreground"
                aria-label={`Poll code ${normalized.split("").join(" ")}`}
              >
                {normalized}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Send the link. Each phone opens it and votes once. Results stay in sync.
              </p>
            </div>
            <p className="text-sm break-all text-foreground">{shareUrl || `/p/${normalized}`}</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button type="button" className="w-full sm:w-auto" onClick={() => void share()}>
                <Share2 className="size-4" />
                Share
              </Button>
              <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={() => void copyLink()}>
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                {copied ? "Link copied" : "Copy link"}
              </Button>
            </div>
          </section>

          <div role="radiogroup" aria-label="Poll choices" className="flex flex-col gap-2.5">
            {poll.options.map((option, index) => (
              <OptionRow
                key={option.id}
                option={option}
                index={index}
                percent={percents[index] ?? 0}
                total={total}
                selected={poll.myOptionId === option.id}
                disabled={Boolean(poll.myOptionId) || busy}
                leading={uniqueLead === option.id}
                onVote={(id) => void vote(id)}
              />
            ))}
          </div>

          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}

          <div className="flex flex-col gap-2 sm:flex-row">
            {isHost ? (
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => setConfirmReset(true)}
                disabled={busy}
              >
                <RotateCcw className="size-4" />
                Reset votes
              </Button>
            ) : (
              <p className="text-sm leading-relaxed text-muted-foreground">
                Only the phone that started this poll can clear the votes.
              </p>
            )}
          </div>
        </div>
      ) : null}

      <AlertDialog open={confirmReset} onOpenChange={setConfirmReset}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset this poll?</AlertDialogTitle>
            <AlertDialogDescription>
              Every phone’s vote is cleared. People can choose again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep going</AlertDialogCancel>
            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault();
                void reset();
              }}
            >
              Reset votes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PollShell>
  );
}
