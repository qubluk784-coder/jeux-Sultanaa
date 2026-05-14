import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";

import {
  isAudioEnabled,
  playClickSound,
  setAudioEnabled,
  startBackgroundMusic,
  unlockAudio,
} from "@/lib/audio";

export function AudioController() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    setEnabled(isAudioEnabled());

    const handleFirstGesture = () => {
      unlockAudio();
      void startBackgroundMusic();
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest("button, a, [role='button']")) {
        unlockAudio();
        playClickSound();
      }
    };

    window.addEventListener("pointerdown", handleFirstGesture, { once: true });
    window.addEventListener("keydown", handleFirstGesture, { once: true });
    document.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("pointerdown", handleFirstGesture);
      window.removeEventListener("keydown", handleFirstGesture);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  function toggleAudio() {
    const next = !enabled;
    setEnabled(next);
    setAudioEnabled(next);
  }

  return (
    <button
      type="button"
      onClick={toggleAudio}
      className="fixed bottom-4 right-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/75 text-foreground shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
      aria-label={enabled ? "Couper la musique" : "Activer la musique"}
      title={enabled ? "Couper la musique" : "Activer la musique"}
    >
      {enabled ? <Volume2 className="h-5 w-5 text-primary" /> : <VolumeX className="h-5 w-5" />}
    </button>
  );
}
