import { Brain, Home, Briefcase, User, FileText, LogOut, Target } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

interface CandidateLayoutProps {
  children: React.ReactNode;
}

const CandidateLayout = ({ children }: CandidateLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation */}
      <nav className="border-b bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">HireMind</span>
            </div>
            
            <div className="hidden md:flex items-center gap-1">
              <NavLink to="/candidate/dashboard">
                {({ isActive }) => (
                  <Button variant={isActive ? "secondary" : "ghost"} size="sm">
                    <Home className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                )}
              </NavLink>
              <NavLink to="/candidate/jobs">
                {({ isActive }) => (
                  <Button variant={isActive ? "secondary" : "ghost"} size="sm">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Jobs
                  </Button>
                )}
              </NavLink>
              <NavLink to="/candidate/applications">
                {({ isActive }) => (
                  <Button variant={isActive ? "secondary" : "ghost"} size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Applications
                  </Button>
                )}
              </NavLink>
              <NavLink to="/candidate/profile">
                {({ isActive }) => (
                  <Button variant={isActive ? "secondary" : "ghost"} size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                )}
              </NavLink>
              <NavLink to="/candidate/profile-matching">
                {({ isActive }) => (
                  <Button variant={isActive ? "secondary" : "ghost"} size="sm">
                    <Target className="h-4 w-4 mr-2" />
                    AI Matching
                  </Button>
                )}
              </NavLink>
            </div>

            <NavLink to="/">
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CandidateLayout;
