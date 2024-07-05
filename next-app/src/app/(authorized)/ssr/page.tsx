import { cookies } from 'next/headers';
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth/server';
import { runWithAmplifyServerContext } from '@/util/amplifyServerUtils';


export default async function SSR() {

    const currentUser = await runWithAmplifyServerContext({
        nextServerContext: { cookies },
        operation: (contextSpec) => getCurrentUser(contextSpec)
    });

    const authSession = await runWithAmplifyServerContext({
        nextServerContext: { cookies },
        operation: (contextSpec) => fetchAuthSession(contextSpec)
    });

    console.log('currentUser', JSON.stringify(currentUser))

    console.log('ID Token', authSession.tokens?.idToken?.toString())

    console.log('Access Token', authSession.tokens?.accessToken?.toString())

    return (
        <h1>Next App SSR Page</h1>
    )

}