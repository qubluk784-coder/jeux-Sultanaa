const KEY = "sultana.progress.v1";

export type Progress = {
  xp: number;
  badges: string[]; // universe ids
  completed: string[];
};

const empty: Progress = { xp: 0, badges: [], completed: [] };

export function loadProgress(): Progress {
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty;
    return { ...empty, ...JSON.parse(raw) };
  } catch {
    return empty;
  }
}

export function saveProgress(p: Progress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(p));
}

export function addXp(amount: number) {
  const p = loadProgress();
  p.xp += amount;
  saveProgress(p);
  return p;
}

export function completeUniverse(id: string) {
  const p = loadProgress();
  if (!p.completed.includes(id)) p.completed.push(id);
  if (!p.badges.includes(id)) p.badges.push(id);
  saveProgress(p);
  return p;
}

export function resetProgress() {
  saveProgress(empty);
}
