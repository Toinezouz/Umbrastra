import { COLOR_ORDER, getTileByNumber } from '@umbrastra/shared';
import { useI18n, type MessageKey } from '../../i18n/index.js';
import { Modal } from '../../components/ui/Modal.js';
import { Button } from '../../components/ui/Button.js';
import { Tile } from '../../components/game/Tile.js';
import { TileBack } from '../../components/game/TileBack.js';
import { Asterism } from '../../components/game/Asterism.js';
import { Icon, type IconName } from '../../components/ui/Icon.js';

export interface HowToPlayProps {
  open: boolean;
  onClose: () => void;
}

interface Section {
  key: string;
  icon: IconName;
  extra?: MessageKey;
}

/** The sections of the rules, in reading order. */
const SECTIONS: readonly Section[] = [
  { key: 'stars', icon: 'star' },
  { key: 'setup', icon: 'eye-off' },
  { key: 'turn', icon: 'turn' },
  { key: 'place', icon: 'place' },
  { key: 'gauge', icon: 'gauge', extra: 'howto.used.text' },
  { key: 'chart', icon: 'chart' },
  { key: 'call', icon: 'crown' },
  { key: 'table', icon: 'dice' },
  { key: 'end', icon: 'moon' },
];

/** The rules, illustrated with the game's own components (no external image). */
export function HowToPlay({ open, onClose }: HowToPlayProps): JSX.Element | null {
  const { t, color: colorName } = useI18n();
  if (!open) {
    return null;
  }

  const illustration = (key: string): JSX.Element | null => {
    switch (key) {
      case 'stars':
        return (
          <div className="howto__legend">
            {COLOR_ORDER.map((color, index) => (
              <span className="howto__constellation" data-color={color} key={color}>
                <Tile tile={getTileByNumber(index + 1 + 5 * ((index * 4) % 12))} size="sm" />
                <span>{colorName(color)}</span>
              </span>
            ))}
          </div>
        );
      case 'setup':
        return (
          <div className="howto__row">
            {COLOR_ORDER.map((color, position) => (
              <TileBack key={color} color={color} position={position} size="sm" />
            ))}
          </div>
        );
      case 'place':
        return (
          <div className="howto__row howto__row--example">
            <TileBack color="green" position={0} size="sm" />
            <span className="onboarding__slot">
              <Tile tile={getTileByNumber(22)} size="xs" />
            </span>
            <TileBack color="pink" position={1} size="sm" />
            <TileBack color="blue" position={2} size="sm" />
          </div>
        );
      case 'gauge':
        return (
          <div className="howto__row howto__row--example">
            <Tile tile={getTileByNumber(27)} size="sm" />
            <span className="howto__link" aria-hidden="true">
              <Icon name="gauge" size={20} />
            </span>
            <TileBack color="red" position={3} size="sm" />
            <span className="compare-area__answer is-yes howto__answer">{t('compare.yes')}</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      open={open}
      wide
      title={t('howto.title')}
      onClose={onClose}
      actions={
        <Button variant="primary" onClick={onClose}>
          {t('common.understood')}
        </Button>
      }
    >
      <p className="howto__intro">{t('howto.intro')}</p>
      <ol className="howto">
        {SECTIONS.map((section) => (
          <li className="howto__item" key={section.key}>
            <span className="howto__icon" aria-hidden="true">
              <Icon name={section.icon} size={22} />
            </span>
            <div className="howto__body">
              <h3>{t(`howto.${section.key}.title` as MessageKey)}</h3>
              <p>{t(`howto.${section.key}.text` as MessageKey)}</p>
              {section.extra ? <p className="muted">{t(section.extra)}</p> : null}
              {illustration(section.key)}
            </div>
          </li>
        ))}
      </ol>
      <p className="howto__asterisms" aria-hidden="true">
        {COLOR_ORDER.map((color) => (
          <span data-color={color} key={color}>
            <Asterism color={color} size={18} />
          </span>
        ))}
      </p>
    </Modal>
  );
}
