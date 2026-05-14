import { AnimatePresence, motion } from "framer-motion";

export function XpBurst({ show, amount }: { show: boolean; amount: number }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="burst"
          initial={{ opacity: 0, scale: 0.5, y: 0 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1, 0.9], y: [-10, -40, -60, -90] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="pointer-events-none fixed left-1/2 top-1/2 -translate-x-1/2 z-50"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gold/40 blur-2xl" />
            <div className="relative rounded-full bg-gradient-warm px-5 py-2.5 shadow-glow text-primary-foreground font-display font-bold text-lg flex items-center gap-1.5">
              <span>✨</span>
              <span>+{amount} XP</span>
            </div>
          </div>
          {/* sparkles */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 top-1/2 text-gold text-xl"
              initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
              animate={{
                opacity: [1, 0],
                x: Math.cos((i / 6) * Math.PI * 2) * 70,
                y: Math.sin((i / 6) * Math.PI * 2) * 70,
                scale: [0, 1.2, 0],
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              ✦
            </motion.span>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
