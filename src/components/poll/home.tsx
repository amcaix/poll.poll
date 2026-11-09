import { JoinForm } from "@/components/poll/join-form";
import { PollComposer } from "@/components/poll/composer";
import { PollShell } from "@/components/poll/shell";
import { Separator } from "@/components/ui/separator";

export function PollHome() {
  return (
    <PollShell>
      <div className="flex flex-col gap-8">
        <header className="flex flex-col gap-3">
          <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
            Shared poll
          </p>
          <h1 className="font-display text-4xl leading-tight font-medium tracking-tight text-foreground sm:text-5xl">
            What does the room think?
          </h1>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground">
            Open a poll and send the link. Every phone votes once, and the bars update for everyone.
          </p>
        </header>
        <PollComposer />
        <Separator />
        <section className="flex flex-col gap-3">
          <h2 className="font-display text-2xl font-medium tracking-tight">Already have a code?</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Type the code from the host, or paste their link.
          </p>
          <JoinForm />
        </section>
      </div>
    </PollShell>
  );
}
