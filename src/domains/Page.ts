export class Page {
  _id: string;
  url: string;
  image: string;
  favicon: string;
  description: string;
  title: string;
  body?: string;
  siteName: string;
  isDeleted: boolean;
  createdUser: string;
  createdAt: Date;
  updatedAt: Date;
  archivedAt: Date;
  constructor(init: Page) {
    this._id = init._id;
    this.url = init.url;
    this.image = init.image;
    this.favicon = init.favicon;
    this.description = init.description;
    this.title = init.title;
    this.body = init.body;
    this.siteName = init.siteName;
    this.isDeleted = init.isDeleted;
    this.createdUser = init.createdUser;
    this.createdAt = init.createdAt;
    this.updatedAt = init.updatedAt;
    this.archivedAt = init.archivedAt;
  }
}
