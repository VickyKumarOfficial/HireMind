import HRLayout from "@/components/layouts/HRLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, MoreVertical, Users, Calendar, Briefcase, DollarSign, MapPin, Clock } from "lucide-react";
import { useHRAuth } from "@/hooks/use-hr-auth";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  applicants?: number;
  postedDate?: string;
  status: string;
  description?: string;
  responsibilities?: string[];
  requirements?: string[];
  qualifications?: string[];
  salaryMin?: string;
  salaryMax?: string;
  benefits?: string[];
  experienceLevel?: string;
  skills?: string[];
}

const HRJobs = () => {
  useHRAuth();
  
  // State management
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeJobs, setActiveJobs] = useState<Job[]>([
    {
      id: 1,
      title: "Senior React Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      applicants: 45,
      postedDate: "2024-01-15",
      status: "Active",
      description: "We are looking for an experienced React Developer to join our team.",
      responsibilities: ["Develop user interfaces", "Write clean code", "Collaborate with team"],
      requirements: ["5+ years experience", "React expertise", "TypeScript knowledge"],
      qualifications: ["Bachelor's degree in CS", "Strong portfolio"],
      salaryMin: "$120,000",
      salaryMax: "$160,000",
      benefits: ["Health insurance", "401k", "Remote work"],
      experienceLevel: "Senior",
      skills: ["React", "TypeScript", "Node.js"]
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "San Francisco, CA",
      type: "Full-time",
      applicants: 67,
      postedDate: "2024-01-10",
      status: "Active",
      description: "Lead product strategy and development for our core products.",
      responsibilities: ["Define product roadmap", "Lead cross-functional teams"],
      requirements: ["7+ years experience", "Product strategy expertise"],
      salaryMin: "$140,000",
      salaryMax: "$180,000",
      experienceLevel: "Senior"
    },
    {
      id: 3,
      title: "UX Designer",
      department: "Design",
      location: "New York, NY",
      type: "Full-time",
      applicants: 34,
      postedDate: "2024-01-08",
      status: "Active",
      description: "Create beautiful and intuitive user experiences.",
      responsibilities: ["Design user interfaces", "Conduct user research"],
      requirements: ["3+ years experience", "Figma proficiency"],
      salaryMin: "$90,000",
      salaryMax: "$130,000",
      experienceLevel: "Mid-level"
    },
  ]);

  const [draftJobs, setDraftJobs] = useState<Job[]>([
    {
      id: 4,
      title: "Backend Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      status: "Draft",
      description: "Build scalable backend systems.",
      salaryMin: "$110,000",
      salaryMax: "$150,000",
      experienceLevel: "Mid-level"
    },
  ]);

  // Job form state
  const [jobForm, setJobForm] = useState({
    title: "",
    department: "",
    location: "",
    type: "",
    description: "",
    responsibilities: "",
    requirements: "",
    qualifications: "",
    salaryMin: "",
    salaryMax: "",
    benefits: "",
    experienceLevel: "",
    skills: "",
    employmentType: "Full-time",
    workMode: "Remote"
  });

  // Handle form submission
  const handleCreateJob = (asDraft: boolean = false) => {
    // Validation
    if (!jobForm.title || !jobForm.department || !jobForm.location || !jobForm.type) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!jobForm.description) {
      toast.error("Job description is required");
      return;
    }

    // Create new job object
    const newJob: Job = {
      id: activeJobs.length + draftJobs.length + 1,
      title: jobForm.title,
      department: jobForm.department,
      location: jobForm.location,
      type: jobForm.type,
      description: jobForm.description,
      responsibilities: jobForm.responsibilities.split('\n').filter(r => r.trim()),
      requirements: jobForm.requirements.split('\n').filter(r => r.trim()),
      qualifications: jobForm.qualifications.split('\n').filter(q => q.trim()),
      salaryMin: jobForm.salaryMin,
      salaryMax: jobForm.salaryMax,
      benefits: jobForm.benefits.split('\n').filter(b => b.trim()),
      experienceLevel: jobForm.experienceLevel,
      skills: jobForm.skills.split(',').map(s => s.trim()).filter(s => s),
      status: asDraft ? "Draft" : "Active",
      postedDate: asDraft ? undefined : new Date().toISOString().split('T')[0],
      applicants: asDraft ? undefined : 0
    };

    // Add to appropriate list
    if (asDraft) {
      setDraftJobs([...draftJobs, newJob]);
      toast.success("Job saved as draft!");
    } else {
      setActiveJobs([...activeJobs, newJob]);
      toast.success("Job posted successfully!");
    }

    // Reset form and close dialog
    resetForm();
    setIsCreateDialogOpen(false);
  };

  const resetForm = () => {
    setJobForm({
      title: "",
      department: "",
      location: "",
      type: "",
      description: "",
      responsibilities: "",
      requirements: "",
      qualifications: "",
      salaryMin: "",
      salaryMax: "",
      benefits: "",
      experienceLevel: "",
      skills: "",
      employmentType: "Full-time",
      workMode: "Remote"
    });
  };

  // Filter jobs based on search
  const filteredActiveJobs = activeJobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDraftJobs = draftJobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <HRLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Job Postings</h1>
            <p className="text-muted-foreground mt-1">Manage and track all your job openings</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={(open) => {
            setIsCreateDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create New Job
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Job Posting</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new job posting. Required fields are marked with *
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Basic Information Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="job-title">Job Title *</Label>
                      <Input
                        id="job-title"
                        placeholder="e.g., Senior React Developer"
                        value={jobForm.title}
                        onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="department">Department *</Label>
                      <Select value={jobForm.department} onValueChange={(value) => setJobForm({...jobForm, department: value})}>
                        <SelectTrigger id="department">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Engineering">Engineering</SelectItem>
                          <SelectItem value="Product">Product</SelectItem>
                          <SelectItem value="Design">Design</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Sales">Sales</SelectItem>
                          <SelectItem value="HR">Human Resources</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Operations">Operations</SelectItem>
                          <SelectItem value="Customer Success">Customer Success</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience-level">Experience Level *</Label>
                      <Select value={jobForm.experienceLevel} onValueChange={(value) => setJobForm({...jobForm, experienceLevel: value})}>
                        <SelectTrigger id="experience-level">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Entry-level">Entry-level (0-2 years)</SelectItem>
                          <SelectItem value="Mid-level">Mid-level (2-5 years)</SelectItem>
                          <SelectItem value="Senior">Senior (5-8 years)</SelectItem>
                          <SelectItem value="Lead">Lead (8-12 years)</SelectItem>
                          <SelectItem value="Principal">Principal (12+ years)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="employment-type">Employment Type *</Label>
                      <Select value={jobForm.type} onValueChange={(value) => setJobForm({...jobForm, type: value})}>
                        <SelectTrigger id="employment-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                          <SelectItem value="Contract">Contract</SelectItem>
                          <SelectItem value="Temporary">Temporary</SelectItem>
                          <SelectItem value="Internship">Internship</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="work-mode">Work Mode *</Label>
                      <Select value={jobForm.location} onValueChange={(value) => setJobForm({...jobForm, location: value})}>
                        <SelectTrigger id="work-mode">
                          <SelectValue placeholder="Select work mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Remote">Remote</SelectItem>
                          <SelectItem value="On-site">On-site</SelectItem>
                          <SelectItem value="Hybrid">Hybrid</SelectItem>
                          <SelectItem value="New York, NY">New York, NY</SelectItem>
                          <SelectItem value="San Francisco, CA">San Francisco, CA</SelectItem>
                          <SelectItem value="Los Angeles, CA">Los Angeles, CA</SelectItem>
                          <SelectItem value="Chicago, IL">Chicago, IL</SelectItem>
                          <SelectItem value="Austin, TX">Austin, TX</SelectItem>
                          <SelectItem value="Seattle, WA">Seattle, WA</SelectItem>
                          <SelectItem value="Boston, MA">Boston, MA</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Job Description Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Job Description</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Provide a comprehensive overview of the role, team, and company culture..."
                        value={jobForm.description}
                        onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
                        rows={5}
                      />
                      <p className="text-xs text-muted-foreground">
                        Describe what makes this role exciting and unique
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="responsibilities">Key Responsibilities</Label>
                      <Textarea
                        id="responsibilities"
                        placeholder="• Design and develop user-facing features&#10;• Collaborate with cross-functional teams&#10;• Write clean, maintainable code&#10;(One per line)"
                        value={jobForm.responsibilities}
                        onChange={(e) => setJobForm({...jobForm, responsibilities: e.target.value})}
                        rows={5}
                      />
                      <p className="text-xs text-muted-foreground">
                        List main responsibilities (one per line)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="requirements">Requirements</Label>
                      <Textarea
                        id="requirements"
                        placeholder="• 5+ years of professional experience&#10;• Strong proficiency in React and TypeScript&#10;• Experience with modern frontend tools&#10;(One per line)"
                        value={jobForm.requirements}
                        onChange={(e) => setJobForm({...jobForm, requirements: e.target.value})}
                        rows={5}
                      />
                      <p className="text-xs text-muted-foreground">
                        List required qualifications and experience (one per line)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="qualifications">Preferred Qualifications</Label>
                      <Textarea
                        id="qualifications"
                        placeholder="• Bachelor's degree in Computer Science&#10;• Experience with GraphQL&#10;• Open source contributions&#10;(One per line)"
                        value={jobForm.qualifications}
                        onChange={(e) => setJobForm({...jobForm, qualifications: e.target.value})}
                        rows={4}
                      />
                      <p className="text-xs text-muted-foreground">
                        List nice-to-have qualifications (one per line)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="skills">Required Skills</Label>
                      <Input
                        id="skills"
                        placeholder="React, TypeScript, Node.js, Git, AWS (comma-separated)"
                        value={jobForm.skills}
                        onChange={(e) => setJobForm({...jobForm, skills: e.target.value})}
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter skills separated by commas
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Compensation & Benefits Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Compensation & Benefits
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="salary-min">Minimum Salary</Label>
                      <Input
                        id="salary-min"
                        placeholder="e.g., $100,000"
                        value={jobForm.salaryMin}
                        onChange={(e) => setJobForm({...jobForm, salaryMin: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="salary-max">Maximum Salary</Label>
                      <Input
                        id="salary-max"
                        placeholder="e.g., $150,000"
                        value={jobForm.salaryMax}
                        onChange={(e) => setJobForm({...jobForm, salaryMax: e.target.value})}
                      />
                    </div>

                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="benefits">Benefits & Perks</Label>
                      <Textarea
                        id="benefits"
                        placeholder="• Health, dental, and vision insurance&#10;• 401(k) with company match&#10;• Flexible PTO&#10;• Remote work options&#10;(One per line)"
                        value={jobForm.benefits}
                        onChange={(e) => setJobForm({...jobForm, benefits: e.target.value})}
                        rows={5}
                      />
                      <p className="text-xs text-muted-foreground">
                        List benefits and perks (one per line)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button 
                    onClick={() => handleCreateJob(false)} 
                    className="flex-1"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Publish Job
                  </Button>
                  <Button 
                    onClick={() => handleCreateJob(true)} 
                    variant="outline"
                    className="flex-1"
                  >
                    Save as Draft
                  </Button>
                  <Button 
                    onClick={() => {
                      setIsCreateDialogOpen(false);
                      resetForm();
                    }} 
                    variant="ghost"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search jobs by title, department, or location..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList>
            <TabsTrigger value="active">Active ({filteredActiveJobs.length})</TabsTrigger>
            <TabsTrigger value="draft">Draft ({filteredDraftJobs.length})</TabsTrigger>
            <TabsTrigger value="closed">Closed (0)</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6">
            <div className="grid gap-4">
              {filteredActiveJobs.length === 0 ? (
                <div className="text-center py-12">
                  <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No active jobs found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery ? "Try a different search term" : "Create your first job posting to get started"}
                  </p>
                </div>
              ) : (
                filteredActiveJobs.map((job) => (
                  <Card key={job.id} className="p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold">{job.title}</h3>
                          <Badge>{job.status}</Badge>
                          {job.experienceLevel && (
                            <Badge variant="outline">{job.experienceLevel}</Badge>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3" />
                            {job.department}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {job.location}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {job.type}
                          </span>
                          {job.salaryMin && job.salaryMax && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />
                                {job.salaryMin} - {job.salaryMax}
                              </span>
                            </>
                          )}
                        </div>

                        {job.description && (
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {job.description}
                          </p>
                        )}

                        {job.skills && job.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {job.skills.slice(0, 5).map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {job.skills.length > 5 && (
                              <Badge variant="secondary" className="text-xs">
                                +{job.skills.length - 5} more
                              </Badge>
                            )}
                          </div>
                        )}

                        <div className="flex gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{job.applicants} applicants</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Posted {job.postedDate ? new Date(job.postedDate).toLocaleDateString() : 'Recently'}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline">View Applicants</Button>
                        <Button variant="outline">Edit</Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="draft" className="mt-6">
            <div className="grid gap-4">
              {filteredDraftJobs.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  {searchQuery ? "No draft jobs match your search" : "No draft job postings"}
                </div>
              ) : (
                filteredDraftJobs.map((job) => (
                  <Card key={job.id} className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold">{job.title}</h3>
                          <Badge variant="secondary">{job.status}</Badge>
                          {job.experienceLevel && (
                            <Badge variant="outline">{job.experienceLevel}</Badge>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3" />
                            {job.department}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {job.location}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {job.type}
                          </span>
                          {job.salaryMin && job.salaryMax && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />
                                {job.salaryMin} - {job.salaryMax}
                              </span>
                            </>
                          )}
                        </div>

                        {job.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {job.description}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button>Publish</Button>
                        <Button variant="outline">Edit</Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="closed" className="mt-6">
            <div className="text-center py-12 text-muted-foreground">
              No closed job postings
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </HRLayout>
  );
};

export default HRJobs;
