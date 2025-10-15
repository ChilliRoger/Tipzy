"use client";
import RequireRole from "@/components/auth/RequireRole";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import QRBadge from "@/components/ui/QRBadge";
import { getVenues, saveVenues } from "@/lib/storage";
import { currentUser } from "@/lib/auth";
import type { StaffMember, Venue } from "@/types";
import { useMemo, useState } from "react";

export default function VenueDashboard() {
  return (
    <RequireRole roles={["venue"]}>
      <Content />
    </RequireRole>
  );
}

function Content() {
  const user = currentUser();
  const [venues, setVenues] = useState<Venue[]>(getVenues());
  const venue = useMemo(() => venues.find((v) => v.id === user?.venueId)!, [venues, user]);
  const [newStaffName, setNewStaffName] = useState("");
  const [newStaffRole, setNewStaffRole] = useState("Waiter");

  function addStaff() {
    if (!newStaffName || !venue) return;
    const member: StaffMember = {
      id: crypto.randomUUID(),
      name: newStaffName,
      role: newStaffRole,
      virtualUPI: `${newStaffName.toLowerCase().replace(/\s+/g, "")}@tipzy`,
      venueId: venue.id,
    };
    const updated = venues.map((v) => (v.id === venue.id ? { ...v, staff: [...v.staff, member] } : v));
    setVenues(updated);
    saveVenues(updated);
    setNewStaffName("");
  }

  function downloadStaffCsv() {
    if (!venue) return;
    const headers = ["id", "name", "role", "virtualUPI"];
    const rows = venue.staff.map((s) => [s.id, s.name, s.role, s.virtualUPI]);
    const csv = [headers, ...rows]
      .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "staff.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto w-full container-max px-4 sm:px-6 lg:px-8 py-8 grid gap-6">
      <h1 className="text-2xl font-semibold">Venue Dashboard</h1>

      <Card>
        <CardHeader>
          <CardTitle>Onboarding</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-[--color-text]/70">Venue</div>
            <div className="font-medium">{venue?.name}</div>
          </div>
          <div>
            <div className="text-sm text-[--color-text]/70">Type</div>
            <div className="font-medium capitalize">{venue?.type}</div>
          </div>
          <div>
            <div className="text-sm text-[--color-text]/70">Location</div>
            <div className="font-medium">{venue?.location}</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Staff Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-3">
            <input className="rounded-md border px-3 py-2" placeholder="Full name" value={newStaffName} onChange={(e) => setNewStaffName(e.target.value)} />
            <select className="rounded-md border px-3 py-2" value={newStaffRole} onChange={(e) => setNewStaffRole(e.target.value)}>
              <option>Waiter</option>
              <option>Barber</option>
              <option>Guard</option>
            </select>
            <Button onClick={addStaff}>Add Staff</Button>
          </div>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {venue?.staff.map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <div className="font-medium">{s.name}</div>
                  <div className="text-sm text-[--color-text]/70">{s.role} • {s.virtualUPI}</div>
                </div>
                <QRBadge value={`tipzy://staff/${s.id}?venue=${venue.id}`} label="Scan to tip" />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <button onClick={downloadStaffCsv} className="text-sm text-[--color-primary] hover:underline">Download staff CSV</button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <div className="font-medium capitalize">Current: {venue?.subscription}</div>
            <div className="text-sm text-[--color-text]/70">Premium ₹500/month unlocks analytics</div>
          </div>
          {venue?.subscription === "free" ? (
            <Button onClick={() => {
              const updated = venues.map((v) => (v.id === venue.id ? { ...v, subscription: "premium" as const } : v));
              setVenues(updated); saveVenues(updated);
            }}>Upgrade</Button>
          ) : (
            <span className="text-sm text-green-600">Premium active</span>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


