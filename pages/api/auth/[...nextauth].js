import NextAuth from 'next-auth';
import Google from "next-auth/providers/google";
import { connectToDatabase } from '@/utils/dbConnect';

export default NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      console.log("googleusers:", user);
      const db = await connectToDatabase();
      const existingUser = await db.collection('googleusers').findOne({
        email: user.user.email, 
      });

      if (existingUser) {
        return true;
      } else {
        await db.collection('googleusers').insertOne({
          email: user.user.email, 
          name: user.user.name, 
          image: user.user.image,
        });
        return true;
      }
    },
  },
});