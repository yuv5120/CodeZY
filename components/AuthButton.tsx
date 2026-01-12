"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function AuthButtons() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center space-x-4">
      {session?.user ? (
        <>
          <a
            href="/profile"
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {session.user.image && (
              <Image
                src={session.user.image}
                alt={session.user.name || "Profile"}
                width={24}
                height={24}
                className="rounded-full"
              />
            )}
            <span>Profile</span>
          </a>
          <button 
            onClick={() => signOut()} 
            className="px-4 py-2 text-sm font-medium bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            Sign out
          </button>
        </>
      ) : (
        <button 
          onClick={() => signIn("github")} 
          className="px-4 py-2 text-sm font-medium bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          Sign in
        </button>
      )}
    </div>
  );
}

