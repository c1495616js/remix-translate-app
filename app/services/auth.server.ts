// app/services/auth.server.ts
import { Authenticator } from 'remix-auth';
import { GoogleStrategy } from 'remix-auth-google';
import { GraphQLClient, gql } from 'graphql-request';

import { sessionStorage } from '~/services/session.server';

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
const authenticator = new Authenticator<any>(sessionStorage);

const GetPermissionByGmail = gql`
  query AuthorizationQuery($gmail: String!) {
    authorization(where: { gmail: $gmail }) {
      id
    }
  }
`;

let googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || '',
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    // Get the user data from your DB or API using the tokens and profile
    const gmail = profile?._json?.email;

    const graphcms = new GraphQLClient(
      'https://api-us-west-2.graphcms.com/v2/cl2asc77z307o01yze9ic4hh2/master'
    );

    const { authorization } = await graphcms.request(GetPermissionByGmail, {
      gmail,
    });
    if (authorization) return profile;
    return null;
  }
);

authenticator.use(googleStrategy);

export { authenticator };
