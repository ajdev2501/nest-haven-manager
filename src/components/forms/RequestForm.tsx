import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreateRequestData } from '@/services/requestService';
import { Wrench, Sparkles, Wifi, Zap, Droplets, HelpCircle } from 'lucide-react';

interface RequestFormProps {
  onSubmit: (data: CreateRequestData) => Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
}

const requestTypes = [
  { value: 'maintenance', label: 'Maintenance', icon: Wrench, color: 'bg-orange-500' },
  { value: 'cleaning', label: 'Cleaning', icon: Sparkles, color: 'bg-blue-500' },
  { value: 'wifi', label: 'WiFi/Internet', icon: Wifi, color: 'bg-green-500' },
  { value: 'electrical', label: 'Electrical', icon: Zap, color: 'bg-yellow-500' },
  { value: 'plumbing', label: 'Plumbing', icon: Droplets, color: 'bg-cyan-500' },
  { value: 'other', label: 'Other', icon: HelpCircle, color: 'bg-gray-500' }
];

const priorities = [
  { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
  { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800' }
];

export default function RequestForm({ onSubmit, onCancel, loading }: RequestFormProps) {
  const [formData, setFormData] = useState<CreateRequestData>({
    type: 'maintenance',
    title: '',
    description: '',
    priority: 'medium'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const selectedType = requestTypes.find(t => t.value === formData.type);
  const selectedPriority = priorities.find(p => p.value === formData.priority);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {selectedType && <selectedType.icon className="h-5 w-5" />}
          Submit Service Request
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Request Type</Label>
            <Select value={formData.type} onValueChange={(value: any) => setFormData(prev => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {requestTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center gap-2">
                      <type.icon className="h-4 w-4" />
                      {type.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Brief description of the issue"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Provide detailed information about the issue"
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Priority Level</Label>
            <Select value={formData.priority} onValueChange={(value: any) => setFormData(prev => ({ ...prev, priority: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priorities.map((priority) => (
                  <SelectItem key={priority.value} value={priority.value}>
                    <Badge variant="outline" className={priority.color}>
                      {priority.label}
                    </Badge>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Request Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Type:</span>
                <Badge variant="outline" className="gap-1">
                  {selectedType && <selectedType.icon className="h-3 w-3" />}
                  {selectedType?.label}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Priority:</span>
                <Badge variant="outline" className={selectedPriority?.color}>
                  {selectedPriority?.label}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Submitting...' : 'Submit Request'}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}