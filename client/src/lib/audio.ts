/**
 * Fully synthesised sound (Web Audio API): no file to download, no external
 * asset. The game works perfectly well when sound is unavailable or off.
 */

export type SoundName =
  | 'click'
  | 'reveal'
  | 'place'
  | 'yes'
  | 'no'
  | 'turn'
  | 'spin'
  | 'error'
  | 'victory'
  | 'defeat';

interface Note {
  frequency: number;
  /** Relative start, in seconds. */
  at: number;
  duration: number;
  type?: OscillatorType;
  gain?: number;
}

/**
 * Clicks of the wheel: ticks that space out as the wheel slows down, timed
 * to the spin (~2.4 s).
 */
function rouletteTicks(): Note[] {
  const notes: Note[] = [];
  let at = 0;
  for (let i = 0; i < 26; i += 1) {
    const progress = i / 25;
    notes.push({
      frequency: 620 - 160 * progress,
      at,
      duration: 0.05,
      type: 'sine',
      gain: 0.04,
    });
    at += 0.04 + 0.16 * progress * progress;
  }
  return notes;
}

/*
 * A soft set, to match the quiet look: sine and triangle waves only, low
 * volume, notes of one pentatonic scale (C D E G A) so that nothing ever
 * sounds wrong next to anything else.
 */
const SOUNDS: Record<SoundName, Note[]> = {
  click: [{ frequency: 523, at: 0, duration: 0.07, type: 'sine', gain: 0.05 }],
  reveal: [
    { frequency: 392, at: 0, duration: 0.14, type: 'sine' },
    { frequency: 587, at: 0.09, duration: 0.22, type: 'sine' },
  ],
  place: [
    { frequency: 294, at: 0, duration: 0.12, type: 'triangle' },
    { frequency: 220, at: 0.07, duration: 0.2, type: 'sine' },
  ],
  yes: [
    { frequency: 523, at: 0, duration: 0.14 },
    { frequency: 659, at: 0.1, duration: 0.26 },
  ],
  no: [
    { frequency: 330, at: 0, duration: 0.16 },
    { frequency: 262, at: 0.12, duration: 0.28 },
  ],
  turn: [
    { frequency: 392, at: 0, duration: 0.14 },
    { frequency: 523, at: 0.11, duration: 0.24 },
  ],
  spin: rouletteTicks(),
  error: [{ frequency: 196, at: 0, duration: 0.26, type: 'triangle', gain: 0.06 }],
  victory: [
    { frequency: 523, at: 0, duration: 0.22 },
    { frequency: 659, at: 0.16, duration: 0.22 },
    { frequency: 784, at: 0.32, duration: 0.26 },
    { frequency: 1046, at: 0.5, duration: 0.6, gain: 0.06 },
  ],
  defeat: [
    { frequency: 392, at: 0, duration: 0.24 },
    { frequency: 330, at: 0.2, duration: 0.28 },
    { frequency: 262, at: 0.42, duration: 0.5 },
  ],
};

let context: AudioContext | null = null;
let enabled = true;

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') {
    return null;
  }
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) {
    return null;
  }
  if (!context) {
    try {
      context = new Ctor();
    } catch {
      return null;
    }
  }
  return context;
}

export function setSoundEnabled(value: boolean): void {
  enabled = value;
}

export function isSoundEnabled(): boolean {
  return enabled;
}

/** Plays a short sound. Silent, and error-free, when audio is unavailable. */
export function playSound(name: SoundName): void {
  if (!enabled) {
    return;
  }
  const ctx = getContext();
  if (!ctx) {
    return;
  }
  if (ctx.state === 'suspended') {
    void ctx.resume();
  }
  const now = ctx.currentTime;
  for (const note of SOUNDS[name]) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = note.type ?? 'sine';
    osc.frequency.value = note.frequency;
    const peak = note.gain ?? 0.07;
    gain.gain.setValueAtTime(0.0001, now + note.at);
    // A gentle attack: no click at the start of a note.
    gain.gain.exponentialRampToValueAtTime(peak, now + note.at + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + note.at + note.duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now + note.at);
    osc.stop(now + note.at + note.duration + 0.02);
  }
}
