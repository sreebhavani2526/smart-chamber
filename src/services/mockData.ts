
import { User, Account, Transaction } from '../types';

// Mock user data
export const mockUser: User = {
  id: 'user1',
  name: 'Alex Johnson',
  email: 'alex.j@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
};

// Mock account data
export const mockAccount: Account = {
  mainBalance: 3450.75,
  savingsBalance: 12500.00
};

// Mock transaction data
export const mockTransactions: Transaction[] = [
  {
    id: 'tx1',
    amount: 500,
    type: 'deposit',
    chamber: 'main',
    description: 'Salary deposit',
    date: new Date('2023-11-01T10:30:00'),
    category: 'Income'
  },
  {
    id: 'tx2',
    amount: 200,
    type: 'transfer',
    chamber: 'savings',
    description: 'Monthly savings',
    date: new Date('2023-11-02T14:20:00'),
    category: 'Savings'
  },
  {
    id: 'tx3',
    amount: 45.99,
    type: 'payment',
    chamber: 'main',
    description: 'Grocery shopping',
    date: new Date('2023-11-03T18:45:00'),
    category: 'Food & Groceries'
  },
  {
    id: 'tx4',
    amount: 19.99,
    type: 'payment',
    chamber: 'main',
    description: 'Streaming subscription',
    date: new Date('2023-11-04T09:15:00'),
    category: 'Entertainment'
  },
  {
    id: 'tx5',
    amount: 100,
    type: 'withdrawal',
    chamber: 'savings',
    description: 'Emergency expense',
    date: new Date('2023-11-05T16:30:00'),
    category: 'Emergency'
  }
];

// Function to format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};
