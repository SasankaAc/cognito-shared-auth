import React from "react"
import { fetchAuthSession, signOut } from 'aws-amplify/auth';

function App() {
    React.useEffect(() => {
        fetchSession()
    }, [])

    const fetchSession = async () => {
        try{
            const session = await fetchAuthSession();
            console.log('ID Token', session.tokens?.idToken?.toString())
            console.log('Access Token', session.tokens?.accessToken?.toString())
        } catch(error){
            console.log('ERR:fetchSession', error)
        }
    }

    const handleSignOut = async () => {
        try{
          await signOut()
        } catch(err){
          alert(err)
          console.log('Sign our Error', err)
        }
        
      }
    return(
        <React.Fragment>
            <br />
            <a href={process.env.REACT_APP_NEXT_APP_BASE!}>Navigate to Next App</a> | 
            <button onClick={handleSignOut}>Sign out</button>

            <h1>React App Home</h1>
        </React.Fragment>
    )
}
export default App;