import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import HRLayout from "@/components/layouts/HRLayout";
import { Briefcase, Users, TrendingUp, Clock, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useHRAuth } from "@/hooks/use-hr-auth";

const HRDashboard = () => {
  // Authentication check
  useHRAuth();
  const stats = [
    { label: "Active Jobs", value: "12", icon: Briefcase, color: "text-primary" },
    { label: "Total Applicants", value: "347", icon: Users, color: "text-secondary" },
    { label: "Shortlisted", value: "89", icon: TrendingUp, color: "text-success" },
    { label: "Avg. Time to Hire", value: "18 days", icon: Clock, color: "text-warning" },
  ];

  const recentJobs = [
    { id: 1, title: "Senior React Developer", applicants: 45, status: "Active", postedDate: "2 days ago" },
    { id: 2, title: "Product Manager", applicants: 67, status: "Active", postedDate: "5 days ago" },
    { id: 3, title: "UX Designer", applicants: 34, status: "Active", postedDate: "1 week ago" },
  ];

  const topCandidates = [
    { id: 1, name: "Sarah Johnson", position: "Senior React Developer", score: 95, status: "Interview Scheduled" },
    { id: 2, name: "Michael Chen", position: "Product Manager", score: 92, status: "Under Review" },
    { id: 3, name: "Emily Rodriguez", position: "UX Designer", score: 88, status: "Shortlisted" },
  ];

  return (
    <HRLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back! Here's your recruitment overview.</p>
          </div>
          <Link to="/hr/jobs">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </Button>
          </Link>
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
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Jobs */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Job Posts</h2>
              <Link to="/hr/jobs">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div key={job.id} className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                  <div>
                    <h3 className="font-medium">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">{job.applicants} applicants • {job.postedDate}</p>
                  </div>
                  <Badge>{job.status}</Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Candidates */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Top Candidates (AI Ranked)</h2>
              <Link to="/hr/candidates">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
            <div className="space-y-4">
              {topCandidates.map((candidate) => (
                <div key={candidate.id} className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                  <div>
                    <h3 className="font-medium">{candidate.name}</h3>
                    <p className="text-sm text-muted-foreground">{candidate.position}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-success">{candidate.score}%</div>
                    <p className="text-xs text-muted-foreground">{candidate.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </HRLayout>
  );
};

export default HRDashboard;
