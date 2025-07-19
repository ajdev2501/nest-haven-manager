import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Users, Phone, Mail, Home, Calendar, Edit, Trash2, UserCheck, UserX } from 'lucide-react';
import { Tenant } from '@/services/tenantService';
import { Room } from '@/services/roomService';
import { format } from 'date-fns';

interface TenantsTableProps {
  tenants: Tenant[];
  rooms: Room[];
  onEdit: (tenant: Tenant) => void;
  onDelete: (tenantId: string) => void;
  onAssignRoom: (tenantId: string, roomId: string) => void;
  onStatusChange: (tenantId: string, status: 'active' | 'inactive' | 'pending') => void;
  loading?: boolean;
}

export default function TenantsTable({ 
  tenants, 
  rooms, 
  onEdit, 
  onDelete, 
  onAssignRoom, 
  onStatusChange, 
  loading 
}: TenantsTableProps) {
  const [selectedRoom, setSelectedRoom] = useState<{ [tenantId: string]: string }>({});

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  const getRentStatusBadge = (rentStatus: boolean) => {
    return rentStatus 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  const getAvailableRooms = () => {
    return rooms.filter(room => !room.occupied);
  };

  const handleAssignRoom = (tenantId: string) => {
    const roomId = selectedRoom[tenantId];
    if (roomId) {
      onAssignRoom(tenantId, roomId);
      setSelectedRoom(prev => ({ ...prev, [tenantId]: '' }));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Tenants Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant Details</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rent Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenants.map((tenant) => (
                <TableRow key={tenant._id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{tenant.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {tenant.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Phone className="h-3 w-3" />
                      {tenant.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    {tenant.roomNumber ? (
                      <div className="flex items-center gap-1">
                        <Home className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Room {tenant.roomNumber}</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Select
                          value={selectedRoom[tenant._id] || ''}
                          onValueChange={(value) => setSelectedRoom(prev => ({ ...prev, [tenant._id]: value }))}
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="Assign room" />
                          </SelectTrigger>
                          <SelectContent>
                            {getAvailableRooms().map((room) => (
                              <SelectItem key={room._id} value={room._id}>
                                Room {room.roomNumber}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAssignRoom(tenant._id)}
                          disabled={!selectedRoom[tenant._id]}
                          className="h-6 text-xs w-full"
                        >
                          Assign
                        </Button>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <Badge className={getStatusBadge(tenant.status)}>
                        {tenant.status}
                      </Badge>
                      <Select
                        value={tenant.status}
                        onValueChange={(value: any) => onStatusChange(tenant._id, value)}
                      >
                        <SelectTrigger className="h-6 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">
                            <div className="flex items-center gap-1">
                              <UserCheck className="h-3 w-3" />
                              Active
                            </div>
                          </SelectItem>
                          <SelectItem value="inactive">
                            <div className="flex items-center gap-1">
                              <UserX className="h-3 w-3" />
                              Inactive
                            </div>
                          </SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRentStatusBadge(tenant.rentStatus)}>
                      {tenant.rentStatus ? 'Paid' : 'Pending'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(tenant.joinDate), 'MMM dd, yyyy')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(tenant)}
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
                            <AlertDialogTitle>Delete Tenant</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete {tenant.name}? 
                              {tenant.roomNumber && ` They are currently assigned to room ${tenant.roomNumber}.`}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onDelete(tenant._id)}>
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