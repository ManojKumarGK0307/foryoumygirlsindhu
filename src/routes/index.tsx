import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { LockScreen } from "../components/LockScreen";
import { Site } from "../components/Site";

// 31 May 2026, 00:00 IST = 30 May 2026, 18:30 UTC
const UNLOCK_DATE = new Date("2020-01-01T00:00:00Z");


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "For My Girl Sindhu 🦋" },
      {
        name: "description",
        content:
          "A cinematic love letter, dreamed up and written in light — for Sindhu, my forever.",
      },
      { property: "og:title", content: "For My Girl Sindhu 🦋" },
      {
        property: "og:description",
        content:
          "A little world that opens only on 31 May 2026 — a dreamy love letter, just for you.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "For My Girl Sindhu 🦋" },
      {
        name: "twitter:description",
        content: "A cinematic love letter, dreamed up and written in light.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [unlocked, setUnlocked] = useState(() => Date.now() >= UNLOCK_DATE.getTime());

  useEffect(() => {
    if (unlocked) return;
    if (Date.now() >= UNLOCK_DATE.getTime()) setUnlocked(true);
  }, [unlocked]);

  return (
    <AnimatePresence mode="wait">
      {unlocked ? (
        <Site key="site" />
      ) : (
        <LockScreen key="lock" targetDate={UNLOCK_DATE} onUnlock={() => setUnlocked(true)} />
      )}
    </AnimatePresence>
  );
}
