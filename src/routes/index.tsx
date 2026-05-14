import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Map, Sparkles, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

import { SultanaAvatar } from "@/components/sultana/SultanaAvatar";
import { loadProgress } from "@/lib/progress";
import { universes } from "@/lib/universes";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Sultana - Voyage au coeur de tes droits" },
      {
        name: "description",
        content:
          "Une aventure interactive et bienveillante pour les jeunes filles du Maroc. Decouvre tes droits avec Sultana.",
      },
    ],
  }),
});

const stagePreview = universes.map((universe, index) => ({
  ...universe,
  step: String(index + 1).padStart(2, "0"),
}));

function Home() {
  const [xp, setXp] = useState(0);
  useEffect(() => setXp(loadProgress().xp), []);

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-[radial-gradient(circle_at_top_left,oklch(0.89_0.11_45),transparent_34%),radial-gradient(circle_at_top_right,oklch(0.82_0.12_210),transparent_32%),linear-gradient(180deg,oklch(0.98_0.03_70),oklch(0.95_0.04_25))] text-foreground">
      <div className="absolute inset-0 pattern-zellige opacity-40" />
      <motion.div
        aria-hidden="true"
        className="absolute -left-24 top-24 h-56 w-56 rounded-full bg-accent/40 blur-3xl"
        animate={{ x: [0, 28, 0], y: [0, 18, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -right-24 top-10 h-64 w-64 rounded-full bg-primary/30 blur-3xl"
        animate={{ x: [0, -24, 0], y: [0, 24, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-10 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-gold/35 blur-3xl"
        animate={{ y: [0, -22, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2 rounded-full border border-white/60 bg-white/55 px-3 py-2 shadow-soft backdrop-blur">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-warm text-sm font-black text-primary-foreground">
              S
            </span>
            <div className="leading-tight">
              <p className="font-display text-lg font-bold">Sultana</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Aventure interactive
              </p>
            </div>
          </div>

          <Link
            to="/final"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/70 bg-white/55 px-4 text-sm font-bold shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/75"
          >
            <Trophy className="h-4 w-4 text-primary" />
            {xp > 0 ? `${xp} XP` : "Parcours"}
          </Link>
        </motion.header>

        <section className="grid flex-1 items-center gap-8 py-8 lg:grid-cols-[1.02fr_0.98fr] lg:py-10">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/50 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-primary shadow-soft backdrop-blur lg:mx-0"
            >
              <Sparkles className="h-4 w-4" />
              4 mondes a explorer
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="font-display text-5xl font-black leading-[0.95] tracking-normal text-foreground sm:text-6xl lg:text-7xl"
            >
              Deviens l'heroine de ton avenir
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mt-5 max-w-xl text-base font-semibold leading-7 text-muted-foreground sm:text-lg lg:mx-0"
            >
              Avance avec Sultana, gagne des badges et decouvre tes droits, ton
              corps, tes reves et ta securite dans une aventure simple et coloree.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              <Link
                to="/univers"
                className="group inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-gradient-warm px-7 text-base font-black text-primary-foreground shadow-glow transition hover:-translate-y-1 active:scale-[0.98]"
              >
                Commencer le jeu
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </Link>
              <Link
                to="/univers"
                className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl border border-white/70 bg-white/60 px-6 text-base font-black text-foreground shadow-soft backdrop-blur transition hover:-translate-y-1 hover:bg-white/80"
              >
                <Map className="h-5 w-5 text-primary" />
                Voir les mondes
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.6, ease: "easeOut" }}
            className="relative mx-auto grid w-full max-w-md place-items-center lg:max-w-lg"
          >
            <div className="absolute inset-x-8 bottom-10 h-28 rounded-full bg-primary/20 blur-3xl" />
            <motion.div
              className="absolute left-2 top-10 rounded-3xl border border-white/65 bg-white/55 px-4 py-3 text-left shadow-soft backdrop-blur"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-primary">
                Badge
              </p>
              <p className="font-display text-lg font-bold">Force + confiance</p>
            </motion.div>
            <motion.div
              className="absolute bottom-20 right-0 rounded-3xl border border-white/65 bg-white/55 px-4 py-3 text-left shadow-soft backdrop-blur"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-accent-foreground">
                Mission
              </p>
              <p className="font-display text-lg font-bold">Choisis ton chemin</p>
            </motion.div>
            <div className="relative rounded-[2rem] border border-white/70 bg-white/45 p-5 shadow-soft backdrop-blur">
              <SultanaAvatar size={260} />
            </div>
          </motion.div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42 }}
          className="pb-4"
        >
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">
                Carte du voyage
              </p>
              <h2 className="font-display text-2xl font-black">Choisis ton premier monde</h2>
            </div>
            <Link
              to="/univers"
              className="hidden text-sm font-extrabold text-primary transition hover:translate-x-1 sm:inline-flex"
            >
              Explorer
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stagePreview.map((stage, index) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.48 + index * 0.08 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative min-h-44 overflow-hidden rounded-2xl border border-white/70 bg-card shadow-soft"
              >
                <img
                  src={stage.image}
                  alt={stage.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-white/5" />
                <div className="relative flex h-full min-h-44 flex-col justify-between p-4 text-white">
                  <span className="w-fit rounded-full bg-white/25 px-3 py-1 text-xs font-black backdrop-blur">
                    Monde {stage.step}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white/85">{stage.badgeName}</p>
                    <h3 className="font-display text-xl font-black leading-tight">{stage.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
}
