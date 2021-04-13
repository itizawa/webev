import { Page } from './page';

export class Directory {
  _id: string;
  name: string;
  order: number;
  pages: Page[];
  createdUser: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(_id: string, name: string, order: number, pages: Page[], createdUser: string, createdAt: Date, updatedAt: Date) {
    this._id = _id;
    this.name = name;
    this.order = order;
    this.pages = pages;
    this.createdUser = createdUser;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
