export class Directory {
  _id: string;
  name: string;
  description: string;
  order: number;
  createdUser: string;
  isRoot: boolean;
  emojiId: string;
  createdAt: Date;
  updatedAt: Date;
  constructor({ _id, name, description, order, createdUser, isRoot, createdAt, updatedAt, emojiId }: Directory) {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.order = order;
    this.createdUser = createdUser;
    this.isRoot = isRoot;
    this.emojiId = emojiId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
