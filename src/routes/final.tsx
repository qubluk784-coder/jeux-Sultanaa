import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { loadProgress, resetProgress, type Progress } from "@/lib/progress";
import { universes } from "@/lib/universes";
import { SultanaAvatar } from "@/components/sultana/SultanaAvatar";
import { AtmosphericBackground } from "@/components/sultana/AtmosphericBackground";

export const Route = createFileRoute("/final")({
  component: Final,
  head: () => ({
    meta: [
      { title: "Mon parcours — Sultana" },
      { name: "description", content: "Tes badges, ton XP et un message d'encouragement de Sultana." },
    ],
  }),
});

function Final() {
  const [p, setP] = useState<Progress>({ xp: 0, badges: [], completed: [] });
  useEffect(() => setP(loadProgress()), []);

  const all = p.completed.length === universes.length;

  return (
    <main className="min-h-[100dvh] relative overflow-hidden">
      <AtmosphericBackground />

      <div className="relative mx-auto max-w-md px-5 pt-8 pb-12">
        <Link to="/univers" className="text-sm text-muted-foreground hover:text-foreground">← Univers</Link>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Ton parcours</p>
          <h1 className="font-display text-3xl font-bold mt-1 text-balance">
            {all ? "Tu as illuminé tous les univers ✦" : "Continue à briller, héroïne"}
          </h1>
        </motion.div>

        <div className="mt-6 flex justify-center">
          <SultanaAvatar size={160} />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl bg-card border border-border/60 p-4 text-center shadow-soft"
          >
            <p className="text-3xl">✨</p>
            <p className="font-display text-2xl font-bold mt-1">{p.xp}</p>
            <p className="text-xs text-muted-foreground font-semibold">XP gagnés</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl bg-card border border-border/60 p-4 text-center shadow-soft"
          >
            <p className="text-3xl">🏆</p>
            <p className="font-display text-2xl font-bold mt-1">{p.completed.length}/{universes.length}</p>
            <p className="text-xs text-muted-foreground font-semibold">Univers terminés</p>
          </motion.div>
        </div>

        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Badges</p>
          <div className="grid grid-cols-2 gap-3">
            {universes.map((u, i) => {
              const earned = p.badges.includes(u.id);
              return (
                <motion.div
                  key={u.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className={[
                    "rounded-2xl p-4 border text-center transition-all",
                    earned
                      ? "bg-gradient-warm text-primary-foreground border-transparent shadow-glow"
                      : "bg-card border-border/60 opacity-70",
                  ].join(" ")}
                >
                  <div className="text-3xl">{earned ? u.badge : "🔒"}</div>
                  <p className="text-xs font-bold mt-1.5 leading-tight">
                    {earned ? u.badgeName : u.title}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 rounded-3xl bg-card/90 backdrop-blur border border-border/60 p-5 shadow-soft text-center"
        >
          <p className="font-display text-base font-semibold leading-relaxed text-balance">
            {all
              ? "« Tu connais tes droits, tu protèges ton corps, tu rêves grand et tu navigues avec sagesse. Le Maroc a besoin de filles comme toi. » — Sultana"
              : "« Chaque pas que tu fais te rapproche de la femme libre que tu deviens. Reviens quand tu veux, je t'attends. » — Sultana"}
          </p>
        </motion.div>

        <div className="mt-6 space-y-2.5">
          {!all && (
            <Link
              to="/univers"
              className="block w-full text-center rounded-2xl bg-gradient-warm py-4 font-bold text-primary-foreground shadow-soft active:scale-[0.98]"
            >
              Reprendre l'aventure
            </Link>
          )}
          <Link
            to="/"
            className="block w-full text-center rounded-2xl bg-card border border-border py-3 font-semibold text-sm"
          >
            Retour à l'accueil
          </Link>
          <button
            onClick={() => {
              if (confirm("Recommencer toute l'aventure depuis le début ?")) {
                resetProgress();
                setP({ xp: 0, badges: [], completed: [] });
              }
            }}
            className="block w-full text-center text-xs text-muted-foreground py-2 hover:text-foreground"
          >
            Tout recommencer
          </button>
        </div>
      </div>
    </main>
  );
}
