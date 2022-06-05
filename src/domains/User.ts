export class User {
  id: string;
  username: string;
  email: string;
  profileUrl: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(init: User) {
    this.id = init.id;
    this.username = init.username;
    this.email = init.email;
    this.profileUrl = init.profileUrl;
    this.createdAt = init.createdAt;
    this.updatedAt = init.updatedAt;
  }

  static convertUserFormObject(data: User): User {
    return new User({
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    });
  }
}
