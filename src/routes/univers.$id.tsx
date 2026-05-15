import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { getUniverse } from "@/lib/universes";
import { ProgressBar } from "@/components/sultana/ProgressBar";
import { SpeechBubble } from "@/components/sultana/SpeechBubble";
import { SultanaAvatar } from "@/components/sultana/SultanaAvatar";
import { XpBurst } from "@/components/sultana/XpBurst";
import { AtmosphericBackground } from "@/components/sultana/AtmosphericBackground";
import { addXp, completeUniverse } from "@/lib/progress";
import { playCorrectAnswerSound, playStageCompleteSound, playWrongAnswerSound, switchMusic } from "@/lib/audio";

export const Route = createFileRoute("/univers/$id")({
  component: UniversePage,
  notFoundComponent: () => (
    <div className="min-h-[100dvh] flex items-center justify-center p-6 text-center">
      <div>
        <p className="text-lg font-semibold">Univers introuvable</p>
        <Link to="/univers" className="text-primary underline mt-2 inline-block">Retour</Link>
      </div>
    </div>
  ),
});

const ENCOURAGE = ["Bravo, tu brilles ✨", "Magnifique réponse !", "Tu es sur la bonne voie 🌟", "Continue comme ça !", "Quelle sagesse 💫"];

function UniversePage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const universe = getUniverse(id);

  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [burst, setBurst] = useState<{ show: boolean; amount: number }>({ show: false, amount: 0 });

  // Switch music based on universe
  useEffect(() => {
    if (id) {
      void switchMusic(id);
    }
  }, [id]);

  // reset state when navigating between universes
  useEffect(() => {
    setStep(0); setSelected(null); setRevealed(false); setScore(0); setDone(false);
  }, [id]);

  if (!universe) return null;

  const total = universe.questions.length;
  const q = universe.questions[step];
  const options = q.type === "tf" ? ["Vrai", "Faux"] : q.options;

  const isCorrect = useMemo(() => {
    if (selected == null) return false;
    if (q.type === "tf") return (selected === "Vrai") === q.correct;
    return selected === q.correct;
  }, [selected, q]);

  const encourage = ENCOURAGE[step % ENCOURAGE.length];

  function pick(opt: string) {
    if (revealed) return;
    setSelected(opt);
    setRevealed(true);
    const correct = q.type === "tf" ? (opt === "Vrai") === q.correct : opt === q.correct;
    const amount = correct ? 10 : 3;
    addXp(amount);
    if (correct) {
      playCorrectAnswerSound();
      setScore((s) => s + 1);
    } else {
      playWrongAnswerSound();
    }
    setBurst({ show: true, amount });
    setTimeout(() => setBurst({ show: false, amount: 0 }), 1400);
  }

  function next() {
    if (step + 1 >= total) {
      completeUniverse(universe!.id);
      playStageCompleteSound();
      setDone(true);
    } else {
      setStep((s) => s + 1);
      setSelected(null);
      setRevealed(false);
    }
  }


  const themeClass = {
    "jardin": "theme-jardin",
    "forteresse": "theme-forteresse",
    "academie": "theme-academie",
    "vigie": "theme-vigie",
  }[universe.id] || "";

  return (
    <main className={`min-h-[100dvh] relative overflow-hidden bg-background transition-colors duration-700 ${themeClass}`}>
      <AtmosphericBackground />

      <XpBurst show={burst.show} amount={burst.amount} />

      <div className="mx-auto w-full max-w-[420px] px-4 sm:px-5 pt-5 pb-10 min-h-[100dvh] flex flex-col">
        {/* Navigation & Progress - Hidden during question phase if strictly minimal */}
        <AnimatePresence>
          {!revealed && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4"
            >
              <div className="flex items-center justify-between mb-2">
                <Link to="/univers" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                  ← Retour
                </Link>
                <span className="text-xl">{universe.badge}</span>
              </div>
              <ProgressBar value={step + 1} total={total} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 flex flex-col justify-center py-10"
            >
              {/* Ultra-focused question area */}
              <div className="text-center mb-12">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  className="text-[10px] font-black uppercase tracking-[0.2em] mb-4"
                >
                  Question {step + 1} / {total}
                </motion.p>
                <h1 className="font-display text-3xl sm:text-4xl font-black leading-tight text-balance">
                  {q.prompt}
                </h1>
              </div>

              {/* Options - Large and animated */}
              <div className="space-y-3.5">
                {options.map((opt, idx) => {
                  const isPicked = selected === opt;
                  const showCorrect = revealed && (q.type === "tf" ? (opt === "Vrai") === q.correct : opt === q.correct);
                  const showWrong = revealed && isPicked && !showCorrect;
                  return (
                    <motion.button
                      key={opt}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                      whileHover={{ scale: revealed ? 1 : 1.05, y: revealed ? 0 : -5 }}
                      whileTap={{ scale: revealed ? 1 : 0.95 }}
                      onClick={() => pick(opt)}
                      disabled={revealed}
                      className={[
                        "w-full text-center rounded-[32px] px-6 py-6 border-2 transition-all duration-500 font-black text-xl shadow-lg",
                        showCorrect
                          ? "bg-success border-success text-success-foreground shadow-glow-primary scale-[1.05]"
                          : showWrong
                            ? "bg-destructive/20 border-destructive text-destructive opacity-80"
                            : isPicked
                              ? "bg-primary border-primary text-primary-foreground shadow-glow-primary"
                              : "glass text-foreground/90 hover:border-primary hover:shadow-glow-primary",
                        revealed && !isPicked && !showCorrect ? "opacity-30 grayscale-[0.8] scale-95" : "",
                      ].join(" ")}
                    >
                      {opt}
                    </motion.button>
                  );
                })}
              </div>

              {/* Sultana feedback overlay */}
              <AnimatePresence>
                {revealed && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-10 flex flex-col items-center gap-4"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="shrink-0">
                        <SultanaAvatar size={64} float={true} />
                      </div>
                      <div className="flex-1">
                        <SpeechBubble delay={0}>
                          {isCorrect ? (
                            <><strong className="text-primary">{encourage}</strong><br />{q.explanation}</>
                          ) : (
                            <><strong>Pas tout à fait…</strong><br />{q.explanation}</>
                          )}
                        </SpeechBubble>
                      </div>
                    </div>
                    
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={next}
                      className="mt-2 w-full max-w-[240px] rounded-full bg-gradient-theme py-4 px-8 text-center text-base font-black text-primary-foreground shadow-glow"
                    >
                      {step + 1 >= total ? "Terminer ✦" : "Suivant →"}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-6 flex-1 flex flex-col items-center justify-center text-center gap-5"
            >
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 180, damping: 12, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gold/40 blur-3xl rounded-full" />
                <div className="relative h-32 w-32 rounded-full bg-gradient-warm flex items-center justify-center text-6xl shadow-glow">
                  {universe.badge}
                </div>
              </motion.div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Badge débloqué</p>
                <h2 className="font-display text-2xl font-bold mt-1">{universe.badgeName}</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Tu as répondu à <strong className="text-foreground">{score}/{total}</strong> questions correctement.
                </p>
              </div>

              <div className="w-full text-left rounded-3xl bg-card border border-border/50 p-5 shadow-soft">
                <p className="text-[11px] font-bold uppercase tracking-wider text-primary mb-3">📖 En savoir plus</p>
                <div className="space-y-3.5">
                  {universe.resources.map((r) => (
                    <div key={r.title}>
                      <p className="font-display font-bold text-sm">{r.title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{r.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full space-y-2.5">
                <button
                  onClick={() => navigate({ to: "/univers" })}
                  className="w-full rounded-2xl bg-gradient-warm py-4 font-bold text-primary-foreground shadow-soft active:scale-[0.98] transition-transform"
                >
                  Continuer l'aventure
                </button>
                <button
                  onClick={() => navigate({ to: "/final" })}
                  className="w-full rounded-2xl bg-card border border-border py-3 font-semibold text-sm hover:bg-secondary/50 transition-colors"
                >
                  Voir mon parcours
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
