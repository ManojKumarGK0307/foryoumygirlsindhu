import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { LockScreen } from "./components/LockScreen";
import { Site } from "./components/Site";

const UNLOCK_DATE = new Date("2020-01-01T00:00:00Z");

export default function App() {
  const [unlocked, setUnlocked] = useState(
    () => Date.now() >= UNLOCK_DATE.getTime()
  );

  useEffect(() => {
    if (unlocked) return;
    if (Date.now() >= UNLOCK_DATE.getTime()) {
      setUnlocked(true);
    }
  }, [unlocked]);

  return (
    <AnimatePresence mode="wait">
      {unlocked ? (
        <Site />
      ) : (
        <LockScreen
          targetDate={UNLOCK_DATE}
          onUnlock={() => setUnlocked(true)}
        />
      )}
    </AnimatePresence>
  );
}