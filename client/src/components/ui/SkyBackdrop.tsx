import type { CSSProperties } from 'react';

/**
 * The living sky behind every screen.
 *
 * Several layers, all decorative and hidden from assistive technologies:
 *   - a faint nebula in the colours of the five constellations, drifting;
 *   - three fields of stars at different depths, sliding very slowly (the
 *     nearer the field, the faster it moves: a sense of depth);
 *   - a few bright stars that scintillate, with the four diffraction spikes
 *     a telescope gives them;
 *   - now and then, a meteor.
 *
 * Everything moves with `transform` and `opacity` only, so the browser does
 * not repaint the page. Under "reduce motion" the sky simply stands still
 * (see atmosphere.css). In the light theme the same layers become a printed
 * chart: ink dots, a coordinate grid, no meteor.
 */

interface Twinkle {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  tint: number;
}

/** Deterministic positions: the sky is the same on every visit. */
function twinkles(count: number): Twinkle[] {
  let seed = 20_251;
  const next = (): number => {
    seed = (seed * 16_807) % 2_147_483_647;
    return seed / 2_147_483_647;
  };
  return Array.from({ length: count }, () => ({
    x: 2 + next() * 96,
    y: 2 + next() * 96,
    size: 7 + next() * next() * 15,
    delay: -next() * 12,
    duration: 5 + next() * 7,
    tint: Math.floor(next() * 4),
  }));
}

const TWINKLES = twinkles(22);

type SkyVars = CSSProperties & Record<`--${string}`, string>;

export function SkyBackdrop(): JSX.Element {
  return (
    <div className="sky" aria-hidden="true">
      <div className="sky__nebula sky__nebula--a" />
      <div className="sky__nebula sky__nebula--b" />
      <div className="sky__nebula sky__nebula--c" />
      <div className="sky__grid" />
      <div className="sky__field sky__field--far" />
      <div className="sky__field sky__field--mid" />
      <div className="sky__field sky__field--near" />
      {TWINKLES.map((star, index) => {
        const style: SkyVars = {
          '--x': `${star.x.toFixed(2)}%`,
          '--y': `${star.y.toFixed(2)}%`,
          '--s': `${star.size.toFixed(1)}px`,
          '--delay': `${star.delay.toFixed(2)}s`,
          '--dur': `${star.duration.toFixed(2)}s`,
        };
        return <span key={index} className={`sky__twinkle sky__twinkle--t${String(star.tint)}`} style={style} />;
      })}
      <span className="sky__meteor sky__meteor--a" />
      <span className="sky__meteor sky__meteor--b" />
      <div className="sky__grain" />
    </div>
  );
}
