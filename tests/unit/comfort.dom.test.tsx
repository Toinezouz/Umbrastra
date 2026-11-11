import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import type { LogEntry } from '@umbrastra/shared';
import { GameLog } from '../../client/src/components/game/GameLog.js';
import { I18nProvider } from '../../client/src/i18n/index.js';
import { applyContrast } from '../../client/src/lib/theme.js';
import { loadPreferences, savePreferences } from '../../client/src/lib/storage.js';
import { en } from '../../client/src/i18n/en.js';
import { fr } from '../../client/src/i18n/fr.js';
import { es } from '../../client/src/i18n/es.js';

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  applyContrast(false);
});

describe('High contrast', () => {
  it('is off by default, remembered once chosen, and set on <html>', () => {
    expect(loadPreferences().highContrast).toBe(false);
    savePreferences({ highContrast: true });
    expect(loadPreferences().highContrast).toBe(true);

    applyContrast(true);
    expect(document.documentElement.dataset['contrast']).toBe('high');
    applyContrast(false);
    expect(document.documentElement.dataset['contrast']).toBeUndefined();
  });

  it('ignores a damaged stored value', () => {
    window.localStorage.setItem('umbrastra:prefs', JSON.stringify({ highContrast: 'yes' }));
    expect(loadPreferences().highContrast).toBe(false);
  });

  it('is named in every language', () => {
    for (const catalogue of [en, fr, es]) {
      expect(catalogue['contrast.label'].trim().length).toBeGreaterThan(0);
      expect(catalogue['header.more'].trim().length).toBeGreaterThan(0);
    }
  });
});

describe('The history of the game', () => {
  it('shows the star of a line as a chip in its constellation’s colour', () => {
    const entries = [
      {
        id: 'l1',
        kind: 'reveal',
        code: 'tile-revealed',
        params: { name: 'Alice', tile: 27 },
        turn: 1,
        at: 0,
      },
    ] as unknown as LogEntry[];
    const { container } = render(
      <I18nProvider initialLanguage="en">
        <GameLog entries={entries} />
      </I18nProvider>,
    );
    const chip = container.querySelector('.log-star')!;
    expect(chip).toHaveTextContent('27');
    // 27 is a star of Orion.
    expect(chip.getAttribute('data-color')).toBe('pink');
    // The sentence itself is intact, with no stray marker.
    const line = container.querySelector('.game-log__item')!.textContent ?? '';
    expect(line).toContain('Alice');
    expect(line).toContain('27');
    expect(line.includes(String.fromCharCode(1))).toBe(false);
  });
});
