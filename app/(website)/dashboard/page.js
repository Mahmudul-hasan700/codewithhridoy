"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">Dashboard</h1>
      {session && (
        <div>
          <div className="mb-4">
            <img
              src={session.user.profileUrl}
              alt={session.user.name}
              className="h-24 w-24 rounded-full"
            />
          </div>
          <div className="mb-2">
            <span className="font-bold">Name:</span>{" "}
            {session.user.name}
          </div>
          <div className="mb-2">
            <span className="font-bold">Email:</span>{" "}
            {session.user.email}
          </div>
          <button
            onClick={() => signOut()}
            className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
