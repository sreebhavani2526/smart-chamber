
import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GoalCard from '@/components/GoalCard';
import NewGoalForm from '@/components/NewGoalForm';
import ContributeToGoalDialog from '@/components/ContributeToGoalDialog';
import BottomNav from '@/components/BottomNav';
import { SavingsGoal, GoalCategory } from '@/types';
import { mockSavingsGoals, mockAccount } from '@/services/mockData';
import { toast } from '@/components/ui/use-toast';

const GoalsPage = () => {
  const [account, setAccount] = useState(mockAccount);
  const [goals, setGoals] = useState<SavingsGoal[]>(mockSavingsGoals);
  const [isNewGoalFormOpen, setIsNewGoalFormOpen] = useState(false);
  const [isContributeDialogOpen, setIsContributeDialogOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<SavingsGoal | null>(null);

  const handleCreateGoal = (goalData: {
    title: string;
    targetAmount: number;
    deadline: Date;
    category: GoalCategory;
  }) => {
    const newGoal: SavingsGoal = {
      id: `goal${Date.now()}`,
      title: goalData.title,
      targetAmount: goalData.targetAmount,
      currentAmount: 0,
      deadline: goalData.deadline,
      category: goalData.category,
      createdAt: new Date()
    };
    
    setGoals([...goals, newGoal]);
    
    toast({
      title: "Goal created",
      description: `Your new savings goal "${newGoal.title}" has been created.`
    });
  };

  const handleOpenContribute = (goalId: string) => {
    const goal = goals.find(g => g.id === goalId);
    if (goal) {
      setSelectedGoal(goal);
      setIsContributeDialogOpen(true);
    }
  };

  const handleContribute = (goalId: string, amount: number) => {
    // Update the goal's current amount
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        return {
          ...goal,
          currentAmount: goal.currentAmount + amount
        };
      }
      return goal;
    }));
    
    // Deduct from savings balance
    setAccount({
      ...account,
      savingsBalance: account.savingsBalance - amount
    });
  };

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <header className="bg-main text-white p-4">
        <h1 className="text-xl font-bold">Savings Goals</h1>
        <p className="text-sm opacity-90">Track and manage your financial targets</p>
      </header>
      
      <main className="flex-grow p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-medium">Your Goals</h2>
            <p className="text-sm text-muted-foreground">
              {goals.length > 0 
                ? `You have ${goals.length} active savings goal${goals.length !== 1 ? 's' : ''}` 
                : 'Start by creating your first savings goal'}
            </p>
          </div>
          <Button 
            onClick={() => setIsNewGoalFormOpen(true)} 
            className="bg-main hover:bg-main-dark"
          >
            <PlusCircle size={16} className="mr-1" />
            New Goal
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {goals.map(goal => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onContribute={handleOpenContribute}
            />
          ))}
          
          {goals.length === 0 && (
            <div className="col-span-full py-8 text-center">
              <p className="text-muted-foreground">
                You don't have any savings goals yet.
              </p>
              <Button 
                onClick={() => setIsNewGoalFormOpen(true)} 
                variant="outline" 
                className="mt-4"
              >
                Create your first goal
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <BottomNav />
      
      <NewGoalForm
        isOpen={isNewGoalFormOpen}
        onClose={() => setIsNewGoalFormOpen(false)}
        onCreateGoal={handleCreateGoal}
      />
      
      <ContributeToGoalDialog
        isOpen={isContributeDialogOpen}
        onClose={() => {
          setIsContributeDialogOpen(false);
          setSelectedGoal(null);
        }}
        goal={selectedGoal}
        availableBalance={account.savingsBalance}
        onContribute={handleContribute}
      />
    </div>
  );
};

export default GoalsPage;
