import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached: {
  conn: unknown;
  promise: Promise<typeof mongoose> | null;
} = { conn: null, promise: null };

if (!cached) {
  cached = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGO_URI as string, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;

/**
 * DBに接続するミドルウェア
 * @param _req
 * @param _res
 * @param next
 */
export const connectDB = async (_req: NextApiRequest, _res: NextApiResponse, next: NextHandler) => {
  console.log('req');
  next();
};
