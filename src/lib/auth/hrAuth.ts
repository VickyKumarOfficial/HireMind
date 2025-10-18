import { supabase } from "@/integrations/supabase/client";
import { HRSignupData, HRLoginCredentials } from "./types";

export class HRAuthService {
  /**
   * Sign up a new HR user
   */
  static async signUp(data: HRSignupData) {
    const redirectUrl = `${window.location.origin}/hr/dashboard`;

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

    // Create HR profile
    const { error: profileError } = await supabase
      .from('hr_profiles')
      .insert({
        id: authData.user.id,
        company_id: data.company_id,
        employee_id: data.employee_id,
        department_code: data.department_code,
      });

    if (profileError) {
      return { error: profileError };
    }

    // Assign HR role
    const { error: roleError } = await supabase
      .from('user_roles')
      .insert({
        user_id: authData.user.id,
        role: 'hr_user',
      });

    if (roleError) {
      return { error: roleError };
    }

    return { data: authData, error: null };
  }

  /**
   * Sign in an HR user
   */
  static async signIn(credentials: HRLoginCredentials) {
    // First, authenticate with email and password
    const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (signInError) {
      return { error: signInError };
    }

    // Verify user has HR role
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', authData.user.id)
      .eq('role', 'hr_user')
      .maybeSingle();

    if (!roleData) {
      await supabase.auth.signOut();
      return { 
        error: { 
          message: 'This account is not registered as HR personnel. Please use the correct portal.',
          name: 'Invalid Role',
          status: 403
        } 
      };
    }

    // Verify HR credentials match
    const { data: hrProfile, error: profileError } = await supabase
      .from('hr_profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError || !hrProfile) {
      await supabase.auth.signOut();
      return { 
        error: { 
          message: 'HR profile not found.',
          name: 'Profile Error',
          status: 404
        } 
      };
    }

    // Validate company ID, employee ID, and department code
    if (
      hrProfile.company_id !== credentials.company_id ||
      hrProfile.employee_id !== credentials.employee_id ||
      hrProfile.department_code !== credentials.department_code
    ) {
      await supabase.auth.signOut();
      return { 
        error: { 
          message: 'Invalid company credentials. Please verify your Company ID, Employee ID, and Department Code.',
          name: 'Invalid Credentials',
          status: 403
        } 
      };
    }

    return { data: authData, error: null };
  }

  /**
   * Get HR profile
   */
  static async getHRProfile(userId: string) {
    const { data, error } = await supabase
      .from('hr_profiles')
      .select('*, profiles(*)')
      .eq('id', userId)
      .single();

    return { data, error };
  }

  /**
   * Update HR profile
   */
  static async updateHRProfile(
    userId: string,
    updates: {
      company_id?: string;
      employee_id?: string;
      department_code?: string;
    }
  ) {
    const { data, error } = await supabase
      .from('hr_profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    return { data, error };
  }
}
