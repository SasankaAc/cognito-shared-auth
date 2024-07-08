'use client'

import React from "react"
import { Amplify } from 'aws-amplify';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { CookieStorage } from 'aws-amplify/utils';

export enum AUTH_STATE {
    PENDING='pending',
    AUTHENTICATED='authenticated',
    UNAUTHENTICATED='unauthenticated'
}

export type AuthUserInfo ={
    username: string;
    userId: string
}

Amplify.configure({
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
  }, {
    ssr: true
  });
  
  cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage({
    secure: true,
    domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
    path: '/',
    sameSite:'lax'
  }));

export default function AuthClientProvider({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}