import type { CandidateProfile, JobRequirements, MatchResult } from '@/lib/groq';

/**
 * Matching Service for Candidate-Job Pairing
 * Provides algorithms for matching candidates with job requirements
 */

export interface StoredCandidateProfile extends CandidateProfile {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface StoredJobRequirements extends JobRequirements {
  id: string;
  posted_by: string; // HR user ID
  created_at: string;
  updated_at: string;
  status: 'active' | 'inactive' | 'filled';
}

export interface MatchRecord {
  id: string;
  candidate_id: string;
  job_id: string;
  match_score: number;
  skill_match_score: number;
  experience_match_score: number;
  education_match_score: number;
  status: 'suggested' | 'viewed' | 'applied' | 'rejected' | 'hired';
  created_at: string;
  updated_at: string;
  match_details: MatchResult;
}

/**
 * Calculate skill match score between candidate and job
 */
export function calculateSkillMatch(
  candidateSkills: string[],
  requiredSkills: string[],
  preferredSkills: string[] = []
): {
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
} {
  // Normalize skills to lowercase for comparison
  const normalizedCandidateSkills = candidateSkills.map(skill => skill.toLowerCase());
  const normalizedRequiredSkills = requiredSkills.map(skill => skill.toLowerCase());
  const normalizedPreferredSkills = preferredSkills.map(skill => skill.toLowerCase());
  
  // Find matches
  const matchedRequired = normalizedRequiredSkills.filter(skill =>
    normalizedCandidateSkills.some(candidateSkill =>
      candidateSkill.includes(skill) || skill.includes(candidateSkill)
    )
  );
  
  const matchedPreferred = normalizedPreferredSkills.filter(skill =>
    normalizedCandidateSkills.some(candidateSkill =>
      candidateSkill.includes(skill) || skill.includes(candidateSkill)
    )
  );
  
  // Calculate score
  const requiredWeight = 0.8;
  const preferredWeight = 0.2;
  
  const requiredScore = normalizedRequiredSkills.length > 0 
    ? (matchedRequired.length / normalizedRequiredSkills.length) * 100 
    : 100;
    
  const preferredScore = normalizedPreferredSkills.length > 0 
    ? (matchedPreferred.length / normalizedPreferredSkills.length) * 100 
    : 0;
  
  const totalScore = (requiredScore * requiredWeight) + (preferredScore * preferredWeight);
  
  // Find missing required skills
  const missingRequired = normalizedRequiredSkills.filter(skill =>
    !normalizedCandidateSkills.some(candidateSkill =>
      candidateSkill.includes(skill) || skill.includes(candidateSkill)
    )
  );
  
  return {
    score: Math.round(totalScore),
    matchedSkills: [...matchedRequired, ...matchedPreferred].map(skill =>
      requiredSkills.find(rs => rs.toLowerCase() === skill) ||
      preferredSkills.find(ps => ps.toLowerCase() === skill) ||
      skill
    ),
    missingSkills: missingRequired.map(skill =>
      requiredSkills.find(rs => rs.toLowerCase() === skill) || skill
    )
  };
}

/**
 * Calculate experience match score
 */
export function calculateExperienceMatch(
  candidateYears: number,
  requiredYears: number,
  maxYears?: number
): {
  score: number;
  meetsRequirement: boolean;
} {
  const meetsRequirement = candidateYears >= requiredYears;
  
  if (!meetsRequirement) {
    // Penalty for not meeting minimum requirement
    const ratio = candidateYears / requiredYears;
    return {
      score: Math.round(ratio * 60), // Max 60% if below requirement
      meetsRequirement: false
    };
  }
  
  if (maxYears && candidateYears > maxYears) {
    // Slight penalty for being overqualified
    const excessYears = candidateYears - maxYears;
    const penalty = Math.min(excessYears * 2, 20); // Max 20% penalty
    return {
      score: Math.max(80, 100 - penalty),
      meetsRequirement: true
    };
  }
  
  // Perfect match
  return {
    score: 100,
    meetsRequirement: true
  };
}

/**
 * Calculate education match score
 */
export function calculateEducationMatch(
  candidateEducation: CandidateProfile['education'],
  requiredEducation: string
): {
  score: number;
  meetsRequirement: boolean;
} {
  if (!requiredEducation || requiredEducation.toLowerCase() === 'any') {
    return { score: 100, meetsRequirement: true };
  }
  
  const educationLevels = [
    'high school',
    'associate',
    'bachelor',
    'master',
    'phd',
    'doctorate'
  ];
  
  const requiredLevel = educationLevels.findIndex(level =>
    requiredEducation.toLowerCase().includes(level)
  );
  
  const candidateLevel = Math.max(
    ...candidateEducation.map(edu => {
      const degree = edu.degree.toLowerCase();
      return educationLevels.findIndex(level => degree.includes(level));
    })
  );
  
  if (requiredLevel === -1) {
    // Can't determine requirement, assume met
    return { score: 100, meetsRequirement: true };
  }
  
  if (candidateLevel === -1) {
    // Can't determine candidate level
    return { score: 50, meetsRequirement: false };
  }
  
  if (candidateLevel >= requiredLevel) {
    return { score: 100, meetsRequirement: true };
  }
  
  // Below requirement
  const deficit = requiredLevel - candidateLevel;
  const score = Math.max(20, 100 - (deficit * 25));
  
  return { score, meetsRequirement: false };
}

/**
 * Generate intelligent recommendations
 */
export function generateRecommendations(
  candidate: CandidateProfile,
  job: JobRequirements,
  matchResult: {
    skillMatch: { score: number; missingSkills: string[] };
    experienceMatch: { score: number; meetsRequirement: boolean };
    educationMatch: { score: number; meetsRequirement: boolean };
  }
): {
  forCandidate: string[];
  forRecruiter: string[];
} {
  const candidateRecommendations: string[] = [];
  const recruiterRecommendations: string[] = [];
  
  // Skill-based recommendations
  if (matchResult.skillMatch.score < 80) {
    const missingSkills = matchResult.skillMatch.missingSkills.slice(0, 3);
    if (missingSkills.length > 0) {
      candidateRecommendations.push(
        `Develop skills in: ${missingSkills.join(', ')} to better match this role`
      );
    }
  }
  
  if (matchResult.skillMatch.score > 70) {
    recruiterRecommendations.push(
      'Strong skill alignment - candidate has most required technical competencies'
    );
  }
  
  // Experience-based recommendations
  if (!matchResult.experienceMatch.meetsRequirement) {
    candidateRecommendations.push(
      'Consider gaining more experience through projects, internships, or similar roles'
    );
    recruiterRecommendations.push(
      'Candidate has less experience than required - consider if potential outweighs experience gap'
    );
  } else if (matchResult.experienceMatch.score === 100) {
    recruiterRecommendations.push(
      'Excellent experience match - candidate meets all experience requirements'
    );
  }
  
  // Education-based recommendations
  if (!matchResult.educationMatch.meetsRequirement) {
    candidateRecommendations.push(
      'Consider pursuing additional education or certifications relevant to this field'
    );
    recruiterRecommendations.push(
      'Education level below requirement - assess if experience compensates'
    );
  }
  
  // General recommendations
  if (candidate.certifications.length === 0) {
    candidateRecommendations.push(
      'Obtain industry certifications to strengthen your profile'
    );
  }
  
  if (candidate.projects.length < 3) {
    candidateRecommendations.push(
      'Showcase more projects to demonstrate practical application of skills'
    );
  }
  
  // Overall match recommendations
  const overallScore = (
    matchResult.skillMatch.score * 0.5 +
    matchResult.experienceMatch.score * 0.3 +
    matchResult.educationMatch.score * 0.2
  );
  
  if (overallScore > 85) {
    recruiterRecommendations.push(
      'Excellent candidate match - strongly recommended for interview'
    );
  } else if (overallScore > 70) {
    recruiterRecommendations.push(
      'Good candidate match - worth considering for interview'
    );
  } else if (overallScore > 50) {
    recruiterRecommendations.push(
      'Moderate match - candidate shows potential but may need development'
    );
  } else {
    recruiterRecommendations.push(
      'Limited match - candidate may not be suitable for this specific role'
    );
  }
  
  return {
    forCandidate: candidateRecommendations,
    forRecruiter: recruiterRecommendations
  };
}

/**
 * Calculate overall match score and generate complete match result
 */
export function calculateCompleteMatch(
  candidate: CandidateProfile,
  job: JobRequirements
): MatchResult {
  // Combine all candidate skills
  const allCandidateSkills = [
    ...candidate.skills.technical_skills,
    ...candidate.skills.tools_and_frameworks,
    ...candidate.skills.soft_skills
  ];
  
  // Calculate individual matches
  const skillMatch = calculateSkillMatch(
    allCandidateSkills,
    job.requirements.required_skills,
    job.requirements.preferred_skills
  );
  
  const experienceMatch = calculateExperienceMatch(
    candidate.experience.total_years,
    job.requirements.min_experience,
    job.requirements.max_experience
  );
  
  const educationMatch = calculateEducationMatch(
    candidate.education,
    job.requirements.education_level
  );
  
  // Calculate weighted overall score
  const overallScore = Math.round(
    skillMatch.score * 0.5 +           // 50% weight on skills
    experienceMatch.score * 0.3 +      // 30% weight on experience
    educationMatch.score * 0.2         // 20% weight on education
  );
  
  // Generate recommendations
  const recommendations = generateRecommendations(candidate, job, {
    skillMatch,
    experienceMatch,
    educationMatch
  });
  
  return {
    overall_score: overallScore,
    skill_match: {
      score: skillMatch.score,
      matched_skills: skillMatch.matchedSkills,
      missing_skills: skillMatch.missingSkills
    },
    experience_match: {
      score: experienceMatch.score,
      candidate_years: candidate.experience.total_years,
      required_years: job.requirements.min_experience,
      meets_requirement: experienceMatch.meetsRequirement
    },
    education_match: {
      score: educationMatch.score,
      meets_requirement: educationMatch.meetsRequirement
    },
    recommendations: {
      for_candidate: recommendations.forCandidate,
      for_recruiter: recommendations.forRecruiter
    }
  };
}

/**
 * Find best matching candidates for a job
 */
export function findBestCandidatesForJob(
  candidates: StoredCandidateProfile[],
  job: StoredJobRequirements,
  limit: number = 10
): Array<{
  candidate: StoredCandidateProfile;
  match: MatchResult;
}> {
  const matches = candidates
    .map(candidate => ({
      candidate,
      match: calculateCompleteMatch(candidate, job)
    }))
    .sort((a, b) => b.match.overall_score - a.match.overall_score)
    .slice(0, limit);
  
  return matches;
}

/**
 * Find best matching jobs for a candidate
 */
export function findBestJobsForCandidate(
  candidate: StoredCandidateProfile,
  jobs: StoredJobRequirements[],
  limit: number = 10
): Array<{
  job: StoredJobRequirements;
  match: MatchResult;
}> {
  const matches = jobs
    .filter(job => job.status === 'active')
    .map(job => ({
      job,
      match: calculateCompleteMatch(candidate, job)
    }))
    .sort((a, b) => b.match.overall_score - a.match.overall_score)
    .slice(0, limit);
  
  return matches;
}

/**
 * Save match record to database (placeholder for backend integration)
 */
export async function saveMatchRecord(
  candidateId: string,
  jobId: string,
  matchResult: MatchResult
): Promise<MatchRecord> {
  // This would integrate with your actual database
  const matchRecord: MatchRecord = {
    id: `match_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    candidate_id: candidateId,
    job_id: jobId,
    match_score: matchResult.overall_score,
    skill_match_score: matchResult.skill_match.score,
    experience_match_score: matchResult.experience_match.score,
    education_match_score: matchResult.education_match.score,
    status: 'suggested',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    match_details: matchResult
  };
  
  console.log('Match record created:', matchRecord);
  
  // In a real implementation, save to database here
  // await supabase.from('match_records').insert(matchRecord);
  
  return matchRecord;
}

/**
 * Update match status (e.g., when candidate applies or is hired)
 */
export async function updateMatchStatus(
  matchId: string,
  status: MatchRecord['status']
): Promise<void> {
  // This would update the database record
  console.log(`Updating match ${matchId} status to ${status}`);
  
  // In a real implementation:
  // await supabase
  //   .from('match_records')
  //   .update({ status, updated_at: new Date().toISOString() })
  //   .eq('id', matchId);
}