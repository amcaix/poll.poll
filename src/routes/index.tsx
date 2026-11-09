import { createFileRoute } from "@tanstack/react-router";
import { PollHome } from "@/components/poll/home";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <PollHome />;
}
