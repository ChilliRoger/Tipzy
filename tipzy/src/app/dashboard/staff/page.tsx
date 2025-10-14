"use client";
import RequireRole from "@/components/auth/RequireRole";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import QRBadge from "@/components/ui/QRBadge";
import { currentUser } from "@/lib/auth";
import { getTips, getVenues } from "@/lib/storage";

export default function StaffDashboard() {
  return (
    <RequireRole roles={["staff"]}>
      <Content />
    </RequireRole>
  );
}

function Content() {
  const user = currentUser();
  const venues = getVenues();
  const venue = venues.find((v) => v.id === user?.venueId);
  const myTips = getTips().filter((t) => t.toStaff === user?.id);
  const total = myTips.reduce((s, t) => s + t.amount, 0);

  return (
    <div className="mx-auto w-full container-max px-4 sm:px-6 lg:px-8 py-8 grid gap-6">
      <h1 className="text-2xl font-semibold">Staff Dashboard</h1>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4">
          <div>
            <div className="font-medium">{user?.name}</div>
            <div className="text-sm text-[--color-text]/70">{venue?.name}</div>
          </div>
          {user && venue && (
            <QRBadge value={`tipzy://staff/${user.id}?venue=${venue.id}`} label="Your QR" />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tip History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm mb-3">Total earnings: ₹{total.toFixed(2)}</div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-[--color-text]/70">
                  <th className="py-2 pr-4">Date</th>
                  <th className="py-2 pr-4">Amount</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Note</th>
                </tr>
              </thead>
              <tbody>
                {myTips.map((t) => (
                  <tr key={t.id} className="border-t">
                    <td className="py-2 pr-4">{new Date(t.date).toLocaleString()}</td>
                    <td className="py-2 pr-4">₹{t.amount.toFixed(2)}</td>
                    <td className="py-2 pr-4">{t.status}</td>
                    <td className="py-2 pr-4">{t.note || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


