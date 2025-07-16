import { motion } from 'framer-motion';
import { Home, DollarSign, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const mockRoomData = {
  roomNumber: "A-101",
  type: "Single AC",
  rent: 12000,
  dueDate: "2024-02-01",
  isPaid: false,
  occupancy: "2024-01-15",
  amenities: ["WiFi", "AC", "Attached Bathroom", "Geyser", "Cupboard"],
  schedule: {
    cleaning: "Every Tuesday & Friday",
    laundry: "Monday & Thursday",
    meals: {
      breakfast: "7:00 AM - 9:00 AM",
      lunch: "12:00 PM - 2:00 PM",
      dinner: "7:00 PM - 9:00 PM"
    }
  }
};

export default function Room() {
  const daysUntilDue = Math.ceil((new Date(mockRoomData.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const progressPercentage = Math.max(0, Math.min(100, ((30 - daysUntilDue) / 30) * 100));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
          My Room
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Room Info Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-card-glass backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-primary" />
                  Room Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Room Number</span>
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    {mockRoomData.roomNumber}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium">{mockRoomData.type}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Monthly Rent</span>
                  <span className="font-bold text-primary">₹{mockRoomData.rent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Occupancy Since</span>
                  <span className="font-medium">{new Date(mockRoomData.occupancy).toLocaleDateString()}</span>
                </div>
                
                <div className="pt-4">
                  <h4 className="font-medium mb-3">Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {mockRoomData.amenities.map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Rent Status Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-card-glass backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Rent Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Payment Status</span>
                  {mockRoomData.isPaid ? (
                    <Badge className="bg-success text-success-foreground">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Paid
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Pending
                    </Badge>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Due Date</span>
                  <span className="font-medium">{new Date(mockRoomData.dueDate).toLocaleDateString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Days Until Due</span>
                  <span className={`font-bold ${daysUntilDue <= 5 ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {daysUntilDue > 0 ? `${daysUntilDue} days` : 'Overdue'}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Month Progress</span>
                    <span>{Math.round(progressPercentage)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Schedule Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-card-glass backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Services Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    Cleaning
                  </h4>
                  <p className="text-muted-foreground">{mockRoomData.schedule.cleaning}</p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    Laundry
                  </h4>
                  <p className="text-muted-foreground">{mockRoomData.schedule.laundry}</p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    Meal Times
                  </h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Breakfast: {mockRoomData.schedule.meals.breakfast}</p>
                    <p>Lunch: {mockRoomData.schedule.meals.lunch}</p>
                    <p>Dinner: {mockRoomData.schedule.meals.dinner}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}