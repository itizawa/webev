export interface PaginationResult<T> {
  docs: T[];
  page: number;
  hasNextPage: boolean;
  totalPages: number;
  totalDocs: number;
  limit: number;
}
