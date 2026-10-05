import type { Metadata } from "next";
import FullSchedulePage from "./FullSchedulePage";

export const metadata: Metadata = {
  title: "Weekly Schedule | The Athlete Lab | Pembroke, MA",
  description:
    "View the current fall training schedule for The Athlete Lab in Pembroke, MA. Intro to Speed & Agility and Youth Sports Performance run Monday through Thursday, with Mini Soccer on Mondays and Wednesdays. Check current location notices before attending.",
};

export default function SchedulePage() {
  return <FullSchedulePage />;
}
