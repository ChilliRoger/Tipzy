"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { login } from "@/lib/auth";
import { ensureDemoData } from "@/lib/storage";
import type { UserRole } from "@/types";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("venue");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    ensureDemoData();
  }, []);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const user = login(email, password, role);
    if (!user) {
      setError("Invalid credentials for selected role (mock).");
      return;
    }
    if (user.role === "venue") router.push("/dashboard/venue");
    else if (user.role === "staff") router.push("/dashboard/staff");
    else router.push("/");
  }

  return (
    <div className="mx-auto w-full container-max px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md mx-auto card p-6">
        <h1 className="text-xl font-semibold">Login</h1>
        <form onSubmit={onSubmit} className="mt-4 grid gap-3">
          <label className="grid gap-1 text-sm">
            <span>Email</span>
            <input className="rounded-md border px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label className="grid gap-1 text-sm">
            <span>Password</span>
            <input className="rounded-md border px-3 py-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <label className="grid gap-1 text-sm">
            <span>Role</span>
            <select className="rounded-md border px-3 py-2" value={role} onChange={(e) => setRole(e.target.value as UserRole)}>
              <option value="customer">Customer</option>
              <option value="staff">Staff</option>
              <option value="venue">Venue Owner</option>
            </select>
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" className="mt-2">Login</Button>
        </form>
        <p className="mt-3 text-xs text-[--color-text]/70">
          Demo logins: owner@demo.com (Venue), aisha@demo.com (Staff), customer@demo.com (Customer). Any password.
        </p>
      </div>
    </div>
  );
}


