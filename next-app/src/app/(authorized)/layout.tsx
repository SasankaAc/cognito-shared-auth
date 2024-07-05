import SignOut from "@/util/SignOut";
import Link from "next/link";
import React from "react";


export default function AuthorizedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <React.Fragment>
    <div>
        <Link href="http://localhost:3000/">Navigate to React app</Link> |
        <Link href="/">Home</Link> |
        <Link href="/ssr">SSR Page</Link> |
        <Link href="/csr">CSR Page</Link> |
        <SignOut />
      </div>
      {children}
   </React.Fragment>
  );
}
