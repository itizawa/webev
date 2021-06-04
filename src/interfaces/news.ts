class Thumbnail {
  url: string;
  height: number;
  width: number;
  constructor({ url, height, width }: Thumbnail) {
    this.url = url;
    this.height = height;
    this.width = width;
  }
}

export class News {
  id: string;
  body: string;
  createdAt: Date;
  publishedAt: Date;
  title: string;
  thumnail: Thumbnail;
  constructor({ id, body, createdAt, publishedAt, title, thumnail }: News) {
    this.id = id;
    this.body = body;
    this.createdAt = createdAt;
    this.publishedAt = publishedAt;
    this.title = title;
    this.thumnail = thumnail;
  }
}
