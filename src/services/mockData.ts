import { User, Account, Transaction, SavingsGoal } from '@/types';

// Mock user data
export const mockUser: User = {
  id: 'user1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  profileImage: 'https://via.placeholder.com/150',
  avatar: 'https://via.placeholder.com/150',
};

// Mock account data
export const mockAccount: Account = {
  mainBalance: 7850.50,
  savingsBalance: 12500.00,
};

// Function to format currency
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Mock transaction data
export const mockTransactions: Transaction[] = [
  {
    id: 'tx1',
    amount: 75.00,
    type: 'payment',
    chamber: 'main',
    description: 'Grocery shopping at Whole Foods',
    date: new Date(2024, 5, 15),
    category: 'Groceries',
  },
  {
    id: 'tx2',
    amount: 200.00,
    type: 'withdrawal',
    chamber: 'main',
    description: 'ATM withdrawal',
    date: new Date(2024, 5, 14),
  },
  {
    id: 'tx3',
    amount: 1500.00,
    type: 'deposit',
    chamber: 'main',
    description: 'Salary deposit',
    date: new Date(2024, 5, 13),
  },
  {
    id: 'tx4',
    amount: 30.00,
    type: 'payment',
    chamber: 'main',
    description: 'Coffee at Starbucks',
    date: new Date(2024, 5, 12),
    category: 'Food & Drink',
  },
  {
    id: 'tx5',
    amount: 120.00,
    type: 'payment',
    chamber: 'main',
    description: 'Dinner with friends',
    date: new Date(2024, 5, 11),
    category: 'Food & Drink',
  },
];

// Add mock savings goals
export const mockSavingsGoals: SavingsGoal[] = [
  {
    id: 'goal1',
    title: 'Emergency Fund',
    targetAmount: 5000,
    currentAmount: 2000,
    deadline: new Date(2025, 5, 30),
    category: 'emergency',
    createdAt: new Date(2024, 1, 15)
  },
  {
    id: 'goal2',
    title: 'Summer Vacation',
    targetAmount: 2500,
    currentAmount: 750,
    deadline: new Date(2025, 3, 1),
    category: 'vacation',
    createdAt: new Date(2024, 1, 20)
  }
];
