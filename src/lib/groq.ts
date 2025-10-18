import OpenAI from "openai";
import { extractTextFromFile } from "./textExtraction";

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

// New interfaces for structured data extraction
export interface CandidateProfile {
  personal_info: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  skills: {
    technical_skills: string[];
    soft_skills: string[];
    languages: string[];
    tools_and_frameworks: string[];
  };
  experience: {
    total_years: number;
    work_history: Array<{
      company: string;
      position: string;
      duration: string;
      start_date: string;
      end_date: string;
      responsibilities: string[];
      achievements: string[];
    }>;
  };
  education: {
    degree: string;
    field_of_study: string;
    institution: string;
    graduation_year: string;
    gpa?: string;
    relevant_coursework?: string[];
  }[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    achievements: string[];
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    expiry?: string;
  }>;
  summary: string;
  keywords: string[];
}

export interface JobRequirements {
  job_info: {
    title: string;
    company: string;
    location: string;
    job_type: string; // full-time, part-time, contract, remote
    salary_range?: string;
  };
  requirements: {
    required_skills: string[];
    preferred_skills: string[];
    min_experience: number;
    max_experience?: number;
    education_level: string;
    certifications?: string[];
  };
  responsibilities: string[];
  benefits: string[];
  keywords: string[];
  description_summary: string;
}

export interface MatchResult {
  overall_score: number; // 0-100
  skill_match: {
    score: number;
    matched_skills: string[];
    missing_skills: string[];
  };
  experience_match: {
    score: number;
    candidate_years: number;
    required_years: number;
    meets_requirement: boolean;
  };
  education_match: {
    score: number;
    meets_requirement: boolean;
  };
  recommendations: {
    for_candidate: string[];
    for_recruiter: string[];
  };
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
  try {
    return await extractTextFromFile(file);
  } catch (error) {
    console.error("Error extracting resume text:", error);
    throw error;
  }
}
export async function extractCandidateProfile(resumeText: string): Promise<CandidateProfile> {
  try {
    console.log('📄 Starting candidate profile extraction...');
    console.log('📊 Resume text length:', resumeText.length);
    console.log('🔑 GROQ API key configured:', Boolean(GROQ_API_KEY));
    
    const prompt = `You are an expert resume parser. Extract structured information from the following resume text and return it in JSON format.

Resume Content:
${resumeText}

Please extract and return ONLY valid JSON in the following structure (no additional text or explanation):
{
  "personal_info": {
    "name": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "github": "",
    "portfolio": ""
  },
  "skills": {
    "technical_skills": [],
    "soft_skills": [],
    "languages": [],
    "tools_and_frameworks": []
  },
  "experience": {
    "total_years": 0,
    "work_history": [{
      "company": "",
      "position": "",
      "duration": "",
      "start_date": "",
      "end_date": "",
      "responsibilities": [],
      "achievements": []
    }]
  },
  "education": [{
    "degree": "",
    "field_of_study": "",
    "institution": "",
    "graduation_year": "",
    "gpa": "",
    "relevant_coursework": []
  }],
  "projects": [{
    "name": "",
    "description": "",
    "technologies": [],
    "achievements": []
  }],
  "certifications": [{
    "name": "",
    "issuer": "",
    "date": "",
    "expiry": ""
  }],
  "summary": "",
  "keywords": []
}

Rules:
- Extract only information that exists in the resume
- Use empty strings/arrays for missing information
- Ensure all JSON is valid and properly formatted
- Calculate total_years based on work experience
- Include all relevant skills, technologies, and keywords`;

    console.log('🚀 Sending request to GROQ API...');
    
    const response = await groqClient.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1, // Low temperature for consistent extraction
      max_tokens: 3000,
    });

    console.log('✅ Received response from GROQ API');
    
    const content = response.choices[0]?.message?.content;
    if (!content) {
      console.error('❌ No content in GROQ response');
      throw new Error("No response from GROQ API");
    }

    console.log('📝 Raw GROQ response:', content.substring(0, 500) + '...');

    // Clean the response and parse JSON
    const cleanedContent = content.replace(/```json|```/g, '').trim();
    console.log('🧹 Cleaned content:', cleanedContent.substring(0, 500) + '...');
    
    try {
      const candidateProfile = JSON.parse(cleanedContent) as CandidateProfile;
      console.log('✅ Successfully parsed candidate profile:', candidateProfile.personal_info?.name);
      return candidateProfile;
    } catch (parseError) {
      console.error('❌ JSON parsing failed:', parseError);
      console.error('❌ Content that failed to parse:', cleanedContent);
      throw new Error(`Failed to parse JSON response: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
    }
    
  } catch (error) {
    console.error("❌ Error extracting candidate profile:", error);
    
    // Only return fallback if it's a non-critical error
    if (error instanceof Error && error.message.includes('Failed to parse JSON')) {
      throw error; // Re-throw parsing errors so user knows something went wrong
    }
    
    // Return a fallback structure for other errors (network, API issues, etc.)
    console.log('🔄 Returning fallback candidate profile structure');
    return {
      personal_info: {
        name: "Processing failed - please try again",
        email: "",
        phone: "",
        location: ""
      },
      skills: {
        technical_skills: [],
        soft_skills: [],
        languages: [],
        tools_and_frameworks: []
      },
      experience: {
        total_years: 0,
        work_history: []
      },
      education: [],
      projects: [],
      certifications: [],
      summary: "Unable to extract summary from resume - please try again",
      keywords: []
    };
  }
}

/**
 * Extract structured data from job description text using GROQ AI
 * @param jobText - The job description text
 * @returns Promise<JobRequirements>
 */
export async function extractJobRequirements(jobText: string): Promise<JobRequirements> {
  try {
    const prompt = `You are an expert job description parser. Extract structured information from the following job posting and return it in JSON format.

Job Description:
${jobText}

Please extract and return ONLY valid JSON in the following structure (no additional text or explanation):
{
  "job_info": {
    "title": "",
    "company": "",
    "location": "",
    "job_type": "",
    "salary_range": ""
  },
  "requirements": {
    "required_skills": [],
    "preferred_skills": [],
    "min_experience": 0,
    "max_experience": 0,
    "education_level": "",
    "certifications": []
  },
  "responsibilities": [],
  "benefits": [],
  "keywords": [],
  "description_summary": ""
}

Rules:
- Extract only information that exists in the job description
- Use empty strings/arrays for missing information
- Ensure all JSON is valid and properly formatted
- Separate required vs preferred skills
- Extract experience requirements in years
- Include all relevant keywords for matching`;

    const response = await groqClient.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
      max_tokens: 2500,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from GROQ API");
    }

    const cleanedContent = content.replace(/```json|```/g, '').trim();
    const jobRequirements = JSON.parse(cleanedContent) as JobRequirements;
    
    return jobRequirements;
  } catch (error) {
    console.error("Error extracting job requirements:", error);
    
    return {
      job_info: {
        title: "Unable to extract",
        company: "",
        location: "",
        job_type: "",
        salary_range: ""
      },
      requirements: {
        required_skills: [],
        preferred_skills: [],
        min_experience: 0,
        education_level: "",
        certifications: []
      },
      responsibilities: [],
      benefits: [],
      keywords: [],
      description_summary: "Unable to extract job description summary"
    };
  }
}

/**
 * Match candidate profile with job requirements
 * @param candidate - Candidate profile data
 * @param job - Job requirements data
 * @returns Promise<MatchResult>
 */
export async function matchCandidateToJob(
  candidate: CandidateProfile, 
  job: JobRequirements
): Promise<MatchResult> {
  try {
    const prompt = `You are an expert HR matching system. Analyze the candidate profile and job requirements to provide a detailed matching score and recommendations.

Candidate Profile:
${JSON.stringify(candidate, null, 2)}

Job Requirements:
${JSON.stringify(job, null, 2)}

Please analyze and return ONLY valid JSON in the following structure:
{
  "overall_score": 0,
  "skill_match": {
    "score": 0,
    "matched_skills": [],
    "missing_skills": []
  },
  "experience_match": {
    "score": 0,
    "candidate_years": 0,
    "required_years": 0,
    "meets_requirement": false
  },
  "education_match": {
    "score": 0,
    "meets_requirement": false
  },
  "recommendations": {
    "for_candidate": [],
    "for_recruiter": []
  }
}

Scoring Guidelines:
- overall_score: 0-100 based on all factors
- skill_match score: 0-100 based on skill alignment
- experience_match score: 0-100 based on years of experience
- education_match score: 0-100 based on education level
- Provide specific, actionable recommendations for both parties`;

    const response = await groqClient.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
      max_tokens: 2000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from GROQ API");
    }

    const cleanedContent = content.replace(/```json|```/g, '').trim();
    const matchResult = JSON.parse(cleanedContent) as MatchResult;
    
    return matchResult;
  } catch (error) {
    console.error("Error matching candidate to job:", error);
    
    return {
      overall_score: 0,
      skill_match: {
        score: 0,
        matched_skills: [],
        missing_skills: []
      },
      experience_match: {
        score: 0,
        candidate_years: candidate.experience.total_years,
        required_years: job.requirements.min_experience,
        meets_requirement: false
      },
      education_match: {
        score: 0,
        meets_requirement: false
      },
      recommendations: {
        for_candidate: ["Unable to generate recommendations due to processing error"],
        for_recruiter: ["Unable to generate recommendations due to processing error"]
      }
    };
  }
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
