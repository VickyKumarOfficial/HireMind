import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Users, FileText, BarChart3, Sparkles, Target } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description: "Intelligent candidate-to-job matching with advanced algorithms"
    },
    {
      icon: Users,
      title: "Smart Shortlisting",
      description: "Automatically rank and filter top candidates"
    },
    {
      icon: FileText,
      title: "Resume Analysis",
      description: "Extract insights and skills from resumes instantly"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track metrics and optimize your hiring process"
    },
    {
      icon: Sparkles,
      title: "Automated Communication",
      description: "Personalized emails and chatbot support"
    },
    {
      icon: Target,
      title: "Job Optimization",
      description: "AI-enhanced job descriptions for better reach"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">HireMind</span>
            </div>
            <div className="flex gap-3">
              <Link to="/hr/login">
                <Button variant="outline">HR Login</Button>
              </Link>
              <Link to="/candidate/login">
                <Button>Candidate Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Smart Recruitment,
            <br />
            <span className="text-primary">Powered by AI</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Streamline your entire hiring process with intelligent candidate matching, 
            automated shortlisting, and personalized communication.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/hr/login">
              <Button size="lg" className="text-lg">
                Start Hiring
              </Button>
            </Link>
            <Link to="/candidate/login">
              <Button size="lg" variant="outline" className="text-lg">
                Find Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Everything You Need to Hire Better
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center bg-primary text-primary-foreground rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Hiring?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join hundreds of companies using HireMind to find the perfect candidates faster.
          </p>
          <Link to="/hr/login">
            <Button size="lg" variant="secondary" className="text-lg">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 HireMind. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
