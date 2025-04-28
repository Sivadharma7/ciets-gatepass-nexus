
import { Card, CardContent } from "@/components/ui/card";

export const HostelCollage = () => {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Life at CIET Hostel</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <img
                src="/hostel1.jpg"
                alt="CIET Hostel Building"
                className="w-full h-64 object-cover"
              />
            </CardContent>
          </Card>
          <Card className="overflow-hidden md:col-span-2 lg:col-span-1">
            <CardContent className="p-0">
              <img
                src="/hostel2.jpg"
                alt="Student Common Room"
                className="w-full h-64 object-cover"
              />
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <img
                src="/hostel3.jpg"
                alt="Hostel Mess"
                className="w-full h-64 object-cover"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
