import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function NavBar() {
  const { data: session } = useSession();
  
  return (
    <nav>
      <Link href="/">
        Home
      </Link>
      <Link href="/applications">
        Applications
      </Link>
      <Link href="/logs">
        Logs
      </Link>
      {session?.user ? (
        <>
          <p>{session.user.email}</p>
          <button onClick={() => signOut()}>
            Sign Out
          </button>
        </>
      ) : (
        <>
          <button onClick={() => signIn()}>
            Sign In
          </button>
          <Link href="/auth/register">
            Register
          </Link>
        </>
      )}
    </nav>
  );
};