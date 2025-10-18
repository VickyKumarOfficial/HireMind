import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthService, CandidateAuthService } from "@/lib/auth";
import { Session } from "@supabase/supabase-js";

export const useCandidateAuth = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const { session: currentSession } = await AuthService.getSession();
        
        if (!currentSession) {
          toast.error("Please login to access this page.");
          navigate("/candidate/login");
          return;
        }

        // Verify user has candidate role
        const hasCandidateRole = await AuthService.hasRole(currentSession.user.id, 'candidate');
        
        if (!hasCandidateRole) {
          toast.error("Access denied. This portal is for candidates only.");
          await AuthService.signOut();
          navigate("/candidate/login");
          return;
        }

        if (mounted) {
          setSession(currentSession);
        }
      } catch (error) {
        toast.error("Authentication error. Please login again.");
        navigate("/candidate/login");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    checkAuth();

    // Set up auth state listener
    const { data: { subscription } } = AuthService.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate("/candidate/login");
      } else if (session && mounted) {
        // Defer role check to avoid blocking the callback
        setTimeout(async () => {
          const hasCandidateRole = await AuthService.hasRole(session.user.id, 'candidate');
          if (!hasCandidateRole) {
            toast.error("Access denied. This portal is for candidates only.");
            await AuthService.signOut();
            navigate("/candidate/login");
          } else {
            setSession(session);
          }
        }, 0);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const getCandidateProfile = async () => {
    if (!session) return null;
    try {
      const { data } = await CandidateAuthService.getCandidateProfile(session.user.id);
      return data;
    } catch {
      return null;
    }
  };

  const logout = async () => {
    await AuthService.signOut();
    toast.success("Logged out successfully");
    navigate("/candidate/login");
  };

  return { session, loading, getCandidateProfile, logout };
};
