import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { X } from "lucide-react";

const MESSAGE =
"Sindhu — you may never fully realize how much you mean to me. You are the reason so many of my days feel brighter, my worries feel lighter, and my heart feels fuller. Thank you for loving me, understanding me, and standing by me through everything. I hope you never question your value, because you are one of the most beautiful parts of my life. You are not just someone I love; you are someone I cherish, admire, and thank God for every day. No matter where life takes us, I want you to remember that you are deeply loved, endlessly appreciated, and forever special to me. If I had to choose again, I would still choose you—every single time. ❤️";


function playChime() {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const notes = [
      { f: 880, t: 0 },
      { f: 1108, t: 0.18 },
      { f: 1318, t: 0.36 },
      { f: 1760, t: 0.55 },
    ];
    notes.forEach(({ f, t }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = f;
      gain.gain.setValueAtTime(0, ctx.currentTime + t);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 1.2);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + t);
      osc.stop(ctx.currentTime + t + 1.4);
    });
  } catch {
    // ignore audio errors
  }
}

function fireConfetti() {
  const colors = ["#f9a8d4", "#f0abfc", "#c4b5fd", "#fbcfe8", "#fce7f3"];
  const burst = (origin: { x: number; y: number }) =>
    confetti({
      particleCount: 80,
      spread: 75,
      startVelocity: 45,
      scalar: 1.1,
      ticks: 220,
      origin,
      colors,
      shapes: ["circle"],
      gravity: 0.7,
    });
  burst({ x: 0.2, y: 0.7 });
  burst({ x: 0.5, y: 0.6 });
  burst({ x: 0.8, y: 0.7 });
}

export function ClickMe() {
  const [open, setOpen] = useState(false);
  const words = MESSAGE.split(" ");

  const handleClick = () => {
    fireConfetti();
    playChime();
    setOpen(true);
  };

  return (
    <section className="relative px-6 py-32 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="relative z-20 mx-auto max-w-2xl"
      >
        <p className="font-script mb-4 text-3xl text-lavender sm:text-4xl">a tiny secret</p>
        <h2 className="font-serif-display mb-10 text-3xl font-light italic text-foreground/80 sm:text-5xl">
          press, and find a piece of my heart
        </h2>

        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-rose via-blush to-lavender px-12 py-5 text-lg font-medium text-white shadow-[0_8px_50px_rgba(236,121,184,0.55)] transition-shadow hover:shadow-[0_8px_70px_rgba(180,120,220,0.7)]"
        >
          <motion.span
            className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-rose via-blush to-lavender"
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{ filter: "blur(20px)" }}
          />
          <span className="font-serif-display text-xl italic tracking-wide">Click me 🦋</span>
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-gradient-to-br from-rose/30 via-blush/40 to-lavender/40 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.94, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              className="glass relative z-10 mx-auto w-full max-w-xl rounded-3xl p-8 text-center sm:p-12"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute right-5 top-5 rounded-full p-2 text-foreground/50 transition hover:bg-white/40 hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <p className="font-script mb-4 text-3xl text-rose sm:text-4xl">just for you</p>

              <p className="font-serif-display text-xl leading-relaxed text-foreground/85 sm:text-2xl">
                {words.map((w, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 6, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.25 + i * 0.06, duration: 0.5 }}
                    className="inline-block"
                  >
                    {w}&nbsp;
                  </motion.span>
                ))}
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 + words.length * 0.06 + 0.4 }}
                className="font-script mt-8 text-3xl gradient-text"
              >
                — yours, always Manoj🤍
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
