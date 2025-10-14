"use client";
import { getSession, setSession, getUsers, saveUsers } from "@/lib/storage";
import type { User, UserRole } from "@/types";

export function login(email: string, _password: string, role: UserRole): User | null {
  const users = getUsers();
  const matched = users.find((u) => u.email === email && u.role === role) || null;
  if (matched) setSession(matched);
  return matched;
}

export function signup(payload: Omit<User, "id">): User {
  const users = getUsers();
  const exists = users.find((u) => u.email === payload.email);
  if (exists) {
    return exists;
  }
  const user: User = { id: crypto.randomUUID(), ...payload };
  users.push(user);
  saveUsers(users);
  setSession(user);
  return user;
}

export function logout() {
  setSession(null);
}

export function currentUser(): User | null {
  return getSession();
}

export function requireRole(roles: UserRole[]): boolean {
  const user = currentUser();
  return !!user && roles.includes(user.role);
}


