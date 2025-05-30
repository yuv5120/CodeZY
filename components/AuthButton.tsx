"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButtons() {
  const { data: session } = useSession();

  return (
    <div>
      {session?.user ? (
        <>
          <p>Hello, {session.user.name}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <button onClick={() => signIn("github")} className="px-4 py-2 text-sm font-medium bg-gray-700 text-white rounded hover:bg-gray-800">Sign in</button>
      )}
    </div>
  );
}

