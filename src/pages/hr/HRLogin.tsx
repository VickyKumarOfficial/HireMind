import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const HRLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [departmentCode, setDepartmentCode] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields are filled
    if (!email || !password || !companyId || !employeeId || !departmentCode) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Validate Company ID format (e.g., COMP-XXXX)
    const companyIdRegex = /^[A-Z]{2,4}-\d{4,6}$/;
    if (!companyIdRegex.test(companyId)) {
      toast.error("Invalid Company ID format. Expected format: COMP-XXXX");
      return;
    }

    // Validate Employee ID format (e.g., EMP-XXXX or numeric)
    const employeeIdRegex = /^(EMP-\d{4,6}|\d{4,8})$/;
    if (!employeeIdRegex.test(employeeId)) {
      toast.error("Invalid Employee ID format. Expected format: EMP-XXXX or numeric ID");
      return;
    }

    // Validate Department Code format (e.g., HR-XXX)
    const deptCodeRegex = /^[A-Z]{2,4}-\d{2,4}$/;
    if (!deptCodeRegex.test(departmentCode)) {
      toast.error("Invalid Department Code format. Expected format: HR-XXX");
      return;
    }

    // Additional validation: Check if department code starts with HR
    if (!departmentCode.startsWith("HR-")) {
      toast.error("Access denied. Only HR department personnel are allowed");
      return;
    }

    // If all validations pass
    toast.success("Login successful! Welcome to HR Portal");
    
    // Store HR credentials (in a real app, this would be validated against a backend)
    sessionStorage.setItem("hrAuth", JSON.stringify({
      email,
      companyId,
      employeeId,
      departmentCode,
      loginTime: new Date().toISOString()
    }));
    
    navigate("/hr/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">HireMind</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">HR Portal</h1>
          <p className="text-muted-foreground">Sign in to manage your recruitment</p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Corporate Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="hr@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="border-t pt-4 mt-4">
              <p className="text-sm font-medium text-muted-foreground mb-3">
                Company Verification Details
              </p>
              
              <div className="space-y-2">
                <Label htmlFor="companyId">Company ID *</Label>
                <Input
                  id="companyId"
                  type="text"
                  placeholder="e.g., COMP-1234"
                  value={companyId}
                  onChange={(e) => setCompanyId(e.target.value.toUpperCase())}
                  required
                />
                <p className="text-xs text-muted-foreground">Format: COMP-XXXX</p>
              </div>

              <div className="space-y-2 mt-3">
                <Label htmlFor="employeeId">HR Employee ID *</Label>
                <Input
                  id="employeeId"
                  type="text"
                  placeholder="e.g., EMP-5678"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value.toUpperCase())}
                  required
                />
                <p className="text-xs text-muted-foreground">Format: EMP-XXXX or numeric</p>
              </div>

              <div className="space-y-2 mt-3">
                <Label htmlFor="departmentCode">Department Authorization Code *</Label>
                <Input
                  id="departmentCode"
                  type="text"
                  placeholder="e.g., HR-101"
                  value={departmentCode}
                  onChange={(e) => setDepartmentCode(e.target.value.toUpperCase())}
                  required
                />
                <p className="text-xs text-muted-foreground">Format: HR-XXX (HR personnel only)</p>
              </div>
            </div>

            <Button type="submit" className="w-full mt-6">
              Sign In Securely
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              Looking for jobs?{" "}
              <Link to="/candidate/login" className="text-primary hover:underline">
                Candidate Portal
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HRLogin;
