export enum PageStatus {
  PAGE_STATUS_STOCK = 'stocked',
  PAGE_STATUS_ARCHIVE = 'archived', // It is read on the display
  PAGE_STATUS_DELETED = 'deleted',
}
export class Page {
  _id: string;
  url: string;
  image: string;
  description: string;
  title: string;
  siteName: string;
  directoryId: string;
  createdUser: string;
  createdAt: Date;
  updatedAt: Date;
  status: PageStatus;
  isFavorite: boolean;
  constructor({ _id, url, image, description, title, siteName, directoryId, createdUser, createdAt, updatedAt, status, isFavorite }: Page) {
    this._id = _id;
    this.url = url;
    this.image = image;
    this.description = description;
    this.title = title;
    this.siteName = siteName;
    this.directoryId = directoryId;
    this.createdUser = createdUser;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.status = status;
    this.isFavorite = isFavorite;
  }
}
