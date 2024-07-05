'use client'
import React from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';

export default function CSR() {

    React.useEffect(() => {
        fetchSession()
    }, [])

    const fetchSession = async () => {
        try{
            console.log('Fetching session')
            const session = await fetchAuthSession();
            console.log('ID Token', session.tokens?.idToken?.toString())
            console.log('Access Token', session.tokens?.accessToken?.toString())
        } catch(error){
            console.log('ERR:fetchSession', error)
        }
    }

    return(
        <h1>Next App CSR Page</h1>
    )

}