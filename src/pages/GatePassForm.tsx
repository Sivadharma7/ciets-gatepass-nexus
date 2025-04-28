
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "@/context/DataContext";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const GatePassForm = () => {
  const { currentUser, addGatePass } = useData();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    reason: "",
    fromDate: "",
    toDate: "",
    destination: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!currentUser || currentUser.role !== "student") {
    return navigate("/dashboard");
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Form validation
    if (!formData.reason || !formData.fromDate || !formData.toDate || !formData.destination) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Check if from date is before to date
    const fromDate = new Date(formData.fromDate);
    const toDate = new Date(formData.toDate);
    
    if (fromDate > toDate) {
      toast({
        title: "Date Error",
        description: "From date must be before or equal to To date.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Add the new gate pass
    try {
      addGatePass({
        studentId: currentUser.studentId!,
        studentName: currentUser.name,
        department: currentUser.department!,
        year: currentUser.year!,
        reason: formData.reason,
        fromDate: formData.fromDate,
        toDate: formData.toDate,
        destination: formData.destination,
        parentPhoneNumber: currentUser.parentPhoneNumber!,
      });

      // Navigate back to dashboard after successful submission
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.error("Error submitting gate pass:", error);
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your gate pass application.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Apply for Gate Pass</CardTitle>
            <CardDescription>
              Fill out the form below to request a new gate pass. All fields are required.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Student Information - Read Only */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Student Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={currentUser.name} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input id="studentId" value={currentUser.studentId} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" value={currentUser.department} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input id="year" value={currentUser.year} disabled />
                  </div>
                </div>
              </div>

              {/* Gate Pass Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Gate Pass Details</h3>
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Gate Pass <span className="text-red-500">*</span></Label>
                  <Textarea
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    placeholder="Enter the reason for requesting a gate pass"
                    required
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fromDate">From Date & Time <span className="text-red-500">*</span></Label>
                    <Input
                      id="fromDate"
                      name="fromDate"
                      type="datetime-local"
                      value={formData.fromDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="toDate">To Date & Time <span className="text-red-500">*</span></Label>
                    <Input
                      id="toDate"
                      name="toDate"
                      type="datetime-local"
                      value={formData.toDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination <span className="text-red-500">*</span></Label>
                  <Input
                    id="destination"
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    placeholder="Enter your destination"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentPhone">Parent's Phone Number</Label>
                  <Input
                    id="parentPhone"
                    value={currentUser.parentPhoneNumber}
                    disabled
                    description="This number will receive SMS notifications about your gate pass status."
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Your parent will be notified via SMS when your gate pass is approved or rejected.
                  </p>
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
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-ciet-primary hover:bg-ciet-secondary"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default GatePassForm;
