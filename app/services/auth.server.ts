// app/services/auth.server.ts
import { Authenticator } from 'remix-auth';
import { GoogleStrategy } from 'remix-auth-google';

import { sessionStorage } from '~/services/session.server';

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
const authenticator = new Authenticator<any>(sessionStorage);

let googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || '',
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    // Get the user data from your DB or API using the tokens and profile
    return profile;
  }
);

authenticator.use(googleStrategy);

export { authenticator };
