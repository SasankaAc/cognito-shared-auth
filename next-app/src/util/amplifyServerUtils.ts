import { createServerRunner } from '@aws-amplify/adapter-nextjs';

export const { runWithAmplifyServerContext } = createServerRunner({
  config: {
    Auth: {
        Cognito: {
          //  Amazon Cognito User Pool ID
          userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
          // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
          userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
          loginWith: {
            // OPTIONAL - Hosted UI configuration
            oauth: {
              domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN!,
              scopes: [
                'openid',
                'email',
                'profile'
              ],
              redirectSignIn: [process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI!],
              redirectSignOut: [process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI!],
              responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
            }
          }
        }
      }
  }
});