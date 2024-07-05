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
        <Link href={process.env.NEXT_PUBLIC_REACT_APP_BASE!}>Navigate to React app</Link> |
        <Link href="/">Home</Link> |
        <Link href="/ssr">SSR Page</Link> |
        <Link href="/csr">CSR Page</Link> |
        <SignOut />
      </div>
      {children}
   </React.Fragment>
  );
}
