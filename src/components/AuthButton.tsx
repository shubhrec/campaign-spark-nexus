
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate, useLocation } from "react-router-dom";

export default function AuthButton() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [signingIn, setSigningIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
      if (data.session?.user && location.pathname === '/') {
        navigate('/dashboard');
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
        if (event === 'SIGNED_IN' && location.pathname === '/') {
          navigate('/dashboard');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  const handleLogin = useCallback(async () => {
    setSigningIn(true);
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return <Button variant="outline" disabled>Loading...</Button>;
  }

  if (signingIn) {
    return <Button variant="outline" disabled>Signing in...</Button>;
  }

  if (user) {
    return (
      <Button variant="outline" onClick={handleLogout}>
        Sign Out
      </Button>
    );
  }

  return (
    <Button 
      onClick={handleLogin} 
      className="bg-crm-purple hover:bg-crm-purple-dark"
      disabled={signingIn}
    >
      Sign In with Google
    </Button>
  );
}
