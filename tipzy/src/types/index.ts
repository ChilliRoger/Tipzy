export type UserRole = "customer" | "staff" | "venue" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  venueId?: string; // staff or venue owner linkage
}

export type VenueType = "restaurant" | "salon" | "parking";

export interface StaffMember {
  id: string;
  name: string;
  role: string; // waiter, barber, guard
  virtualUPI: string;
  venueId: string;
}

export interface Venue {
  id: string;
  name: string;
  type: VenueType;
  location: string;
  staff: StaffMember[];
  subscription: "free" | "premium";
}

export interface Tip {
  id: string;
  amount: number;
  fromCustomer?: string;
  toStaff: string; // staff id
  venueId: string;
  date: string; // ISO
  status: "processed" | "queued";
  note?: string;
  feeApplied?: number; // 1.5% fee amount
}


