export class PaginationQuery {
  createdUser: string;
  $or?: Array<{ title?: RegExp; siteName?: RegExp; description?: RegExp }>;
  directoryId?: string;
  constructor({ createdUser, q, directoryId }: { createdUser: string; q: string; directoryId?: string }) {
    this.createdUser = createdUser;
    if (q !== '') {
      this.$or = [{ title: new RegExp(q) }, { siteName: new RegExp(q) }, { description: new RegExp(q) }];
    }
    if (directoryId !== undefined) {
      this.directoryId = directoryId;
    }
  }
}

export class PaginationOptions {
  page: number;
  limit: number;
  sort?: { [key: string]: number };
  constructor({ page, limit, sort }: { page: number; limit: number; sort?: string }) {
    this.page = page;
    this.limit = limit;
    if (sort !== undefined && typeof sort === 'string') {
      const sortOrder = sort.startsWith('-') ? -1 : 1;
      const sortKey = sortOrder === -1 ? sort.slice(1) : sort;
      this.sort = { [sortKey]: sortOrder };
    }
  }
}

export class PaginationDirectoryQuery {
  createdUser: string;
  isRoot?: boolean;
  $or?: Array<{ name?: RegExp; description?: RegExp }>;
  constructor({ createdUser, isRoot, q }: { createdUser: string; isRoot?: boolean; q: string }) {
    this.createdUser = createdUser;
    if (isRoot != null) {
      this.isRoot = isRoot;
    }
    if (q !== '') {
      this.$or = [{ name: new RegExp(q) }, { description: new RegExp(q) }];
    }
  }
}
