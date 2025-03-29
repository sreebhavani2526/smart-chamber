
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/services/mockData';

interface ChamberCardProps {
  title: string;
  balance: number;
  gradient: 'purple' | 'blue';
  onTransfer: () => void;
}

const ChamberCard: React.FC<ChamberCardProps> = ({ title, balance, gradient, onTransfer }) => {
  return (
    <Card className={`chamber-card ${gradient === 'purple' ? 'gradient-purple' : 'gradient-blue'} text-white p-1 h-40`}>
      <CardContent className="p-4 h-full flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-medium opacity-90">{title}</h3>
          <p className="text-2xl font-bold mt-1">{formatCurrency(balance)}</p>
          <p className="text-xs mt-1 opacity-80">Available Balance</p>
        </div>
        <div className="flex justify-end">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-white/20 p-2"
            onClick={onTransfer}
          >
            <ArrowUpRight size={18} />
            <span className="ml-1">Transfer</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChamberCard;
