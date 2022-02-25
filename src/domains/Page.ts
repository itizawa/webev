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
  directoryId?: string;
  createdUser: string;
  createdAt: Date;
  updatedAt: Date;
  constructor({ _id, url, image, favicon, description, title, body, siteName, isDeleted, directoryId, createdUser, createdAt, updatedAt }: Page) {
    this._id = _id;
    this.url = url;
    this.image = image;
    this.favicon = favicon;
    this.description = description;
    this.title = title;
    this.body = body;
    this.siteName = siteName;
    this.isDeleted = isDeleted;
    this.directoryId = directoryId;
    this.createdUser = createdUser;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
