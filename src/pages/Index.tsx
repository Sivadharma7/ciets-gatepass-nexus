
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ClipboardList, Lock } from "lucide-react";

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
            A secure and efficient way for students to apply for gate passes and for wardens to manage approvals.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-white text-ciet-primary hover:bg-gray-100">
              <Link to="/login">Login to System</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-6">
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
