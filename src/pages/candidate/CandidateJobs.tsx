import CandidateLayout from "@/components/layouts/CandidateLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Briefcase, Clock, TrendingUp } from "lucide-react";

const CandidateJobs = () => {
  const jobs = [
    { 
      id: 1, 
      title: "Senior React Developer", 
      company: "Tech Corp", 
      location: "Remote", 
      type: "Full-time",
      matchScore: 95,
      postedDate: "2 days ago",
      salary: "$120k - $150k"
    },
    { 
      id: 2, 
      title: "Frontend Engineer", 
      company: "StartupXYZ", 
      location: "San Francisco, CA", 
      type: "Full-time",
      matchScore: 88,
      postedDate: "5 days ago",
      salary: "$100k - $130k"
    },
    { 
      id: 3, 
      title: "Full Stack Developer", 
      company: "Innovation Labs", 
      location: "New York, NY", 
      type: "Contract",
      matchScore: 82,
      postedDate: "1 week ago",
      salary: "$90k - $120k"
    },
    { 
      id: 4, 
      title: "React Native Developer", 
      company: "Mobile First Inc", 
      location: "Austin, TX", 
      type: "Full-time",
      matchScore: 79,
      postedDate: "1 week ago",
      salary: "$110k - $140k"
    },
  ];

  return (
    <CandidateLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Job Recommendations</h1>
          <p className="text-muted-foreground">AI-powered job matches based on your profile</p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search jobs by title, company, or keyword..." 
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-4">
          {jobs.map((job) => (
            <Card key={job.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {job.matchScore}% Match
                    </Badge>
                  </div>
                  <p className="text-lg text-muted-foreground mb-3">{job.company}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {job.postedDate}
                    </div>
                  </div>
                  
                  <p className="text-sm font-medium mt-2">{job.salary}</p>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button>Apply Now</Button>
                  <Button variant="outline">View Details</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </CandidateLayout>
  );
};

export default CandidateJobs;
