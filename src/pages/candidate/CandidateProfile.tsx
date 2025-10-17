import CandidateLayout from "@/components/layouts/CandidateLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Plus, X } from "lucide-react";

const CandidateProfile = () => {
  const skills = ["React", "TypeScript", "Node.js", "TailwindCSS", "Git"];
  
  return (
    <CandidateLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your profile and resume</p>
        </div>

        <div className="grid gap-6">
          {/* Resume Upload */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Resume</h2>
            <div className="flex items-center gap-4">
              <div className="flex-1 p-4 border-2 border-dashed rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium">Current Resume.pdf</p>
                    <p className="text-sm text-muted-foreground">Uploaded 2 weeks ago</p>
                  </div>
                </div>
              </div>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Update Resume
              </Button>
            </div>
            <Button variant="outline" className="mt-4">
              AI Resume Optimizer
            </Button>
          </Card>

          {/* Personal Information */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" defaultValue="John Doe" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue="+1 234 567 8900" />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" defaultValue="San Francisco, CA" />
              </div>
            </div>
          </Card>

          {/* Professional Summary */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Professional Summary</h2>
            <Textarea 
              placeholder="Write a brief summary of your experience and career goals..."
              rows={5}
              defaultValue="Experienced React developer with 5+ years of building scalable web applications..."
            />
          </Card>

          {/* Skills */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Skills</h2>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Skill
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                  {skill}
                  <button className="ml-2 hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </Card>

          {/* Experience */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Work Experience</h2>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold">Senior Frontend Developer</h3>
                <p className="text-sm text-muted-foreground">Tech Company • 2020 - Present</p>
                <p className="text-sm mt-2">Leading frontend development for enterprise web applications...</p>
              </div>
            </div>
          </Card>

          {/* Education */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Education</h2>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Education
              </Button>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold">Bachelor of Science in Computer Science</h3>
                <p className="text-sm text-muted-foreground">University Name • 2016 - 2020</p>
              </div>
            </div>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
    </CandidateLayout>
  );
};

export default CandidateProfile;
