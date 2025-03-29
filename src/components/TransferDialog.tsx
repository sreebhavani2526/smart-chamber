
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TransactionChamber } from '@/types';
import { formatCurrency } from '@/services/mockData';
import { toast } from "@/components/ui/use-toast";

interface TransferDialogProps {
  isOpen: boolean;
  onClose: () => void;
  sourceType: TransactionChamber;
  sourceBalance: number;
  onTransfer: (amount: number) => void;
}

const TransferDialog: React.FC<TransferDialogProps> = ({
  isOpen,
  onClose,
  sourceType,
  sourceBalance,
  onTransfer,
}) => {
  const [amount, setAmount] = useState<string>('');
  
  const handleTransfer = () => {
    const transferAmount = parseFloat(amount);
    
    if (isNaN(transferAmount) || transferAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount greater than 0.",
        variant: "destructive",
      });
      return;
    }
    
    if (transferAmount > sourceBalance) {
      toast({
        title: "Insufficient funds",
        description: `You don't have enough funds in your ${sourceType === 'main' ? 'Main Account' : 'Savings'} Chamber.`,
        variant: "destructive",
      });
      return;
    }
    
    onTransfer(transferAmount);
    setAmount('');
    onClose();
    
    toast({
      title: "Transfer successful",
      description: `${formatCurrency(transferAmount)} has been transferred to your ${sourceType === 'main' ? 'Savings' : 'Main Account'} Chamber.`,
    });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Transfer Funds</DialogTitle>
          <DialogDescription>
            Move money {sourceType === 'main' ? 'to your Savings Chamber' : 'to your Main Account Chamber'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg"
            />
            <p className="text-sm text-muted-foreground">
              Available balance: {formatCurrency(sourceBalance)}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleTransfer}
            className={sourceType === 'main' ? 'bg-main hover:bg-main-dark' : 'bg-savings hover:bg-savings-dark'}
          >
            Transfer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransferDialog;
