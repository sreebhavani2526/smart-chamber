
import React, { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Account } from "@/types";

interface AuthContextType {
  user: User | null;
  account: Account | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);

  // Temporary mock user data until we implement proper auth
  const mockUser: User = {
    id: "user123",
    name: "Alex Johnson",
    email: "alex@example.com",
    profileImage: "/avatar.png",
    avatar: "/avatar.png"
  };

  useEffect(() => {
    // Set mock user for now
    setUser(mockUser);
    
    // Fetch account data from Supabase
    const fetchAccountData = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('main_account_balance, savings_chamber_balance')
          .eq('id', mockUser.id)
          .single();

        if (error) {
          console.error("Error fetching account data:", error);
          // If no data, create initial account with mock data
          await supabase.from('users').insert({
            id: mockUser.id,
            banking_id: 'mock-banking-id',
            email: mockUser.email,
            password: 'mock-password',
            main_account_balance: 1500,
            savings_chamber_balance: 2500
          });
          
          setAccount({
            mainBalance: 1500,
            savingsBalance: 2500
          });
        } else if (data) {
          setAccount({
            mainBalance: parseFloat(data.main_account_balance),
            savingsBalance: parseFloat(data.savings_chamber_balance)
          });
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error in auth setup:", err);
        setLoading(false);
      }
    };

    fetchAccountData();
  }, []);

  const refreshUserData = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('main_account_balance, savings_chamber_balance')
        .eq('id', mockUser.id)
        .single();

      if (error) {
        console.error("Error refreshing user data:", error);
        return;
      }

      if (data) {
        setAccount({
          mainBalance: parseFloat(data.main_account_balance),
          savingsBalance: parseFloat(data.savings_chamber_balance)
        });
      }
    } catch (err) {
      console.error("Error refreshing user data:", err);
    }
  };

  // Mock auth functions for now
  const signIn = async (email: string, password: string) => {
    return { error: null };
  };

  const signOut = async () => {
    console.log("Sign out");
  };

  return (
    <AuthContext.Provider value={{ user, account, loading, signIn, signOut, refreshUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
