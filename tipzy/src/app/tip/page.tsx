"use client";
import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import { getVenues } from "@/lib/storage";
import { processTip, queueOfflineTip } from "@/lib/mockUPI";

export default function TipPage() {
  const venues = getVenues();
  const [scan, setScan] = useState("");
  const [amount, setAmount] = useState<number>(50);
  const [note, setNote] = useState("");
  const [offline, setOffline] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const parsed = useMemo(() => {
    try {
      if (!scan) return null;
      // Expect format tipzy://staff/{id}?venue={venueId}
      const url = new URL(scan.replace("tipzy://", "http://"));
      const staffId = url.pathname.split("/").pop()!;
      const venueId = url.searchParams.get("venue");
      const venue = venues.find((v) => v.id === venueId);
      const staff = venue?.staff.find((s) => s.id === staffId);
      return venue && staff ? { venue, staff } : null;
    } catch {
      return null;
    }
  }, [scan, venues]);

  function submit() {
    if (!parsed) {
      setMessage("Invalid or missing QR (mock).");
      return;
    }
    const tip = offline
      ? queueOfflineTip(amount, parsed.staff.id, parsed.venue.id, note)
      : processTip(amount, parsed.staff.id, parsed.venue.id, note);
    setMessage(`Success! Tip ${offline ? "queued" : "processed"}. Fee ₹${tip.feeApplied?.toFixed(2)}`);
  }

  return (
    <div className="mx-auto w-full container-max px-4 sm:px-6 lg:px-8 py-12 grid gap-6">
      <h1 className="text-2xl font-semibold">Tip a staff member</h1>
      <div className="card p-6 grid gap-4">
        <label className="grid gap-1 text-sm">
          <span>Paste scanned QR data (mock)</span>
          <input className="rounded-md border px-3 py-2" placeholder="tipzy://staff/{id}?venue={venueId}" value={scan} onChange={(e) => setScan(e.target.value)} />
        </label>
        {parsed && (
          <div className="text-sm">
            Tipping <span className="font-medium">{parsed.staff.name}</span> at <span className="font-medium">{parsed.venue.name}</span>
          </div>
        )}
        <div className="grid md:grid-cols-3 gap-3">
          <label className="grid gap-1 text-sm">
            <span>Amount (₹)</span>
            <input className="rounded-md border px-3 py-2" type="number" min={1} value={amount} onChange={(e) => setAmount(+e.target.value)} />
          </label>
          <label className="grid gap-1 text-sm md:col-span-2">
            <span>Note (optional)</span>
            <input className="rounded-md border px-3 py-2" value={note} onChange={(e) => setNote(e.target.value)} />
          </label>
        </div>
        <label className="inline-flex items-center gap-2 text-sm">
          <input type="checkbox" checked={offline} onChange={(e) => setOffline(e.target.checked)} />
          Offline mode (queue)
        </label>
        <div>
          <Button onClick={submit}>Pay via UPI (mock)</Button>
        </div>
        {message && <div className="text-sm text-green-700">{message}</div>}
      </div>
    </div>
  );
}


