import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../api/supabase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

/** Resolve user role from profile or metadata. Returns 'admin' | 'vendor' | 'customer' */
async function fetchUserRole(userId) {
    try {
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', userId)
            .maybeSingle();

        return profile?.role || null;
    } catch {
        return null;
    }
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function getInitialSession() {
            try {
                const {
                    data: { session },
                } = await supabase.auth.getSession();

                if (mounted) {
                    if (session) {
                        setSession(session);
                        setUser(session.user);
                        const r = await fetchUserRole(session.user.id);
                        if (mounted) setRole(r || session.user?.user_metadata?.role || 'customer');
                    } else {
                        setRole(null);
                    }
                    setLoading(false);
                }
            } catch {
                if (mounted) setLoading(false);
            }
        }

        getInitialSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (mounted) {
                setSession(session);
                setUser(session?.user ?? null);
                if (session?.user) {
                    const r = await fetchUserRole(session.user.id);
                    if (mounted) setRole(r || session.user?.user_metadata?.role || 'customer');
                } else {
                    setRole(null);
                }
                setLoading(false);
            }
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    const signUp = async (email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) throw error;
        return data;
    };

    const signIn = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        return data;
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    };

    /** Normalized role: 'admin' | 'vendor' | 'customer'. 'creator' maps to 'vendor'. Null when not logged in. */
    const normalizedRole = user ? (role === 'creator' ? 'vendor' : (role || 'customer')) : null;

    const value = {
        user,
        session,
        role: normalizedRole,
        loading,
        signUp,
        signIn,
        signOut,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
