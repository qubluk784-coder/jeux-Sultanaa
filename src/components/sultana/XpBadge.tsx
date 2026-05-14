import { motion } from "framer-motion";

export function XpBadge({ xp }: { xp: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center gap-1.5 rounded-full bg-card border border-border/60 px-3 py-1.5 shadow-sm"
    >
      <span className="text-base">✨</span>
      <span className="text-sm font-bold text-foreground tabular-nums">{xp}</span>
      <span className="text-xs font-medium text-muted-foreground">XP</span>
    </motion.div>
  );
}
