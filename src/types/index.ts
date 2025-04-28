
export type UserRole = "student" | "warden" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  studentId?: string;
  department?: string;
  year?: string;
  phoneNumber?: string;
  parentPhoneNumber?: string;
}

export type GatePassStatus = "pending" | "approved" | "rejected";

export interface GatePass {
  id: string;
  studentId: string;
  studentName: string;
  department: string;
  year: string;
  reason: string;
  fromDate: string;
  toDate: string;
  destination: string;
  parentPhoneNumber: string;
  status: GatePassStatus;
  remarks?: string;
  appliedAt: string;
  updatedAt?: string;
  approvedByName?: string;
  approvedById?: string;
}
