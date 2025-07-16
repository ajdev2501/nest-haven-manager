import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wrench, Clock, CheckCircle, XCircle, Calendar, User, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const mockRequests = [
  {
    id: 1,
    tenantName: "Sarah Johnson",
    roomNumber: "A-101",
    type: "maintenance",
    title: "AC Not Working",
    description: "The air conditioner in my room has stopped cooling properly. It was working fine yesterday but today it's just blowing warm air.",
    status: "pending",
    priority: "high",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-20"
  },
  {
    id: 2,
    tenantName: "Mike Chen",
    roomNumber: "B-201",
    type: "cleaning",
    title: "Deep Cleaning Request",
    description: "Need deep cleaning for the room before month end. There are some stains on the carpet that need professional cleaning.",
    status: "in-progress",
    priority: "medium",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-19"
  },
  {
    id: 3,
    tenantName: "John Doe",
    roomNumber: "C-301",
    type: "maintenance",
    title: "Bathroom Tap Leaking",
    description: "The bathroom tap has been leaking for 2 days. Water is continuously dripping and making noise.",
    status: "resolved",
    priority: "medium",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-17"
  },
  {
    id: 4,
    tenantName: "Emma Wilson",
    roomNumber: "A-102",
    type: "maintenance",
    title: "Electrical Issue",
    description: "Power outlet in the study area is not working. Need an electrician to check and fix the issue.",
    status: "pending",
    priority: "high",
    createdAt: "2024-01-22",
    updatedAt: "2024-01-22"
  },
  {
    id: 5,
    tenantName: "Sarah Johnson",
    roomNumber: "A-101",
    type: "cleaning",
    title: "Weekly Cleaning",
    description: "Regular weekly cleaning service for the room and bathroom.",
    status: "resolved",
    priority: "low",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-16"
  }
];

export default function AdminRequests() {
  const [requests, setRequests] = useState(mockRequests);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const { toast } = useToast();

  const filteredRequests = requests.filter(request => {
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesType = typeFilter === 'all' || request.type === typeFilter;
    return matchesStatus && matchesType;
  });

  const handleStatusUpdate = (id: number, newStatus: string) => {
    setRequests(requests.map(request => 
      request.id === id 
        ? { ...request, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] }
        : request
    ));
    toast({ 
      title: `Request ${newStatus === 'resolved' ? 'resolved' : 'updated'} successfully!`,
      description: `The request has been marked as ${newStatus}.`
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'default';
      case 'in-progress':
        return 'secondary';
      case 'pending':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-destructive';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'maintenance' ? 
      <Wrench className="h-4 w-4 text-primary" /> : 
      <MessageSquare className="h-4 w-4 text-primary" />;
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const inProgressCount = requests.filter(r => r.status === 'in-progress').length;
  const resolvedCount = requests.filter(r => r.status === 'resolved').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
          Service Requests
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-card-glass backdrop-blur-sm border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground">Total Requests</p>
                    <p className="text-2xl font-bold">{requests.length}</p>
                  </div>
                  <Wrench className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-card-glass backdrop-blur-sm border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold">{pendingCount}</p>
                  </div>
                  <Clock className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-card-glass backdrop-blur-sm border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground">In Progress</p>
                    <p className="text-2xl font-bold">{inProgressCount}</p>
                  </div>
                  <Clock className="h-8 w-8 text-warning" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-card-glass backdrop-blur-sm border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground">Resolved</p>
                    <p className="text-2xl font-bold">{resolvedCount}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-card-glass backdrop-blur-sm border-primary/20">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="cleaning">Cleaning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <Card className="bg-card-glass backdrop-blur-sm border-primary/20 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(request.type)}
                      <span>{request.title}</span>
                      <Badge variant="outline" className={getPriorityColor(request.priority)}>
                        {request.priority} priority
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(request.status)}
                      <Badge variant={getStatusVariant(request.status)}>
                        {request.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{request.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{request.tenantName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>Room: {request.roomNumber}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    {request.status !== 'resolved' && (
                      <div className="flex gap-2">
                        {request.status === 'pending' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleStatusUpdate(request.id, 'in-progress')}
                          >
                            Start Progress
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          onClick={() => handleStatusUpdate(request.id, 'resolved')}
                          className="bg-success hover:bg-success/90"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Mark Resolved
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="bg-card-glass backdrop-blur-sm border-primary/20 text-center py-12">
              <CardContent>
                <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No requests found</h3>
                <p className="text-muted-foreground">No service requests match your current filters</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}