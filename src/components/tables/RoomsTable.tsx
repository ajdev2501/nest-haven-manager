import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Home, Users, Edit, Trash2, UserPlus, UserMinus, Bed } from 'lucide-react';
import { Room } from '@/services/roomService';
import { Tenant } from '@/services/tenantService';

interface RoomsTableProps {
  rooms: Room[];
  tenants: Tenant[];
  onEdit: (room: Room) => void;
  onDelete: (roomId: string) => void;
  onAssignTenant: (roomId: string, tenantId: string) => void;
  onUnassignTenant: (roomId: string) => void;
  loading?: boolean;
}

export default function RoomsTable({ 
  rooms, 
  tenants, 
  onEdit, 
  onDelete, 
  onAssignTenant, 
  onUnassignTenant, 
  loading 
}: RoomsTableProps) {
  const [selectedTenant, setSelectedTenant] = useState<{ [roomId: string]: string }>({});

  const getStatusBadge = (status: string) => {
    const variants = {
      available: 'bg-green-100 text-green-800',
      occupied: 'bg-blue-100 text-blue-800',
      maintenance: 'bg-yellow-100 text-yellow-800'
    };
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  const getAvailableTenants = () => {
    return tenants.filter(tenant => !tenant.roomId);
  };

  const handleAssignTenant = (roomId: string) => {
    const tenantId = selectedTenant[roomId];
    if (tenantId) {
      onAssignTenant(roomId, tenantId);
      setSelectedTenant(prev => ({ ...prev, [roomId]: '' }));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="h-5 w-5" />
          Rooms Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room Number</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Rent</TableHead>
                <TableHead>Amenities</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rooms.map((room) => (
                <TableRow key={room._id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Bed className="h-4 w-4 text-muted-foreground" />
                      {room.roomNumber}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {room.capacity}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(room.status)}>
                      {room.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {room.occupied && room.tenantName ? (
                      <div className="space-y-2">
                        <div className="text-sm font-medium">{room.tenantName}</div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onUnassignTenant(room._id)}
                          className="h-6 text-xs"
                        >
                          <UserMinus className="h-3 w-3 mr-1" />
                          Unassign
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Select
                          value={selectedTenant[room._id] || ''}
                          onValueChange={(value) => setSelectedTenant(prev => ({ ...prev, [room._id]: value }))}
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="Select tenant" />
                          </SelectTrigger>
                          <SelectContent>
                            {getAvailableTenants().map((tenant) => (
                              <SelectItem key={tenant._id} value={tenant._id}>
                                {tenant.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAssignTenant(room._id)}
                          disabled={!selectedTenant[room._id]}
                          className="h-6 text-xs w-full"
                        >
                          <UserPlus className="h-3 w-3 mr-1" />
                          Assign
                        </Button>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    ₹{room.rent.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {room.amenities.slice(0, 2).map((amenity) => (
                        <Badge key={amenity} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                      {room.amenities.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{room.amenities.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(room)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Room</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete room {room.roomNumber}? 
                              {room.occupied && " This room is currently occupied."}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onDelete(room._id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}