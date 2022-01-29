import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
const options = {
  site: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.SESSION_COOKIE_SECRET,
  jwt: {
    secret: process.env.SESSION_COOKIE_SECRET,
  },

  sessionMaxAge: 30 * 24 * 60 * 60 * 1000,
  sessionUpdateAge: 24 * 60 * 60 * 1000,
};

export default (req: NextApiRequest, res: NextApiResponse): void | Promise<void> => NextAuth(req, res, options);
