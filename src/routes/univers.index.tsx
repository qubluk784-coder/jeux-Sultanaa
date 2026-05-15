import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { universes } from "@/lib/universes";
import { useEffect, useState } from "react";
import { loadProgress } from "@/lib/progress";
import { SultanaAvatar } from "@/components/sultana/SultanaAvatar";
import { AtmosphericBackground } from "@/components/sultana/AtmosphericBackground";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/univers/")({
  component: Universes,
  head: () => ({
    meta: [
      { title: "Choisis ton univers — Sultana" },
      { name: "description", content: "Quatre univers magiques pour explorer tes droits, ta santé, ton avenir et ta sécurité en ligne." },
    ],
  }),
});

function Universes() {
  const [completed, setCompleted] = useState<string[]>([]);
  useEffect(() => setCompleted(loadProgress().completed), []);
  const nextIndex = Math.min(
    universes.findIndex((u) => !completed.includes(u.id)),
    universes.length - 1,
  );
  const sultanaIndex = nextIndex < 0 ? universes.length : nextIndex;

  return (
    <main className="min-h-[100dvh] relative overflow-hidden">
      <AtmosphericBackground />

      <div className="relative mx-auto max-w-md px-5 pt-8 pb-20">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-sm text-foreground/70 hover:text-foreground inline-flex items-center gap-1">
            ← Retour
          </Link>
          <img src={logo} alt="Sultana" className="h-10 w-10 object-contain opacity-80" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 mb-8 text-center"
        >
          <h1 className="font-display text-3xl font-bold leading-tight text-balance">
            Ton <span className="bg-gradient-warm bg-clip-text text-transparent">chemin magique</span>
          </h1>
          <p className="mt-2 text-sm text-foreground/70">
            Suis le sentier d'étoiles. Chaque étape ouvre un nouvel univers.
          </p>
        </motion.div>

        {/* Game-like winding path */}
        <div className="relative">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 320 1100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="pathGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.82 0.16 350)" />
                <stop offset="50%" stopColor="oklch(0.86 0.13 20)" />
                <stop offset="100%" stopColor="oklch(0.82 0.13 340)" />
              </linearGradient>
            </defs>
            {/* outer pink halo */}
            <path
              d="M 60 60 Q 280 200 60 360 Q -120 520 60 680 Q 280 840 60 1000"
              fill="none"
              stroke="oklch(0.93 0.06 350)"
              strokeWidth="22"
              strokeLinecap="round"
              strokeOpacity="0.9"
            />
            {/* main candy path */}
            <path
              d="M 60 60 Q 280 200 60 360 Q -120 520 60 680 Q 280 840 60 1000"
              fill="none"
              stroke="url(#pathGrad)"
              strokeWidth="12"
              strokeLinecap="round"
              className="animate-draw-path"
            />
            {/* footprint dashes flowing */}
            <path
              d="M 60 60 Q 280 200 60 360 Q -120 520 60 680 Q 280 840 60 1000"
              fill="none"
              stroke="white"
              strokeOpacity="0.85"
              strokeWidth="4"
              strokeLinecap="round"
              className="animate-path-flow"
            />
          </svg>

          <ul className="relative space-y-12 pb-8">
            {universes.map((u, i) => {
              const done = completed.includes(u.id);
              const alignRight = i % 2 === 1;
              const isCurrent = i === sultanaIndex;
              
              const themeClass = {
                "jardin": "theme-jardin",
                "forteresse": "theme-forteresse",
                "academie": "theme-academie",
                "vigie": "theme-vigie",
              }[u.id] || "";

              return (
                <motion.li
                  key={u.id}
                  initial={{ opacity: 0, scale: 0.7, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.2, type: "spring", stiffness: 140, damping: 14 }}
                  className={`relative flex ${alignRight ? "justify-end" : "justify-start"} ${themeClass}`}
                >
                  {/* Sultana stands next to the current stage */}
                  {isCurrent && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.2 }}
                      className={`absolute -top-6 ${alignRight ? "left-2" : "right-2"} z-20 pointer-events-none`}
                    >
                      <div className="relative">
                        <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-primary shadow-soft border border-primary/20">
                          C'est par ici !
                        </span>
                        <SultanaAvatar size={70} />
                      </div>
                    </motion.div>
                  )}

                  <Link
                    to="/univers/$id"
                    params={{ id: u.id }}
                    className="group relative block w-[78%]"
                  >
                    {/* Stage number bubble */}
                    <span className="absolute -top-3 -left-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-black text-primary-foreground shadow-glow border-2 border-white">
                      {i + 1}
                    </span>
                    {done && (
                      <span className="absolute -top-3 -right-3 z-10 rounded-full bg-success text-success-foreground text-[11px] font-bold px-2 py-1 shadow-soft border-2 border-white">
                        ⭐
                      </span>
                    )}

                    <div className="animate-bob" style={{ animationDelay: `${i * 0.4}s` }}>
                      <div 
                        className="overflow-hidden rounded-3xl border-[3px] border-white/90 bg-card backdrop-blur shadow-glow group-hover:shadow-glow transition-all group-active:scale-[0.97] ring-2 ring-primary/20"
                        style={{
                          backgroundImage: `
                            radial-gradient(circle at 0% 0%, var(--theme-accent) 0%, transparent 60%),
                            radial-gradient(circle at 100% 100%, var(--theme-primary) 0%, transparent 60%),
                            radial-gradient(circle at 50% 50%, var(--theme-bg) 0%, transparent 100%)
                          `
                        }}
                      >
                        <div className="relative h-28 overflow-hidden">
                          <img
                            src={u.image}
                            alt={u.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t ${u.accent}`} />
                          <span className="absolute bottom-2 right-2 text-3xl drop-shadow-lg">{u.badge}</span>
                        </div>
                        <div className="px-3.5 py-2.5">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                            Étape {i + 1}
                          </p>
                          <h2 className="font-display text-base font-bold leading-tight">{u.title}</h2>
                          <p className="mt-0.5 text-xs text-foreground/70 italic line-clamp-1">{u.subtitle}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.li>
              );
            })}

            {/* Treasure at end of path */}
            <motion.li
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: "spring" }}
              className="relative flex justify-center"
            >
              {sultanaIndex >= universes.length && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-16 z-20 pointer-events-none"
                >
                  <SultanaAvatar size={80} />
                </motion.div>
              )}
              <Link
                to="/final"
                className="group flex flex-col items-center gap-2"
              >
                <span className="text-5xl animate-float drop-shadow-lg">🏆</span>
                <span className="rounded-full bg-gradient-warm px-4 py-2 text-xs font-bold text-primary-foreground shadow-glow">
                  Voir mes badges
                </span>
              </Link>
            </motion.li>
          </ul>
        </div>
      </div>
    </main>
  );
}
