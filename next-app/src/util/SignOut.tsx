'use client'

import React from "react";
import { signOut } from 'aws-amplify/auth';
import { redirect } from "next/navigation";

export default function SignOut() {
  const handleSignOut = async () => {
    setTimeout(async () => {
        try{
            await signOut()
          } catch(err){
            alert(err)
            console.log('Sign our Error', err)
          }
    })        
  }

    return(
        <button onClick={handleSignOut}>Sign Out</button>
    )
}