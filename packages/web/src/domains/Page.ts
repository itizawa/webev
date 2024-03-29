export class Page {
  id: string;
  url: string;
  image: string;
  favicon: string;
  description: string;
  title: string;
  body?: string;
  siteName: string;
  isDeleted: boolean;
  isRead: boolean;
  createdUser: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(init: Page) {
    this.id = init.id;
    this.url = init.url;
    this.image = init.image;
    this.favicon = init.favicon;
    this.description = init.description;
    this.title = init.title;
    this.body = init.body;
    this.siteName = init.siteName;
    this.isDeleted = init.isDeleted;
    this.isRead = init.isRead;
    this.createdUser = init.createdUser;
    this.createdAt = init.createdAt;
    this.updatedAt = init.updatedAt;
  }
}
