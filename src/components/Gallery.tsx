import { motion } from "framer-motion";
import m1 from "../assets/memory1.jpg";
import m2 from "../assets/memory2.jpg";
import m3 from "../assets/memory3.jpg";
import m4 from "../assets/memory4.jpg";
import m5 from "../assets/memory5.jpg";
import m6 from "../assets/memory6.jpg";

const memories = [
  { src: m1, caption: "In a crowd of thousands, my eyes still find you first." },
  { src: m2, caption: "Side by side, exactly where my heart feels at home." },
  { src: m3, caption: "Every ordinary day becomes a favorite memory with you." },
  { src: m4, caption: "The world grows quieter whenever you're close" },
  { src: m5, caption: "A thousand serious moments, and a million silly ones." },
  { src: m6, caption: "Some love stories are written in books, ours is written in moments" },
];

export function Gallery() {
  return (
    <section className="relative px-6 py-32">
      <div className="relative z-20 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="mb-16 text-center"
        >
          <p className="font-script mb-3 text-3xl text-rose sm:text-4xl">moments held softly</p>
          <h2 className="font-serif-display gradient-text text-4xl font-light italic sm:text-6xl">
            Our memories
          </h2>
        </motion.div>

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>div]:mb-5">
          {memories.map((m, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.9, delay: i * 0.08 }}
              className="group glass-soft relative overflow-hidden rounded-3xl break-inside-avoid p-2 shadow-[0_8px_40px_-12px_rgba(180,120,220,0.4)] transition-shadow hover:shadow-[0_18px_60px_-12px_rgba(236,121,184,0.55)]"
            >
              <div className="overflow-hidden rounded-2xl">
                <motion.img
                  src={m.src}
                  alt={m.caption}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="h-auto w-full transform-gpu object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                  style={{ aspectRatio: i % 2 === 0 ? "4/5" : "4/4" }}
                />
              </div>
              <figcaption className="font-script px-4 pb-2 pt-3 text-center text-2xl text-foreground/70">
                {m.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
