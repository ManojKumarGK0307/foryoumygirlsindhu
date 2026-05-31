import { useMemo } from "react";
import { motion } from "framer-motion";
import butterflyImg from "../assets/butterfly.png";

interface Butterfly {
  id: number;
  size: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
  delay: number;
  blur: number;
  opacity: number;
  flapSpeed: number;
  rotate: number;
}

interface ButterfliesProps {
  count?: number;
}

export function Butterflies({ count = 7 }: ButterfliesProps) {
  const butterflies: Butterfly[] = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        size: Math.random() * 60 + 40,
        startX: Math.random() * 100,
        startY: Math.random() * 100,
        endX: Math.random() * 100,
        endY: Math.random() * 100,
        duration: Math.random() * 18 + 18,
        delay: Math.random() * 6,
        blur: Math.random() * 2,
        opacity: Math.random() * 0.4 + 0.55,
        flapSpeed: Math.random() * 0.3 + 0.5,
        rotate: Math.random() * 30 - 15,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {butterflies.map((b) => (
        <motion.div
          key={b.id}
          className="absolute"
          style={{
            width: b.size,
            height: b.size,
            filter: `blur(${b.blur}px) drop-shadow(0 0 12px rgba(255, 182, 219, 0.55))`,
            opacity: b.opacity,
          }}
          initial={{ left: `${b.startX}%`, top: `${b.startY}%` }}
          animate={{
            left: [`${b.startX}%`, `${b.endX}%`, `${b.startX}%`],
            top: [`${b.startY}%`, `${b.endY}%`, `${b.startY}%`],
            rotate: [b.rotate, b.rotate + 12, b.rotate - 8, b.rotate],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* 3D wing flap using perspective + Y rotation */}
          <motion.div
            style={{ perspective: 600, transformStyle: "preserve-3d" }}
            animate={{ rotateY: [0, 60, 0, 60, 0], rotateX: [0, -8, 0] }}
            transition={{
              duration: b.flapSpeed,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img
              src={butterflyImg}
              alt=""
              width={b.size}
              height={b.size}
              className="h-full w-full select-none"
              draggable={false}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
