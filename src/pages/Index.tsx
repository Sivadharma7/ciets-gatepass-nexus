
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { HostelCollage } from "@/components/home/HostelCollage";
import { HostelFacilities } from "@/components/home/HostelFacilities";
import { MapPin } from "lucide-react";
import HostelMap from "@/components/home/HostelMap";

const Index = () => {
  const { currentUser } = useData();
  const navigate = useNavigate();

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
            Welcome to CIET Boys Hostel - Your home away from home
          </p>
          <div className="flex justify-center">
            <Button asChild size="lg" className="bg-white text-ciet-primary hover:bg-gray-100">
              <Link to="/login">Login to System</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* About Section with Map */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">About Our Hostel</h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  CIET Boys Hostel provides a comfortable and nurturing environment for students pursuing their academic dreams. 
                  Our hostel offers modern amenities, spacious rooms, and a supportive community that helps students thrive 
                  during their academic journey.
                </p>
                <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-ciet-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Our Location</h3>
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
            </div>
            <div>
              <HostelMap />
            </div>
          </div>
        </div>
      </section>

      {/* Hostel Photo Collage */}
      <HostelCollage />

      {/* Hostel Facilities */}
      <HostelFacilities />

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
