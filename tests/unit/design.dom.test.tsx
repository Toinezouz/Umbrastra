import { readFileSync } from 'node:fs';
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

const STYLES = ['tokens', 'base', 'ui', 'game', 'deduction', 'screens'].map((name) => ({
  name,
  css: readFileSync(new URL(`../../client/src/styles/${name}.css`, import.meta.url), 'utf8'),
}));

describe('A quiet interface', () => {
  it('keeps the sky and the home chart as silent decoration', () => {
    const { container } = render(
      <>
        <SkyBackdrop />
        <SkyChart />
      </>,
    );
    for (const selector of ['.sky', '.skychart']) {
      const node = container.querySelector(selector)!;
      expect(node.getAttribute('aria-hidden')).toBe('true');
    }
    expect(container.querySelector('.sky')!.textContent).toBe('');
    expect(container.querySelectorAll('.skychart__figure')).toHaveLength(5);
  });

  it('loops nothing for decoration: only the waiting dots repeat', () => {
    // Movement answers an event and stops. An endless animation anywhere
    // else is what made an earlier version tiring to look at.
    for (const { name, css } of STYLES) {
      const rules = css.split('}');
      for (const rule of rules) {
        if (/animation[^;]*\binfinite\b/.test(rule)) {
          expect(rule, `${name}.css`).toContain('.waiting-dots');
        }
      }
    }
  });

  it('never brightens a whole element into a flash', () => {
    for (const { name, css } of STYLES) {
      expect(css, `${name}.css`).not.toMatch(/filter:\s*[^;]*brightness\((?:[2-9]|1\.[2-9])/);
      expect(css, `${name}.css`).not.toMatch(/mix-blend-mode\s*:/);
    }
  });
});

describe('A star', () => {
  it('shows its figure, number and sparks, and nothing else', () => {
    const { container } = render(
      <I18nProvider initialLanguage="en">
        <Tile tile={getTileByNumber(27)} onClick={() => undefined} />
        <TileBack color="pink" position={1} />
      </I18nProvider>,
    );
    const [face, back] = [...container.querySelectorAll<HTMLElement>('.tile')];
    expect(face!.querySelector('.tile__number')).toHaveTextContent('27');
    expect(face!.getAttribute('aria-label')).toContain('27');
    expect(face!.querySelectorAll('.tile__dot').length).toBeGreaterThan(0);
    // A hidden star still carries no number.
    expect(back!.textContent).not.toMatch(/\d{2}/);
    expect(back!.querySelector('.tile__dot')).toBeNull();
  });
});
