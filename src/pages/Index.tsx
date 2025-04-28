import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { HostelCollage } from "@/components/home/HostelCollage";
import { HostelFacilities } from "@/components/home/HostelFacilities";
import { 
  CheckCircle2, 
  ClipboardList, 
  Lock, 
  Database, 
  Users, 
  MessageSquare,
  MapPin
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

      {/* About Section with Address */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">About The System</h2>
            <p className="text-gray-600 max-w-3xl mx-auto mb-8">
              The CIET Hostel Gate Pass Management System is designed to streamline the process of applying for and 
              approving hostel gate passes. It replaces the traditional paper-based system with a digital solution
              that improves efficiency, transparency, and communication between students, wardens, and parents.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg max-w-2xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <MapPin className="h-6 w-6 text-ciet-primary" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-2">Our Hostel Address</h3>
                  <p className="text-gray-600">
                    CIET Boys Hostel<br />
                    Coimbatore Institute of Engineering and Technology<br />
                    Civil Aerodrome Post<br />
                    Coimbatore - 641014<br />
                    Tamil Nadu, India
                  </p>
                  <p className="mt-4 text-gray-600">
                    <strong>Hostel Office Contact:</strong> +91-422-2572177<br />
                    <strong>Email:</strong> hostel@ciet.edu
                  </p>
                </div>
              </div>
            </div>
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

      {/* Hostel Photo Collage */}
      <HostelCollage />

      {/* Hostel Facilities */}
      <HostelFacilities />

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
