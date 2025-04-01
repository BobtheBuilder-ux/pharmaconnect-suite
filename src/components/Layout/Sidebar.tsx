
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  FileText,
  UserCircle,
  BarChart3,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div
      className={cn(
        'bg-sidebar border-r h-screen flex flex-col transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      <div className="p-4 border-b flex items-center justify-between">
        {!collapsed && (
          <div className="font-bold text-xl text-medical-primary">PharmaConnect</div>
        )}
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>

      <div className="flex flex-col flex-grow overflow-y-auto p-2">
        <NavItem to="/" icon={<LayoutDashboard size={20} />} collapsed={collapsed}>
          Dashboard
        </NavItem>
        <NavItem to="/prescriptions" icon={<FileText size={20} />} collapsed={collapsed}>
          Prescriptions
        </NavItem>
        <NavItem to="/patients" icon={<UserCircle size={20} />} collapsed={collapsed}>
          Patients
        </NavItem>
        <NavItem to="/verification" icon={<ShieldCheck size={20} />} collapsed={collapsed}>
          Verification
        </NavItem>
        <NavItem to="/analytics" icon={<BarChart3 size={20} />} collapsed={collapsed}>
          Analytics
        </NavItem>
        <NavItem to="/settings" icon={<Settings size={20} />} collapsed={collapsed}>
          Settings
        </NavItem>
      </div>

      <div className="p-4 border-t">
        {!collapsed && (
          <div className="mb-2 text-sm">
            <div className="font-medium">{user?.name}</div>
            <div className="text-xs text-muted-foreground">{user?.role}</div>
          </div>
        )}
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start',
            collapsed && 'justify-center p-2'
          )}
          onClick={logout}
        >
          <LogOut size={20} className="mr-2" />
          {!collapsed && 'Logout'}
        </Button>
      </div>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  collapsed: boolean;
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, collapsed, children }) => {
  return (
    <Link to={to} className="block">
      <Button
        variant="ghost"
        className={cn(
          'w-full justify-start mb-1',
          collapsed && 'justify-center p-2'
        )}
      >
        <span className={cn('mr-2', collapsed && 'mr-0')}>{icon}</span>
        {!collapsed && <span>{children}</span>}
      </Button>
    </Link>
  );
};

export default Sidebar;
