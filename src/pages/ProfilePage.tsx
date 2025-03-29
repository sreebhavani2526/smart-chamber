
import React from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { mockUser } from '@/services/mockData';
import { User, Settings, CreditCard, Bell, Shield, LogOut } from 'lucide-react';

const ProfilePage = () => {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      <Header user={mockUser} />
      
      <main className="flex-grow p-4">
        <Card className="p-6 mb-6 flex flex-col items-center">
          <Avatar className="h-20 w-20 mb-4">
            <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
            <AvatarFallback className="bg-main text-white text-xl">
              {mockUser.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold">{mockUser.name}</h2>
          <p className="text-neutral">{mockUser.email}</p>
          <Button variant="outline" size="sm" className="mt-4">
            Edit Profile
          </Button>
        </Card>
        
        <div className="space-y-2">
          <ProfileMenuItem icon={<User size={20} />} text="Account Information" />
          <ProfileMenuItem icon={<CreditCard size={20} />} text="Payment Methods" />
          <ProfileMenuItem icon={<Bell size={20} />} text="Notifications" />
          <ProfileMenuItem icon={<Settings size={20} />} text="Preferences" />
          <ProfileMenuItem icon={<Shield size={20} />} text="Privacy & Security" />
          <ProfileMenuItem 
            icon={<LogOut size={20} />} 
            text="Log Out" 
            className="text-red-500"
          />
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

interface ProfileMenuItemProps {
  icon: React.ReactNode;
  text: string;
  className?: string;
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({ icon, text, className }) => {
  return (
    <div className={`flex items-center justify-between p-4 bg-white rounded-lg border border-border hover:bg-secondary/50 transition-colors cursor-pointer ${className}`}>
      <div className="flex items-center">
        <div className="mr-3 text-neutral">{icon}</div>
        <span>{text}</span>
      </div>
      <div>›</div>
    </div>
  );
};

export default ProfilePage;
