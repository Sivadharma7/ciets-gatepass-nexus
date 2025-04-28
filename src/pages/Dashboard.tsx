
import { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "@/context/DataContext";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GatePass, GatePassStatus } from "@/types";
import { ChevronRight, Clock, CheckCircle, XCircle } from "lucide-react";

const Dashboard = () => {
  const { currentUser, getUserGatePasses, getPendingGatePasses, updateGatePassStatus } = useData();
  const [activeTab, setActiveTab] = useState<string>("all");

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const isStudent = currentUser.role === "student";
  const isWarden = currentUser.role === "warden";
  const isAdmin = currentUser.role === "admin";

  // Get gate passes based on role and active tab
  const allGatePasses = getUserGatePasses(currentUser.id);
  const pendingGatePasses = isStudent 
    ? allGatePasses.filter(gp => gp.status === "pending")
    : getPendingGatePasses();

  const approvedGatePasses = allGatePasses.filter(gp => gp.status === "approved");
  const rejectedGatePasses = allGatePasses.filter(gp => gp.status === "rejected");

  // Filter passes based on active tab
  let displayedGatePasses: GatePass[] = [];
  switch (activeTab) {
    case "pending":
      displayedGatePasses = pendingGatePasses;
      break;
    case "approved":
      displayedGatePasses = approvedGatePasses;
      break;
    case "rejected":
      displayedGatePasses = rejectedGatePasses;
      break;
    default:
      displayedGatePasses = allGatePasses;
  }

  // Quick stats
  const stats = [
    {
      title: "Pending",
      value: pendingGatePasses.length,
      icon: <Clock className="h-4 w-4 text-amber-500" />,
      color: "bg-amber-100 text-amber-800",
    },
    {
      title: "Approved",
      value: approvedGatePasses.length,
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
      color: "bg-green-100 text-green-800",
    },
    {
      title: "Rejected",
      value: rejectedGatePasses.length,
      icon: <XCircle className="h-4 w-4 text-red-500" />,
      color: "bg-red-100 text-red-800",
    },
  ];

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", { 
      year: "numeric", 
      month: "short", 
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // Helper to get badge variant based on status
  const getStatusBadge = (status: GatePassStatus) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">Pending</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Approved</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Rejected</Badge>;
    }
  };

  // Warden action handlers
  const handleApprove = (gatePassId: string) => {
    updateGatePassStatus(gatePassId, "approved", "Approved by warden");
  };

  const handleReject = (gatePassId: string) => {
    updateGatePassStatus(gatePassId, "rejected", "Does not meet requirements");
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome, {currentUser.name}</h1>
            <p className="text-muted-foreground">
              {isStudent 
                ? "Here's an overview of your gate pass applications" 
                : "Here's an overview of gate pass applications"}
            </p>
          </div>
          
          {isStudent && (
            <Button asChild className="bg-ciet-primary hover:bg-ciet-secondary">
              <Link to="/apply">Apply for Gate Pass</Link>
            </Button>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  Gate passes
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Gate Pass List */}
        <Card>
          <CardHeader>
            <CardTitle>Gate Pass Applications</CardTitle>
            <CardDescription>
              {isStudent 
                ? "View and track your gate pass applications" 
                : "Review and manage gate pass applications"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
              <TabsContent value={activeTab} className="m-0">
                {displayedGatePasses.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground">No gate passes found.</p>
                    {isStudent && activeTab === "all" && (
                      <Button asChild variant="outline" className="mt-4">
                        <Link to="/apply">Apply for Gate Pass</Link>
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {displayedGatePasses.map((gatePass) => (
                      <div key={gatePass.id} className="flex flex-col md:flex-row justify-between gap-4 p-4 border rounded-lg hover:bg-gray-50">
                        <div className="space-y-1">
                          {!isStudent && (
                            <div className="font-medium">{gatePass.studentName}</div>
                          )}
                          <div className="text-sm text-muted-foreground">
                            {formatDate(gatePass.fromDate)} to {formatDate(gatePass.toDate)}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Reason:</span> {gatePass.reason}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Destination:</span> {gatePass.destination}
                          </div>
                          <div className="flex items-center gap-3 mt-2">
                            {getStatusBadge(gatePass.status)}
                            <span className="text-xs text-muted-foreground">
                              Applied: {formatDate(gatePass.appliedAt)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-row md:flex-col gap-2 justify-end items-end mt-2 md:mt-0">
                          {(isWarden || isAdmin) && gatePass.status === "pending" && (
                            <div className="flex gap-2">
                              <Button 
                                onClick={() => handleApprove(gatePass.id)}
                                size="sm" 
                                variant="outline"
                                className="bg-green-100 text-green-800 hover:bg-green-200 border-green-300"
                              >
                                Approve
                              </Button>
                              <Button 
                                onClick={() => handleReject(gatePass.id)}
                                size="sm" 
                                variant="outline"
                                className="bg-red-100 text-red-800 hover:bg-red-200 border-red-300"
                              >
                                Reject
                              </Button>
                            </div>
                          )}
                          <Button asChild variant="ghost" size="sm" className="gap-1">
                            <Link to={`/gate-pass/${gatePass.id}`}>
                              View Details
                              <ChevronRight className="h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
