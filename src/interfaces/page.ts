export enum PageStatus {
  PAGE_STATUS_STOCK = 'stocked',
  PAGE_STATUS_ARCHIVE = 'archived',
  PAGE_STATUS_DELETED = 'deleted',
}
export class Page {
  _id: string;
  url: string;
  image: string;
  description: string;
  title: string;
  siteName: string;
  createdUser: string;
  createdAt: Date;
  updatedAt: Date;
  status: PageStatus;
  isFavorite: boolean;
  constructor(
    id: string,
    url: string,
    image: string,
    description: string,
    title: string,
    siteName: string,
    createdUser: string,
    createdAt: Date,
    updatedAt: Date,
    status: PageStatus,
    isFavorite: boolean,
  ) {
    this._id = id;
    this.url = url;
    this.image = image;
    this.description = description;
    this.title = title;
    this.siteName = siteName;
    this.createdUser = createdUser;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.status = status;
    this.isFavorite = isFavorite;
  }
}
