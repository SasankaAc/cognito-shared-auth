import React, { useState } from "react"
import { Amplify } from 'aws-amplify';
import { getCurrentUser, signInWithRedirect } from 'aws-amplify/auth';
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
        userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID!,
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolClientId: process.env.REACT_APP_COGNITO_CLIENT_ID!,
        loginWith: {
          // OPTIONAL - Hosted UI configuration
          oauth: {
            domain: process.env.REACT_APP_COGNITO_DOMAIN!,
            scopes: [
              'openid',
              'email',
              'profile'
            ],
            redirectSignIn: [process.env.REACT_APP_COGNITO_REDIRECT_URI!],
            redirectSignOut: [process.env.REACT_APP_COGNITO_REDIRECT_URI!],
            responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
          }
        }
      }
    }
  });
  
  cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage({
    secure: true,
    domain: 'localhost',
    path: '/',
    sameSite:'lax'
  }));

const AuthProvider: React.FC<{
    children: React.ReactNode
}> = (props) => {

    const [authState, setAuthState] = useState(AUTH_STATE.PENDING)
    const [authUser, setAuthUser] = useState<AuthUserInfo | null>(null)


    React.useEffect(() => {
        getAuthenticatedUser()
    }, [])

    React.useEffect(() => {
      switch(authState) {
        case AUTH_STATE.UNAUTHENTICATED:
          signInWithRedirect();
          break;
        default:
          console.log('Auth identifier pending...')
          break
      }

    }, [authState])

    const getAuthenticatedUser = async () => {
        try{
            const { username, userId } = await getCurrentUser();
            setAuthUser({username, userId})
            setAuthState(AUTH_STATE.AUTHENTICATED)
        } catch(error){
            setAuthState(AUTH_STATE.UNAUTHENTICATED)
        }
        
    }

    return (
        <React.Fragment>           
            {authState===AUTH_STATE.AUTHENTICATED && props.children}
           
        </React.Fragment>
    )
}

export default AuthProvider