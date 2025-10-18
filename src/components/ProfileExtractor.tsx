import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Upload,
  FileText,
  Brain,
  Users,
  Target,
  CheckCircle2,
  XCircle,
  Lightbulb,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Star,
  Clock,
  MapPin,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';
import {
  extractCandidateProfile,
  extractJobRequirements,
  matchCandidateToJob,
  extractResumeText,
  isGroqConfigured,
  checkGroqConnection,
  type CandidateProfile,
  type JobRequirements,
  type MatchResult
} from '@/lib/groq';
import { isFileTypeSupported, getFileTypeDescription } from '@/lib/textExtraction';
import { sampleJobDescriptions } from '@/lib/sampleJobs';

const ProfileExtractor: React.FC = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [extractedText, setExtractedText] = useState('');
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile | null>(null);
  const [jobRequirements, setJobRequirements] = useState<JobRequirements | null>(null);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');
  const [debugInfo, setDebugInfo] = useState<{
    groqConfigured: boolean;
    groqConnected: boolean | null;
  }>({
    groqConfigured: false,
    groqConnected: null
  });

  // Check GROQ configuration on component mount
  React.useEffect(() => {
    const checkConfiguration = async () => {
      const configured = isGroqConfigured();
      let connected = null;
      
      if (configured) {
        try {
          connected = await checkGroqConnection();
        } catch (error) {
          console.error('Error checking GROQ connection:', error);
          connected = false;
        }
      }
      
      setDebugInfo({
        groqConfigured: configured,
        groqConnected: connected
      });
    };
    
    checkConfiguration();
  }, []);

  const handleFileUpload = async (file: File) => {
    if (!isFileTypeSupported(file)) {
      toast.error('Unsupported file type. Please upload a PDF or Word document.');
      return;
    }

    setIsProcessing(true);
    setResumeFile(file);
    
    try {
      toast.info('📄 Extracting text from resume...');
      const text = await extractResumeText(file);
      setExtractedText(text);
      
      // Validate extracted text
      if (!text || text.trim().length < 50) {
        throw new Error('Insufficient text extracted from resume. Please try a different file format.');
      }
      
      toast.info('🧠 Parsing resume data with AI...');
      const profile = await extractCandidateProfile(text);
      
      // Validate profile extraction
      if (!profile.personal_info?.name || profile.personal_info.name.includes('Unable to extract') || profile.personal_info.name.includes('Processing failed')) {
        throw new Error('Failed to extract candidate information. Please ensure your resume has clear text and try again.');
      }
      
      setCandidateProfile(profile);
      toast.success('✅ Resume processed successfully!');
      setActiveTab('candidate');
    } catch (error) {
      console.error('Error processing resume:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to process resume. Please try again.';
      toast.error(errorMessage);
      
      // Clear the candidate profile if processing failed
      setCandidateProfile(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const testAIExtraction = async () => {
    setIsProcessing(true);
    try {
      const sampleText = `
JOHN DOE
Software Engineer
john.doe@email.com | (555) 123-4567

PROFESSIONAL SUMMARY
Experienced software engineer with 5 years of experience in React and Node.js.

SKILLS
React, JavaScript, Node.js, Python, AWS

EXPERIENCE
Senior Developer | TechCorp | 2021-Present
- Led development team
- Built scalable applications

EDUCATION
BS Computer Science | University | 2019
`;
      
      toast.info('🧪 Testing AI extraction with sample text...');
      const profile = await extractCandidateProfile(sampleText);
      setCandidateProfile(profile);
      setExtractedText(sampleText);
      
      toast.success('✅ AI extraction test completed!');
      setActiveTab('candidate');
    } catch (error) {
      console.error('Test failed:', error);
      toast.error('AI extraction test failed. Check console for details.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleJobDescriptionSubmit = async () => {
    if (!jobDescription.trim()) {
      toast.error('Please enter a job description.');
      return;
    }

    setIsProcessing(true);
    
    try {
      toast.info('Parsing job requirements...');
      const requirements = await extractJobRequirements(jobDescription);
      setJobRequirements(requirements);
      
      toast.success('Job description processed successfully!');
      setActiveTab('job');
    } catch (error) {
      console.error('Error processing job description:', error);
      toast.error('Failed to process job description. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMatching = async () => {
    if (!candidateProfile || !jobRequirements) {
      toast.error('Please process both resume and job description first.');
      return;
    }

    setIsProcessing(true);
    
    try {
      toast.info('Analyzing candidate-job match...');
      const result = await matchCandidateToJob(candidateProfile, jobRequirements);
      setMatchResult(result);
      
      toast.success('Matching analysis completed!');
      setActiveTab('match');
    } catch (error) {
      console.error('Error matching candidate to job:', error);
      toast.error('Failed to analyze match. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Brain className="h-8 w-8 text-blue-600" />
          AI Resume & Job Matching System
        </h1>
        <p className="text-muted-foreground">
          Extract structured data from resumes and job descriptions, then find the perfect matches
        </p>
        
        {/* Debug Info */}
        <div className="flex items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            {debugInfo.groqConfigured ? (
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            ) : (
              <XCircle className="h-4 w-4 text-red-600" />
            )}
            <span>GROQ API {debugInfo.groqConfigured ? 'Configured' : 'Not Configured'}</span>
          </div>
          {debugInfo.groqConfigured && (
            <div className="flex items-center gap-1">
              {debugInfo.groqConnected === true ? (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              ) : debugInfo.groqConnected === false ? (
                <XCircle className="h-4 w-4 text-red-600" />
              ) : (
                <Clock className="h-4 w-4 text-yellow-600" />
              )}
              <span>
                {debugInfo.groqConnected === true ? 'Connected' : 
                 debugInfo.groqConnected === false ? 'Connection Failed' : 'Checking...'}
              </span>
            </div>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upload">Upload Resume</TabsTrigger>
          <TabsTrigger value="candidate" disabled={!candidateProfile}>Candidate Profile</TabsTrigger>
          <TabsTrigger value="job">Job Requirements</TabsTrigger>
          <TabsTrigger value="match" disabled={!matchResult}>Match Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Resume Upload & Processing
            </h3>
            
            <div className="space-y-4">
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                onClick={() => document.getElementById('resume-upload')?.click()}
              >
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium">Drop your resume here or click to browse</p>
                <p className="text-sm text-muted-foreground">Supports PDF and Word documents</p>
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                  className="hidden"
                />
              </div>

              {resumeFile && (
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="font-medium">{resumeFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {getFileTypeDescription(resumeFile)} • {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  {candidateProfile && (
                    <Badge variant="outline" className="bg-green-100 text-green-700">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Processed
                    </Badge>
                  )}
                </div>
              )}

              {debugInfo.groqConfigured && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">🧪 Debug Tools</h4>
                  <Button 
                    onClick={testAIExtraction}
                    disabled={isProcessing}
                    variant="outline"
                    size="sm"
                  >
                    {isProcessing ? (
                      <>
                        <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                        Testing...
                      </>
                    ) : (
                      <>
                        <Brain className="h-4 w-4 mr-2" />
                        Test AI Extraction
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Test the AI extraction with sample resume text to verify GROQ API is working
                  </p>
                </div>
              )}

              {extractedText && (
                <div className="space-y-2">
                  <h4 className="font-medium">Extracted Text:</h4>
                  <ScrollArea className="h-40 p-4 border rounded-lg bg-gray-50">
                    <pre className="text-sm whitespace-pre-wrap">{extractedText}</pre>
                  </ScrollArea>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Job Description Processing
            </h3>
            
            <div className="space-y-4">
              <div className="flex gap-2 mb-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setJobDescription(sampleJobDescriptions.softwareEngineer)}
                >
                  Software Engineer
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setJobDescription(sampleJobDescriptions.dataScientist)}
                >
                  Data Scientist
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setJobDescription(sampleJobDescriptions.frontendDeveloper)}
                >
                  Frontend Developer
                </Button>
              </div>
              
              <Textarea
                placeholder="Paste the job description here... or click one of the sample buttons above"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-[200px]"
              />
              
              <Button 
                onClick={handleJobDescriptionSubmit}
                disabled={isProcessing || !jobDescription.trim()}
                className="w-full"
              >
                {isProcessing ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Extract Job Requirements
                  </>
                )}
              </Button>
            </div>
          </Card>

          {candidateProfile && jobRequirements && (
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold">Ready for Matching!</h3>
                <p className="text-muted-foreground">
                  Both resume and job description have been processed.
                </p>
                <Button 
                  onClick={handleMatching}
                  disabled={isProcessing}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isProcessing ? (
                    <>
                      <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing Match...
                    </>
                  ) : (
                    <>
                      <Target className="h-4 w-4 mr-2" />
                      Analyze Match
                    </>
                  )}
                </Button>
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="candidate" className="space-y-4">
          {candidateProfile && (
            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">{candidateProfile.personal_info.name}</p>
                    <p className="text-sm text-muted-foreground">{candidateProfile.personal_info.email}</p>
                    <p className="text-sm text-muted-foreground">{candidateProfile.personal_info.phone}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {candidateProfile.personal_info.location}
                    </p>
                  </div>
                  <div className="space-y-2">
                    {candidateProfile.personal_info.linkedin && (
                      <a href={candidateProfile.personal_info.linkedin} className="text-blue-600 text-sm hover:underline block">
                        LinkedIn Profile
                      </a>
                    )}
                    {candidateProfile.personal_info.github && (
                      <a href={candidateProfile.personal_info.github} className="text-blue-600 text-sm hover:underline block">
                        GitHub Profile
                      </a>
                    )}
                    {candidateProfile.personal_info.portfolio && (
                      <a href={candidateProfile.personal_info.portfolio} className="text-blue-600 text-sm hover:underline block">
                        Portfolio
                      </a>
                    )}
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Skills</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Technical Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {candidateProfile.skills.technical_skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Soft Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {candidateProfile.skills.soft_skills.map((skill, index) => (
                        <Badge key={index} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Tools & Frameworks</h4>
                    <div className="flex flex-wrap gap-2">
                      {candidateProfile.skills.tools_and_frameworks.map((tool, index) => (
                        <Badge key={index} className="bg-blue-100 text-blue-700">{tool}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Experience ({candidateProfile.experience.total_years} years)
                </h3>
                <div className="space-y-4">
                  {candidateProfile.experience.work_history.map((job, index) => (
                    <div key={index} className="border-l-2 border-blue-200 pl-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{job.position}</h4>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                        </div>
                        <Badge variant="outline">{job.duration}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <h5 className="text-sm font-medium">Responsibilities:</h5>
                          <ul className="text-sm text-muted-foreground list-disc list-inside">
                            {job.responsibilities.map((resp, idx) => (
                              <li key={idx}>{resp}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium">Achievements:</h5>
                          <ul className="text-sm text-muted-foreground list-disc list-inside">
                            {job.achievements.map((ach, idx) => (
                              <li key={idx}>{ach}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Education
                </h3>
                <div className="space-y-3">
                  {candidateProfile.education.map((edu, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{edu.degree} in {edu.field_of_study}</h4>
                        <p className="text-sm text-muted-foreground">{edu.institution}</p>
                        {edu.gpa && <p className="text-sm text-muted-foreground">GPA: {edu.gpa}</p>}
                      </div>
                      <Badge variant="outline">{edu.graduation_year}</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="job" className="space-y-4">
          {jobRequirements && (
            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Job Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-lg">{jobRequirements.job_info.title}</h4>
                    <p className="text-muted-foreground">{jobRequirements.job_info.company}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {jobRequirements.job_info.location}
                    </p>
                  </div>
                  <div>
                    <Badge className="mb-2">{jobRequirements.job_info.job_type}</Badge>
                    {jobRequirements.job_info.salary_range && (
                      <p className="text-sm text-muted-foreground">
                        Salary: {jobRequirements.job_info.salary_range}
                      </p>
                    )}
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Requirements</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 text-red-600">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {jobRequirements.requirements.required_skills.map((skill, index) => (
                        <Badge key={index} className="bg-red-100 text-red-700">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-blue-600">Preferred Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {jobRequirements.requirements.preferred_skills.map((skill, index) => (
                        <Badge key={index} className="bg-blue-100 text-blue-700">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium">Experience</h4>
                      <p className="text-sm text-muted-foreground">
                        {jobRequirements.requirements.min_experience}+ years
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Education</h4>
                      <p className="text-sm text-muted-foreground">
                        {jobRequirements.requirements.education_level}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Certifications</h4>
                      <div className="space-y-1">
                        {jobRequirements.requirements.certifications?.map((cert, index) => (
                          <Badge key={index} variant="outline" className="block w-fit">{cert}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Responsibilities</h3>
                <ul className="space-y-2">
                  {jobRequirements.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{resp}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="match" className="space-y-4">
          {matchResult && candidateProfile && jobRequirements && (
            <div className="space-y-4">
              <Card className="p-6">
                <div className="text-center space-y-4">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${getScoreBgColor(matchResult.overall_score)}`}>
                    <span className={`text-2xl font-bold ${getScoreColor(matchResult.overall_score)}`}>
                      {matchResult.overall_score}%
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Overall Match Score</h3>
                    <p className="text-muted-foreground">
                      {candidateProfile.personal_info.name} × {jobRequirements.job_info.title}
                    </p>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Skills Match</h4>
                      <span className={`font-bold ${getScoreColor(matchResult.skill_match.score)}`}>
                        {matchResult.skill_match.score}%
                      </span>
                    </div>
                    <Progress value={matchResult.skill_match.score} className="h-2" />
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs font-medium text-green-600">Matched Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {matchResult.skill_match.matched_skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} className="text-xs bg-green-100 text-green-700">{skill}</Badge>
                          ))}
                          {matchResult.skill_match.matched_skills.length > 3 && (
                            <Badge className="text-xs bg-green-100 text-green-700">
                              +{matchResult.skill_match.matched_skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-red-600">Missing Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {matchResult.skill_match.missing_skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} className="text-xs bg-red-100 text-red-700">{skill}</Badge>
                          ))}
                          {matchResult.skill_match.missing_skills.length > 3 && (
                            <Badge className="text-xs bg-red-100 text-red-700">
                              +{matchResult.skill_match.missing_skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Experience</h4>
                      <span className={`font-bold ${getScoreColor(matchResult.experience_match.score)}`}>
                        {matchResult.experience_match.score}%
                      </span>
                    </div>
                    <Progress value={matchResult.experience_match.score} className="h-2" />
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Candidate:</span>
                        <span className="font-medium">{matchResult.experience_match.candidate_years} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Required:</span>
                        <span className="font-medium">{matchResult.experience_match.required_years}+ years</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {matchResult.experience_match.meets_requirement ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                        <span className="text-xs">
                          {matchResult.experience_match.meets_requirement ? 'Meets requirement' : 'Below requirement'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Education</h4>
                      <span className={`font-bold ${getScoreColor(matchResult.education_match.score)}`}>
                        {matchResult.education_match.score}%
                      </span>
                    </div>
                    <Progress value={matchResult.education_match.score} className="h-2" />
                    <div className="flex items-center gap-2">
                      {matchResult.education_match.meets_requirement ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      <span className="text-xs">
                        {matchResult.education_match.meets_requirement ? 'Meets requirement' : 'Below requirement'}
                      </span>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-6">
                  <h4 className="font-medium mb-4 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-blue-600" />
                    Recommendations for Candidate
                  </h4>
                  <ul className="space-y-2">
                    {matchResult.recommendations.for_candidate.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="p-6">
                  <h4 className="font-medium mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5 text-purple-600" />
                    Recommendations for Recruiter
                  </h4>
                  <ul className="space-y-2">
                    {matchResult.recommendations.for_recruiter.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Star className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileExtractor;