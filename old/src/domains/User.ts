export class User {
  _id: string;
  name: string;
  description: string;
  email: string;
  image: string;
  admin: boolean;
  isExecutedTutorial: boolean;
  apiTokenForExtension?: string;
  createdAt: Date;
  updatedAt: Date;
  constructor({ _id, name, description, email, image, admin, isExecutedTutorial, apiTokenForExtension, createdAt, updatedAt }: User) {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.email = email;
    this.image = image;
    this.admin = admin;
    this.isExecutedTutorial = isExecutedTutorial;
    this.apiTokenForExtension = apiTokenForExtension;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
