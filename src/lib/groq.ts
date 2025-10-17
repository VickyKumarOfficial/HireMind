import OpenAI from "openai";

// GROQ API Configuration
// NOTE: In production, NEVER store API keys in frontend code
// This should be handled by a backend API
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || "";

// Initialize GROQ client (OpenAI compatible)
const groqClient = new OpenAI({
  apiKey: GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
  dangerouslyAllowBrowser: true, // Only for development/demo purposes
});

export interface ResumeAnalysis {
  score: number;
  changes: string[];
  projects: string[];
  overall: string;
  strengths: string[];
  weaknesses: string[];
}

/**
 * Analyze resume using GROQ AI
 * @param resumeText - The text content extracted from the resume
 * @returns Promise<ResumeAnalysis>
 */
export async function analyzeResumeWithGroq(resumeText: string): Promise<ResumeAnalysis> {
  try {
    const prompt = `You are an expert resume reviewer and career coach. Analyze the following resume and provide detailed feedback in JSON format.

Resume Content:
${resumeText}

Please provide your analysis in the following JSON structure:
{
  "score": <number between 0-100>,
  "strengths": [<array of 5 strengths>],
  "weaknesses": [<array of 5-6 weaknesses/areas to improve>],
  "changes": [<array of 5 specific actionable changes required>],
  "projects": [<array of 4 suggestions for enhancing project descriptions>],
  "overall": "<comprehensive overall review in 3-4 sentences>"
}

Focus on:
1. Quantifiable achievements and metrics
2. Action-oriented language
3. ATS (Applicant Tracking System) optimization
4. Keyword relevance for the candidate's industry
5. Professional formatting and structure
6. Technical skills presentation
7. Project impact and outcomes

Be specific, actionable, and constructive in your feedback.`;

    const response = await groqClient.chat.completions.create({
      model: "llama-3.3-70b-versatile", // GROQ's fast model
      messages: [
        {
          role: "system",
          content: "You are an expert resume reviewer. Always respond with valid JSON matching the requested structure.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = response.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error("No response from GROQ AI");
    }

    // Parse the JSON response
    const analysis: ResumeAnalysis = JSON.parse(content);
    
    // Validate the response structure
    if (!analysis.score || !analysis.changes || !analysis.projects || !analysis.overall) {
      throw new Error("Invalid response structure from GROQ AI");
    }

    return analysis;
  } catch (error) {
    console.error("Error analyzing resume with GROQ:", error);
    throw new Error("Failed to analyze resume. Please try again later.");
  }
}

/**
 * Extract text from resume file
 * @param file - The resume file (PDF or Word)
 * @returns Promise<string> - Extracted text content
 */
export async function extractResumeText(file: File): Promise<string> {
  // For demo purposes, return sample text
  // In production, you would use a PDF/Word parsing library like pdf-parse or mammoth
  
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      // This is a simplified version - in production use proper PDF/Word parsing
      const text = e.target?.result as string;
      
      // Return sample text for demo
      const sampleText = `
John Doe
Software Engineer
Email: john.doe@example.com | Phone: (555) 123-4567
Location: San Francisco, CA

PROFESSIONAL SUMMARY
Experienced React developer with 5+ years of building scalable web applications.

EXPERIENCE
Senior Frontend Developer
Tech Company • 2020 - Present
- Developed and maintained enterprise web applications
- Led frontend development team
- Implemented modern React architecture

SKILLS
React, TypeScript, Node.js, TailwindCSS, Git, JavaScript, HTML, CSS

EDUCATION
Bachelor of Science in Computer Science
University Name • 2016 - 2020

PROJECTS
E-commerce Platform - Built full-stack application
Data Analytics Dashboard - Created interactive visualizations
Mobile App Development - Developed cross-platform mobile app
      `;
      
      resolve(sampleText);
    };
    
    reader.readAsText(file);
  });
}

/**
 * Check if GROQ API key is configured
 * @returns boolean
 */
export function isGroqConfigured(): boolean {
  return Boolean(GROQ_API_KEY);
}

/**
 * Get GROQ API status
 * @returns Promise<boolean>
 */
export async function checkGroqConnection(): Promise<boolean> {
  try {
    if (!isGroqConfigured()) {
      return false;
    }
    
    // Test with a simple request
    const response = await groqClient.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: "test" }],
      max_tokens: 5,
    });
    
    return Boolean(response.choices[0]?.message);
  } catch (error) {
    console.error("GROQ connection check failed:", error);
    return false;
  }
}
