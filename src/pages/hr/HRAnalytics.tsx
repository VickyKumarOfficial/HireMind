import HRLayout from "@/components/layouts/HRLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Users, Clock, Target, Briefcase, CheckCircle } from "lucide-react";

const HRAnalytics = () => {
  const stats = [
    { label: "Total Applicants", value: "347", change: "+12%", icon: Users },
    { label: "Avg. Time to Hire", value: "18 days", change: "-3 days", icon: Clock },
    { label: "Active Jobs", value: "12", change: "+2", icon: Briefcase },
    { label: "Hired This Month", value: "8", change: "+2", icon: CheckCircle },
  ];

  const topSources = [
    { source: "LinkedIn", applicants: 145, percentage: 42 },
    { source: "Indeed", applicants: 98, percentage: 28 },
    { source: "Company Website", applicants: 67, percentage: 19 },
    { source: "Referrals", applicants: 37, percentage: 11 },
  ];

  const hiringFunnel = [
    { stage: "Applied", count: 347, percentage: 100 },
    { stage: "Screened", count: 156, percentage: 45 },
    { stage: "Interview", count: 89, percentage: 26 },
    { stage: "Offered", count: 23, percentage: 7 },
    { stage: "Hired", count: 18, percentage: 5 },
  ];

  return (
    <HRLayout>
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Analytics & Insights</h1>
          <p className="text-muted-foreground mt-1">Track your recruitment performance and metrics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="h-8 w-8 text-primary" />
                <span className="text-sm text-success font-medium">{stat.change}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sources">Source Analysis</TabsTrigger>
            <TabsTrigger value="funnel">Hiring Funnel</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Applications Over Time</h2>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Chart visualization would go here
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Time to Hire Trend</h2>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Chart visualization would go here
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sources" className="mt-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Top Application Sources</h2>
              <div className="space-y-4">
                {topSources.map((source, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{source.source}</span>
                      <span className="text-sm text-muted-foreground">
                        {source.applicants} applicants ({source.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="funnel" className="mt-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Hiring Funnel Analysis</h2>
              <div className="space-y-4">
                {hiringFunnel.map((stage, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{stage.stage}</span>
                      <span className="text-sm text-muted-foreground">
                        {stage.count} candidates ({stage.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all"
                        style={{ width: `${stage.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </HRLayout>
  );
};

export default HRAnalytics;
