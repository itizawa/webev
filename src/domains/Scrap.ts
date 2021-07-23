import { Page } from './Page';

export class Scrap {
  _id: string;
  title: string; // Directory の name に相当
  body: string; // Directory の description に相当
  createdUser: string;
  isPublic: boolean;
  emojiId: string;
  pages: Page[];
  createdAt: Date;
  updatedAt: Date;
  constructor({ _id, title, createdUser, isPublic, body, emojiId, pages, createdAt, updatedAt }: Scrap) {
    this._id = _id;
    this.title = title;
    this.createdUser = createdUser;
    this.isPublic = isPublic;
    this.body = body;
    this.emojiId = emojiId;
    this.pages = pages;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export type UpdatableProperty = Partial<Pick<Scrap, 'title' | 'body' | 'isPublic' | 'emojiId' | 'pages'>>;
