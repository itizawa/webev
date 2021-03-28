export enum PageStatus {
  PAGE_STATUS_STOCK = 'stocked',
  PAGE_STATUS_ARCHIVE = 'archived',
  PAGE_STATUS_DELETED = 'deleted',
}
export interface Page {
  _id: string;
  url: string;
  siteName: string;
  status: PageStatus;
  image: string;
  description: string;
  title: string;
  body: string;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}
