import { model, models, Model, Schema, Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { IUserRepository } from '~/application/repositories';

import { User } from '~/domains/User';

const UserSchema: Schema = new Schema(
  {
    name: String,
    description: String,
    email: String,
    image: String,
    admin: Boolean,
    isExecutedTutorial: Boolean,
    apiTokenForExtension: String,
  },
  {
    toObject: {
      transform: function (doc, ret) {
        delete ret.apiTokenForExtension;
      },
    },
    timestamps: true,
  },
);

export class UserRepository implements IUserRepository {
  UserModel: Model<User & Document> & { paginate?: typeof mongoosePaginate };

  constructor() {
    this.UserModel = models.User || model<User & Document>('User', UserSchema);
  }

  private convert(user: User): User {
    return new User({
      _id: user._id.toString(),
      name: user.name,
      description: user.description,
      email: user.email,
      image: user.image,
      admin: user.admin,
      isExecutedTutorial: user.isExecutedTutorial,
      apiTokenForExtension: user.apiTokenForExtension,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  async findOne(query: Partial<User>): Promise<User | null> {
    const user = await this.UserModel.findOne(query);

    if (!user) {
      return null;
    }

    return this.convert(user);
  }

  async update(userId: string, newObject: Partial<User>): Promise<User | null> {
    const user = await this.UserModel.findByIdAndUpdate(userId, newObject, { new: true });

    if (!user) {
      return null;
    }

    return this.convert(user);
  }
}
