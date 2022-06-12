export const BootstrapIcon = {
  HOME: 'home',
  SEARCH: 'search',
  CLOSE: 'close',
  CLIP_BOARD_PLUS: 'clip-board-plus',
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
  SHARE: 'share',
  THREE_DOTS_HORIZONTAL: 'three-dots-horizontal',
  THREE_DOTS_VERTICAL: 'three-dots-vertical',
  DIRECTORY: 'directory',
  ADD_TO_DIRECTORY: 'add-to-directory',
  ARROW: 'arrow',
  ARROW_CLOCKWISE: 'arrow-clockwise',
  ARROW_RIGHT: 'arrow-right',
  ARROW_DOWN: 'arrow-down',
  CARET_RIGHT: 'caret-right',
  CARET_DOWN: 'caret-down',
  CHEVRON_DOUBLE_LEFT: 'chevron-double-left',
  CHEVRON_LEFT: 'chevron-left',
  CHEVRON_DOUBLE_RIGHT: 'chevron-double-right',
  CHEVRON_RIGHT: 'chevron-right',
  FILTER: 'filter',
  GOOGLE: 'google',
  REMOVE_FROM_DIRECTORY: 'remove-from-directory',
  TWITTER: 'twitter',
  GITHUB: 'github',
  QUESTION: 'question',
  GEAR: 'gear',
  PERSON: 'person',
  PAUSE_CIRCLE: 'pause-circle',
  PLAY_CIRCLE: 'play-circle',
  STOP_CIRCLE: 'stop-circle',
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
