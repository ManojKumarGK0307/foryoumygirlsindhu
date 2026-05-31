import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock } from "lucide-react";
import { Particles } from "./Particles";

interface LockScreenProps {
  targetDate: Date;
  onUnlock: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function getTimeLeft(target: Date): TimeLeft {
  const total = Math.max(0, target.getTime() - Date.now());
  return {
    total,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / 1000 / 60) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

function NumberCell({ value, label }: { value: number; label: string }) {
  const padded = value.toString().padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div className="glass relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl sm:h-28 sm:w-28 md:h-32 md:w-32">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={padded}
            initial={{ y: -40, opacity: 0, filter: "blur(8px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: 40, opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="font-serif-display gradient-text text-4xl font-light tabular-nums sm:text-6xl md:text-7xl"
          >
            {padded}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-3 text-xs uppercase tracking-[0.3em] text-foreground/60 sm:text-sm">
        {label}
      </span>
    </div>
  );
}

export function LockScreen({ targetDate, onUnlock }: LockScreenProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      const next = getTimeLeft(targetDate);
      setTimeLeft(next);
      if (next.total <= 0) {
        clearInterval(interval);
        setTimeout(onUnlock, 800);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate, onUnlock]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
      transition={{ duration: 1.4, ease: "easeInOut" }}
      className="ambient-bg relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-10"
    >
      <Particles count={50} />

      {/* Soft ambient orbs */}
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-rose/40 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-lavender/40 blur-3xl animate-float-slow" style={{ animationDelay: "3s" }} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="glass relative z-20 mx-auto w-full max-w-2xl rounded-[2rem] px-6 py-12 text-center sm:px-12 sm:py-16"
      >
        {/* Glowing lock */}
        <motion.div
          className="relative mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-rose to-lavender shadow-[0_0_60px_rgba(236,121,184,0.6)]"
          animate={{ boxShadow: [
            "0 0 40px rgba(236, 121, 184, 0.5)",
            "0 0 80px rgba(180, 120, 220, 0.7)",
            "0 0 40px rgba(236, 121, 184, 0.5)",
          ] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Lock className="h-9 w-9 text-white" strokeWidth={1.5} />
        </motion.div>

        <h1 className="font-serif-display gradient-text mb-3 text-3xl font-light italic sm:text-5xl">
          Almost there, my love
        </h1>
        <p className="mx-auto max-w-md text-base text-foreground/70 sm:text-lg">
          This little world opens only on 31 May 2026 <span className="text-rose">❤️</span>
        </p>

        <div className="mt-10 flex justify-center gap-3 sm:gap-5">
          <NumberCell value={timeLeft.days} label="Days" />
          <NumberCell value={timeLeft.hours} label="Hours" />
          <NumberCell value={timeLeft.minutes} label="Minutes" />
          <NumberCell value={timeLeft.seconds} label="Seconds" />
        </div>

        <p className="font-script mt-10 text-2xl text-foreground/60 sm:text-3xl">
          counting every second until you
        </p>
      </motion.div>
    </motion.div>
  );
}
