import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CODE_LENGTH, extractCode } from "@/lib/poll";

export function JoinForm() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit(event: FormEvent) {
    event.preventDefault();
    const next = extractCode(code);
    if (next.length !== CODE_LENGTH) {
      setError("Enter the 6-character code, or paste the poll link.");
      return;
    }
    void navigate({ to: "/p/$code", params: { code: next } });
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={submit}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="join-code">Poll code</Label>
        <Input
          id="join-code"
          value={code}
          onChange={(event) => {
            setCode(event.target.value.toUpperCase());
            setError(null);
          }}
          placeholder="AB3K9Q"
          autoCapitalize="characters"
          autoCorrect="off"
          spellCheck={false}
          maxLength={80}
          aria-invalid={Boolean(error)}
        />
      </div>
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" variant="outline" className="w-full sm:w-auto">
        Join poll
      </Button>
    </form>
  );
}
