export const PathName = {
  HOME: '/home',
  ARCHIVED: '/archived',
  DIRECTORY_ID: '/directory/[id]',
} as const;
export type PathName = keyof typeof PathName;
