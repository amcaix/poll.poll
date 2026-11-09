import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

export function PollShell({
  children,
  action,
}: {
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="relative min-h-dvh bg-background text-foreground">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-y-0 left-0 w-1.5 bg-primary"
      />
      <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-5 pt-6 pb-16 sm:px-6 sm:pt-10">
        <div className="mb-10 flex items-baseline justify-between gap-4">
          <Link
            to="/"
            className="font-display text-lg tracking-tight text-foreground italic"
          >
            Show of Hands
          </Link>
          {action}
        </div>
        {children}
      </div>
    </div>
  );
}
