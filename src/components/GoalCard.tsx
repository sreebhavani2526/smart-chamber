
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/services/mockData";
import { SavingsGoal } from "@/types";
import { Calendar, Target } from "lucide-react";
import { format } from "date-fns";

interface GoalCardProps {
  goal: SavingsGoal;
  onContribute: (goalId: string) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onContribute }) => {
  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const remainingAmount = goal.targetAmount - goal.currentAmount;
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'vacation': return 'bg-amber-100 text-amber-800';
      case 'emergency': return 'bg-red-100 text-red-800';
      case 'education': return 'bg-blue-100 text-blue-800';
      case 'housing': return 'bg-green-100 text-green-800';
      case 'retirement': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-lg">{goal.title}</h3>
            <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${getCategoryColor(goal.category)}`}>
              {goal.category.charAt(0).toUpperCase() + goal.category.slice(1)}
            </span>
          </div>
          <button 
            onClick={() => onContribute(goal.id)}
            className="text-xs bg-main text-white px-3 py-1 rounded-full hover:bg-main-dark transition-colors"
          >
            Contribute
          </button>
        </div>
        
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span>{formatCurrency(goal.currentAmount)}</span>
            <span>{formatCurrency(goal.targetAmount)}</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1">
            {remainingAmount > 0 
              ? `${formatCurrency(remainingAmount)} left to reach your goal` 
              : "Goal completed!"}
          </p>
        </div>
        
        <div className="text-xs text-muted-foreground flex items-center">
          <Calendar size={14} className="mr-1" />
          <span>Target date: {format(goal.deadline, 'MMM d, yyyy')}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalCard;
