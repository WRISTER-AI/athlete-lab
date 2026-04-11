import type { Metadata } from "next";
import FullSchedulePage from "./FullSchedulePage";

export const metadata: Metadata = {
  title: "Weekly Schedule | The Athlete Lab | Pembroke & Hanover, MA",
  description:
    "View the full weekly training schedule for The Athlete Lab. Speed, agility, soccer, and performance sessions in Pembroke and Hanover, MA.",
};

export default function SchedulePage() {
  return <FullSchedulePage />;
}
