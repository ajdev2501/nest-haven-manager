import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Home, 
  CreditCard, 
  Bell, 
  FileText, 
  Settings,
  User,
  Wrench,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { useState } from 'react';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
  const { user } = useAuth();
  const location = useLocation();

  const adminNavItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/rooms', icon: Home, label: 'Rooms' },
    { path: '/admin/tenants', icon: Users, label: 'Tenants' },
    { path: '/admin/payments', icon: CreditCard, label: 'Payments' },
    { path: '/admin/requests', icon: Wrench, label: 'Requests' },
    { path: '/admin/notices', icon: Bell, label: 'Notices' },
  ];

  const tenantNavItems = [
    { path: '/tenant', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/tenant/profile', icon: User, label: 'Profile' },
    { path: '/tenant/room', icon: Home, label: 'My Room' },
    { path: '/tenant/requests', icon: Wrench, label: 'Requests' },
    { path: '/tenant/notices', icon: Bell, label: 'Notices' },
    { path: '/tenant/documents', icon: FileText, label: 'Documents' },
  ];

  const navItems = user?.role === 'admin' ? adminNavItems : tenantNavItems;

  const sidebarVariants = {
    expanded: { width: 256 },
    collapsed: { width: 64 }
  };

  const contentVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -10 }
  };

  return (
    <motion.aside
      variants={sidebarVariants}
      animate={isCollapsed ? 'collapsed' : 'expanded'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-card-glass backdrop-blur-xl border-r shadow-soft flex flex-col"
    >
      {/* Toggle Button */}
      <div className="p-4 flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-8 h-8 p-0"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 pb-4">
        <div className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <motion.div
                key={item.path}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <NavLink
                  to={item.path}
                  className={`
                    flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-primary text-primary-foreground shadow-soft' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }
                  `}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? 'text-primary-foreground' : ''}`} />
                  
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        variants={contentVariants}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        transition={{ duration: 0.2, delay: isCollapsed ? 0 : 0.1 }}
                        className="font-medium"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </NavLink>
              </motion.div>
            );
          })}
        </div>
      </nav>

      {/* User Info - Bottom */}
      {user && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
            
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  variants={contentVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  transition={{ duration: 0.2, delay: isCollapsed ? 0 : 0.1 }}
                  className="flex-1 min-w-0"
                >
                  <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </motion.aside>
  );
};

export default Sidebar;