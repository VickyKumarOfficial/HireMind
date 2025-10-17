import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface HRAuthData {
  email: string;
  companyId: string;
  employeeId: string;
  departmentCode: string;
  loginTime: string;
}

export const useHRAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hrAuth = sessionStorage.getItem("hrAuth");
    
    if (!hrAuth) {
      toast.error("Unauthorized access. Please login with valid HR credentials.");
      navigate("/hr/login");
      return;
    }

    try {
      const authData: HRAuthData = JSON.parse(hrAuth);
      
      // Verify required fields exist
      if (!authData.email || !authData.companyId || !authData.employeeId || !authData.departmentCode) {
        toast.error("Invalid authentication data. Please login again.");
        sessionStorage.removeItem("hrAuth");
        navigate("/hr/login");
        return;
      }

      // Check if session is expired (e.g., 8 hours)
      const loginTime = new Date(authData.loginTime);
      const currentTime = new Date();
      const hoursSinceLogin = (currentTime.getTime() - loginTime.getTime()) / (1000 * 60 * 60);
      
      if (hoursSinceLogin > 8) {
        toast.error("Session expired. Please login again.");
        sessionStorage.removeItem("hrAuth");
        navigate("/hr/login");
        return;
      }

    } catch (error) {
      toast.error("Authentication error. Please login again.");
      sessionStorage.removeItem("hrAuth");
      navigate("/hr/login");
    }
  }, [navigate]);

  const getHRAuthData = (): HRAuthData | null => {
    const hrAuth = sessionStorage.getItem("hrAuth");
    if (!hrAuth) return null;
    try {
      return JSON.parse(hrAuth);
    } catch {
      return null;
    }
  };

  const logout = () => {
    sessionStorage.removeItem("hrAuth");
    toast.success("Logged out successfully");
    navigate("/hr/login");
  };

  return { getHRAuthData, logout };
};
