import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { getUniverse } from "@/lib/universes";
import { ProgressBar } from "@/components/sultana/ProgressBar";
import { SpeechBubble } from "@/components/sultana/SpeechBubble";
import { SultanaAvatar } from "@/components/sultana/SultanaAvatar";
import { XpBurst } from "@/components/sultana/XpBurst";
import { addXp, completeUniverse } from "@/lib/progress";
import { playCorrectAnswerSound, playStageCompleteSound } from "@/lib/audio";

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

  return (
    <main className="min-h-[100dvh] relative overflow-hidden">
      {/* atmospheric background */}
      <div className="absolute inset-0 -z-10">
        <img src={universe.image} alt="" className="h-full w-full object-cover opacity-30" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/90 to-background" />
      </div>

      <XpBurst show={burst.show} amount={burst.amount} />

      <div className="mx-auto w-full max-w-[420px] px-4 sm:px-5 pt-5 pb-10 min-h-[100dvh] flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <Link to="/univers" className="text-sm font-medium text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors">
            <span>←</span> Univers
          </Link>
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-2xl"
          >
            {universe.badge}
          </motion.span>
        </div>

        <div className="mb-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary/80">{universe.subtitle}</p>
          <h1 className="font-display text-[22px] sm:text-2xl font-bold leading-tight mt-0.5">{universe.title}</h1>
        </div>

        {!done && <ProgressBar value={step + 1} total={total} />}

        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 60, scale: 0.96, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -60, scale: 0.96, filter: "blur(6px)" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 flex-1 flex flex-col"
            >
              {/* Premium question card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="relative rounded-[28px] bg-card border border-border/50 p-5 shadow-soft overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-warm" />
                <div className="absolute -top-12 -right-10 h-32 w-32 rounded-full bg-primary/8 blur-2xl" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gradient-warm text-primary-foreground text-[11px] font-bold">
                      {step + 1}
                    </span>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      {q.type === "tf" ? "Vrai ou Faux" : "Choix"}
                    </p>
                  </div>
                  <p className="font-display text-[17px] sm:text-lg font-semibold leading-snug text-balance max-w-[34ch]">
                    {q.prompt}
                  </p>
                </div>
              </motion.div>

              {/* Options */}
              <div className="mt-3.5 space-y-2.5">
                {options.map((opt, idx) => {
                  const isPicked = selected === opt;
                  const showCorrect = revealed && (q.type === "tf" ? (opt === "Vrai") === q.correct : opt === q.correct);
                  const showWrong = revealed && isPicked && !showCorrect;
                  return (
                    <motion.button
                      key={opt}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => pick(opt)}
                      disabled={revealed}
                      className={[
                        "w-full text-left rounded-2xl px-4 py-3.5 border-2 transition-all duration-300 font-semibold text-[15px] flex items-center justify-between gap-3",
                        showCorrect
                          ? "bg-success/15 border-success text-foreground shadow-soft"
                          : showWrong
                            ? "bg-destructive/8 border-destructive/50 text-foreground"
                            : isPicked
                              ? "bg-primary/8 border-primary"
                              : "bg-card border-border/70 hover:border-primary/40 hover:shadow-soft",
                      ].join(" ")}
                    >
                      <span className="leading-snug">{opt}</span>
                      {showCorrect && (
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }} className="text-success">
                          ✓
                        </motion.span>
                      )}
                      {showWrong && (
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-muted-foreground">
                          💭
                        </motion.span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Sultana feedback */}
              <AnimatePresence>
                {revealed && (
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-5 flex items-end gap-2.5"
                  >
                    <div className="-mb-2 shrink-0">
                      <SultanaAvatar size={72} float={false} />
                    </div>
                    <SpeechBubble delay={0.05}>
                      {isCorrect ? (
                        <><strong className="text-foreground">{encourage}</strong> {q.explanation}</>
                      ) : (
                        <><strong>Pas exactement…</strong> {q.explanation}</>
                      )}
                    </SpeechBubble>
                  </motion.div>
                )}
              </AnimatePresence>

              {revealed && (
                <motion.button
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={next}
                  className="mt-5 w-full rounded-2xl bg-gradient-warm py-4 text-center text-[15px] font-bold text-primary-foreground shadow-soft hover:shadow-glow transition-shadow"
                >
                  {step + 1 >= total ? "Recevoir mon badge ✦" : "Continuer →"}
                </motion.button>
              )}
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
