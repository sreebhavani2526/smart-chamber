export interface Transaction {
  id: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'transfer' | 'payment';
  chamber?: TransactionChamber;
  description: string;
  date: Date;
  category?: string;
}

export type TransactionChamber = 'main' | 'savings';

export interface User {
  id: string;
  name: string;
  email: string;
  profileImage: string;
}

export interface Account {
  mainBalance: number;
  savingsBalance: number;
}

// Add new types for goals
export interface SavingsGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category: GoalCategory;
  createdAt: Date;
}

export type GoalCategory = 'vacation' | 'emergency' | 'education' | 'housing' | 'retirement' | 'other';
