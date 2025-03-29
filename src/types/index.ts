
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Account {
  mainBalance: number;
  savingsBalance: number;
}

export type TransactionType = 'deposit' | 'withdrawal' | 'transfer' | 'payment';
export type TransactionChamber = 'main' | 'savings';

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  chamber: TransactionChamber;
  description: string;
  date: Date;
  category?: string;
}
