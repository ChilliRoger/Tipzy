"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { signup } from "@/lib/auth";
import type { UserRole, VenueType } from "@/types";
import { getVenues, saveVenues } from "@/lib/storage";

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>("venue");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [venueName, setVenueName] = useState("");
  const [venueType, setVenueType] = useState<VenueType>("restaurant");
  const [location, setLocation] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    let venueId: string | undefined;
    if (role === "venue" && venueName) {
      const venues = getVenues();
      const newVenue = {
        id: crypto.randomUUID(),
        name: venueName,
        type: venueType,
        location: location || "",
        staff: [],
        subscription: "free" as const,
      };
      venues.push(newVenue);
      saveVenues(venues);
      venueId = newVenue.id;
    }

    const user = signup({
      name,
      email,
      phone,
      role,
      venueId,
    });
    if (user.role === "venue") router.push("/dashboard/venue");
    else if (user.role === "staff") router.push("/dashboard/staff");
    else router.push("/");
  }

  return (
    <div className="mx-auto w-full container-max px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-lg mx-auto card p-6">
        <h1 className="text-xl font-semibold">Sign Up</h1>
        <form onSubmit={onSubmit} className="mt-4 grid gap-3">
          <label className="grid gap-1 text-sm">
            <span>Role</span>
            <select className="rounded-md border px-3 py-2" value={role} onChange={(e) => setRole(e.target.value as UserRole)}>
              <option value="customer">Customer</option>
              <option value="staff">Staff</option>
              <option value="venue">Venue Owner</option>
            </select>
          </label>
          <label className="grid gap-1 text-sm">
            <span>Name</span>
            <input className="rounded-md border px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label className="grid gap-1 text-sm">
            <span>Email</span>
            <input className="rounded-md border px-3 py-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label className="grid gap-1 text-sm">
            <span>Password</span>
            <input className="rounded-md border px-3 py-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <label className="grid gap-1 text-sm">
            <span>Phone</span>
            <input className="rounded-md border px-3 py-2" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </label>

          {role === "venue" && (
            <div className="grid gap-3">
              <label className="grid gap-1 text-sm">
                <span>Venue name</span>
                <input className="rounded-md border px-3 py-2" value={venueName} onChange={(e) => setVenueName(e.target.value)} />
              </label>
              <label className="grid gap-1 text-sm">
                <span>Venue type</span>
                <select className="rounded-md border px-3 py-2" value={venueType} onChange={(e) => setVenueType(e.target.value as VenueType)}>
                  <option value="restaurant">Restaurant</option>
                  <option value="salon">Salon</option>
                  <option value="parking">Parking</option>
                </select>
              </label>
              <label className="grid gap-1 text-sm">
                <span>Location</span>
                <input className="rounded-md border px-3 py-2" value={location} onChange={(e) => setLocation(e.target.value)} />
              </label>
            </div>
          )}

          <Button type="submit" className="mt-2">Create account</Button>
        </form>
      </div>
    </div>
  );
}


