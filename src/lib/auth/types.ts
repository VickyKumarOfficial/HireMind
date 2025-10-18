import { User, Session } from '@supabase/supabase-js';

export type UserRole = 'candidate' | 'hr_user' | 'admin';

export interface AuthState {
  user: User | null;
  session: Session | null;
  role: UserRole | null;
}

export interface CandidateSignupData {
  email: string;
  password: string;
  full_name: string;
  phone?: string;
}

export interface HRSignupData {
  email: string;
  password: string;
  full_name: string;
  company_id: string;
  employee_id: string;
  department_code: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface HRLoginCredentials extends LoginCredentials {
  company_id: string;
  employee_id: string;
  department_code: string;
}
