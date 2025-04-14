
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ChamberCard from '@/components/ChamberCard';
import TransactionsList from '@/components/TransactionsList';
import BottomNav from '@/components/BottomNav';
import TransferDialog from '@/components/TransferDialog';
import { TransactionChamber, Transaction } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { fetchTransactions, createTransaction } from '@/services/transactionService';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const { user, account, refreshUserData } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  const [transferSource, setTransferSource] = useState<TransactionChamber>('main');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadTransactions();
    }
  }, [user]);

  const loadTransactions = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const data = await fetchTransactions(user.id);
      setTransactions(data);
    } catch (error) {
      console.error("Error loading transactions:", error);
      toast({
        title: "Error",
        description: "Failed to load transactions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const openTransferDialog = (source: TransactionChamber) => {
    setTransferSource(source);
    setTransferDialogOpen(true);
  };
  
  const handleTransfer = async (amount: number) => {
    if (!user || !account) return;
    
    try {
      // Create new transaction
      const description = transferSource === 'main' 
        ? 'Transfer to Savings Chamber' 
        : 'Transfer to Main Account';
        
      const { transaction, error } = await createTransaction(
        user.id,
        amount,
        'transfer',
        transferSource,
        description,
        'Transfer'
      );
      
      if (error) {
        throw error;
      }
      
      // Refresh data
      await refreshUserData();
      await loadTransactions();
      
      toast({
        title: "Transfer successful",
        description: `${amount.toFixed(2)} has been transferred ${transferSource === 'main' ? 'to Savings' : 'to Main Account'}.`,
      });
    } catch (error) {
      console.error("Transfer error:", error);
      toast({
        title: "Transfer failed",
        description: "There was an error processing your transfer. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!user || !account) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <Header user={user} />
      
      <main className="flex-grow p-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Welcome back, {user.name.split(' ')[0]}!</h2>
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
        
        <TransactionsList 
          transactions={transactions} 
          isLoading={loading}
        />
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
