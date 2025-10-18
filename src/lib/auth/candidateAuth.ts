import { supabase } from "@/integrations/supabase/client";
import { CandidateSignupData, LoginCredentials } from "./types";

export class CandidateAuthService {
  /**
   * Sign up a new candidate
   */
  static async signUp(data: CandidateSignupData) {
    const redirectUrl = `${window.location.origin}/candidate/dashboard`;

    // Sign up with Supabase Auth
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: data.full_name,
        },
      },
    });

    if (signUpError || !authData.user) {
      return { error: signUpError };
    }

    // Create candidate profile
    const { error: profileError } = await supabase
      .from('candidate_profiles')
      .insert({
        id: authData.user.id,
        phone: data.phone || null,
      });

    if (profileError) {
      return { error: profileError };
    }

    // Assign candidate role
    const { error: roleError } = await supabase
      .from('user_roles')
      .insert({
        user_id: authData.user.id,
        role: 'candidate',
      });

    if (roleError) {
      return { error: roleError };
    }

    return { data: authData, error: null };
  }

  /**
   * Sign in a candidate
   */
  static async signIn(credentials: LoginCredentials) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      return { error };
    }

    // Verify user has candidate role
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', data.user.id)
      .eq('role', 'candidate')
      .maybeSingle();

    if (!roleData) {
      await supabase.auth.signOut();
      return { 
        error: { 
          message: 'This account is not registered as a candidate. Please use the correct portal.',
          name: 'Invalid Role',
          status: 403
        } 
      };
    }

    return { data, error: null };
  }

  /**
   * Get candidate profile
   */
  static async getCandidateProfile(userId: string) {
    const { data, error } = await supabase
      .from('candidate_profiles')
      .select('*, profiles(*)')
      .eq('id', userId)
      .single();

    return { data, error };
  }

  /**
   * Update candidate profile
   */
  static async updateCandidateProfile(
    userId: string,
    updates: {
      phone?: string;
      skills?: string[];
      experience_years?: number;
      location?: string;
    }
  ) {
    const { data, error } = await supabase
      .from('candidate_profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    return { data, error };
  }
}
