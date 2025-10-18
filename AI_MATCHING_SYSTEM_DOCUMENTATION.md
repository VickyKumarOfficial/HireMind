# AI Resume & Job Matching System Documentation

## 🎯 Overview

The AI Resume & Job Matching System is a comprehensive solution that extracts structured data from resumes and job descriptions, then uses intelligent algorithms to match candidates with suitable job opportunities.

## 🚀 Features

### 1. **Resume Text Extraction**
- **PDF Support**: Extracts text from PDF documents
- **Word Support**: Handles both .doc and .docx files
- **Smart Processing**: Uses pdf-parse and mammoth libraries for accurate extraction
- **File Validation**: Ensures only supported file types are processed

### 2. **AI-Powered Data Structuring**
- **GROQ Integration**: Uses Llama 3.3 70B model for intelligent parsing
- **Structured Output**: Converts unstructured text into JSON format
- **Comprehensive Extraction**: Captures skills, experience, education, projects, and more

### 3. **Intelligent Matching Algorithm**
- **Multi-Factor Analysis**: Considers skills, experience, and education
- **Weighted Scoring**: 50% skills, 30% experience, 20% education
- **Smart Recommendations**: Provides actionable advice for both candidates and recruiters

## 📊 Data Structures

### Candidate Profile JSON Structure
```json
{
  "personal_info": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1-555-0123",
    "location": "San Francisco, CA",
    "linkedin": "linkedin.com/in/johndoe",
    "github": "github.com/johndoe",
    "portfolio": "johndoe.dev"
  },
  "skills": {
    "technical_skills": ["React", "Node.js", "Python", "AWS"],
    "soft_skills": ["Leadership", "Communication", "Problem Solving"],
    "languages": ["English", "Spanish"],
    "tools_and_frameworks": ["Docker", "Kubernetes", "Jenkins"]
  },
  "experience": {
    "total_years": 5,
    "work_history": [{
      "company": "TechCorp",
      "position": "Senior Developer",
      "duration": "2021-Present",
      "start_date": "2021-01-01",
      "end_date": "Present",
      "responsibilities": ["Led team of 5 developers", "Architected microservices"],
      "achievements": ["Increased performance by 40%", "Reduced costs by $100k"]
    }]
  },
  "education": [{
    "degree": "Bachelor of Science",
    "field_of_study": "Computer Science",
    "institution": "University of Technology",
    "graduation_year": "2019",
    "gpa": "3.8",
    "relevant_coursework": ["Data Structures", "Algorithms"]
  }],
  "projects": [{
    "name": "E-commerce Platform",
    "description": "Full-stack web application with payment integration",
    "technologies": ["React", "Node.js", "PostgreSQL"],
    "achievements": ["Handles 10k+ users", "99.9% uptime"]
  }],
  "certifications": [{
    "name": "AWS Solutions Architect",
    "issuer": "Amazon",
    "date": "2022-03-15",
    "expiry": "2025-03-15"
  }],
  "summary": "Experienced software engineer with expertise in full-stack development",
  "keywords": ["react", "nodejs", "aws", "microservices", "leadership"]
}
```

### Job Requirements JSON Structure
```json
{
  "job_info": {
    "title": "Senior Software Engineer",
    "company": "TechCorp",
    "location": "San Francisco, CA",
    "job_type": "Full-time",
    "salary_range": "$120k - $150k"
  },
  "requirements": {
    "required_skills": ["React", "Node.js", "JavaScript", "Git"],
    "preferred_skills": ["AWS", "Docker", "TypeScript"],
    "min_experience": 3,
    "max_experience": 8,
    "education_level": "Bachelor's degree",
    "certifications": ["AWS Certification"]
  },
  "responsibilities": [
    "Develop scalable web applications",
    "Lead technical architecture decisions",
    "Mentor junior developers"
  ],
  "benefits": [
    "Health insurance",
    "401k matching",
    "Flexible PTO"
  ],
  "keywords": ["react", "nodejs", "senior", "leadership"],
  "description_summary": "Looking for senior developer to lead our frontend team"
}
```

### Match Result Structure
```json
{
  "overall_score": 85,
  "skill_match": {
    "score": 90,
    "matched_skills": ["React", "Node.js", "JavaScript"],
    "missing_skills": ["Docker", "TypeScript"]
  },
  "experience_match": {
    "score": 100,
    "candidate_years": 5,
    "required_years": 3,
    "meets_requirement": true
  },
  "education_match": {
    "score": 100,
    "meets_requirement": true
  },
  "recommendations": {
    "for_candidate": [
      "Learn Docker and TypeScript to strengthen your profile",
      "Highlight your leadership experience more prominently"
    ],
    "for_recruiter": [
      "Excellent candidate match - strongly recommended for interview",
      "Candidate exceeds experience requirements"
    ]
  }
}
```

## 🛠️ Implementation Guide

### 1. **Text Extraction Service** (`src/lib/textExtraction.ts`)

```typescript
import { extractTextFromFile } from '@/lib/textExtraction';

// Extract text from uploaded file
const text = await extractTextFromFile(resumeFile);
```

**Supported File Types:**
- PDF (.pdf)
- Word (.doc, .docx)
- Plain text (.txt)

### 2. **AI Processing Service** (`src/lib/groq.ts`)

```typescript
import { 
  extractCandidateProfile, 
  extractJobRequirements, 
  matchCandidateToJob 
} from '@/lib/groq';

// Extract structured data from resume text
const candidateProfile = await extractCandidateProfile(resumeText);

// Extract structured data from job description
const jobRequirements = await extractJobRequirements(jobDescription);

// Match candidate to job
const matchResult = await matchCandidateToJob(candidateProfile, jobRequirements);
```

### 3. **Matching Service** (`src/lib/matchingService.ts`)

```typescript
import { calculateCompleteMatch } from '@/lib/matchingService';

// Calculate detailed match with custom algorithm
const detailedMatch = calculateCompleteMatch(candidateProfile, jobRequirements);
```

## 🎨 UI Components

### 1. **ProfileExtractor Component**
- **Location**: `src/components/ProfileExtractor.tsx`
- **Purpose**: Main interface for resume upload and job description input
- **Features**: Drag & drop, sample job descriptions, tabbed interface

### 2. **Navigation Integration**
- **Route**: `/candidate/profile-matching`
- **Layout**: Uses CandidateLayout
- **Access**: Available in candidate navigation menu

## 📚 Usage Examples

### Basic Usage Flow

1. **Upload Resume**
   ```typescript
   // User uploads PDF/Word file
   const file = event.target.files[0];
   const text = await extractTextFromFile(file);
   const profile = await extractCandidateProfile(text);
   ```

2. **Input Job Description**
   ```typescript
   // User pastes or selects sample job description
   const requirements = await extractJobRequirements(jobDescription);
   ```

3. **Generate Match**
   ```typescript
   // System calculates compatibility
   const match = await matchCandidateToJob(profile, requirements);
   ```

### Advanced Matching Features

#### Skill Matching Algorithm
- **Fuzzy Matching**: Handles variations in skill names (e.g., "React.js" matches "React")
- **Weighted Scoring**: Required skills have higher weight than preferred
- **Missing Skills Analysis**: Identifies gaps for candidate development

#### Experience Scoring
- **Minimum Requirement Check**: Ensures candidate meets baseline
- **Overqualification Handling**: Slight penalty for excessive experience
- **Growth Potential**: Considers learning trajectory

#### Education Matching
- **Level Comparison**: Maps degree levels (Associate < Bachelor < Master < PhD)
- **Field Relevance**: Considers field of study alignment
- **Alternative Qualifications**: Accounts for certifications and experience

## 🔧 Configuration

### Environment Variables
```env
# Required for AI processing
VITE_GROQ_API_KEY=your_groq_api_key_here
```

### Dependencies
```json
{
  "pdf-parse": "^1.1.1",
  "mammoth": "^1.6.0",
  "file-type": "^19.0.0",
  "openai": "^6.4.0"
}
```

## 📊 Scoring Algorithm

### Overall Score Calculation
```
Overall Score = (Skills × 0.5) + (Experience × 0.3) + (Education × 0.2)
```

### Score Ranges
- **90-100**: Excellent match - Highly recommended
- **80-89**: Very good match - Recommended for interview
- **70-79**: Good match - Worth considering
- **60-69**: Fair match - Potential with development
- **Below 60**: Poor match - Not recommended

### Skill Match Scoring
```
Required Skills Weight: 80%
Preferred Skills Weight: 20%

Skill Score = (Matched Required / Total Required) × 80 + 
              (Matched Preferred / Total Preferred) × 20
```

## 🚀 Future Enhancements

### Database Integration
- Store candidate profiles in Supabase
- Cache job requirements for faster matching
- Track match history and outcomes

### Real-time Matching
- Background processing for new job postings
- Automatic candidate notifications
- Recruiter alerts for high-match candidates

### Advanced Analytics
- Match success rate tracking
- Skill demand analysis
- Market trend insights

### API Endpoints
- REST API for external integrations
- Webhook support for real-time updates
- Bulk processing capabilities

## 🐛 Troubleshooting

### Common Issues

**PDF Text Extraction Fails**
- Ensure PDF is text-based, not scanned image
- Try converting to Word format
- Check file size (< 5MB recommended)

**AI Parsing Returns Empty Results**
- Verify GROQ API key is set
- Check network connectivity
- Ensure resume has standard format

**Low Match Scores**
- Review skill keywords alignment
- Check experience level requirements
- Verify education level matching

### Error Handling
- Graceful fallbacks for API failures
- User-friendly error messages
- Retry mechanisms for temporary failures

## 📞 Support

### Documentation
- **API Reference**: See `src/lib/` files for detailed function documentation
- **Component Guide**: Check component files for prop interfaces
- **Type Definitions**: TypeScript interfaces provide structure details

### Sample Data
- **Test Resumes**: Use provided sample job descriptions
- **Demo Jobs**: Built-in examples for testing
- **Expected Formats**: Follow JSON structure examples

---

**Status**: ✅ Fully Implemented and Functional  
**Last Updated**: October 19, 2025  
**Version**: 1.0.0