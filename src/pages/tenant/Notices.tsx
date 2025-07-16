import { motion } from 'framer-motion';
import { Bell, Calendar, User, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const mockNotices = [
  {
    id: 1,
    title: "Monthly Maintenance Update",
    message: "Dear Residents, we will be conducting routine maintenance of the water pumps on January 25th from 10 AM to 2 PM. Please store water in advance. We apologize for any inconvenience.",
    date: "2024-01-22",
    createdBy: "Admin",
    priority: "high"
  },
  {
    id: 2,
    title: "New Laundry Schedule",
    message: "We have updated the laundry schedule. Each room will now have designated laundry days to ensure better service. Please check your room schedule for updated timings.",
    date: "2024-01-20",
    createdBy: "Admin",
    priority: "medium"
  },
  {
    id: 3,
    title: "WiFi Password Updated",
    message: "The WiFi password has been updated for security purposes. New password: StayNest2024@Secure. Please update your devices accordingly.",
    date: "2024-01-18",
    createdBy: "Admin",
    priority: "medium"
  },
  {
    id: 4,
    title: "Rent Payment Reminder",
    message: "This is a friendly reminder that February rent payments are due by February 1st. Please ensure timely payment to avoid any late fees. Thank you for your cooperation.",
    date: "2024-01-15",
    createdBy: "Admin",
    priority: "low"
  },
  {
    id: 5,
    title: "Community Event - Game Night",
    message: "Join us for a fun community game night this Saturday at 7 PM in the common area. Snacks and refreshments will be provided. It's a great opportunity to meet your fellow residents!",
    date: "2024-01-12",
    createdBy: "Admin",
    priority: "low"
  }
];

export default function Notices() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return '🔴';
      case 'medium':
        return '🟡';
      default:
        return '🟢';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
          Notice Board
        </h1>

        <div className="space-y-4">
          {mockNotices.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="bg-card-glass backdrop-blur-sm border-primary/20 text-center py-12">
                <CardContent>
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No notices yet</h3>
                  <p className="text-muted-foreground">New announcements will appear here</p>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            mockNotices.map((notice, index) => (
              <motion.div
                key={notice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-card-glass backdrop-blur-sm border-primary/20 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-primary" />
                        <span>{notice.title}</span>
                      </div>
                      <Badge variant={getPriorityColor(notice.priority)}>
                        {getPriorityIcon(notice.priority)} {notice.priority}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {notice.message}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(notice.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{notice.createdBy}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}