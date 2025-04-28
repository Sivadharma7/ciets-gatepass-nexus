
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LogOut, Menu, Home, ClipboardList, Plus, Users, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { currentUser, logout } = useData();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navigationItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
      roles: ["student", "warden", "admin"],
    },
    {
      name: "Apply for Gate Pass",
      href: "/apply",
      icon: Plus,
      roles: ["student"],
    },
    {
      name: "Gate Pass Applications",
      href: "/dashboard", // Same as dashboard for now
      icon: ClipboardList,
      roles: ["warden", "admin"],
    },
    {
      name: "Manage Users",
      href: "/dashboard", // Placeholder for now
      icon: Users,
      roles: ["admin"],
    },
    {
      name: "Reports",
      href: "/dashboard", // Placeholder for now
      icon: BarChart3,
      roles: ["admin", "warden"],
    },
  ];

  // Filter navigation items based on user role
  const filteredNavItems = navigationItems.filter(
    (item) => currentUser && item.roles.includes(currentUser.role)
  );

  const NavLink = ({ item, mobile = false }: { item: typeof navigationItems[0], mobile?: boolean }) => (
    <Link
      to={item.href}
      onClick={mobile ? () => setMobileMenuOpen(false) : undefined}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium",
        "hover:bg-ciet-primary hover:text-white transition-colors",
        "focus:outline-none focus-visible:ring focus-visible:ring-ciet-primary focus-visible:ring-opacity-50"
      )}
    >
      <item.icon className="h-5 w-5" />
      <span>{item.name}</span>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          <div className="flex items-center gap-4">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                <div className="py-4">
                  <div className="px-3 py-2 mb-6">
                    <h2 className="font-bold text-xl text-ciet-primary">CIET Hostel</h2>
                    <p className="text-sm text-gray-500">Gate Pass System</p>
                  </div>
                  <nav className="space-y-1">
                    {filteredNavItems.map((item) => (
                      <NavLink key={item.name} item={item} mobile />
                    ))}
                    <Button
                      variant="ghost"
                      className="flex items-center w-full gap-2 px-3 py-2 text-sm text-left text-red-500 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </Button>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            <Link to="/dashboard" className="font-bold text-xl text-ciet-primary hidden md:block">
              CIET Hostel Gate Pass
            </Link>
            <Link to="/dashboard" className="font-bold text-xl text-ciet-primary md:hidden">
              CIET GatePass
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {currentUser && (
              <div className="text-sm text-right hidden md:block">
                <p className="font-medium">{currentUser.name}</p>
                <p className="text-gray-500">{currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}</p>
              </div>
            )}
            <Button variant="outline" onClick={handleLogout} size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <div className="flex">
        <aside className="hidden md:block w-64 h-[calc(100vh-4rem)] border-r border-gray-200 bg-white p-4">
          <nav className="space-y-1 sticky top-20">
            {filteredNavItems.map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
