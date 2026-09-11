import { createFileRoute } from "@tanstack/react-router";
import { NotFoundScreen } from "@/components/recovery";

export const Route = createFileRoute("/$")({
  component: NotFoundScreen,
});
