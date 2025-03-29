
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ArrowUpRight, ArrowDownLeft, RefreshCw, CreditCard } from 'lucide-react';
import { Transaction } from '@/types';
import { formatCurrency } from '@/services/mockData';

interface TransactionsListProps {
  transactions: Transaction[];
}

const TransactionsList: React.FC<TransactionsListProps> = ({ transactions }) => {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft className="text-success" />;
      case 'withdrawal':
        return <ArrowUpRight className="text-warning" />;
      case 'transfer':
        return <RefreshCw className="text-main" />;
      case 'payment':
        return <CreditCard className="text-danger" />;
      default:
        return <CreditCard />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'text-success';
      case 'withdrawal':
      case 'payment':
        return 'text-danger';
      case 'transfer':
        return 'text-main';
      default:
        return '';
    }
  };

  return (
    <div className="mt-6">
      <h3 className="font-medium text-lg mb-2">Recent Transactions</h3>
      <div className="space-y-1">
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div 
              key={transaction.id}
              className="transaction-item flex items-center justify-between p-3 rounded-md"
            >
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-secondary mr-3">
                  {getTransactionIcon(transaction.type)}
                </div>
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(transaction.date), { addSuffix: true })}
                    {transaction.category ? ` • ${transaction.category}` : ''}
                  </p>
                </div>
              </div>
              <p className={`font-medium ${getTransactionColor(transaction.type)}`}>
                {transaction.type === 'deposit' ? '+' : 
                 (transaction.type === 'withdrawal' || transaction.type === 'payment') ? '-' : ''}
                {formatCurrency(transaction.amount)}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground py-4">No recent transactions</p>
        )}
      </div>
    </div>
  );
};

export default TransactionsList;
