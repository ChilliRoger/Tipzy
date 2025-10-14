"use client";
import { getVenues, getTips } from "@/lib/storage";

export default function AdminPage() {
  const venues = getVenues();
  const tips = getTips();
  const feeRevenue = tips.reduce((s, t) => s + (t.feeApplied || 0), 0);

  return (
    <div className="mx-auto w-full container-max px-4 sm:px-6 lg:px-8 py-12 grid gap-6">
      <h1 className="text-2xl font-semibold">Admin (Mock)</h1>
      <div className="card p-6">
        <h2 className="text-lg font-semibold mb-3">Partnered Venues</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-[--color-text]/70">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Type</th>
                <th className="py-2 pr-4">Location</th>
                <th className="py-2 pr-4">Staff</th>
              </tr>
            </thead>
            <tbody>
              {venues.map((v) => (
                <tr key={v.id} className="border-t">
                  <td className="py-2 pr-4">{v.name}</td>
                  <td className="py-2 pr-4 capitalize">{v.type}</td>
                  <td className="py-2 pr-4">{v.location}</td>
                  <td className="py-2 pr-4">{v.staff.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-semibold mb-1">Global Analytics</h2>
        <p className="text-sm text-[--color-text]/70">Revenue from fees (1.5%):</p>
        <div className="mt-2 text-xl font-semibold">₹{feeRevenue.toFixed(2)}</div>
      </div>
    </div>
  );
}


