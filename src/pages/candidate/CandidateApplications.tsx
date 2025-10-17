import CandidateLayout from "@/components/layouts/CandidateLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Calendar, Building } from "lucide-react";

const CandidateApplications = () => {
  const applications = [
    {
      id: 1,
      jobTitle: "Senior React Developer",
      company: "Tech Corp",
      appliedDate: "2024-01-15",
      status: "Under Review",
      statusColor: "default"
    },
    {
      id: 2,
      jobTitle: "Frontend Engineer",
      company: "StartupXYZ",
      appliedDate: "2024-01-10",
      status: "Interview Scheduled",
      statusColor: "secondary",
      interviewDate: "2024-01-20"
    },
    {
      id: 3,
      jobTitle: "Full Stack Developer",
      company: "Innovation Labs",
      appliedDate: "2024-01-05",
      status: "Shortlisted",
      statusColor: "secondary"
    },
  ];

  const rejectedApplications = [
    {
      id: 4,
      jobTitle: "React Native Developer",
      company: "Mobile First Inc",
      appliedDate: "2023-12-20",
      status: "Not Selected",
      statusColor: "destructive"
    },
  ];

  return (
    <CandidateLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Applications</h1>
          <p className="text-muted-foreground">Track your job applications and interview status</p>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList>
            <TabsTrigger value="active">Active Applications ({applications.length})</TabsTrigger>
            <TabsTrigger value="archived">Archived ({rejectedApplications.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6">
            <div className="grid gap-4">
              {applications.map((app) => (
                <Card key={app.id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{app.jobTitle}</h3>
                        <Badge variant={app.statusColor as any}>{app.status}</Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          {app.company}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Applied: {new Date(app.appliedDate).toLocaleDateString()}
                        </div>
                      </div>

                      {app.interviewDate && (
                        <div className="bg-secondary/20 p-3 rounded-md mb-4">
                          <p className="text-sm font-medium">
                            Interview scheduled for {new Date(app.interviewDate).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="ghost" size="sm">Withdraw</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="archived" className="mt-6">
            <div className="grid gap-4">
              {rejectedApplications.map((app) => (
                <Card key={app.id} className="p-6 opacity-75">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{app.jobTitle}</h3>
                        <Badge variant={app.statusColor as any}>{app.status}</Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          {app.company}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Applied: {new Date(app.appliedDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </CandidateLayout>
  );
};

export default CandidateApplications;
