import CandidateLayout from "@/components/layouts/CandidateLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Sparkles,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Target,
  Clock,
  FileText,
  Brain,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AnalysisResult {
  score: number;
  timestamp: string;
  changes: string[];
  projects: string[];
  overall: string;
  strengths: string[];
  weaknesses: string[];
}

interface HistoryItem {
  id: string;
  date: string;
  score: number;
  changes: string[];
  status: 'completed' | 'pending';
}

const AIResumeOptimizer = () => {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: '1',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      score: 82,
      changes: ['Added technical skills', 'Improved job descriptions', 'Fixed formatting issues'],
      status: 'completed',
    },
    {
      id: '2',
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      score: 75,
      changes: ['Updated contact information', 'Added certifications'],
      status: 'completed',
    },
  ]);

  // Simulate resume analysis using GROQ
  const analyzeResume = async () => {
    setIsAnalyzing(true);
    
    try {
      // In a real implementation, this would call your backend API
      // which would then use GROQ API
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock analysis result (in production, this comes from GROQ)
      const mockResult: AnalysisResult = {
        score: 85,
        timestamp: new Date().toISOString(),
        changes: [
          "Add quantifiable achievements with metrics (increased sales by X%, reduced costs by Y%)",
          "Include action verbs at the start of bullet points (Led, Developed, Implemented)",
          "Tailor resume keywords to match job descriptions in your target industry",
          "Add a professional summary section highlighting your unique value proposition",
          "Expand technical skills section with proficiency levels",
        ],
        projects: [
          "E-commerce Platform: Add metrics like user adoption rate, transaction volume handled",
          "Data Analytics Dashboard: Include technologies used (React, D3.js, Python) and impact",
          "Mobile App Development: Mention app store ratings, download numbers, and features",
          "API Integration Project: Specify number of integrations, performance improvements",
        ],
        overall: "Your resume shows strong technical experience and a good foundation. However, it lacks specific metrics and quantifiable achievements that would make your contributions stand out. Focus on adding concrete numbers and results to demonstrate your impact. The formatting is clean but could benefit from better keyword optimization for ATS systems. Your projects section needs more detail about technologies used and measurable outcomes.",
        strengths: [
          "Strong technical skill set with modern frameworks",
          "Clear and professional formatting",
          "Consistent work history without gaps",
          "Relevant educational background",
          "Good variety of project experience",
        ],
        weaknesses: [
          "Missing quantifiable achievements and metrics",
          "Limited use of action-oriented language",
          "Insufficient keyword optimization for ATS",
          "Projects lack specific technology stack details",
          "No professional summary or objective statement",
          "Could improve bullet point structure",
        ],
      };

      setAnalysisResult(mockResult);
      
      // Add to history
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        date: mockResult.timestamp,
        score: mockResult.score,
        changes: mockResult.changes.slice(0, 3),
        status: 'completed',
      };
      setHistory([newHistoryItem, ...history]);
      
      toast.success('Resume analysis completed!');
    } catch (error) {
      toast.error('Failed to analyze resume. Please try again.');
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Auto-analyze on component mount if no previous analysis
  useEffect(() => {
    if (!analysisResult) {
      analyzeResume();
    }
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900";
    if (score >= 60) return "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-900";
    return "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <CandidateLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/candidate/profile')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">AI Resume Optimizer</h1>
                  <p className="text-muted-foreground">Powered by GROQ AI</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              {/* History Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Clock className="h-4 w-4 mr-2" />
                    History
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Analysis History</DialogTitle>
                    <DialogDescription>
                      View your previous resume analyses and improvements
                    </DialogDescription>
                  </DialogHeader>
                  
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {history.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                          <p>No analysis history yet</p>
                        </div>
                      ) : (
                        history.map((item) => (
                          <Card key={item.id} className="p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg ${
                                  item.score >= 80 ? 'bg-green-100 dark:bg-green-950/30 text-green-600 dark:text-green-400' :
                                  item.score >= 60 ? 'bg-yellow-100 dark:bg-yellow-950/30 text-yellow-600 dark:text-yellow-400' :
                                  'bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400'
                                }`}>
                                  {item.score}
                                </div>
                                <div>
                                  <p className="font-medium">{formatDate(item.date)}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {new Date(item.date).toLocaleString('en-US', {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    })}
                                  </p>
                                </div>
                              </div>
                              <Badge variant={item.status === 'completed' ? 'default' : 'secondary'}>
                                {item.status}
                              </Badge>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Changes made:</p>
                              {item.changes.map((change, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                                  <span>{change}</span>
                                </div>
                              ))}
                            </div>
                          </Card>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
              
              <Button
                onClick={analyzeResume}
                disabled={isAnalyzing}
              >
                <Brain className="h-4 w-4 mr-2" />
                {isAnalyzing ? 'Analyzing...' : 'Re-analyze'}
              </Button>
            </div>
          </div>
        </div>

        {isAnalyzing && !analysisResult ? (
          /* Loading State */
          <Card className="p-12">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-primary/20 rounded-full"></div>
                <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                <Brain className="h-8 w-8 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Analyzing Your Resume</h3>
                <p className="text-muted-foreground">
                  Our AI is reviewing your resume and generating personalized insights...
                </p>
              </div>
            </div>
          </Card>
        ) : analysisResult ? (
          <div className="space-y-6">
            {/* Score Card */}
            <Card className={`p-6 border-2 ${getScoreBackground(analysisResult.score)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full border-8 border-background flex items-center justify-center">
                      <div className={`text-center ${getScoreColor(analysisResult.score)}`}>
                        <div className="text-4xl font-bold">{analysisResult.score}</div>
                        <div className="text-sm font-medium">out of 100</div>
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Resume Score</h2>
                    <p className="text-muted-foreground max-w-md">
                      {analysisResult.score >= 80
                        ? "Excellent! Your resume is well-optimized and ready for applications."
                        : analysisResult.score >= 60
                        ? "Good foundation, but there's room for improvement to stand out."
                        : "Your resume needs significant improvements to be competitive."}
                    </p>
                    <div className="mt-3">
                      <Progress value={analysisResult.score} className="h-2" />
                    </div>
                  </div>
                </div>
                <FileText className={`h-16 w-16 ${getScoreColor(analysisResult.score)} opacity-20`} />
              </div>
            </Card>

            {/* Strengths and Weaknesses */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-950/30 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold">Strengths</h3>
                </div>
                <ul className="space-y-2">
                  {analysisResult.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-950/30 rounded-lg flex items-center justify-center">
                    <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-xl font-semibold">Areas to Improve</h3>
                </div>
                <ul className="space-y-2">
                  {analysisResult.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Required Changes */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950/30 rounded-lg flex items-center justify-center">
                  <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">Required Changes</h3>
              </div>
              <div className="space-y-3">
                {analysisResult.changes.map((change, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-white">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{change}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  </div>
                ))}
              </div>
            </Card>

            {/* Project Enhancements */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-950/30 rounded-lg flex items-center justify-center">
                  <Lightbulb className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold">Project Enhancement Suggestions</h3>
              </div>
              <div className="space-y-3">
                {analysisResult.projects.map((project, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-950/10 border border-purple-200 dark:border-purple-900 rounded-lg"
                  >
                    <div className="w-6 h-6 bg-purple-600 dark:bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-white">{index + 1}</span>
                    </div>
                    <p className="text-sm flex-1">{project}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Overall Review */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Overall Review</h3>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-sm leading-relaxed">{analysisResult.overall}</p>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/candidate/profile')}
              >
                Edit Profile
              </Button>
              <Button
                size="lg"
                onClick={analyzeResume}
                disabled={isAnalyzing}
              >
                <Brain className="h-4 w-4 mr-2" />
                Analyze Again
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </CandidateLayout>
  );
};

export default AIResumeOptimizer;
