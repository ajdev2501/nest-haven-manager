import { motion } from 'framer-motion';
import { Home, User, LogOut, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b bg-card-glass backdrop-blur-xl shadow-soft"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-primary shadow-elevated">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                StayNest
              </h1>
              <p className="text-xs text-muted-foreground">PG Management</p>
            </div>
          </motion.div>

          {user && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;