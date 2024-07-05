'use client'

import React, { useState } from 'react';
import { getCurrentUser, signInWithRedirect } from 'aws-amplify/auth';
import { redirect } from 'next/navigation';

export enum AUTH_STATE {
    PENDING='pending',
    AUTHENTICATED='authenticated',
    UNAUTHENTICATED='unauthenticated'
}

export default function SignIn() {
    const [authState, setAuthState] = useState(AUTH_STATE.PENDING)

    React.useEffect(() => {
        getAuthenticatedUser()
    }, [])

    React.useEffect(() => {
      switch(authState) {
        case AUTH_STATE.UNAUTHENTICATED:
          signInWithRedirect();
          break;
        case AUTH_STATE.AUTHENTICATED:
            redirect('/')
            break;
        default:
          console.log('Auth identifier pending...')
          break
      }

    }, [authState])

    const getAuthenticatedUser = async () => {
        try{
            const { username, userId } = await getCurrentUser();
            setAuthState(AUTH_STATE.AUTHENTICATED)
        } catch(error){
            setAuthState(AUTH_STATE.UNAUTHENTICATED)
        }
        
    }
    
    return(
        <div />
    )

}