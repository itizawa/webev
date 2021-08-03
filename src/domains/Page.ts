export enum PageStatus {
  PAGE_STATUS_STOCK = 'stocked',
  PAGE_STATUS_ARCHIVE = 'archived', // It is read on the display
  PAGE_STATUS_DELETED = 'deleted',
}
export class Page {
  _id: string;
  url: string;
  image: string;
  favicon: string;
  description: string;
  title: string;
  body?: string;
  siteName: string;
  directoryId: string;
  createdUser: string;
  createdAt: Date;
  updatedAt: Date;
  status: PageStatus;
  isFavorite: boolean;
  constructor({ _id, url, image, favicon, description, title, body, siteName, directoryId, createdUser, createdAt, updatedAt, status, isFavorite }: Page) {
    this._id = _id;
    this.url = url;
    this.image = image;
    this.favicon = favicon;
    this.description = description;
    this.title = title;
    this.body = body;
    this.siteName = siteName;
    this.directoryId = directoryId;
    this.createdUser = createdUser;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.status = status;
    this.isFavorite = isFavorite;
  }
}
