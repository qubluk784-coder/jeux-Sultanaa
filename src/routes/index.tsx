import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SultanaAvatar } from "@/components/sultana/SultanaAvatar";
import { SpeechBubble } from "@/components/sultana/SpeechBubble";
import { useEffect, useState } from "react";
import { loadProgress } from "@/lib/progress";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Sultana — Voyage au cœur de tes droits" },
      { name: "description", content: "Une aventure interactive et bienveillante pour les jeunes filles du Maroc. Découvre tes droits avec Sultana." },
    ],
  }),
});

function Home() {
  const [xp, setXp] = useState(0);
  useEffect(() => setXp(loadProgress().xp), []);

  return (
    <main className="min-h-[100dvh] bg-gradient-sky pattern-zellige relative overflow-hidden">
      {/* decorative blobs */}
      <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute top-1/3 -left-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative mx-auto max-w-md px-5 pt-10 pb-12 flex flex-col min-h-[100dvh]">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">✦</span>
            <span className="font-display text-lg font-bold tracking-tight">Sultana</span>
          </div>
          {xp > 0 && (
            <span className="text-xs font-semibold rounded-full bg-card/80 px-3 py-1 border border-border/60">
              ✨ {xp} XP
            </span>
          )}
        </motion.div>

        <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-8">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-bold leading-tight text-balance"
          >
            Bienvenue,<br />
            <span className="bg-gradient-warm bg-clip-text text-transparent">jeune héroïne</span>
          </motion.h1>

          <SultanaAvatar size={220} />

          <SpeechBubble>
            Salam ! Je suis <strong>Sultana</strong>. Ensemble, nous allons traverser
            quatre univers magiques pour découvrir tes droits, ta force, et ton avenir. Prête pour l'aventure ?
          </SpeechBubble>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full space-y-3"
          >
            <Link
              to="/univers"
              className="block w-full rounded-2xl bg-gradient-warm py-4 text-center text-base font-bold text-primary-foreground shadow-soft hover:shadow-glow transition-all active:scale-[0.98]"
            >
              Commencer l'aventure
            </Link>
            <Link
              to="/final"
              className="block w-full rounded-2xl bg-card/80 backdrop-blur py-3 text-center text-sm font-semibold text-foreground border border-border/60 hover:bg-card transition-all"
            >
              Voir mon parcours
            </Link>
          </motion.div>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Une aventure pensée pour les jeunes filles du Maroc 🇲🇦
        </p>
      </div>
    </main>
  );
}
