import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from '@better-auth/mongo-adapter';

const client = new MongoClient(process.env.USE_THE_CONNECTION_URL as string);

const db = client.db('bangl-news-24');

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),

  trustedOrigins: [
    'http://localhost:3000',
    'https://bangla-news-24-omega.vercel.app/',
  ],
});
