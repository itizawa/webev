export enum BootstrapColor {
  INFO = 'info',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  WARNING = 'warning',
  DANGER = 'danger',
  LIGHT = 'light',
  TWITTER = 'twitter',
}

export enum BootstrapIcon {
  HOME = 'home',
  PLUS_BOARD = 'plus',
  STAR = 'star',
  TRASH = 'trash',
  ARROW = 'arrow',
  CHEVRON_DOUBLE_LEFT = 'chevron-double-left',
  CHEVRON_LEFT = 'chevron-left',
  CHEVRON_DOUBLE_RIGHT = 'chevron-double-right',
  CHEVRON_RIGHT = 'chevron-right',
  GOOGLE = 'google',
  TWITTER = 'twitter',
  QUESTION = 'question',
}

export const BootstrapBreakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
} as const;
export type BootstrapBreakpoints = keyof typeof BootstrapBreakpoints;
