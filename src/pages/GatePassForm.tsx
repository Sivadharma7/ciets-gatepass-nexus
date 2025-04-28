
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "@/context/DataContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { FormInput } from "@/types";

const GatePassForm = () => {
  const { currentUser, addGatePass } = useData();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form state
  const [reason, setReason] = useState("");
  const [destination, setDestination] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [parentPhoneNumber, setParentPhoneNumber] = useState(
    currentUser?.parentPhoneNumber || ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast({
        title: "Error",
        description: "You must be logged in to apply for a gate pass.",
        variant: "destructive",
      });
      return;
    }

    // Validate form
    if (!reason || !destination || !fromDate || !toDate || !parentPhoneNumber) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Validate dates
    const fromDateTime = new Date(fromDate).getTime();
    const toDateTime = new Date(toDate).getTime();
    const currentDateTime = new Date().getTime();

    if (fromDateTime < currentDateTime) {
      toast({
        title: "Invalid dates",
        description: "From date cannot be in the past.",
        variant: "destructive",
      });
      return;
    }

    if (toDateTime < fromDateTime) {
      toast({
        title: "Invalid dates",
        description: "To date cannot be before from date.",
        variant: "destructive",
      });
      return;
    }

    // Show loading state
    setIsSubmitting(true);

    // Submit gate pass
    setTimeout(() => {
      try {
        // Create gate pass object using the current student's information
        addGatePass({
          studentId: currentUser.studentId || "",
          studentName: currentUser.name,
          department: currentUser.department || "",
          year: currentUser.year || "",
          reason,
          fromDate,
          toDate,
          destination,
          parentPhoneNumber,
        });

        // Navigate back to dashboard
        navigate("/dashboard");
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to submit gate pass. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    }, 1000); // Simulate API delay
  };

  // Create form fields for student information
  const studentFields: FormInput[] = [
    {
      id: "student-name",
      label: "Student Name",
      type: "text",
      placeholder: "Student Name",
      value: currentUser?.name || "",
      required: true,
      disabled: true,
    },
    {
      id: "student-id",
      label: "Student ID",
      type: "text",
      placeholder: "Student ID",
      value: currentUser?.studentId || "",
      required: true,
      disabled: true,
    },
    {
      id: "department",
      label: "Department",
      type: "text",
      placeholder: "Department",
      value: currentUser?.department || "",
      required: true,
      disabled: true,
    },
    {
      id: "year",
      label: "Year",
      type: "text",
      placeholder: "Year",
      value: currentUser?.year || "",
      required: true,
      disabled: true,
    },
  ];

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Apply for Gate Pass</CardTitle>
            <CardDescription>
              Fill in the details below to request a gate pass. All fields are required.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Student Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Student Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {studentFields.map((field) => (
                    <div key={field.id} className="space-y-2">
                      <Label htmlFor={field.id}>{field.label}</Label>
                      <Input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={field.value}
                        disabled={field.disabled}
                        required={field.required}
                        readOnly={field.disabled}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Gate Pass Details Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Gate Pass Details</h3>
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Gate Pass</Label>
                  <Textarea
                    id="reason"
                    placeholder="Please provide a detailed reason for your gate pass request"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    type="text"
                    placeholder="Where are you going?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="from-date">From Date & Time</Label>
                    <Input
                      id="from-date"
                      type="datetime-local"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="to-date">To Date & Time</Label>
                    <Input
                      id="to-date"
                      type="datetime-local"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parent-phone">Parent's Phone Number</Label>
                  <Input
                    id="parent-phone"
                    type="tel"
                    placeholder="Parent's phone number for notifications"
                    value={parentPhoneNumber}
                    onChange={(e) => setParentPhoneNumber(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard")}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Gate Pass Request"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default GatePassForm;
