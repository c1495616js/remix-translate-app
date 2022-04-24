// app/services/auth.server.ts
import { Authenticator } from 'remix-auth';
import { GoogleStrategy } from 'remix-auth-google';

import { sessionStorage } from '~/services/session.server';

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
const authenticator = new Authenticator<any>(sessionStorage);

let googleStrategy = new GoogleStrategy(
  {
    clientID:
      '20327221436-dgor8uaknmn871rate5rrra8pohnuukh.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/auth/google/callback',
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    // Get the user data from your DB or API using the tokens and profile
    return profile;
  }
);

authenticator.use(googleStrategy);

export { authenticator };
