import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home, Users, Edit, Trash2, UserPlus, UserMinus, IndianRupee } from 'lucide-react';
import { Room } from '@/services/roomService';

interface RoomCardProps {
  room: Room;
  onEdit: (room: Room) => void;
  onDelete: (roomId: string) => void;
  onAssignTenant?: (roomId: string) => void;
  onUnassignTenant?: (roomId: string) => void;
}

export default function RoomCard({ room, onEdit, onDelete, onAssignTenant, onUnassignTenant }: RoomCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'occupied':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Home className="h-5 w-5" />
            Room {room.roomNumber}
          </CardTitle>
          <Badge className={getStatusColor(room.status)}>
            {room.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>Capacity: {room.capacity}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
            <span>₹{room.rent.toLocaleString()}/month</span>
          </div>
        </div>

        {room.occupied && room.tenantName && (
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="text-sm font-medium">Current Tenant:</div>
            <div className="text-sm text-muted-foreground">{room.tenantName}</div>
          </div>
        )}

        {room.amenities.length > 0 && (
          <div>
            <div className="text-sm font-medium mb-2">Amenities:</div>
            <div className="flex flex-wrap gap-1">
              {room.amenities.map((amenity) => (
                <Badge key={amenity} variant="outline" className="text-xs">
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(room)}
            className="flex-1"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          
          {room.occupied ? (
            onUnassignTenant && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onUnassignTenant(room._id)}
                className="flex-1"
              >
                <UserMinus className="h-4 w-4 mr-1" />
                Unassign
              </Button>
            )
          ) : (
            onAssignTenant && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onAssignTenant(room._id)}
                className="flex-1"
              >
                <UserPlus className="h-4 w-4 mr-1" />
                Assign
              </Button>
            )
          )}
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => onDelete(room._id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}