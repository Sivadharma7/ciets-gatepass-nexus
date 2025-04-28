
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useData } from "@/context/DataContext";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { GatePass } from "@/types";
import { ArrowLeft, Calendar, MapPin, Clock, User, CheckCircle, XCircle, AlertCircle, Phone } from "lucide-react";

const GatePassDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser, gatePasses, updateGatePassStatus } = useData();
  const { toast } = useToast();
  const [gatePass, setGatePass] = useState<GatePass | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const pass = gatePasses.find((gp) => gp.id === id);
      setGatePass(pass || null);
    }
    setIsLoading(false);
  }, [id, gatePasses]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-48">
          <p>Loading gate pass details...</p>
        </div>
      </Layout>
    );
  }

  if (!gatePass) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Gate Pass Not Found</CardTitle>
              <CardDescription>
                The requested gate pass could not be found. It may have been deleted or you may not have permission to view it.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
            </CardFooter>
          </Card>
        </div>
      </Layout>
    );
  }

  const isStudent = currentUser?.role === "student";
  const isWarden = currentUser?.role === "warden";
  const isPending = gatePass.status === "pending";

  // Format dates for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Status badge color
  const getStatusBadge = () => {
    switch (gatePass.status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
            <AlertCircle className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
    }
  };

  // Handle gate pass actions for wardens
  const handleApprove = () => {
    updateGatePassStatus(gatePass.id, "approved", "Approved by warden");
    navigate("/dashboard");
  };

  const handleReject = () => {
    updateGatePassStatus(gatePass.id, "rejected", "Request denied due to policy guidelines");
    navigate("/dashboard");
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate("/dashboard")} className="pl-1">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <CardTitle>Gate Pass Details</CardTitle>
                <CardDescription>
                  View complete information about this gate pass request
                </CardDescription>
              </div>
              <div>{getStatusBadge()}</div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Student Name</p>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-ciet-primary" />
                  <p>{gatePass.studentName}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Student ID</p>
                <p>{gatePass.studentId}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Department</p>
                <p>{gatePass.department}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Year</p>
                <p>{gatePass.year}</p>
              </div>
            </div>

            <Separator />

            {/* Gate Pass Details */}
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Reason for Gate Pass</p>
                <p>{gatePass.reason}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">From Date & Time</p>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-ciet-primary" />
                    <p>{formatDate(gatePass.fromDate)}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">To Date & Time</p>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-ciet-primary" />
                    <p>{formatDate(gatePass.toDate)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Destination</p>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-ciet-primary" />
                  <p>{gatePass.destination}</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Parent's Phone Number</p>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-ciet-primary" />
                  <p>{gatePass.parentPhoneNumber}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Application Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Applied On</p>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-ciet-primary" />
                  <p>{formatDate(gatePass.appliedAt)}</p>
                </div>
              </div>

              {gatePass.updatedAt && (
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {gatePass.status === "approved" ? "Approved On" : "Rejected On"}
                  </p>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-ciet-primary" />
                    <p>{formatDate(gatePass.updatedAt)}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Remarks (if available) */}
            {gatePass.remarks && (
              <div className="space-y-1 bg-muted p-4 rounded-md">
                <p className="text-sm font-medium text-muted-foreground">Remarks</p>
                <p>{gatePass.remarks}</p>
              </div>
            )}

            {/* Warden information (if approved/rejected) */}
            {gatePass.approvedByName && (
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {gatePass.status === "approved" ? "Approved By" : "Rejected By"}
                </p>
                <p>{gatePass.approvedByName}</p>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between">
            {isPending && isWarden ? (
              <>
                <Button onClick={handleReject} variant="destructive">
                  Reject
                </Button>
                <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700">
                  Approve
                </Button>
              </>
            ) : (
              <Button onClick={() => navigate("/dashboard")} className="ml-auto">
                Back to Dashboard
              </Button>
            )}
          </CardFooter>
        </Card>

        {gatePass.status === "approved" && (
          <div className="mt-6">
            <Card className="border-green-300 bg-green-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-green-800 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Gate Pass Approved
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-800">
                  This gate pass has been approved. Please show this to the security personnel when leaving the hostel.
                </p>
                <p className="text-sm text-green-700 mt-2">
                  SMS notification has been sent to parent's phone number: {gatePass.parentPhoneNumber}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default GatePassDetails;
