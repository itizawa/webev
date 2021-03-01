export interface Page {
  _id: string;
  url: string;
  siteName: string;
  image: string;
  description: string;
  title: string;
  body: string;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}
