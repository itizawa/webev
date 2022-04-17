export interface PaginationResult<T> {
  docs: T[];
  hasNextPage: boolean;
  totalPages: number;
  totalDocs: number;
  limit: number;
}
