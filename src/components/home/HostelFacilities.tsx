
import { Wifi, Coffee, Dumbbell, UtensilsCrossed, Laptop, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const facilities = [
  { icon: Wifi, title: "Free Wi-Fi", description: "High-speed internet access throughout the hostel" },
  { icon: UtensilsCrossed, title: "Modern Mess", description: "Hygienic dining facility with quality food" },
  { icon: Dumbbell, title: "Fitness Center", description: "Well-equipped gym for physical wellness" },
  { icon: BookOpen, title: "Study Rooms", description: "Quiet spaces for focused learning" },
  { icon: Coffee, title: "Recreation Area", description: "Common room with indoor games" },
  { icon: Laptop, title: "Computer Lab", description: "24/7 access to computing facilities" },
];

export const HostelFacilities = () => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Hostel Facilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility) => (
            <Card key={facility.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-ciet-primary bg-opacity-10 rounded-lg">
                    <facility.icon className="h-6 w-6 text-ciet-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{facility.title}</h3>
                    <p className="text-gray-600">{facility.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
