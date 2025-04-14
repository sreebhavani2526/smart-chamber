
import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GoalCard from '@/components/GoalCard';
import NewGoalForm from '@/components/NewGoalForm';
import ContributeToGoalDialog from '@/components/ContributeToGoalDialog';
import BottomNav from '@/components/BottomNav';
import { SavingsGoal, GoalCategory, Transaction } from '@/types';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { fetchSavingsGoals, createSavingsGoal, contributeToGoal } from '@/services/goalService';
import { createTransaction } from '@/services/transactionService';

const GoalsPage = () => {
  const { user, account, refreshUserData } = useAuth();
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [isNewGoalFormOpen, setIsNewGoalFormOpen] = useState(false);
  const [isContributeDialogOpen, setIsContributeDialogOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<SavingsGoal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadGoals();
    }
  }, [user]);

  const loadGoals = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const data = await fetchSavingsGoals(user.id);
      setGoals(data);
    } catch (error) {
      console.error("Error loading goals:", error);
      toast({
        title: "Error",
        description: "Failed to load your savings goals. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGoal = async (goalData: {
    title: string;
    targetAmount: number;
    deadline: Date;
    category: GoalCategory;
  }) => {
    if (!user) return;
    
    try {
      const { goal, error } = await createSavingsGoal(
        user.id,
        goalData.title,
        goalData.targetAmount,
        goalData.deadline,
        goalData.category
      );
      
      if (error) {
        throw error;
      }
      
      if (goal) {
        setGoals(prevGoals => [...prevGoals, goal]);
        
        toast({
          title: "Goal created",
          description: `Your new savings goal "${goal.title}" has been created.`
        });
      }
    } catch (error) {
      console.error("Error creating goal:", error);
      toast({
        title: "Error",
        description: "Failed to create your savings goal. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleOpenContribute = (goalId: string) => {
    const goal = goals.find(g => g.id === goalId);
    if (goal) {
      setSelectedGoal(goal);
      setIsContributeDialogOpen(true);
    }
  };

  const handleContribute = async (goalId: string, amount: number) => {
    if (!user || !account) return;
    
    try {
      // Update the goal's current amount
      const { error: goalError } = await contributeToGoal(user.id, goalId, amount);
      
      if (goalError) {
        throw goalError;
      }
      
      // Create transaction record for the contribution
      const goalData = goals.find(g => g.id === goalId);
      const { error: transactionError } = await createTransaction(
        user.id,
        amount,
        'withdrawal',
        'savings',
        `Contribution to ${goalData?.title} goal`,
        'Savings Goal'
      );
      
      if (transactionError) {
        throw transactionError;
      }
      
      // Refresh account data and goals
      await refreshUserData();
      await loadGoals();
      
      toast({
        title: "Contribution successful",
        description: `Amount contributed to your savings goal.`,
      });
      
      // Update local state for immediate UI feedback
      setGoals(prevGoals => 
        prevGoals.map(goal => {
          if (goal.id === goalId) {
            return {
              ...goal,
              currentAmount: goal.currentAmount + amount
            };
          }
          return goal;
        })
      );
    } catch (error) {
      console.error("Error contributing to goal:", error);
      toast({
        title: "Error",
        description: "Failed to make contribution to your goal. Please try again.",
        variant: "destructive",
      });
    }
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
              {loading ? "Loading your goals..." : 
                goals.length > 0 
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
        
        {loading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="w-full h-40 bg-gray-100 animate-pulse rounded-lg"></div>
            ))}
          </div>
        ) : (
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
        )}
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
        availableBalance={account?.savingsBalance || 0}
        onContribute={handleContribute}
      />
    </div>
  );
};

export default GoalsPage;
