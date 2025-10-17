import HRLayout from "@/components/layouts/HRLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Upload, Mail, Star } from "lucide-react";

const HRCandidates = () => {
  const candidates = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      position: "Senior React Developer",
      aiScore: 95,
      status: "Interview Scheduled",
      skills: ["React", "TypeScript", "Node.js"],
      experience: "7 years",
      appliedDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@email.com",
      position: "Product Manager",
      aiScore: 92,
      status: "Under Review",
      skills: ["Product Strategy", "Agile", "Analytics"],
      experience: "5 years",
      appliedDate: "2024-01-14"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.r@email.com",
      position: "UX Designer",
      aiScore: 88,
      status: "Shortlisted",
      skills: ["Figma", "User Research", "Prototyping"],
      experience: "4 years",
      appliedDate: "2024-01-12"
    },
    {
      id: 4,
      name: "James Wilson",
      email: "james.w@email.com",
      position: "Senior React Developer",
      aiScore: 85,
      status: "New",
      skills: ["React", "JavaScript", "CSS"],
      experience: "6 years",
      appliedDate: "2024-01-10"
    },
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Interview Scheduled":
        return "secondary";
      case "Shortlisted":
        return "default";
      case "Under Review":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <HRLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Candidates</h1>
            <p className="text-muted-foreground mt-1">AI-ranked candidates across all job postings</p>
          </div>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Bulk Upload Resumes
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search candidates by name, position, or skills..." 
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-4">
          {candidates.map((candidate) => (
            <Card key={candidate.id} className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>{getInitials(candidate.name)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold">{candidate.name}</h3>
                        <Badge variant={getStatusColor(candidate.status) as any}>
                          {candidate.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{candidate.email}</p>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-primary mb-1">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-lg font-bold">{candidate.aiScore}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">AI Match Score</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm">
                      <span className="font-medium">Applied for:</span> {candidate.position}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {candidate.experience} experience • Applied {new Date(candidate.appliedDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {candidate.skills.map((skill, index) => (
                      <Badge key={index} variant="outline">{skill}</Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="default" size="sm">View Profile</Button>
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                    <Button variant="outline" size="sm">Schedule Interview</Button>
                    <Button variant="ghost" size="sm">Reject</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </HRLayout>
  );
};

export default HRCandidates;
