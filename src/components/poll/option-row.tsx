import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { optionLetter, type PollOption } from "@/lib/poll";

type OptionRowProps = {
  option: PollOption;
  index: number;
  percent: number;
  total: number;
  selected: boolean;
  disabled: boolean;
  leading: boolean;
  onVote: (id: string) => void;
};

export function OptionRow({
  option,
  index,
  percent,
  total,
  selected,
  disabled,
  leading,
  onVote,
}: OptionRowProps) {
  const letter = optionLetter(index);
  const showResults = total > 0;
  const barScale = showResults ? percent / 100 : 0;
  const voteLabel = `${option.votes} ${option.votes === 1 ? "vote" : "votes"}`;
  const ariaLabel = [
    `${letter}. ${option.label}`,
    selected ? "Your vote" : null,
    leading && showResults ? "Ahead" : null,
    showResults ? `${percent} percent, ${voteLabel}` : "No votes yet",
    disabled && !selected ? "Voting locked" : null,
  ]
    .filter(Boolean)
    .join(". ");

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={() => onVote(option.id)}
      className={cn(
        "group relative min-h-16 w-full overflow-hidden rounded-xl text-left",
        "shadow-[var(--shadow-border)] transition-[box-shadow,transform,opacity] duration-150 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "motion-reduce:transition-none",
        selected
          ? "bg-card shadow-[var(--shadow-border-hover)] ring-2 ring-primary ring-offset-2 ring-offset-background"
          : "bg-card",
        !disabled && !selected && "hover:shadow-[var(--shadow-border-hover)] active:scale-[0.99]",
        disabled && !selected && "opacity-60",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-0 left-0 origin-left bg-primary/12 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          selected && "bg-primary/20",
        )}
        style={{ transform: `scaleX(${barScale})` }}
      />

      <span className="relative z-10 flex items-center gap-3 px-3.5 py-3.5 sm:px-4">
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-md text-xs font-semibold tracking-wide",
            selected
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground",
          )}
        >
          {selected ? <Check className="size-4" strokeWidth={2.5} /> : letter}
        </span>

        <span className="min-w-0 flex-1">
          <span className="block font-medium leading-snug text-foreground">
            {option.label}
          </span>
          <span className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
            {selected ? <span className="font-medium text-primary">Your vote</span> : null}
            {leading && showResults ? (
              <span>{selected ? "· Ahead" : "Ahead"}</span>
            ) : null}
          </span>
        </span>

        <span className="flex shrink-0 flex-col items-end leading-none">
          <span className="font-display text-xl font-medium tabular-nums tracking-tight text-foreground sm:text-2xl">
            {showResults ? `${percent}%` : "—"}
          </span>
          <span className="mt-1 text-xs tabular-nums text-muted-foreground">
            {option.votes} {option.votes === 1 ? "vote" : "votes"}
          </span>
        </span>
      </span>
    </button>
  );
}
