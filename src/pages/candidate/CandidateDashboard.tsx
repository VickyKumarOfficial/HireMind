import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import CandidateLayout from "@/components/layouts/CandidateLayout";
import { Briefcase, FileText, TrendingUp, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CandidateDashboard = () => {
  const stats = [
    { label: "Jobs Applied", value: "15", icon: Briefcase },
    { label: "Profile Views", value: "42", icon: TrendingUp },
    { label: "Interviews", value: "3", icon: Calendar },
    { label: "Resume Score", value: "85%", icon: FileText },
  ];

  const recommendedJobs = [
    { id: 1, title: "Senior React Developer", company: "TechCorp Inc.", location: "Remote", match: 95 },
    { id: 2, title: "Frontend Engineer", company: "StartupXYZ", location: "San Francisco", match: 88 },
    { id: 3, title: "Full Stack Developer", company: "InnovateLabs", location: "New York", match: 82 },
  ];

  const recentApplications = [
    { id: 1, title: "React Developer", company: "TechCorp", status: "Under Review", date: "2 days ago" },
    { id: 2, title: "Frontend Engineer", company: "WebFlow", status: "Interview Scheduled", date: "5 days ago" },
    { id: 3, title: "UI Developer", company: "DesignCo", status: "Applied", date: "1 week ago" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Interview Scheduled":
        return "bg-success";
      case "Under Review":
        return "bg-warning";
      default:
        return "bg-muted";
    }
  };

  return (
    <CandidateLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Welcome back, John!</h1>
          <p className="text-muted-foreground mt-1">Here are your personalized job recommendations</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recommended Jobs */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Recommended for You</h2>
                <Link to="/candidate/jobs">
                  <Button variant="ghost" size="sm">
                    View All Jobs <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {recommendedJobs.map((job) => (
                  <div key={job.id} className="p-4 border rounded-lg hover:border-primary transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <p className="text-muted-foreground">{job.company} • {job.location}</p>
                      </div>
                      <Badge variant="secondary">{job.match}% Match</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Match Score</span>
                        <span className="font-medium">{job.match}%</span>
                      </div>
                      <Progress value={job.match} className="h-2" />
                    </div>
                    <Button className="w-full mt-4">Apply Now</Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Recent Applications */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Recent Applications</h2>
              <Link to="/candidate/applications">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
            <div className="space-y-4">
              {recentApplications.map((app) => (
                <div key={app.id} className="pb-4 border-b last:border-0">
                  <h3 className="font-medium">{app.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{app.company}</p>
                  <div className="flex justify-between items-center">
                    <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                    <span className="text-xs text-muted-foreground">{app.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </CandidateLayout>
  );
};

export default CandidateDashboard;
