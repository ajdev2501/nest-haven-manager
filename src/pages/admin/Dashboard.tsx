import { motion } from 'framer-motion';
import { Users, Home, DollarSign, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Progress } from '../../components/ui/progress';
import { Badge } from '../../components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  // Mock data
  const stats = [
    { title: 'Total Tenants', value: '24', change: '+2', icon: Users, color: 'text-primary' },
    { title: 'Total Rooms', value: '30', change: '0', icon: Home, color: 'text-success' },
    { title: 'Monthly Revenue', value: '₹45,000', change: '+12%', icon: DollarSign, color: 'text-warning' },
    { title: 'Occupancy Rate', value: '80%', change: '+5%', icon: TrendingUp, color: 'text-destructive' },
  ];

  const revenueData = [
    { month: 'Jan', amount: 35000 },
    { month: 'Feb', amount: 42000 },
    { month: 'Mar', amount: 38000 },
    { month: 'Apr', amount: 45000 },
    { month: 'May', amount: 48000 },
    { month: 'Jun', amount: 45000 },
  ];

  const occupancyData = [
    { name: 'Occupied', value: 24, color: 'hsl(var(--primary))' },
    { name: 'Vacant', value: 6, color: 'hsl(var(--muted))' },
  ];

  const recentRequests = [
    { id: 1, tenant: 'John Doe', type: 'Maintenance', room: '101', status: 'pending', time: '2 hours ago' },
    { id: 2, tenant: 'Jane Smith', type: 'Cleaning', room: '205', status: 'resolved', time: '1 day ago' },
    { id: 3, tenant: 'Mike Johnson', type: 'Maintenance', room: '303', status: 'pending', time: '3 hours ago' },
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
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening at StayNest.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="bg-card-glass backdrop-blur-sm border-0 shadow-soft hover:shadow-elevated transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-success">
                      {stat.change.startsWith('+') ? '↗' : stat.change === '0' ? '→' : '↘'} {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl bg-primary/10`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div variants={itemVariants}>
          <Card className="bg-card-glass backdrop-blur-sm border-0 shadow-soft">
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
              <CardDescription>Revenue trends for the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Occupancy Chart */}
        <motion.div variants={itemVariants}>
          <Card className="bg-card-glass backdrop-blur-sm border-0 shadow-soft">
            <CardHeader>
              <CardTitle>Room Occupancy</CardTitle>
              <CardDescription>Current occupancy distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={occupancyData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {occupancyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Requests */}
      <motion.div variants={itemVariants}>
        <Card className="bg-card-glass backdrop-blur-sm border-0 shadow-soft">
          <CardHeader>
            <CardTitle>Recent Service Requests</CardTitle>
            <CardDescription>Latest requests from tenants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRequests.map((request) => (
                <motion.div
                  key={request.id}
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {request.status === 'resolved' ? (
                        <CheckCircle className="h-5 w-5 text-success" />
                      ) : (
                        <Clock className="h-5 w-5 text-warning" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{request.tenant}</p>
                      <p className="text-sm text-muted-foreground">
                        {request.type} • Room {request.room}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={request.status === 'resolved' ? 'default' : 'secondary'}
                      className={request.status === 'resolved' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}
                    >
                      {request.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{request.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;