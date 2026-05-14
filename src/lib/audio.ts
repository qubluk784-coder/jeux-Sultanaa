import backgroundMusicSrc from "@/assets/audio/stages/1.mp3";
import clickSoundSrc from "@/assets/audio/stages/2.mp3";
import correctAnswerSrc from "@/assets/audio/stages/3.mp3";
import stageCompleteSrc from "@/assets/audio/stages/4.mp3";

const AUDIO_ENABLED_KEY = "sultana-audio-enabled";
const MUSIC_VOLUME = 0.15; // Slightly lower for better balance
const CLICK_VOLUME = 0.25;
const CORRECT_VOLUME = 0.4;
const STAGE_COMPLETE_VOLUME = 0.5;
const OOPS_VOLUME = 0.25;

let music: HTMLAudioElement | null = null;
let clickSound: HTMLAudioElement | null = null;
let correctSound: HTMLAudioElement | null = null;
let stageCompleteSound: HTMLAudioElement | null = null;
let oopsSound: HTMLAudioElement | null = null;

let currentUniverseId: string | null = null;
let isUnlocked = false;

function canUseAudio() {
  return typeof window !== "undefined" && typeof Audio !== "undefined";
}

function createAudio(src: string, volume: number, loop = false) {
  if (!canUseAudio()) return null;
  const audio = new Audio(src);
  audio.preload = "auto";
  audio.volume = volume;
  audio.loop = loop;
  return audio;
}

function ensureAudio() {
  if (!canUseAudio()) return;
  music ??= createAudio(backgroundMusicSrc, MUSIC_VOLUME, true);
  clickSound ??= createAudio(clickSoundSrc, CLICK_VOLUME);
  correctSound ??= createAudio(correctAnswerSrc, CORRECT_VOLUME);
  stageCompleteSound ??= createAudio(stageCompleteSrc, STAGE_COMPLETE_VOLUME);
  oopsSound ??= createAudio("/audio/oops.mp3", OOPS_VOLUME);
}

export function isAudioEnabled() {
  if (!canUseAudio()) return false;
  return window.localStorage.getItem(AUDIO_ENABLED_KEY) !== "false";
}

export function setAudioEnabled(enabled: boolean) {
  if (!canUseAudio()) return;
  ensureAudio();
  window.localStorage.setItem(AUDIO_ENABLED_KEY, String(enabled));

  if (!enabled) {
    music?.pause();
    return;
  }

  void startBackgroundMusic();
}

export async function startBackgroundMusic() {
  if (!isAudioEnabled()) return;
  ensureAudio();
  if (!music || !isUnlocked) return;

  music.volume = MUSIC_VOLUME;
  try {
    await music.play();
  } catch {
    // Handled by unlockAudio
  }
}

export async function switchMusic(universeId: string | null) {
  if (!canUseAudio()) return;
  ensureAudio();
  
  if (currentUniverseId === universeId) return;
  currentUniverseId = universeId;

  if (music) {
    music.pause();
    music.currentTime = 0;
  }

  const src = universeId ? `/audio/stages/${universeId}.mp3` : backgroundMusicSrc;
  music = createAudio(src, MUSIC_VOLUME, true);
  
  if (isAudioEnabled() && isUnlocked) {
    void music?.play().catch(() => {
      // If the dynamic file fails (404), fall back to default
      if (universeId) {
        music = createAudio(backgroundMusicSrc, MUSIC_VOLUME, true);
        void music?.play();
      }
    });
  }
}

export function unlockAudio() {
  if (!canUseAudio() || isUnlocked) return;
  ensureAudio();
  isUnlocked = true;
  void startBackgroundMusic();
}

function playOneShot(audio: HTMLAudioElement | null, volume: number) {
  if (!audio || !isAudioEnabled()) return;
  
  // Clone to allow overlapping sounds
  const clone = audio.cloneNode() as HTMLAudioElement;
  clone.volume = volume;
  void clone.play().catch(() => undefined);
}

export function playClickSound() {
  ensureAudio();
  playOneShot(clickSound, CLICK_VOLUME);
}

export function playCorrectAnswerSound() {
  ensureAudio();
  playOneShot(correctSound, CORRECT_VOLUME);
}

export function playWrongAnswerSound() {
  ensureAudio();
  playOneShot(oopsSound, OOPS_VOLUME);
}

export function playStageCompleteSound() {
  ensureAudio();
  playOneShot(stageCompleteSound, STAGE_COMPLETE_VOLUME);
}

