import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import db from '@/db'; // your drizzle instance

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg', // or "mysql", "sqlite"
  }),
  emailAndPassword: {
    enabled: true,
  },
});

export const signIn = () => {
  auth.api.signInEmail();
};

export const signUp = async () => {
  await auth.api.signUpEmail({
    body: {
      name: 'John Doe', // required
      email: 'john.doe@example.com', // required
      password: 'password1234', // required
      // image: 'https://example.com/image.png',
      callbackURL: '/dashboard',
    },
  });
};
