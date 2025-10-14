"use client";
import Button from "@/components/ui/Button";
import { currentUser, logout } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const user = currentUser();

  function onLogout() {
    logout();
    router.replace("/");
  }

  if (!user) {
    return (
      <div className="mx-auto w-full container-max px-4 sm:px-6 lg:px-8 py-12">
        <div className="card p-6">
          <p className="mb-3">You are not logged in.</p>
          <Link className="text-[--color-primary]" href="/login">Go to login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full container-max px-4 sm:px-6 lg:px-8 py-12 grid gap-6">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <div className="card p-6">
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-[--color-text]/70">Name</div>
            <div className="font-medium">{user.name}</div>
          </div>
          <div>
            <div className="text-[--color-text]/70">Email</div>
            <div className="font-medium">{user.email}</div>
          </div>
          <div>
            <div className="text-[--color-text]/70">Role</div>
            <div className="font-medium capitalize">{user.role}</div>
          </div>
        </div>
        <div className="mt-6">
          <Button onClick={onLogout}>Logout</Button>
        </div>
      </div>
    </div>
  );
}


