import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles, Trophy, X, Compass, Play, HelpCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { SultanaAvatar } from "@/components/sultana/SultanaAvatar";
import { AtmosphericBackground } from "@/components/sultana/AtmosphericBackground";
import { loadProgress } from "@/lib/progress";
import { universes } from "@/lib/universes";
import { switchMusic } from "@/lib/audio";
import logo from "@/assets/logo.png";

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
  const [selectedUniverse, setSelectedUniverse] = useState<(typeof stagePreview)[0] | null>(null);
  const [showSultanaInfo, setShowSultanaInfo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setXp(loadProgress().xp);
    // Reset music to menu
    void switchMusic(null);
  }, []);

  return (
    <main 
      className="relative min-h-[100dvh] overflow-hidden text-foreground"
      style={{
        backgroundColor: 'var(--theme-bg)',
        backgroundImage: `
          radial-gradient(circle at 0% 0%, oklch(0.85 0.1 30) 0%, transparent 50%),
          radial-gradient(circle at 100% 0%, oklch(0.85 0.1 210) 0%, transparent 50%),
          radial-gradient(circle at 100% 100%, oklch(0.9 0.08 340) 0%, transparent 50%),
          radial-gradient(circle at 0% 100%, oklch(0.9 0.08 60) 0%, transparent 50%)
        `
      }}
    >

      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2 rounded-full border border-white/60 bg-white/55 px-3 py-2 shadow-soft backdrop-blur">
            <img 
              src={logo} 
              alt="Logo Sultana" 
              className="h-10 w-10 object-contain rounded-full bg-gradient-warm p-0.5" 
            />
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
              
              {/* "Who is Sultana?" Interactive Button */}
              <div className="absolute -right-4 top-4 z-30">
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowSultanaInfo(!showSultanaInfo)}
                    className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 shadow-glow-primary border-2 border-primary/20 text-primary transition-all hover:bg-primary hover:text-white group/btn"
                  >
                    <HelpCircle className="h-4 w-4" />
                    <span className="text-xs font-black uppercase tracking-wider">Qui est Sultana ?</span>
                    <Sparkles className="h-3 w-3 animate-sparkle" />
                  </motion.button>
                  
                  <AnimatePresence>
                    {showSultanaInfo && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: 20, y: -20 }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: 20, y: -20 }}
                        className="absolute right-14 top-0 z-50 w-[290px] sm:w-[340px] bg-white/95 backdrop-blur-sm rounded-[32px] p-7 shadow-2xl border-2 border-primary/10"
                      >
                        <button 
                          onClick={() => setShowSultanaInfo(false)}
                          className="absolute top-5 right-5 text-foreground/40 hover:text-foreground transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </button>
                        
                        <div className="space-y-5 text-center">
                          <div className="flex justify-center items-center gap-2">
                            <Sparkles className="h-4 w-4 text-primary opacity-40" />
                            <h3 className="font-display text-2xl font-black text-primary tracking-tight">Qui est Sultana ?</h3>
                            <Sparkles className="h-4 w-4 text-primary opacity-40" />
                          </div>
                          
                          <div className="space-y-1">
                            <p className="text-xl font-black text-foreground tracking-tight">
                              Sultana, <span className="text-primary">c’est toi.</span>
                            </p>
                            <p className="text-lg font-bold text-foreground/80">C’est moi.</p>
                            <p className="text-sm font-medium text-foreground/70 leading-relaxed">
                              C’est ta petite sœur, ta meilleure amie, ou peut-être ta future fille.
                            </p>
                          </div>
                          
                          <div className="flex justify-center">
                            <div className="h-1 w-12 rounded-full bg-gradient-warm opacity-30" />
                          </div>
                          
                          <p className="text-base font-medium text-foreground/80 leading-relaxed italic">
                            Elle représente toutes les filles qui méritent de <span className="font-black text-primary">connaître leurs droits</span>, de croire en leurs rêves et d’avancer avec <span className="font-black text-primary">confiance</span> vers leur avenir.
                          </p>
                          
                          <div className="flex justify-center gap-2 pt-1 opacity-20">
                            <span>✨</span><span>✨</span><span>✨</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42 }}
          className="pb-10"
        >
          <div className="mb-6 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">
                Carte du voyage
              </p>
              <h2 className="font-display text-3xl font-black flex items-center gap-3">
                <Compass className="h-8 w-8 text-primary" />
                Découvre ton premier monde
              </h2>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stagePreview.map((stage, index) => (
              <motion.button
                key={stage.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.48 + index * 0.08 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedUniverse(stage)}
                className="group relative text-left min-h-52 overflow-hidden rounded-[2rem] border-2 border-white/70 bg-card shadow-soft"
              >
                <img
                  src={stage.image}
                  alt={stage.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="relative flex h-full flex-col justify-between p-5 text-white">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-xs font-black backdrop-blur">
                      {stage.step}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Monde</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary mb-1">{stage.badgeName}</p>
                    <h3 className="font-display text-2xl font-black leading-tight flex items-center gap-2">
                      {stage.badge} {stage.title}
                    </h3>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Presentation Modal */}
      <AnimatePresence>
        {selectedUniverse && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedUniverse(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            
            <motion.div
              layoutId={`modal-${selectedUniverse.id}`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-[2.5rem] bg-card shadow-2xl border border-border/50"
            >
              <div className="absolute right-4 top-4 z-10">
                <button
                  onClick={() => setSelectedUniverse(null)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-black/10 text-foreground transition hover:bg-black/20"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="h-48 w-full md:h-auto md:w-2/5 shrink-0 relative">
                  <img
                    src={selectedUniverse.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent md:bg-gradient-to-r" />
                  <div className="absolute inset-0 flex items-center justify-center text-7xl">
                    <motion.span
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", delay: 0.2 }}
                    >
                      {selectedUniverse.badge}
                    </motion.span>
                  </div>
                </div>

                <div className="flex flex-col p-6 sm:p-8 md:p-10">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2">
                      {selectedUniverse.subtitle}
                    </p>
                    <h2 className="font-display text-3xl sm:text-4xl font-black mb-6 leading-tight">
                      {selectedUniverse.title}
                    </h2>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex-1"
                  >
                    <div className="space-y-4">
                      {selectedUniverse.description.split("\n\n").map((paragraph, i) => (
                        <p key={i} className="text-base sm:text-lg leading-relaxed text-muted-foreground font-medium italic">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8"
                  >
                    <button
                      onClick={() => navigate({ to: "/univers" })}
                      className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-warm py-4 text-lg font-black text-primary-foreground shadow-glow transition hover:-translate-y-1 active:scale-[0.98]"
                    >
                      <Compass className="h-6 w-6" />
                      Voir le parcours magique
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
