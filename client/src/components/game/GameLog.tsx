import { useEffect, useRef } from 'react';
import { colorForNumber, isValidTileNumber, type LogEntry, type LogKind } from '@umbrastra/shared';
import { useI18n, type MessageKey } from '../../i18n/index.js';
import { Icon, type IconName } from '../ui/Icon.js';

const ICONS: Record<LogKind, IconName> = {
  system: 'dice',
  reveal: 'eye',
  'hint-request': 'help',
  classify: 'place',
  compare: 'gauge',
  turn: 'turn',
  guess: 'crown',
  connection: 'plug',
};

/** Marks the star number inside a translated sentence (never displayed). */
const MARK = '\u0001';

export interface GameLogProps {
  entries: LogEntry[];
  /** Limited height in the side panel, free in full screen. */
  compact?: boolean;
}

/**
 * Public history: facts only, never secret information. The server sends a
 * code and its parameters; the sentence is built here, in the player's
 * language.
 */
export function GameLog({ entries, compact = true }: GameLogProps): JSX.Element {
  const { t, slot } = useI18n();
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const node = listRef.current;
    if (node) {
      node.scrollTop = node.scrollHeight;
    }
  }, [entries.length]);

  const render = (entry: LogEntry): string => {
    const params = { ...entry.params };
    // The gap label depends on the language too.
    if (typeof params['slot'] === 'number') {
      params['slot'] = slot(params['slot']).toLowerCase();
    }
    const key: MessageKey =
      entry.code === 'compare-answered'
        ? params['match'] === true
          ? 'log.compare-answered.yes'
          : 'log.compare-answered.no'
        : (`log.${entry.code}` as MessageKey);
    // The star a line is about is shown as a small coloured chip: marked
    // here, cut out below, so the sentence stays the translator's.
    if (typeof params['tile'] === 'number' && isValidTileNumber(params['tile'])) {
      params['tile'] = `${MARK}${String(params['tile'])}${MARK}`;
    }
    return t(key, params as Record<string, string | number>);
  };

  const withChips = (text: string): (string | JSX.Element)[] =>
    text.split(MARK).map((part, index) =>
      index % 2 === 1 ? (
        <span className="log-star" data-color={colorForNumber(Number(part))} key={index}>
          {part}
        </span>
      ) : (
        part
      ),
    );

  return (
    <ol
      className={`game-log ${compact ? 'game-log--compact' : ''}`.trim()}
      ref={listRef}
      aria-label={t('log.title')}
    >
      {entries.length === 0 ? (
        <li className="game-log__empty muted">{t('log.empty')}</li>
      ) : null}
      {entries.map((entry) => (
        <li className="game-log__item" key={entry.id} data-kind={entry.kind}>
          <span className="game-log__icon" aria-hidden="true">
            <Icon name={ICONS[entry.kind]} size={16} />
          </span>
          <span>{withChips(render(entry))}</span>
        </li>
      ))}
    </ol>
  );
}
