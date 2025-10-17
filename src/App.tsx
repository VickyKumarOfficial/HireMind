import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import HRLogin from "./pages/hr/HRLogin";
import HRDashboard from "./pages/hr/HRDashboard";
import HRJobs from "./pages/hr/HRJobs";
import HRCandidates from "./pages/hr/HRCandidates";
import HRAnalytics from "./pages/hr/HRAnalytics";
import HRCommunications from "./pages/hr/HRCommunications";
import CandidateLogin from "./pages/candidate/CandidateLogin";
import CandidateDashboard from "./pages/candidate/CandidateDashboard";
import CandidateJobs from "./pages/candidate/CandidateJobs";
import CandidateApplications from "./pages/candidate/CandidateApplications";
import CandidateProfile from "./pages/candidate/CandidateProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/hr/login" element={<HRLogin />} />
          <Route path="/hr/dashboard" element={<HRDashboard />} />
          <Route path="/hr/jobs" element={<HRJobs />} />
          <Route path="/hr/candidates" element={<HRCandidates />} />
          <Route path="/hr/communications" element={<HRCommunications />} />
          <Route path="/hr/analytics" element={<HRAnalytics />} />
          <Route path="/candidate/login" element={<CandidateLogin />} />
          <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
          <Route path="/candidate/jobs" element={<CandidateJobs />} />
          <Route path="/candidate/applications" element={<CandidateApplications />} />
          <Route path="/candidate/profile" element={<CandidateProfile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
