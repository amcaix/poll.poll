import { createFileRoute } from "@tanstack/react-router";
import { PollRoom } from "@/components/poll/room";

export const Route = createFileRoute("/p/$code")({
  component: RoomPage,
});

function RoomPage() {
  const { code } = Route.useParams();
  return <PollRoom code={code} />;
}
