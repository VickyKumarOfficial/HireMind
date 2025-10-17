import CandidateLayout from "@/components/layouts/CandidateLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Plus, X, Download, Trash2, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ResumeFile {
  name: string;
  size: number;
  type: string;
  uploadedDate: string;
  file?: File;
  url?: string;
}

const CandidateProfile = () => {
  const skills = ["React", "TypeScript", "Node.js", "TailwindCSS", "Git"];
  
  // Resume state management
  const [currentResume, setCurrentResume] = useState<ResumeFile | null>({
    name: "John_Doe_Resume.pdf",
    size: 245000,
    type: "application/pdf",
    uploadedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  });
  
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Accepted file types
  const acceptedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  const maxFileSize = 5 * 1024 * 1024; // 5MB

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  // Format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return date.toLocaleDateString();
  };

  // Get file type label
  const getFileTypeLabel = (type: string): string => {
    if (type.includes('pdf')) return 'PDF';
    if (type.includes('word') || type.includes('document')) return 'Word';
    return 'Document';
  };

  // Validate file
  const validateFile = (file: File): { valid: boolean; error?: string } => {
    if (!acceptedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Invalid file type. Please upload a PDF or Word document.'
      };
    }
    
    if (file.size > maxFileSize) {
      return {
        valid: false,
        error: `File size exceeds ${formatFileSize(maxFileSize)}. Please upload a smaller file.`
      };
    }
    
    return { valid: true };
  };

  // Handle file selection
  const handleFileSelect = (file: File) => {
    const validation = validateFile(file);
    
    if (!validation.valid) {
      toast.error(validation.error!);
      return;
    }
    
    setSelectedFile(file);
    setIsUploadDialogOpen(true);
  };

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
    // Reset input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Handle upload confirmation
  const handleUploadConfirm = () => {
    if (!selectedFile) return;

    // Create resume object
    const newResume: ResumeFile = {
      name: selectedFile.name,
      size: selectedFile.size,
      type: selectedFile.type,
      uploadedDate: new Date().toISOString(),
      file: selectedFile,
      url: URL.createObjectURL(selectedFile)
    };

    setCurrentResume(newResume);
    setIsUploadDialogOpen(false);
    setSelectedFile(null);
    
    toast.success(
      currentResume 
        ? 'Resume updated successfully!' 
        : 'Resume uploaded successfully!'
    );
  };

  // Handle resume download
  const handleDownload = () => {
    if (!currentResume) return;

    if (currentResume.url) {
      // For newly uploaded files with blob URL
      const link = document.createElement('a');
      link.href = currentResume.url;
      link.download = currentResume.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Resume downloaded successfully!');
    } else {
      // For existing files, simulate download
      toast.success('Resume download started...');
      // In a real app, this would download from server
    }
  };

  // Handle resume delete
  const handleDeleteConfirm = () => {
    setCurrentResume(null);
    setIsDeleteDialogOpen(false);
    toast.success('Resume deleted successfully!');
  };
  
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Resume</h2>
              <Badge variant={currentResume ? "default" : "secondary"}>
                {currentResume ? "Uploaded" : "No Resume"}
              </Badge>
            </div>

            {currentResume ? (
              /* Current Resume Display */
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 border-2 rounded-lg bg-muted/30">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{currentResume.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{formatFileSize(currentResume.size)}</span>
                      <span>•</span>
                      <span>{getFileTypeLabel(currentResume.type)}</span>
                      <span>•</span>
                      <span>Uploaded {formatDate(currentResume.uploadedDate)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownload}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Update
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsDeleteDialogOpen(true)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-900 dark:text-green-100">
                      Your resume is up to date
                    </p>
                    <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                      Make sure your resume highlights your most recent experience and skills.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* No Resume - Upload Area */
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragging
                    ? 'border-primary bg-primary/5'
                    : 'border-muted-foreground/25 hover:border-muted-foreground/50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Upload your resume</p>
                    <p className="text-sm text-muted-foreground">
                      Drag and drop your file here, or click to browse
                    </p>
                  </div>
                  <Button onClick={() => fileInputRef.current?.click()}>
                    <Upload className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    PDF or Word document (Max {formatFileSize(maxFileSize)})
                  </p>
                </div>
              </div>
            )}

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileInputChange}
              className="hidden"
            />

            <Button variant="outline" className="mt-4 w-full sm:w-auto">
              AI Resume Optimizer
            </Button>
          </Card>

          {/* Upload Confirmation Dialog */}
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {currentResume ? 'Update Resume' : 'Upload Resume'}
                </DialogTitle>
                <DialogDescription>
                  {currentResume
                    ? 'This will replace your current resume with the new file.'
                    : 'Review your file before uploading.'}
                </DialogDescription>
              </DialogHeader>

              {selectedFile && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{selectedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(selectedFile.size)} • {getFileTypeLabel(selectedFile.type)}
                      </p>
                    </div>
                  </div>

                  {currentResume && (
                    <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
                          Current resume will be replaced
                        </p>
                        <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                          Your existing resume "{currentResume.name}" will be permanently replaced.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button
                      onClick={handleUploadConfirm}
                      className="flex-1"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {currentResume ? 'Update Resume' : 'Upload Resume'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsUploadDialogOpen(false);
                        setSelectedFile(null);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Resume?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete your resume "{currentResume?.name}"? 
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

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
