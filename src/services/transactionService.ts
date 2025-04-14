
import { supabase } from "@/integrations/supabase/client";
import { Transaction, TransactionChamber } from "@/types";

export const fetchTransactions = async (userId: string): Promise<Transaction[]> => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }

  return data.map(item => ({
    id: item.id,
    amount: typeof item.amount === 'string' ? parseFloat(item.amount) : item.amount,
    type: item.type as 'deposit' | 'withdrawal' | 'transfer' | 'payment',
    chamber: item.chamber as TransactionChamber,
    description: item.description,
    date: new Date(item.created_at),
    category: item.category
  }));
};

export const createTransaction = async (
  userId: string,
  amount: number, 
  type: 'deposit' | 'withdrawal' | 'transfer' | 'payment',
  chamber: TransactionChamber | undefined,
  description: string,
  category?: string
): Promise<{ transaction: Transaction | null; error: any }> => {
  try {
    // Create transaction record
    const { data, error } = await supabase
      .from('transactions')
      .insert({
        user_id: userId,
        amount,
        type,
        chamber,
        description,
        category
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating transaction:", error);
      return { transaction: null, error };
    }

    // Update account balance
    const { error: updateError } = await updateBalance(userId, amount, type, chamber);
    
    if (updateError) {
      return { transaction: null, error: updateError };
    }

    const transaction: Transaction = {
      id: data.id,
      amount: typeof data.amount === 'string' ? parseFloat(data.amount) : data.amount,
      type: data.type as 'deposit' | 'withdrawal' | 'transfer' | 'payment',
      chamber: data.chamber as TransactionChamber,
      description: data.description,
      date: new Date(data.created_at),
      category: data.category
    };

    return { transaction, error: null };
  } catch (err) {
    console.error("Error in transaction service:", err);
    return { transaction: null, error: err };
  }
};

const updateBalance = async (
  userId: string, 
  amount: number, 
  type: 'deposit' | 'withdrawal' | 'transfer' | 'payment', 
  chamber?: TransactionChamber
): Promise<{ error: any }> => {
  try {
    // Get current balances
    const { data, error } = await supabase
      .from('users')
      .select('main_account_balance, savings_chamber_balance')
      .eq('id', userId)
      .single();

    if (error) {
      return { error };
    }

    let mainBalance = typeof data.main_account_balance === 'string' ? 
      parseFloat(data.main_account_balance) : data.main_account_balance;
    let savingsBalance = typeof data.savings_chamber_balance === 'string' ? 
      parseFloat(data.savings_chamber_balance) : data.savings_chamber_balance;

    // Update balances based on transaction type
    if (type === 'transfer') {
      if (chamber === 'main') {
        // Transfer from main to savings
        mainBalance -= amount;
        savingsBalance += amount;
      } else if (chamber === 'savings') {
        // Transfer from savings to main
        savingsBalance -= amount;
        mainBalance += amount;
      }
    } else if (type === 'withdrawal' && chamber === 'savings') {
      // Withdrawal from savings (e.g., for goal contribution)
      savingsBalance -= amount;
    }

    // Update user balances
    const { error: updateError } = await supabase
      .from('users')
      .update({
        main_account_balance: mainBalance,
        savings_chamber_balance: savingsBalance
      })
      .eq('id', userId);

    return { error: updateError };
  } catch (err) {
    return { error: err };
  }
};
