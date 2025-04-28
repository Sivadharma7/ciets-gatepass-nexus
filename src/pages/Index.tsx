
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  ClipboardList, 
  Lock, 
  Database, 
  Users, 
  Home,
  MessageSquare
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const { currentUser } = useData();
  const navigate = useNavigate();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-ciet-primary text-white py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">CIET Hostel Gate Pass Management System</h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8">
            A secure and efficient way for students to apply for gate passes and for wardens to manage approvals
            with automated parent notifications.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-white text-ciet-primary hover:bg-gray-100">
              <Link to="/login">Login to System</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">About The System</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              The CIET Hostel Gate Pass Management System is designed to streamline the process of applying for and 
              approving hostel gate passes. It replaces the traditional paper-based system with a digital solution
              that improves efficiency, transparency, and communication between students, wardens, and parents.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-4">How It Works</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="mt-1 bg-ciet-primary bg-opacity-10 rounded-full p-1">
                    <CheckCircle2 className="h-5 w-5 text-ciet-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Student Application</p>
                    <p className="text-gray-600">Students log in and apply for gate passes with their travel details and reason.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 bg-ciet-primary bg-opacity-10 rounded-full p-1">
                    <CheckCircle2 className="h-5 w-5 text-ciet-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Warden Review</p>
                    <p className="text-gray-600">Wardens receive the applications and can approve or reject with comments.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 bg-ciet-primary bg-opacity-10 rounded-full p-1">
                    <CheckCircle2 className="h-5 w-5 text-ciet-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Parent Notification</p>
                    <p className="text-gray-600">Parents receive automatic notifications about their child's gate pass status.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-gray-100 rounded-lg p-6 shadow-inner">
              <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md">
                <Database className="h-16 w-16 text-ciet-primary mr-4" />
                <div>
                  <h4 className="text-lg font-semibold">Secure Database Storage</h4>
                  <p className="text-gray-600">All gate pass applications and user data are securely stored in our database.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Guides Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How To Use The System</h2>
          
          <Tabs defaultValue="students" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="students">For Students</TabsTrigger>
              <TabsTrigger value="wardens">For Wardens</TabsTrigger>
            </TabsList>
            
            <TabsContent value="students">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-6 w-6" /> Student Guide
                  </CardTitle>
                  <CardDescription>
                    How students can use the gate pass system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-white p-4 rounded-lg border">
                      <h3 className="text-lg font-medium mb-2">1. Login to Your Account</h3>
                      <p className="text-gray-600 mb-2">Use your student credentials to access the system.</p>
                      <div className="bg-gray-50 p-3 rounded text-sm">
                        <strong>Sample Login:</strong> arun@ciet.edu / password
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border">
                      <h3 className="text-lg font-medium mb-2">2. Apply for a Gate Pass</h3>
                      <p className="text-gray-600">Click on "Apply for Gate Pass" from your dashboard and fill in:</p>
                      <ul className="list-disc list-inside ml-4 mt-2 text-gray-600">
                        <li>Reason for leaving</li>
                        <li>Destination</li>
                        <li>Departure and return dates</li>
                        <li>Parent's contact number</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border">
                      <h3 className="text-lg font-medium mb-2">3. Track Your Application</h3>
                      <p className="text-gray-600">
                        Monitor your gate pass status from your dashboard. You'll see status updates 
                        (Pending, Approved, or Rejected) and any remarks from the warden.
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border">
                      <h3 className="text-lg font-medium mb-2">4. Gate Pass History</h3>
                      <p className="text-gray-600">
                        Access your complete history of gate pass applications for reference and tracking.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="wardens">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-6 w-6" /> Warden Guide
                  </CardTitle>
                  <CardDescription>
                    How wardens can manage gate pass applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-white p-4 rounded-lg border">
                      <h3 className="text-lg font-medium mb-2">1. Access Your Dashboard</h3>
                      <p className="text-gray-600 mb-2">Log in with your warden credentials.</p>
                      <div className="bg-gray-50 p-3 rounded text-sm">
                        <strong>Sample Login:</strong> rajesh@ciet.edu / password
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border">
                      <h3 className="text-lg font-medium mb-2">2. Review Pending Applications</h3>
                      <p className="text-gray-600">
                        Your dashboard displays all pending gate pass applications. Click on any application 
                        to view complete details including student information and reason for leave.
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border">
                      <h3 className="text-lg font-medium mb-2">3. Approve or Reject Requests</h3>
                      <p className="text-gray-600">
                        For each application, you can:
                      </p>
                      <ul className="list-disc list-inside ml-4 mt-2 text-gray-600">
                        <li>Approve the gate pass</li>
                        <li>Reject with reason</li>
                        <li>Add remarks/instructions for the student</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border">
                      <h3 className="text-lg font-medium mb-2">4. Parent Notification System</h3>
                      <p className="text-gray-600">
                        When you approve or reject a gate pass, the system automatically sends an SMS 
                        notification to the parent's registered mobile number with relevant details.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Database & Backend Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Database & Backend</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              The CIET Hostel Gate Pass system is powered by a secure database that stores all user 
              information and gate pass records.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-ciet-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-ciet-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Data Storage</h3>
              <p className="text-gray-600">
                All user profiles, gate pass applications, and approval records are securely stored
                in our database with proper encryption and access controls.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-ciet-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-ciet-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Authentication</h3>
              <p className="text-gray-600">
                Role-based authentication ensures that students, wardens, and administrators
                can only access features relevant to their responsibilities.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-ciet-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-ciet-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">SMS Notifications</h3>
              <p className="text-gray-600">
                Our backend integrates with SMS services to send automatic notifications to parents
                when gate passes are approved or rejected, ensuring transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-ciet-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <ClipboardList className="h-6 w-6 text-ciet-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Application</h3>
              <p className="text-gray-600">
                Students can easily apply for gate passes online, saving time and reducing paperwork.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-ciet-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-ciet-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Approval</h3>
              <p className="text-gray-600">
                Wardens can efficiently review and approve gate pass requests through the digital dashboard.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-ciet-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-ciet-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Notifications</h3>
              <p className="text-gray-600">
                Automatic notifications keep parents informed about their child's gate pass status.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Log in to the CIET Hostel Gate Pass System to apply for or manage gate passes.
          </p>
          <Button asChild size="lg" className="bg-ciet-primary hover:bg-ciet-secondary">
            <Link to="/login">Login Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ciet-dark text-white py-8 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Coimbatore Institute of Engineering and Technology</h2>
            <p className="text-gray-300 mb-6">Hostel Gate Pass Management System</p>
            <p className="text-sm text-gray-400">© 2025 CIET. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
