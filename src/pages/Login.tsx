
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, currentUser } = useData();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already logged in
  if (currentUser) {
    navigate("/dashboard");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const success = login(email, password);
      setIsLoading(false);

      if (success) {
        navigate("/dashboard");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
    }, 1000); // Simulated delay for login process
  };

  // Sample login details
  const loginInfo = [
    { role: "Student", email: "arun@ciet.edu", password: "password" },
    { role: "Student", email: "priya@ciet.edu", password: "password" },
    { role: "Warden", email: "rajesh@ciet.edu", password: "password" },
    { role: "Warden", email: "meena@ciet.edu", password: "password" },
    { role: "Admin", email: "admin@ciet.edu", password: "password" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-ciet-dark">CIET Hostel</h1>
          <h2 className="text-xl font-semibold text-ciet-primary">Gate Pass Management System</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the gate pass system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@ciet.edu"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-ciet-primary hover:bg-ciet-secondary" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-sm text-muted-foreground mt-4">
              <p className="font-semibold mb-1">For testing purposes:</p>
              <div className="bg-muted p-2 rounded text-xs">
                {loginInfo.map((info, index) => (
                  <div key={index} className="mb-1">
                    <strong>{info.role}:</strong> {info.email} / {info.password}
                  </div>
                ))}
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
