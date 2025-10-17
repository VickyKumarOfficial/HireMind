import { useState } from "react";
import HRLayout from "@/components/layouts/HRLayout";
import { useHRAuth } from "@/hooks/use-hr-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Plus, 
  Search, 
  FileText, 
  Clock, 
  Edit, 
  Trash2,
  Eye,
  Send,
  Copy
} from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface EmailTemplate {
  id: number;
  name: string;
  subject: string;
  body: string;
  variables: string[];
  category: string;
  createdAt: string;
  lastModified: string;
}

interface SentEmail {
  id: number;
  to: string[];
  subject: string;
  body: string;
  template: string;
  job: string;
  sentAt: string;
  status: "sent" | "failed" | "pending";
}

interface Candidate {
  id: number;
  name: string;
  email: string;
  position: string;
  skills: string[];
}

const HRCommunications = () => {
  useHRAuth();

  // Template Management State
  const [templates, setTemplates] = useState<EmailTemplate[]>([
    {
      id: 1,
      name: "Interview Invitation",
      subject: "Interview Invitation for {job_title} at {company_name}",
      body: `Dear {candidate_name},

We are pleased to invite you for an interview for the {job_title} position at {company_name}.

Your skills in {matched_skills} have impressed our team, and we would like to discuss this opportunity with you further.

Interview Details:
- Date: {interview_date}
- Time: {interview_time}
- Location: {interview_location}

Please confirm your availability at your earliest convenience.

Best regards,
{hr_name}
HR Department`,
      variables: ["candidate_name", "job_title", "company_name", "matched_skills", "interview_date", "interview_time", "interview_location", "hr_name"],
      category: "Interview",
      createdAt: "2024-01-15",
      lastModified: "2024-01-20"
    },
    {
      id: 2,
      name: "Application Received",
      subject: "Application Received - {job_title}",
      body: `Dear {candidate_name},

Thank you for applying for the {job_title} position at {company_name}.

We have received your application and our team is currently reviewing it. We were particularly interested in your experience with {matched_skills}.

We will contact you within {response_time} with an update on your application status.

Best regards,
{hr_name}
HR Department`,
      variables: ["candidate_name", "job_title", "company_name", "matched_skills", "response_time", "hr_name"],
      category: "Acknowledgment",
      createdAt: "2024-01-10",
      lastModified: "2024-01-15"
    },
    {
      id: 3,
      name: "Offer Letter",
      subject: "Job Offer - {job_title} at {company_name}",
      body: `Dear {candidate_name},

Congratulations! We are delighted to offer you the position of {job_title} at {company_name}.

Position Details:
- Start Date: {start_date}
- Salary: {salary}
- Benefits: {benefits}

Your skills in {matched_skills} make you an excellent fit for our team.

Please review the attached offer letter and respond by {response_deadline}.

We look forward to welcoming you to our team!

Best regards,
{hr_name}
HR Department`,
      variables: ["candidate_name", "job_title", "company_name", "start_date", "salary", "benefits", "matched_skills", "response_deadline", "hr_name"],
      category: "Offer",
      createdAt: "2024-01-05",
      lastModified: "2024-01-18"
    },
    {
      id: 4,
      name: "Rejection - Not a Fit",
      subject: "Application Status Update - {job_title}",
      body: `Dear {candidate_name},

Thank you for your interest in the {job_title} position at {company_name} and for taking the time to apply.

After careful consideration, we have decided to move forward with other candidates whose qualifications more closely match our current needs.

We appreciate your interest in {company_name} and encourage you to apply for future opportunities that match your skills in {matched_skills}.

Best wishes for your job search.

Best regards,
{hr_name}
HR Department`,
      variables: ["candidate_name", "job_title", "company_name", "matched_skills", "hr_name"],
      category: "Rejection",
      createdAt: "2024-01-12",
      lastModified: "2024-01-12"
    }
  ]);

  const [sentEmails, setSentEmails] = useState<SentEmail[]>([
    {
      id: 1,
      to: ["sarah.j@email.com"],
      subject: "Interview Invitation for Senior React Developer at HireMind",
      body: "Dear Sarah Johnson,\n\nWe are pleased to invite you for an interview...",
      template: "Interview Invitation",
      job: "Senior React Developer",
      sentAt: "2024-01-20T10:30:00",
      status: "sent"
    },
    {
      id: 2,
      to: ["michael.c@email.com", "emily.r@email.com"],
      subject: "Application Received - Product Manager",
      body: "Dear Candidate,\n\nThank you for applying...",
      template: "Application Received",
      job: "Product Manager",
      sentAt: "2024-01-19T14:15:00",
      status: "sent"
    },
    {
      id: 3,
      to: ["john.doe@email.com"],
      subject: "Job Offer - UX Designer at HireMind",
      body: "Dear John Doe,\n\nCongratulations! We are delighted to offer you...",
      template: "Offer Letter",
      job: "UX Designer",
      sentAt: "2024-01-18T09:00:00",
      status: "sent"
    }
  ]);

  // Available candidates (mock data)
  const [availableCandidates] = useState<Candidate[]>([
    { id: 1, name: "Sarah Johnson", email: "sarah.j@email.com", position: "Senior React Developer", skills: ["React", "TypeScript", "Node.js"] },
    { id: 2, name: "Michael Chen", email: "michael.c@email.com", position: "Product Manager", skills: ["Product Strategy", "Agile", "Analytics"] },
    { id: 3, name: "Emily Rodriguez", email: "emily.r@email.com", position: "UX Designer", skills: ["Figma", "User Research", "Prototyping"] },
    { id: 4, name: "David Kim", email: "david.k@email.com", position: "Backend Developer", skills: ["Java", "Spring Boot", "PostgreSQL"] },
    { id: 5, name: "Lisa Wang", email: "lisa.w@email.com", position: "Frontend Developer", skills: ["Vue.js", "CSS", "JavaScript"] }
  ]);

  const [availableJobs] = useState([
    { id: 1, title: "Senior React Developer", department: "Engineering" },
    { id: 2, title: "Product Manager", department: "Product" },
    { id: 3, title: "UX Designer", department: "Design" },
    { id: 4, title: "Backend Developer", department: "Engineering" },
    { id: 5, title: "Frontend Developer", department: "Engineering" }
  ]);

  // Dialog states
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [isComposeDialogOpen, setIsComposeDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);

  // Template form state
  const [templateForm, setTemplateForm] = useState({
    name: "",
    subject: "",
    body: "",
    category: "General"
  });

  // Compose email state
  const [composeForm, setComposeForm] = useState({
    job: "",
    candidates: [] as number[],
    template: "",
    customSubject: "",
    customBody: "",
    editBeforeSend: false
  });

  const [previewEmail, setPreviewEmail] = useState({ subject: "", body: "" });
  const [searchTemplate, setSearchTemplate] = useState("");
  const [searchEmail, setSearchEmail] = useState("");

  // Template Management Functions
  const handleCreateTemplate = () => {
    if (!templateForm.name || !templateForm.subject || !templateForm.body) {
      toast.error("Please fill in all required fields");
      return;
    }

    const variables = extractVariables(templateForm.body + " " + templateForm.subject);
    const newTemplate: EmailTemplate = {
      id: templates.length + 1,
      name: templateForm.name,
      subject: templateForm.subject,
      body: templateForm.body,
      variables,
      category: templateForm.category,
      createdAt: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };

    setTemplates([...templates, newTemplate]);
    setTemplateForm({ name: "", subject: "", body: "", category: "General" });
    setIsTemplateDialogOpen(false);
    toast.success("Template created successfully!");
  };

  const handleEditTemplate = (template: EmailTemplate) => {
    setEditingTemplate(template);
    setTemplateForm({
      name: template.name,
      subject: template.subject,
      body: template.body,
      category: template.category
    });
    setIsTemplateDialogOpen(true);
  };

  const handleUpdateTemplate = () => {
    if (!editingTemplate) return;

    const variables = extractVariables(templateForm.body + " " + templateForm.subject);
    const updatedTemplates = templates.map(t => 
      t.id === editingTemplate.id 
        ? {
            ...t,
            name: templateForm.name,
            subject: templateForm.subject,
            body: templateForm.body,
            category: templateForm.category,
            variables,
            lastModified: new Date().toISOString().split('T')[0]
          }
        : t
    );

    setTemplates(updatedTemplates);
    setEditingTemplate(null);
    setTemplateForm({ name: "", subject: "", body: "", category: "General" });
    setIsTemplateDialogOpen(false);
    toast.success("Template updated successfully!");
  };

  const handleDeleteTemplate = (id: number) => {
    setTemplates(templates.filter(t => t.id !== id));
    toast.success("Template deleted successfully!");
  };

  const handleDuplicateTemplate = (template: EmailTemplate) => {
    const newTemplate: EmailTemplate = {
      ...template,
      id: templates.length + 1,
      name: `${template.name} (Copy)`,
      createdAt: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };
    setTemplates([...templates, newTemplate]);
    toast.success("Template duplicated successfully!");
  };

  const extractVariables = (text: string): string[] => {
    const matches = text.match(/\{([^}]+)\}/g);
    if (!matches) return [];
    return [...new Set(matches.map(m => m.slice(1, -1)))];
  };

  // Compose Email Functions
  const handlePreviewEmail = () => {
    if (!composeForm.job || composeForm.candidates.length === 0 || !composeForm.template) {
      toast.error("Please select job, candidates, and template");
      return;
    }

    const template = templates.find(t => t.name === composeForm.template);
    const job = availableJobs.find(j => j.title === composeForm.job);
    const candidate = availableCandidates.find(c => composeForm.candidates.includes(c.id));

    if (!template || !job || !candidate) return;

    let subject = composeForm.customSubject || template.subject;
    let body = composeForm.customBody || template.body;

    // Replace variables with sample data
    subject = subject
      .replace("{candidate_name}", candidate.name)
      .replace("{job_title}", job.title)
      .replace("{company_name}", "HireMind")
      .replace("{matched_skills}", candidate.skills.join(", "));

    body = body
      .replace("{candidate_name}", candidate.name)
      .replace("{job_title}", job.title)
      .replace("{company_name}", "HireMind")
      .replace("{matched_skills}", candidate.skills.join(", "))
      .replace("{hr_name}", "HR Team")
      .replace("{interview_date}", "TBD")
      .replace("{interview_time}", "TBD")
      .replace("{interview_location}", "TBD")
      .replace("{response_time}", "3-5 business days")
      .replace("{start_date}", "TBD")
      .replace("{salary}", "TBD")
      .replace("{benefits}", "TBD")
      .replace("{response_deadline}", "TBD");

    setPreviewEmail({ subject, body });
    setIsPreviewDialogOpen(true);
  };

  const handleSendEmail = () => {
    const template = templates.find(t => t.name === composeForm.template);
    const job = availableJobs.find(j => j.title === composeForm.job);
    const selectedCandidates = availableCandidates.filter(c => composeForm.candidates.includes(c.id));

    if (!template || !job || selectedCandidates.length === 0) return;

    const newEmail: SentEmail = {
      id: sentEmails.length + 1,
      to: selectedCandidates.map(c => c.email),
      subject: previewEmail.subject,
      body: previewEmail.body,
      template: template.name,
      job: job.title,
      sentAt: new Date().toISOString(),
      status: "sent"
    };

    setSentEmails([newEmail, ...sentEmails]);
    setIsPreviewDialogOpen(false);
    setIsComposeDialogOpen(false);
    setComposeForm({
      job: "",
      candidates: [],
      template: "",
      customSubject: "",
      customBody: "",
      editBeforeSend: false
    });
    toast.success(`Email sent to ${selectedCandidates.length} candidate(s)!`);
  };

  const filteredTemplates = templates.filter(t => 
    t.name.toLowerCase().includes(searchTemplate.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTemplate.toLowerCase())
  );

  const filteredEmails = sentEmails.filter(e => 
    e.subject.toLowerCase().includes(searchEmail.toLowerCase()) ||
    e.to.some(email => email.toLowerCase().includes(searchEmail.toLowerCase())) ||
    e.job.toLowerCase().includes(searchEmail.toLowerCase())
  );

  return (
    <HRLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Communications</h1>
            <p className="text-muted-foreground mt-1">Manage email templates and communicate with candidates</p>
          </div>
          <Dialog open={isComposeDialogOpen} onOpenChange={setIsComposeDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Send className="h-4 w-4 mr-2" />
                Compose Email
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Compose New Email</DialogTitle>
                <DialogDescription>
                  Select job, candidates, and template to send an email
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Select Job *</Label>
                  <Select value={composeForm.job} onValueChange={(value) => setComposeForm({...composeForm, job: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a job position" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableJobs.map(job => (
                        <SelectItem key={job.id} value={job.title}>
                          {job.title} - {job.department}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Select Candidates *</Label>
                  <div className="border rounded-md p-4 space-y-2 max-h-48 overflow-y-auto">
                    {availableCandidates.map(candidate => (
                      <div key={candidate.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`candidate-${candidate.id}`}
                          checked={composeForm.candidates.includes(candidate.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setComposeForm({...composeForm, candidates: [...composeForm.candidates, candidate.id]});
                            } else {
                              setComposeForm({...composeForm, candidates: composeForm.candidates.filter(id => id !== candidate.id)});
                            }
                          }}
                        />
                        <label htmlFor={`candidate-${candidate.id}`} className="text-sm cursor-pointer flex-1">
                          <div className="font-medium">{candidate.name}</div>
                          <div className="text-xs text-muted-foreground">{candidate.email} • {candidate.position}</div>
                        </label>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {composeForm.candidates.length} candidate(s) selected
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Select Template *</Label>
                  <Select value={composeForm.template} onValueChange={(value) => setComposeForm({...composeForm, template: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an email template" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map(template => (
                        <SelectItem key={template.id} value={template.name}>
                          {template.name} ({template.category})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="editBeforeSend"
                    checked={composeForm.editBeforeSend}
                    onCheckedChange={(checked) => setComposeForm({...composeForm, editBeforeSend: checked as boolean})}
                  />
                  <label htmlFor="editBeforeSend" className="text-sm font-medium cursor-pointer">
                    Edit before send
                  </label>
                </div>

                {composeForm.editBeforeSend && (
                  <>
                    <div className="space-y-2">
                      <Label>Custom Subject (Optional)</Label>
                      <Input
                        placeholder="Override template subject"
                        value={composeForm.customSubject}
                        onChange={(e) => setComposeForm({...composeForm, customSubject: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Custom Body (Optional)</Label>
                      <Textarea
                        placeholder="Override template body"
                        value={composeForm.customBody}
                        onChange={(e) => setComposeForm({...composeForm, customBody: e.target.value})}
                        rows={8}
                      />
                    </div>
                  </>
                )}

                <div className="flex gap-2 pt-4">
                  <Button onClick={handlePreviewEmail} variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview Email
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="templates" className="space-y-6">
          <TabsList>
            <TabsTrigger value="templates">
              <FileText className="h-4 w-4 mr-2" />
              Template Library
            </TabsTrigger>
            <TabsTrigger value="history">
              <Clock className="h-4 w-4 mr-2" />
              Sent Emails
            </TabsTrigger>
          </TabsList>

          {/* Template Library Tab */}
          <TabsContent value="templates" className="space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex-1 max-w-sm">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search templates..."
                      value={searchTemplate}
                      onChange={(e) => setSearchTemplate(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Dialog open={isTemplateDialogOpen} onOpenChange={(open) => {
                  setIsTemplateDialogOpen(open);
                  if (!open) {
                    setEditingTemplate(null);
                    setTemplateForm({ name: "", subject: "", body: "", category: "General" });
                  }
                }}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Template
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{editingTemplate ? "Edit Template" : "Create New Template"}</DialogTitle>
                      <DialogDescription>
                        Create email templates with variables like {"{candidate_name}"}, {"{job_title}"}, {"{matched_skills}"}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="template-name">Template Name *</Label>
                        <Input
                          id="template-name"
                          placeholder="e.g., Interview Invitation"
                          value={templateForm.name}
                          onChange={(e) => setTemplateForm({...templateForm, name: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="template-category">Category</Label>
                        <Select value={templateForm.category} onValueChange={(value) => setTemplateForm({...templateForm, category: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="General">General</SelectItem>
                            <SelectItem value="Interview">Interview</SelectItem>
                            <SelectItem value="Acknowledgment">Acknowledgment</SelectItem>
                            <SelectItem value="Offer">Offer</SelectItem>
                            <SelectItem value="Rejection">Rejection</SelectItem>
                            <SelectItem value="Follow-up">Follow-up</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="template-subject">Email Subject *</Label>
                        <Input
                          id="template-subject"
                          placeholder="Use {variable} for placeholders"
                          value={templateForm.subject}
                          onChange={(e) => setTemplateForm({...templateForm, subject: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="template-body">Email Body *</Label>
                        <Textarea
                          id="template-body"
                          placeholder="Use {variable} for placeholders like {candidate_name}, {job_title}, {company_name}, {matched_skills}"
                          value={templateForm.body}
                          onChange={(e) => setTemplateForm({...templateForm, body: e.target.value})}
                          rows={12}
                        />
                      </div>

                      <div className="bg-muted p-4 rounded-md">
                        <p className="text-sm font-medium mb-2">Available Variables:</p>
                        <div className="flex flex-wrap gap-2">
                          {["candidate_name", "job_title", "company_name", "matched_skills", "interview_date", "interview_time", "interview_location", "hr_name", "response_time", "start_date", "salary", "benefits", "response_deadline"].map(variable => (
                            <Badge key={variable} variant="secondary" className="text-xs">
                              {"{" + variable + "}"}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button onClick={editingTemplate ? handleUpdateTemplate : handleCreateTemplate} className="flex-1">
                          {editingTemplate ? "Update Template" : "Create Template"}
                        </Button>
                        <Button variant="outline" onClick={() => {
                          setIsTemplateDialogOpen(false);
                          setEditingTemplate(null);
                          setTemplateForm({ name: "", subject: "", body: "", category: "General" });
                        }}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {filteredTemplates.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No templates found</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchTemplate ? "Try a different search term" : "Create your first email template to get started"}
                    </p>
                  </div>
                ) : (
                  filteredTemplates.map(template => (
                    <Card key={template.id} className="p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{template.name}</h3>
                            <Badge variant="outline">{template.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            <strong>Subject:</strong> {template.subject}
                          </p>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {template.body.substring(0, 150)}...
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditTemplate(template)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDuplicateTemplate(template)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Template?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{template.name}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteTemplate(template.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Variables used in this template:</p>
                        <div className="flex flex-wrap gap-1">
                          {template.variables.map(variable => (
                            <Badge key={variable} variant="secondary" className="text-xs">
                              {"{" + variable + "}"}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-3">
                          Created: {template.createdAt} | Last modified: {template.lastModified}
                        </p>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Sent Emails Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card className="p-6">
              <div className="mb-6">
                <div className="relative max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search sent emails..."
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {filteredEmails.length === 0 ? (
                  <div className="text-center py-12">
                    <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No emails found</h3>
                    <p className="text-muted-foreground">
                      {searchEmail ? "Try a different search term" : "Sent emails will appear here"}
                    </p>
                  </div>
                ) : (
                  filteredEmails.map(email => (
                    <Card key={email.id} className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={email.status === "sent" ? "default" : email.status === "failed" ? "destructive" : "secondary"}>
                              {email.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {new Date(email.sentAt).toLocaleString()}
                            </span>
                          </div>
                          <h3 className="font-semibold mb-1">{email.subject}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            <strong>To:</strong> {email.to.join(", ")}
                          </p>
                          <p className="text-sm text-muted-foreground mb-2">
                            <strong>Job:</strong> {email.job} | <strong>Template:</strong> {email.template}
                          </p>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {email.body}
                          </p>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Email Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label className="text-xs text-muted-foreground">Status</Label>
                                <div className="mt-1">
                                  <Badge variant={email.status === "sent" ? "default" : "destructive"}>
                                    {email.status}
                                  </Badge>
                                </div>
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">Sent At</Label>
                                <p className="text-sm mt-1">{new Date(email.sentAt).toLocaleString()}</p>
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">Recipients</Label>
                                <p className="text-sm mt-1">{email.to.join(", ")}</p>
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">Job Position</Label>
                                <p className="text-sm mt-1">{email.job}</p>
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">Template Used</Label>
                                <p className="text-sm mt-1">{email.template}</p>
                              </div>
                              <Separator />
                              <div>
                                <Label className="text-xs text-muted-foreground">Subject</Label>
                                <p className="text-sm font-medium mt-1">{email.subject}</p>
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">Body</Label>
                                <div className="mt-1 p-4 bg-muted rounded-md whitespace-pre-wrap text-sm">
                                  {email.body}
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Preview Dialog */}
        <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Email Preview</DialogTitle>
              <DialogDescription>
                Review your email before sending to {composeForm.candidates.length} candidate(s)
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label className="text-xs text-muted-foreground">Subject</Label>
                <p className="text-sm font-medium mt-1">{previewEmail.subject}</p>
              </div>
              <Separator />
              <div>
                <Label className="text-xs text-muted-foreground">Body</Label>
                <div className="mt-1 p-4 bg-muted rounded-md whitespace-pre-wrap text-sm max-h-96 overflow-y-auto">
                  {previewEmail.body}
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSendEmail} className="flex-1">
                  <Send className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline" onClick={() => setIsPreviewDialogOpen(false)}>
                  Edit
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </HRLayout>
  );
};

export default HRCommunications;
