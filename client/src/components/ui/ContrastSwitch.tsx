import { useI18n } from '../../i18n/index.js';
import { Icon } from './Icon.js';
import { IconButton } from './IconButton.js';

export interface ContrastSwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
  /** Compact version: an icon button, for the game header. */
  compact?: boolean;
}

/** High contrast on or off: stronger text and lines, in either theme. */
export function ContrastSwitch({ value, onChange, compact = false }: ContrastSwitchProps): JSX.Element {
  const { t } = useI18n();
  const toggle = (): void => {
    onChange(!value);
  };

  if (compact) {
    return (
      <IconButton label={t('contrast.label')} aria-pressed={value} data-testid="contrast-toggle" onClick={toggle}>
        <Icon name="contrast" />
      </IconButton>
    );
  }

  return (
    <button
      type="button"
      className={`theme-switch__button contrast-switch ${value ? 'is-active' : ''}`.trim()}
      aria-pressed={value}
      data-testid="contrast-toggle"
      onClick={toggle}
    >
      <Icon name="contrast" size={18} />
      <span>{t('contrast.label')}</span>
    </button>
  );
}
