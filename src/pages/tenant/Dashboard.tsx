import { motion } from 'framer-motion';
import { Home, CreditCard, Calendar, Bell, FileText, Wrench } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';

const TenantDashboard = () => {
  // Mock data for tenant
  const tenantInfo = {
    name: 'John Tenant',
    roomNumber: '101',
    rentAmount: 15000,
    rentDueDate: '2024-01-15',
    isPaid: false,
    joinDate: '2023-06-01'
  };

  const recentActivity = [
    { id: 1, type: 'payment', description: 'December rent paid', date: '2023-12-05', status: 'completed' },
    { id: 2, type: 'request', description: 'AC maintenance request', date: '2023-12-10', status: 'pending' },
    { id: 3, type: 'notice', description: 'New notice: Building maintenance', date: '2023-12-12', status: 'new' },
  ];

  const upcomingPayments = [
    { month: 'January', amount: 15000, dueDate: '2024-01-15', status: 'due' },
    { month: 'February', amount: 15000, dueDate: '2024-02-15', status: 'upcoming' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold text-foreground">Welcome back, {tenantInfo.name}!</h1>
        <p className="text-muted-foreground">Here's your room and payment summary.</p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Room Info */}
        <Card className="bg-card-glass backdrop-blur-sm border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Your Room</p>
                <p className="text-2xl font-bold text-foreground">#{tenantInfo.roomNumber}</p>
                <p className="text-xs text-muted-foreground">Since {tenantInfo.joinDate}</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <Home className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Rent */}
        <Card className="bg-card-glass backdrop-blur-sm border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Rent</p>
                <p className="text-2xl font-bold text-foreground">₹{tenantInfo.rentAmount.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Due on 15th</p>
              </div>
              <div className="p-3 rounded-xl bg-success/10">
                <CreditCard className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Status */}
        <Card className="bg-card-glass backdrop-blur-sm border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Payment Status</p>
                <Badge 
                  variant={tenantInfo.isPaid ? 'default' : 'destructive'}
                  className={tenantInfo.isPaid ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}
                >
                  {tenantInfo.isPaid ? 'Paid' : 'Due'}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">January 2024</p>
              </div>
              <div className={`p-3 rounded-xl ${tenantInfo.isPaid ? 'bg-success/10' : 'bg-destructive/10'}`}>
                <Calendar className={`h-6 w-6 ${tenantInfo.isPaid ? 'text-success' : 'text-destructive'}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Payment Section */}
      <motion.div variants={itemVariants}>
        <Card className="bg-card-glass backdrop-blur-sm border-0 shadow-soft">
          <CardHeader>
            <CardTitle>Upcoming Payments</CardTitle>
            <CardDescription>Your rent payment schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingPayments.map((payment, index) => (
                <motion.div
                  key={payment.month}
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-foreground">{payment.month} 2024</p>
                    <p className="text-sm text-muted-foreground">Due: {payment.dueDate}</p>
                  </div>
                  <div className="text-right flex items-center space-x-4">
                    <div>
                      <p className="font-medium text-foreground">₹{payment.amount.toLocaleString()}</p>
                      <Badge 
                        variant={payment.status === 'due' ? 'destructive' : 'secondary'}
                        className={payment.status === 'due' ? 'bg-destructive/10 text-destructive' : 'bg-muted text-muted-foreground'}
                      >
                        {payment.status}
                      </Badge>
                    </div>
                    {payment.status === 'due' && (
                      <Button size="sm" className="bg-gradient-primary">
                        Pay Now
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity */}
      <motion.div variants={itemVariants}>
        <Card className="bg-card-glass backdrop-blur-sm border-0 shadow-soft">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent transactions and requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <motion.div
                  key={activity.id}
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {activity.type === 'payment' && <CreditCard className="h-5 w-5 text-primary" />}
                      {activity.type === 'request' && <Wrench className="h-5 w-5 text-warning" />}
                      {activity.type === 'notice' && <Bell className="h-5 w-5 text-success" />}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{activity.description}</p>
                      <p className="text-sm text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={
                      activity.status === 'completed' ? 'default' : 
                      activity.status === 'pending' ? 'secondary' : 'destructive'
                    }
                    className={
                      activity.status === 'completed' ? 'bg-success/10 text-success' :
                      activity.status === 'pending' ? 'bg-warning/10 text-warning' :
                      'bg-primary/10 text-primary'
                    }
                  >
                    {activity.status}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <Card className="bg-card-glass backdrop-blur-sm border-0 shadow-soft">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you might need</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <CreditCard className="h-6 w-6" />
                <span className="text-sm">Pay Rent</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Wrench className="h-6 w-6" />
                <span className="text-sm">Service Request</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <FileText className="h-6 w-6" />
                <span className="text-sm">View Documents</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Bell className="h-6 w-6" />
                <span className="text-sm">View Notices</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default TenantDashboard;