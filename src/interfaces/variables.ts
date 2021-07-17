export const BootstrapColor = {
  INFO: 'info',
  SUCCESS: 'success',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  WHITE: 'white',
  WARNING: 'warning',
  DANGER: 'danger',
  LIGHT: 'light',
  TWITTER: 'twitter',
} as const;
export type BootstrapColor = keyof typeof BootstrapColor;

export const BootstrapIcon = {
  HOME: 'home',
  SEARCH: 'search',
  CLOSE: 'close',
  PLUS_BOARD: 'plus',
  PLUS_DOTTED: 'plus-dotted',
  CHECK: 'check',
  LIST: 'list',
  GRID: 'grid',
  OUTLINE_CHECK: 'outline-check',
  REPLY: 'reply',
  STAR: 'star',
  PENCIL: 'pencil',
  TRASH: 'trash',
  SAVE: 'save',
  THREE_DOTS_HORIZONAL: 'three-dots-horizonal',
  THREE_DOTS_VERTICAL: 'three-dots-vertical',
  DIRECTORY: 'directory',
  ADD_TO_DIRECTORY: 'add-to-directory',
  ARROW: 'arrow',
  ARROW_RIGHT: 'arrow-right',
  ARROW_DOWN: 'arrow-down',
  CARET_RIGHT: 'caret-right',
  CARET_DOWN: 'caret-down',
  CHEVRON_DOUBLE_LEFT: 'chevron-double-left',
  CHEVRON_LEFT: 'chevron-left',
  CHEVRON_DOUBLE_RIGHT: 'chevron-double-right',
  CHEVRON_RIGHT: 'chevron-right',
  GOOGLE: 'google',
  REMOVE_FROM_DIRECTORY: 'remove-from-directory',
  TWITTER: 'twitter',
  GITHUB: 'github',
  QUESTION: 'question',
  GEAR: 'gear',
} as const;
export type BootstrapIcon = keyof typeof BootstrapIcon;

export const BootstrapBreakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
} as const;
export type BootstrapBreakpoints = keyof typeof BootstrapBreakpoints;
