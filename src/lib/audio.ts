import backgroundMusicSrc from "@/assets/audio/background-music.mp3";
import clickSoundSrc from "@/assets/audio/ui-click.mp3";
import correctAnswerSrc from "@/assets/audio/correct-answer.mp3";
import stageCompleteSrc from "@/assets/audio/stage-complete.mp3";

const AUDIO_ENABLED_KEY = "sultana-audio-enabled";
const MUSIC_VOLUME = 0.22;
const CLICK_VOLUME = 0.22;
const CORRECT_VOLUME = 0.38;
const STAGE_COMPLETE_VOLUME = 0.52;

let music: HTMLAudioElement | null = null;
let clickSound: HTMLAudioElement | null = null;
let correctSound: HTMLAudioElement | null = null;
let stageCompleteSound: HTMLAudioElement | null = null;
let isUnlocked = false;
let lastClickAt = 0;
let lastCorrectAt = 0;

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
    // Mobile browsers may wait for a stronger user gesture.
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
  audio.pause();
  audio.currentTime = 0;
  audio.volume = volume;
  void audio.play().catch(() => undefined);
}

export function playClickSound() {
  const now = Date.now();
  if (now - lastClickAt < 70) return;
  lastClickAt = now;
  ensureAudio();
  playOneShot(clickSound, CLICK_VOLUME);
}

export function playCorrectAnswerSound() {
  const now = Date.now();
  if (now - lastCorrectAt < 280) return;
  lastCorrectAt = now;
  ensureAudio();
  playOneShot(correctSound, CORRECT_VOLUME);
}

export function playStageCompleteSound() {
  ensureAudio();
  playOneShot(stageCompleteSound, STAGE_COMPLETE_VOLUME);
}
