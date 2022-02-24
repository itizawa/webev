import { model, models, Model, Schema, Types, Document, FilterQuery } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { Page, PageStatus } from '~/domains/Page';
import { IPageRepository } from '~/application/repositories/IPageRepository';
import { PaginationOptions } from '~/libs/interfaces/pagination';
import { PaginationResult } from '~/libs/interfaces/paginationResult';

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
      type: String,
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
  PageModel: Model<Page & Document> & { paginate: (query: FilterQuery<Page>, options: PaginationOptions) => PaginationResult<Page> };

  constructor() {
    PageSchema.plugin(mongoosePaginate);

    this.PageModel = (models.Page as PageRepository['PageModel']) || (model<Page & Document>('Page', PageSchema) as PageRepository['PageModel']);
  }

  private convert(page: Page): Page {
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

  async create(pages: Partial<Page>): Promise<Page> {
    const result = await this.PageModel.create(pages);

    return this.convert(result);
  }

  async count(): Promise<number> {
    return this.PageModel.estimatedDocumentCount();
  }

  async find(query: FilterQuery<Page>, options: PaginationOptions): Promise<PaginationResult<Page>> {
    const result: PaginationResult<Page> = await this.PageModel.paginate(query, options);
    return {
      ...result,
      docs: result.docs.map((doc) => {
        return this.convert(doc);
      }),
    };
  }

  async update(id: string, newObject: Partial<Page>): Promise<Page | null> {
    const page = await this.PageModel.findByIdAndUpdate(id, newObject, { new: true });

    if (!page) {
      return null;
    }

    return this.convert(page);
  }
}
