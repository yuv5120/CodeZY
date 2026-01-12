import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="mb-6">
        <Link
          href="/"
          className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
        >
          ← Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>
      </div>

      <div className="bg-white dark:bg-gray-900 border rounded-lg shadow p-6">
        <div className="flex items-center space-x-6 mb-6">
          {session.user.image && (
            <Image
              src={session.user.image}
              alt={session.user.name || "Profile"}
              width={80}
              height={80}
              className="rounded-full"
            />
          )}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {session.user.name || "User"}
            </h2>
            {session.user.email && (
              <p className="text-gray-600 dark:text-gray-400">{session.user.email}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              User ID
            </label>
            <p className="text-gray-900 dark:text-white font-mono text-sm">
              {session.user.id || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

