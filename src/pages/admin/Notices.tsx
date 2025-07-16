import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Bell, Calendar, Edit, Trash2, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const mockNotices = [
  {
    id: 1,
    title: "Monthly Maintenance Update",
    message: "Dear Residents, we will be conducting routine maintenance of the water pumps on January 25th from 10 AM to 2 PM. Please store water in advance. We apologize for any inconvenience.",
    date: "2024-01-22",
    priority: "high",
    createdBy: "Admin"
  },
  {
    id: 2,
    title: "New Laundry Schedule",
    message: "We have updated the laundry schedule. Each room will now have designated laundry days to ensure better service. Please check your room schedule for updated timings.",
    date: "2024-01-20",
    priority: "medium",
    createdBy: "Admin"
  },
  {
    id: 3,
    title: "WiFi Password Updated",
    message: "The WiFi password has been updated for security purposes. New password: StayNest2024@Secure. Please update your devices accordingly.",
    date: "2024-01-18",
    priority: "medium",
    createdBy: "Admin"
  },
  {
    id: 4,
    title: "Community Event - Game Night",
    message: "Join us for a fun community game night this Saturday at 7 PM in the common area. Snacks and refreshments will be provided. It's a great opportunity to meet your fellow residents!",
    date: "2024-01-12",
    priority: "low",
    createdBy: "Admin"
  }
];

export default function AdminNotices() {
  const [notices, setNotices] = useState(mockNotices);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<any>(null);
  const [newNotice, setNewNotice] = useState({
    title: '',
    message: '',
    priority: 'medium'
  });
  const { toast } = useToast();

  const handleSubmitNotice = () => {
    if (!newNotice.title || !newNotice.message) {
      toast({
        title: "Please fill all fields",
        variant: "destructive"
      });
      return;
    }

    if (editingNotice) {
      setNotices(notices.map(notice => 
        notice.id === editingNotice.id 
          ? { ...notice, ...newNotice, date: new Date().toISOString().split('T')[0] }
          : notice
      ));
      toast({ title: "Notice updated successfully!" });
      setEditingNotice(null);
    } else {
      const notice = {
        id: notices.length + 1,
        ...newNotice,
        date: new Date().toISOString().split('T')[0],
        createdBy: "Admin"
      };
      setNotices([notice, ...notices]);
      toast({ title: "Notice posted successfully!" });
    }

    setNewNotice({ title: '', message: '', priority: 'medium' });
    setIsDialogOpen(false);
  };

  const handleEditNotice = (notice: any) => {
    setEditingNotice(notice);
    setNewNotice({
      title: notice.title,
      message: notice.message,
      priority: notice.priority
    });
    setIsDialogOpen(true);
  };

  const handleDeleteNotice = (id: number) => {
    setNotices(notices.filter(notice => notice.id !== id));
    toast({ title: "Notice deleted successfully!" });
  };

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
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Notice Management
          </h1>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-primary-light">
                <Plus className="h-4 w-4 mr-2" />
                Post Notice
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingNotice ? 'Edit Notice' : 'Post New Notice'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newNotice.title}
                    onChange={(e) => setNewNotice({...newNotice, title: e.target.value})}
                    placeholder="Notice title"
                  />
                </div>
                
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={newNotice.priority} onValueChange={(value) => setNewNotice({...newNotice, priority: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={newNotice.message}
                    onChange={(e) => setNewNotice({...newNotice, message: e.target.value})}
                    placeholder="Write your notice message here..."
                    rows={6}
                  />
                </div>
                
                <Button onClick={handleSubmitNotice} className="w-full">
                  {editingNotice ? 'Update Notice' : 'Post Notice'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-card-glass backdrop-blur-sm border-primary/20">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="flex items-center gap-3">
                  <Bell className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-muted-foreground">Total Notices</p>
                    <p className="text-2xl font-bold">{notices.length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🔴</div>
                  <div>
                    <p className="text-muted-foreground">High Priority</p>
                    <p className="text-2xl font-bold">{notices.filter(n => n.priority === 'high').length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🟡</div>
                  <div>
                    <p className="text-muted-foreground">Medium Priority</p>
                    <p className="text-2xl font-bold">{notices.filter(n => n.priority === 'medium').length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🟢</div>
                  <div>
                    <p className="text-muted-foreground">Low Priority</p>
                    <p className="text-2xl font-bold">{notices.filter(n => n.priority === 'low').length}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notices List */}
        <div className="space-y-4">
          {notices.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="bg-card-glass backdrop-blur-sm border-primary/20 text-center py-12">
                <CardContent>
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No notices posted</h3>
                  <p className="text-muted-foreground">Click "Post Notice" to create your first announcement</p>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            notices.map((notice, index) => (
              <motion.div
                key={notice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card className="bg-card-glass backdrop-blur-sm border-primary/20 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-primary" />
                        <span>{notice.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getPriorityColor(notice.priority)}>
                          {getPriorityIcon(notice.priority)} {notice.priority}
                        </Badge>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditNotice(notice)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteNotice(notice.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {notice.message}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Posted on {new Date(notice.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                      <span>By {notice.createdBy}</span>
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