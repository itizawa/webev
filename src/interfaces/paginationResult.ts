export interface PaginationResult<T> {
  docs: T[];
  hasNextPage: boolean;
}
