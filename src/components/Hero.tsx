import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 py-24 text-center">
      <div className="relative z-20 mx-auto max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="font-script mb-4 text-3xl text-rose sm:text-4xl"
        >
          a letter, written in light
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.7, duration: 1.4, ease: "easeOut" }}
          className="font-serif-display gradient-text text-5xl font-light leading-[1.05] tracking-tight sm:text-7xl md:text-8xl"
        >
          For you,
          <br />
          <span className="italic">Sindhu</span> <span className="not-italic">🦋</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1.2 }}
          className="mx-auto mt-10 max-w-xl text-base leading-relaxed text-foreground/75 sm:text-lg"
        >
          In every quiet moment and every loud laugh, in every ordinary day made golden
          by your presence — you are my favorite thought, my softest place, my forever.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1.5 }}
          className="mt-16 flex flex-col items-center gap-2 text-foreground/40"
        >
          <span className="text-xs uppercase tracking-[0.4em]">scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-10 w-px bg-gradient-to-b from-foreground/40 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
