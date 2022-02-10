export interface PageForImport {
  url: string;
  title: string;
}

export interface DirForImport {
  id: string;
  name: string;
  childrenDirIds: string[];
  childrenPages: PageForImport[];
}
