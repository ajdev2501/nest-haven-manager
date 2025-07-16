import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Home, Edit, Trash2, Users, DollarSign, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const mockRooms = [
  {
    id: 1,
    roomNumber: "A-101",
    type: "Single AC",
    rent: 12000,
    isOccupied: true,
    tenant: "Sarah Johnson",
    tenantId: "T001"
  },
  {
    id: 2,
    roomNumber: "A-102",
    type: "Single Non-AC",
    rent: 8000,
    isOccupied: false,
    tenant: null,
    tenantId: null
  },
  {
    id: 3,
    roomNumber: "B-201",
    type: "Shared AC",
    rent: 6000,
    isOccupied: true,
    tenant: "Mike Chen",
    tenantId: "T002"
  },
  {
    id: 4,
    roomNumber: "B-202",
    type: "Single AC",
    rent: 12000,
    isOccupied: false,
    tenant: null,
    tenantId: null
  }
];

const mockTenants = [
  { id: "T003", name: "Emma Wilson" },
  { id: "T004", name: "John Doe" },
  { id: "T005", name: "Lisa Brown" }
];

export default function Rooms() {
  const [rooms, setRooms] = useState(mockRooms);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<any>(null);
  const [newRoom, setNewRoom] = useState({
    roomNumber: '',
    type: '',
    rent: ''
  });
  const { toast } = useToast();

  const handleSubmitRoom = () => {
    if (!newRoom.roomNumber || !newRoom.type || !newRoom.rent) {
      toast({
        title: "Please fill all fields",
        variant: "destructive"
      });
      return;
    }

    if (editingRoom) {
      setRooms(rooms.map(room => 
        room.id === editingRoom.id 
          ? { ...room, ...newRoom, rent: parseInt(newRoom.rent) }
          : room
      ));
      toast({ title: "Room updated successfully!" });
      setEditingRoom(null);
    } else {
      const room = {
        id: rooms.length + 1,
        ...newRoom,
        rent: parseInt(newRoom.rent),
        isOccupied: false,
        tenant: null,
        tenantId: null
      };
      setRooms([...rooms, room]);
      toast({ title: "Room created successfully!" });
    }

    setNewRoom({ roomNumber: '', type: '', rent: '' });
    setIsDialogOpen(false);
  };

  const handleEditRoom = (room: any) => {
    setEditingRoom(room);
    setNewRoom({
      roomNumber: room.roomNumber,
      type: room.type,
      rent: room.rent.toString()
    });
    setIsDialogOpen(true);
  };

  const handleDeleteRoom = (id: number) => {
    setRooms(rooms.filter(room => room.id !== id));
    toast({ title: "Room deleted successfully!" });
  };

  const handleAssignTenant = (roomId: number, tenantId: string) => {
    const tenant = mockTenants.find(t => t.id === tenantId);
    setRooms(rooms.map(room => 
      room.id === roomId 
        ? { ...room, isOccupied: true, tenant: tenant?.name, tenantId }
        : room
    ));
    toast({ title: "Tenant assigned successfully!" });
  };

  const occupiedRooms = rooms.filter(room => room.isOccupied).length;
  const occupancyRate = Math.round((occupiedRooms / rooms.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Room Management
          </h1>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-primary-light">
                <Plus className="h-4 w-4 mr-2" />
                Add Room
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingRoom ? 'Edit Room' : 'Add New Room'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="roomNumber">Room Number</Label>
                  <Input
                    id="roomNumber"
                    value={newRoom.roomNumber}
                    onChange={(e) => setNewRoom({...newRoom, roomNumber: e.target.value})}
                    placeholder="e.g., A-101"
                  />
                </div>
                
                <div>
                  <Label htmlFor="type">Room Type</Label>
                  <Select value={newRoom.type} onValueChange={(value) => setNewRoom({...newRoom, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single AC">Single AC</SelectItem>
                      <SelectItem value="Single Non-AC">Single Non-AC</SelectItem>
                      <SelectItem value="Shared AC">Shared AC</SelectItem>
                      <SelectItem value="Shared Non-AC">Shared Non-AC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="rent">Monthly Rent (₹)</Label>
                  <Input
                    id="rent"
                    type="number"
                    value={newRoom.rent}
                    onChange={(e) => setNewRoom({...newRoom, rent: e.target.value})}
                    placeholder="e.g., 12000"
                  />
                </div>
                
                <Button onClick={handleSubmitRoom} className="w-full">
                  {editingRoom ? 'Update Room' : 'Add Room'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-card-glass backdrop-blur-sm border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground">Total Rooms</p>
                    <p className="text-2xl font-bold">{rooms.length}</p>
                  </div>
                  <Home className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-card-glass backdrop-blur-sm border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground">Occupied</p>
                    <p className="text-2xl font-bold">{occupiedRooms}</p>
                  </div>
                  <Users className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-card-glass backdrop-blur-sm border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground">Occupancy Rate</p>
                    <p className="text-2xl font-bold">{occupancyRate}%</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Card className="bg-card-glass backdrop-blur-sm border-primary/20 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Home className="h-5 w-5 text-primary" />
                      <span>{room.roomNumber}</span>
                    </div>
                    <Badge variant={room.isOccupied ? 'default' : 'secondary'}>
                      {room.isOccupied ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                      {room.isOccupied ? 'Occupied' : 'Vacant'}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-medium">{room.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rent:</span>
                      <span className="font-bold text-primary">₹{room.rent.toLocaleString()}</span>
                    </div>
                    {room.tenant && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tenant:</span>
                        <span className="font-medium">{room.tenant}</span>
                      </div>
                    )}
                  </div>

                  {!room.isOccupied && (
                    <Select onValueChange={(value) => handleAssignTenant(room.id, value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Assign tenant" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockTenants.map((tenant) => (
                          <SelectItem key={tenant.id} value={tenant.id}>
                            {tenant.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleEditRoom(room)}
                      className="flex-1"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleDeleteRoom(room.id)}
                      className="flex-1 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}