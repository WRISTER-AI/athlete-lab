import type { Metadata } from "next";
import FullSchedulePage from "./FullSchedulePage";

export const metadata: Metadata = {
  title: "Weekly Schedule | The Athlete Lab | Pembroke, MA",
  description:
    "View the current fall training schedule for The Athlete Lab. Intro to Speed & Agility and Youth Sports Performance run Monday through Thursday at City Arena in Pembroke, MA.",
};

export default function SchedulePage() {
  return <FullSchedulePage />;
}
