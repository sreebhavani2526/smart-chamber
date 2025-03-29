
import React from 'react';
import { Bell, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User as UserType } from '@/types';

interface HeaderProps {
  user: UserType;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-background shadow-sm">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-main-dark">SmartSave</h1>
      </div>
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-main rounded-full"></span>
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="bg-main text-white">
            {user.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
