// NOTE: Layout of Ogp
export const OgpLayoutType = {
  LIST: 'list',
  CARD: 'card',
} as const;
export type OgpLayoutType = typeof OgpLayoutType[keyof typeof OgpLayoutType];
