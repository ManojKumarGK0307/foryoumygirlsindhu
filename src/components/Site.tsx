import { motion } from "framer-motion";
import { Particles } from "./Particles";
import { Butterflies } from "./Butterflies";
import { Hero } from "./Hero";
import { ClickMe } from "./ClickMe";
import { Gallery } from "./Gallery";

export function Site() {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(24px)", scale: 1.03 }}
      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
      className="ambient-bg relative min-h-screen w-full overflow-x-hidden"
    >
      <Particles count={45} />
      <Butterflies count={8} />

      {/* Soft ambient orbs */}
      <div className="pointer-events-none fixed -left-40 top-0 -z-0 h-[28rem] w-[28rem] rounded-full bg-rose/35 blur-3xl animate-float-slow" />
      <div className="pointer-events-none fixed -right-40 top-1/3 -z-0 h-[32rem] w-[32rem] rounded-full bg-lavender/35 blur-3xl animate-float-slow" style={{ animationDelay: "4s" }} />
      <div className="pointer-events-none fixed bottom-0 left-1/2 -z-0 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-blush/40 blur-3xl animate-float-slow" style={{ animationDelay: "2s" }} />

      <main className="relative z-20">
        <Hero />
        <ClickMe />
        <Gallery />

        <footer className="relative z-20 px-6 pb-16 pt-10 text-center">
          <p className="font-script gradient-text text-3xl sm:text-4xl">
            with all of me, forever yours
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.4em] text-foreground/40">
            for sindhu • 31.05.2026
          </p>
        </footer>
      </main>
    </motion.div>
  );
}
