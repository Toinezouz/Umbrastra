import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { getTileByNumber } from '@umbrastra/shared';
import { SkyBackdrop } from '../../client/src/components/ui/SkyBackdrop.js';
import { SkyChart } from '../../client/src/components/ui/SkyChart.js';
import { Tile } from '../../client/src/components/game/Tile.js';
import { TileBack } from '../../client/src/components/game/TileBack.js';
import { I18nProvider } from '../../client/src/i18n/index.js';

afterEach(() => {
  cleanup();
});

describe('The living sky', () => {
  it('is pure decoration, hidden from assistive technologies', () => {
    const { container } = render(<SkyBackdrop />);
    const sky = container.querySelector('.sky')!;
    expect(sky.getAttribute('aria-hidden')).toBe('true');
    expect(sky.textContent).toBe('');
    expect(sky.querySelectorAll('.sky__field')).toHaveLength(3);
    expect(sky.querySelectorAll('.sky__meteor').length).toBeGreaterThan(0);
  });

  it('draws the same scintillating stars on every visit', () => {
    const read = (): string[] => {
      const { container, unmount } = render(<SkyBackdrop />);
      const styles = [...container.querySelectorAll<HTMLElement>('.sky__twinkle')].map(
        (el) => el.getAttribute('style') ?? '',
      );
      unmount();
      return styles;
    };
    const first = read();
    expect(first.length).toBeGreaterThan(10);
    expect(read()).toEqual(first);
  });

  it('traces the constellations of the home chart on a graduated rim', () => {
    const { container } = render(<SkyChart />);
    expect(container.querySelectorAll('.skychart__tick')).toHaveLength(72);
    const figures = container.querySelectorAll('.skychart__figure');
    expect(figures).toHaveLength(5);
    for (const figure of figures) {
      expect(figure.getAttribute('pathLength')).toBe('1');
    }
  });
});

describe('The optics of a star', () => {
  it('adds glass and spikes without changing what is announced', () => {
    const { container } = render(
      <I18nProvider initialLanguage="en">
        <Tile tile={getTileByNumber(27)} onClick={() => undefined} />
        <TileBack color="pink" position={1} />
      </I18nProvider>,
    );
    const [face, back] = [...container.querySelectorAll<HTMLElement>('.tile')];
    for (const tile of [face!, back!]) {
      const optics = tile.querySelectorAll('.tile__spikes, .tile__glass');
      expect(optics).toHaveLength(2);
      for (const layer of optics) {
        expect(layer.getAttribute('aria-hidden')).toBe('true');
        expect(layer.textContent).toBe('');
      }
    }
    expect(face!.getAttribute('aria-label')).toContain('27');
    // A hidden star still carries no number.
    expect(back!.textContent).not.toMatch(/\d{2}/);
  });
});
