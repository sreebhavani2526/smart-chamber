
import React, { useState } from 'react';
import Header from '@/components/Header';
import ChamberCard from '@/components/ChamberCard';
import TransactionsList from '@/components/TransactionsList';
import BottomNav from '@/components/BottomNav';
import TransferDialog from '@/components/TransferDialog';
import { mockUser, mockAccount, mockTransactions } from '@/services/mockData';
import { TransactionChamber } from '@/types';

const Index = () => {
  const [account, setAccount] = useState(mockAccount);
  const [transactions, setTransactions] = useState(mockTransactions);
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  const [transferSource, setTransferSource] = useState<TransactionChamber>('main');

  const openTransferDialog = (source: TransactionChamber) => {
    setTransferSource(source);
    setTransferDialogOpen(true);
  };
  
  const handleTransfer = (amount: number) => {
    // Create new transaction
    const newTransaction = {
      id: `tx${Date.now()}`,
      amount: amount,
      type: 'transfer' as const,
      chamber: transferSource,
      description: transferSource === 'main' 
        ? 'Transfer to Savings Chamber' 
        : 'Transfer to Main Account',
      date: new Date(),
      category: 'Transfer'
    };
    
    // Update balances
    if (transferSource === 'main') {
      setAccount({
        mainBalance: account.mainBalance - amount,
        savingsBalance: account.savingsBalance + amount
      });
    } else {
      setAccount({
        mainBalance: account.mainBalance + amount,
        savingsBalance: account.savingsBalance - amount
      });
    }
    
    // Update transactions list
    setTransactions([newTransaction, ...transactions]);
  };

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <Header user={mockUser} />
      
      <main className="flex-grow p-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Welcome back, {mockUser.name.split(' ')[0]}!</h2>
          <p className="text-neutral">Manage your chambers wisely</p>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ChamberCard 
            title="Main Account Chamber"
            balance={account.mainBalance}
            gradient="purple"
            onTransfer={() => openTransferDialog('main')}
          />
          <ChamberCard 
            title="Savings Chamber"
            balance={account.savingsBalance}
            gradient="blue"
            onTransfer={() => openTransferDialog('savings')}
          />
        </div>
        
        <TransactionsList transactions={transactions} />
      </main>
      
      <BottomNav />
      
      <TransferDialog 
        isOpen={transferDialogOpen}
        onClose={() => setTransferDialogOpen(false)}
        sourceType={transferSource}
        sourceBalance={transferSource === 'main' ? account.mainBalance : account.savingsBalance}
        onTransfer={handleTransfer}
      />
    </div>
  );
};

export default Index;
