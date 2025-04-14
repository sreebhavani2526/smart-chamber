
import { supabase } from "@/integrations/supabase/client";
import { SavingsGoal, GoalCategory } from "@/types";

export const fetchSavingsGoals = async (userId: string): Promise<SavingsGoal[]> => {
  const { data, error } = await supabase
    .from('savings_goals')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching goals:", error);
    return [];
  }

  return data.map(item => ({
    id: item.id,
    title: item.title,
    targetAmount: parseFloat(item.target_amount),
    currentAmount: parseFloat(item.current_amount),
    deadline: new Date(item.deadline),
    category: item.category as GoalCategory,
    createdAt: new Date(item.created_at)
  }));
};

export const createSavingsGoal = async (
  userId: string,
  title: string,
  targetAmount: number,
  deadline: Date,
  category: GoalCategory
): Promise<{ goal: SavingsGoal | null; error: any }> => {
  try {
    const { data, error } = await supabase
      .from('savings_goals')
      .insert({
        user_id: userId,
        title,
        target_amount: targetAmount,
        current_amount: 0,
        deadline,
        category
      })
      .select()
      .single();

    if (error) {
      return { goal: null, error };
    }

    const goal: SavingsGoal = {
      id: data.id,
      title: data.title,
      targetAmount: parseFloat(data.target_amount),
      currentAmount: parseFloat(data.current_amount),
      deadline: new Date(data.deadline),
      category: data.category as GoalCategory,
      createdAt: new Date(data.created_at)
    };

    return { goal, error: null };
  } catch (err) {
    return { goal: null, error: err };
  }
};

export const contributeToGoal = async (
  userId: string,
  goalId: string,
  amount: number
): Promise<{ error: any }> => {
  try {
    // First get the goal to update
    const { data: goalData, error: goalError } = await supabase
      .from('savings_goals')
      .select('current_amount, title')
      .eq('id', goalId)
      .single();

    if (goalError) {
      return { error: goalError };
    }

    // Update the goal's current amount
    const newAmount = parseFloat(goalData.current_amount) + amount;
    const { error: updateError } = await supabase
      .from('savings_goals')
      .update({ current_amount: newAmount })
      .eq('id', goalId);

    if (updateError) {
      return { error: updateError };
    }

    return { error: null };
  } catch (err) {
    return { error: err };
  }
};
