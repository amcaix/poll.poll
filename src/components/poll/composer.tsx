import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  MAX_OPTIONS,
  MIN_OPTIONS,
  SAMPLE_LABELS,
  SAMPLE_QUESTION,
  optionLetter,
  parseCreateInput,
} from "@/lib/poll";
import { rememberHost } from "@/lib/poll-client";
import { createPoll } from "@/lib/polls.functions";
import { cn } from "@/lib/utils";

export function PollComposer() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState(SAMPLE_QUESTION);
  const [options, setOptions] = useState<string[]>(SAMPLE_LABELS);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const filled = useMemo(
    () => options.map((label) => label.trim()).filter(Boolean),
    [options],
  );

  function updateOption(index: number, value: string) {
    setOptions((current) => current.map((label, i) => (i === index ? value : label)));
    setError(null);
  }

  function addOption() {
    if (options.length >= MAX_OPTIONS) return;
    setOptions((current) => [...current, ""]);
  }

  function removeOption(index: number) {
    if (options.length <= MIN_OPTIONS) return;
    setOptions((current) => current.filter((_, i) => i !== index));
  }

  async function handleStart() {
    let parsed: ReturnType<typeof parseCreateInput>;
    try {
      parsed = parseCreateInput({ question, options: filled });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Check the poll and try again.");
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const result = await createPoll({ data: parsed });
      rememberHost(result.poll.code, result.hostToken);
      await navigate({ to: "/p/$code", params: { code: result.poll.code } });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The poll did not open. Try again.");
      setSaving(false);
    }
  }

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(event) => {
        event.preventDefault();
        void handleStart();
      }}
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="poll-question">Question</Label>
        <Textarea
          id="poll-question"
          value={question}
          onChange={(event) => {
            setQuestion(event.target.value);
            setError(null);
          }}
          placeholder="Where should we go this weekend?"
          maxLength={140}
          rows={3}
          disabled={saving}
        />
        <p className="text-xs tabular-nums text-muted-foreground">{question.trim().length}/140</p>
      </div>

      <fieldset className="flex flex-col gap-3" disabled={saving}>
        <legend className="text-sm font-medium text-foreground">Choices</legend>
        <div className="flex flex-col gap-2">
          {options.map((label, index) => (
            <div key={index} className="flex items-center gap-2">
              <span
                aria-hidden
                className="flex size-11 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-semibold text-muted-foreground"
              >
                {optionLetter(index)}
              </span>
              <Input
                value={label}
                onChange={(event) => updateOption(index, event.target.value)}
                placeholder={index === 0 ? "First choice" : "Another choice"}
                maxLength={60}
                aria-label={`Choice ${optionLetter(index)}`}
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={cn("shrink-0 text-muted-foreground", options.length <= MIN_OPTIONS && "invisible")}
                onClick={() => removeOption(index)}
                disabled={options.length <= MIN_OPTIONS}
                aria-label={`Remove choice ${optionLetter(index)}`}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
        </div>
        {options.length < MAX_OPTIONS ? (
          <Button type="button" variant="outline" onClick={addOption} className="self-start">
            <Plus className="size-4" />
            Add choice
          </Button>
        ) : (
          <p className="text-xs text-muted-foreground">Six choices is the limit.</p>
        )}
      </fieldset>

      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={saving}>
        {saving ? "Opening the floor…" : "Open the floor"}
      </Button>
    </form>
  );
}
