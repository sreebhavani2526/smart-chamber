
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { SavingsGoal } from '@/types';
import { formatCurrency } from '@/services/mockData';

interface ContributeToGoalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  goal: SavingsGoal | null;
  availableBalance: number;
  onContribute: (goalId: string, amount: number) => void;
}

const ContributeToGoalDialog: React.FC<ContributeToGoalDialogProps> = ({ 
  isOpen, 
  onClose, 
  goal, 
  availableBalance,
  onContribute 
}) => {
  const [amount, setAmount] = useState('');
  
  const handleContribute = () => {
    if (!goal) return;
    
    const contributionAmount = parseFloat(amount);
    
    if (isNaN(contributionAmount) || contributionAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount greater than 0.",
        variant: "destructive",
      });
      return;
    }
    
    if (contributionAmount > availableBalance) {
      toast({
        title: "Insufficient funds",
        description: "You don't have enough funds in your account.",
        variant: "destructive",
      });
      return;
    }
    
    onContribute(goal.id, contributionAmount);
    setAmount('');
    onClose();
    
    toast({
      title: "Contribution successful",
      description: `${formatCurrency(contributionAmount)} has been added to your "${goal.title}" goal.`,
    });
  };
  
  const remainingToTarget = goal ? goal.targetAmount - goal.currentAmount : 0;
  
  return (
    <Dialog open={isOpen && !!goal} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contribute to Goal</DialogTitle>
        </DialogHeader>
        {goal && (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <p className="text-sm font-medium">{goal.title}</p>
              <p className="text-xs text-muted-foreground">
                Current: {formatCurrency(goal.currentAmount)} | 
                Target: {formatCurrency(goal.targetAmount)} | 
                Remaining: {formatCurrency(remainingToTarget)}
              </p>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="contribution">Contribution Amount</Label>
              <Input
                id="contribution"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Available balance: {formatCurrency(availableBalance)}
              </p>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleContribute} className="bg-main hover:bg-main-dark">
            Contribute
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContributeToGoalDialog;
