export class User {
  _id: string;
  name: string;
  email: string;
  image: string;
  admin: boolean;
  isExecutedTutorial: boolean;
  createdAt: Date;
  updatedAt: Date;
  constructor({ _id, name, email, image, admin, isExecutedTutorial, createdAt, updatedAt }: User) {
    this._id = _id;
    this.name = name;
    this.email = email;
    this.image = image;
    this.admin = admin;
    this.isExecutedTutorial = isExecutedTutorial;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
