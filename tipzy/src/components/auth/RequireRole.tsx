"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { currentUser } from "@/lib/auth";
import type { UserRole } from "@/types";

type Props = {
  roles: UserRole[];
  children: React.ReactNode;
};

export default function RequireRole({ roles, children }: Props) {
  const router = useRouter();
  useEffect(() => {
    const user = currentUser();
    if (!user || !roles.includes(user.role)) {
      router.replace("/login");
    }
  }, [router, roles]);

  return <>{children}</>;
}


