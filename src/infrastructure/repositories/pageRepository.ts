import { model, Model, Schema, Types, Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { Page, PageStatus } from '~/domains/Page';
import { IPageRepository } from '~/application/repositories/IPageRepository';

export const PageSchema: Schema = new Schema(
  {
    url: String,
    image: String,
    favicon: String,
    description: { type: String, index: true },
    title: { type: String, index: true },
    customizedTitle: String,
    body: { type: String },
    siteName: { type: String, index: true },
    status: {
      type: PageStatus,
      required: true,
      default: PageStatus.PAGE_STATUS_STOCK,
    },
    directoryId: {
      type: Types.ObjectId,
      default: null,
    },
    createdUser: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    archivedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

export class PageRepository implements IPageRepository {
  PageModel: Model<Page & Document> & { paginate?: typeof mongoosePaginate };

  constructor() {
    PageSchema.plugin(mongoosePaginate);

    this.PageModel = model<Page & Document>('Page', PageSchema);
  }

  private convertPage(page: Page): Page {
    return new Page({
      _id: page._id.toString(),
      url: page.url,
      image: page.image,
      favicon: page.favicon,
      description: page.description,
      title: page.title,
      body: page.body,
      siteName: page.siteName,
      directoryId: page.directoryId?.toString(),
      createdUser: page.createdUser.toString(),
      createdAt: page.createdAt,
      updatedAt: page.updatedAt,
      status: page.status,
    });
  }

  async createPages({ pages }: { pages: Page[] }): Promise<Page[]> {
    const result = await this.PageModel.insertMany(pages);

    return result.map((page) => this.convertPage(page));
  }
}
