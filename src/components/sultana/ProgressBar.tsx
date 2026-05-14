import { motion } from "framer-motion";

export function ProgressBar({ value, total }: { value: number; total: number }) {
  const pct = Math.min(100, Math.round((value / total) * 100));
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs font-semibold text-muted-foreground mb-1.5">
        <span>Étape {Math.min(value, total)}/{total}</span>
        <span>{pct}%</span>
      </div>
      <div className="relative h-4 w-full">
        {/* dotted path background */}
        <div
          className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, color-mix(in oklab, var(--color-primary) 25%, transparent) 0 6px, transparent 6px 12px)",
          }}
        />
        {/* filled gradient progress */}
        <motion.div
          className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-gradient-warm shadow-glow"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* walker emoji at current position */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 text-base drop-shadow"
          initial={false}
          animate={{ left: `${pct}%` }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block animate-bob">✨</span>
        </motion.div>
      </div>
    </div>
  );
}
