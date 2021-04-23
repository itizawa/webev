export enum BootstrapColor {
  INFO = 'info',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  WHITE = 'white',
  WARNING = 'warning',
  DANGER = 'danger',
  LIGHT = 'light',
  TWITTER = 'twitter',
}

export enum BootstrapIcon {
  HOME = 'home',
  PLUS_BOARD = 'plus',
  PLUS_DOTTED = 'plus-dotted',
  ARCHIVE = 'archive',
  STAR = 'star',
  TRASH = 'trash',
  THREE_DOTS_HORIZONAL = 'three-dots-horizonal',
  THREE_DOTS_VERTICAL = 'three-dots-vertical',
  DIRECTORY = 'directory',
  ADD_TO_DIRECTORY = 'add-to-directory',
  ARROW = 'arrow',
  ARROW_RIGHT = 'arrow-right',
  ARROW_DOWN = 'arrow-down',
  CHEVRON_DOUBLE_LEFT = 'chevron-double-left',
  CHEVRON_LEFT = 'chevron-left',
  CHEVRON_DOUBLE_RIGHT = 'chevron-double-right',
  CHEVRON_RIGHT = 'chevron-right',
  GOOGLE = 'google',
  TWITTER = 'twitter',
  GITHUB = 'github',
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
