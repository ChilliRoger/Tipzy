import type { Tip } from "@/types";
import { getTips, saveTips } from "@/lib/storage";

export function processTip(amount: number, toStaff: string, venueId: string, note?: string): Tip {
  const tips = getTips();
  const fee = +(amount * 0.015).toFixed(2);
  const tip: Tip = {
    id: crypto.randomUUID(),
    amount,
    toStaff,
    venueId,
    date: new Date().toISOString(),
    status: "processed",
    note,
    feeApplied: fee,
  };
  tips.push(tip);
  saveTips(tips);
  return tip;
}

export function queueOfflineTip(amount: number, toStaff: string, venueId: string, note?: string): Tip {
  const tips = getTips();
  const fee = +(amount * 0.015).toFixed(2);
  const tip: Tip = {
    id: crypto.randomUUID(),
    amount,
    toStaff,
    venueId,
    date: new Date().toISOString(),
    status: "queued",
    note,
    feeApplied: fee,
  };
  tips.push(tip);
  saveTips(tips);
  return tip;
}


