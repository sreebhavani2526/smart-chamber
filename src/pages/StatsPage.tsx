
import React from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { Card } from '@/components/ui/card';
import { mockUser } from '@/services/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const StatsPage = () => {
  // Mock data for the pie chart
  const savingsData = [
    { name: 'Main Account', value: 3450.75, color: '#9b87f5' },
    { name: 'Savings', value: 12500, color: '#0EA5E9' },
  ];
  
  // Mock data for spending categories
  const spendingData = [
    { name: 'Food & Groceries', value: 350, color: '#F97316' },
    { name: 'Entertainment', value: 120, color: '#D946EF' },
    { name: 'Transport', value: 200, color: '#10B981' },
    { name: 'Bills', value: 450, color: '#6366F1' },
    { name: 'Shopping', value: 180, color: '#F43F5E' },
  ];

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <Header user={mockUser} />
      
      <main className="flex-grow p-4">
        <h2 className="text-2xl font-bold mb-6">Your Statistics</h2>
        
        <Card className="p-4 mb-6">
          <h3 className="text-lg font-medium mb-4">Chamber Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={savingsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {savingsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-4">Spending by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={spendingData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {spendingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default StatsPage;
