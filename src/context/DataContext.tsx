
import { createContext, useContext, useState, ReactNode } from "react";
import { User, GatePass, UserRole, GatePassStatus } from "@/types";
import { useToast } from "@/components/ui/use-toast";

// Sample data for development purposes
const sampleStudents: User[] = [
  {
    id: "1",
    name: "Arun Kumar",
    email: "arun@ciet.edu",
    role: "student",
    studentId: "CSE001",
    department: "Computer Science",
    year: "Third Year",
    phoneNumber: "9876543210",
    parentPhoneNumber: "9876543211",
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya@ciet.edu",
    role: "student",
    studentId: "ECE001",
    department: "Electronics",
    year: "Second Year",
    phoneNumber: "9876543212",
    parentPhoneNumber: "9876543213",
  },
];

const sampleWardens: User[] = [
  {
    id: "3",
    name: "Dr. Rajesh Patel",
    email: "rajesh@ciet.edu",
    role: "warden",
    department: "Boys Hostel",
    phoneNumber: "9876543214",
  },
  {
    id: "4",
    name: "Dr. Meena Gupta",
    email: "meena@ciet.edu",
    role: "warden",
    department: "Girls Hostel",
    phoneNumber: "9876543215",
  },
];

const sampleAdmin: User = {
  id: "5",
  name: "Prof. Suresh Kumar",
  email: "admin@ciet.edu",
  role: "admin",
  phoneNumber: "9876543216",
};

const sampleGatePasses: GatePass[] = [
  {
    id: "1",
    studentId: "CSE001",
    studentName: "Arun Kumar",
    department: "Computer Science",
    year: "Third Year",
    reason: "Family function",
    fromDate: "2025-04-30T10:00:00",
    toDate: "2025-05-02T18:00:00",
    destination: "Chennai",
    parentPhoneNumber: "9876543211",
    status: "pending",
    appliedAt: "2025-04-28T09:30:00",
  },
  {
    id: "2",
    studentId: "ECE001",
    studentName: "Priya Sharma",
    department: "Electronics",
    year: "Second Year",
    reason: "Medical appointment",
    fromDate: "2025-05-01T09:00:00",
    toDate: "2025-05-01T15:00:00",
    destination: "Coimbatore City",
    parentPhoneNumber: "9876543213",
    status: "approved",
    remarks: "Please return on time",
    appliedAt: "2025-04-27T14:20:00",
    updatedAt: "2025-04-27T16:30:00",
    approvedByName: "Dr. Meena Gupta",
    approvedById: "4",
  },
  {
    id: "3",
    studentId: "CSE001",
    studentName: "Arun Kumar",
    department: "Computer Science",
    year: "Third Year",
    reason: "Technical workshop",
    fromDate: "2025-04-20T08:00:00",
    toDate: "2025-04-21T18:00:00",
    destination: "Chennai",
    parentPhoneNumber: "9876543211",
    status: "rejected",
    remarks: "Attendance shortage. Cannot approve at this time.",
    appliedAt: "2025-04-18T11:15:00",
    updatedAt: "2025-04-18T15:45:00",
    approvedByName: "Dr. Rajesh Patel",
    approvedById: "3",
  },
];

// Combine all users for authentication
const allUsers = [...sampleStudents, ...sampleWardens, sampleAdmin];

interface DataContextType {
  // Authentication
  currentUser: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  
  // Gate Pass Management
  gatePasses: GatePass[];
  getUserGatePasses: (userId: string) => GatePass[];
  getPendingGatePasses: () => GatePass[];
  addGatePass: (gatePass: Omit<GatePass, "id" | "appliedAt" | "status">) => void;
  updateGatePassStatus: (id: string, status: GatePassStatus, remarks?: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [gatePasses, setGatePasses] = useState<GatePass[]>(sampleGatePasses);
  const { toast } = useToast();

  // Authentication functions
  const login = (email: string, password: string): boolean => {
    // In a real app, this would validate credentials against a backend
    // For now, just find the user by email (password is ignored)
    const user = allUsers.find((u) => u.email === email);
    if (user) {
      setCurrentUser(user);
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.name}!`,
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  // Gate Pass Management functions
  const getUserGatePasses = (userId: string) => {
    // For students, find by studentId
    const user = allUsers.find((u) => u.id === userId);
    if (user?.role === "student") {
      return gatePasses.filter((gp) => gp.studentId === user.studentId);
    }
    // For wardens/admin, return all
    return gatePasses;
  };

  const getPendingGatePasses = () => {
    return gatePasses.filter((gp) => gp.status === "pending");
  };

  const addGatePass = (gatePassData: Omit<GatePass, "id" | "appliedAt" | "status">) => {
    const newGatePass: GatePass = {
      ...gatePassData,
      id: (gatePasses.length + 1).toString(),
      appliedAt: new Date().toISOString(),
      status: "pending",
    };
    
    setGatePasses((prev) => [...prev, newGatePass]);
    toast({
      title: "Gate pass submitted",
      description: "Your gate pass request has been submitted successfully.",
    });
  };

  const updateGatePassStatus = (id: string, status: GatePassStatus, remarks?: string) => {
    setGatePasses((prev) =>
      prev.map((gp) => {
        if (gp.id === id) {
          return {
            ...gp,
            status,
            remarks,
            updatedAt: new Date().toISOString(),
            approvedByName: currentUser?.name,
            approvedById: currentUser?.id,
          };
        }
        return gp;
      })
    );

    const actionText = status === "approved" ? "approved" : "rejected";
    toast({
      title: `Gate pass ${actionText}`,
      description: `The gate pass has been ${actionText} successfully.`,
    });

    // In a real app, this would send an SMS to the parent
    console.log(`SMS notification would be sent to parent for gate pass ${id} - Status: ${status}`);
  };

  const value = {
    currentUser,
    login,
    logout,
    gatePasses,
    getUserGatePasses,
    getPendingGatePasses,
    addGatePass,
    updateGatePassStatus,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
