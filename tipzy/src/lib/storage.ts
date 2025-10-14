"use client";
import type { Tip, User, Venue } from "@/types";

const KEY_USERS = "tipzy_users";
const KEY_SESSION = "tipzy_session";
const KEY_VENUES = "tipzy_venues";
const KEY_TIPS = "tipzy_tips";

export function getLocal<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function setLocal<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getUsers(): User[] {
  return getLocal<User[]>(KEY_USERS, []);
}

export function saveUsers(users: User[]) {
  setLocal(KEY_USERS, users);
}

export function getSession(): User | null {
  return getLocal<User | null>(KEY_SESSION, null);
}

export function setSession(user: User | null) {
  setLocal(KEY_SESSION, user);
}

export function getVenues(): Venue[] {
  return getLocal<Venue[]>(KEY_VENUES, []);
}

export function saveVenues(venues: Venue[]) {
  setLocal(KEY_VENUES, venues);
}

export function getTips(): Tip[] {
  return getLocal<Tip[]>(KEY_TIPS, []);
}

export function saveTips(tips: Tip[]) {
  setLocal(KEY_TIPS, tips);
}

export function ensureDemoData() {
  const users = getUsers();
  const venues = getVenues();
  const tips = getTips();
  if (users.length || venues.length || tips.length) return; // already seeded

  const venueId = crypto.randomUUID();
  const staffA = {
    id: crypto.randomUUID(),
    name: "Aisha Khan",
    role: "Waiter",
    virtualUPI: "aisha@tipzy",
    venueId,
  };
  const staffB = {
    id: crypto.randomUUID(),
    name: "Rohit Sharma",
    role: "Waiter",
    virtualUPI: "rohit@tipzy",
    venueId,
  };
  const venue: Venue = {
    id: venueId,
    name: "Blue Lotus Bistro",
    type: "restaurant",
    location: "Bengaluru",
    staff: [staffA, staffB],
    subscription: "free",
  };
  const owner: User = {
    id: crypto.randomUUID(),
    name: "Venue Owner",
    email: "owner@demo.com",
    phone: "9999999999",
    role: "venue",
    venueId,
  };
  const staffUser: User = {
    id: staffA.id,
    name: staffA.name,
    email: "aisha@demo.com",
    role: "staff",
    venueId,
  };
  const customer: User = {
    id: crypto.randomUUID(),
    name: "Demo Customer",
    email: "customer@demo.com",
    role: "customer",
  };
  const demoTips: Tip[] = [
    {
      id: crypto.randomUUID(),
      amount: 120,
      fromCustomer: customer.id,
      toStaff: staffA.id,
      venueId,
      date: new Date().toISOString(),
      status: "processed",
      feeApplied: 120 * 0.015,
    },
  ];

  saveUsers([owner, staffUser, customer]);
  saveVenues([venue]);
  saveTips(demoTips);
}


