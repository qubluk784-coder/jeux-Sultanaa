import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SpeechBubble({ children, delay = 0.2 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="relative rounded-3xl bg-card/95 backdrop-blur px-5 py-4 shadow-soft border border-border/60 max-w-md"
    >
      <div className="absolute -top-2 left-8 h-4 w-4 rotate-45 bg-card border-l border-t border-border/60 rounded-sm" />
      <p className="text-sm sm:text-base leading-relaxed text-foreground">{children}</p>
    </motion.div>
  );
}
