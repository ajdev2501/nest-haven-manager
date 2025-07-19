import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Megaphone, AlertTriangle, CreditCard, Calendar as CalendarEventIcon, Info } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { CreateNoticeData, Notice } from '@/services/noticeService';

interface NoticeFormProps {
  notice?: Notice;
  onSubmit: (data: CreateNoticeData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

const noticeTypes = [
  { value: 'general', label: 'General', icon: Info, color: 'bg-blue-100 text-blue-800' },
  { value: 'maintenance', label: 'Maintenance', icon: AlertTriangle, color: 'bg-orange-100 text-orange-800' },
  { value: 'payment', label: 'Payment', icon: CreditCard, color: 'bg-green-100 text-green-800' },
  { value: 'event', label: 'Event', icon: CalendarEventIcon, color: 'bg-purple-100 text-purple-800' },
  { value: 'urgent', label: 'Urgent', icon: Megaphone, color: 'bg-red-100 text-red-800' }
];

const priorities = [
  { value: 'low', label: 'Low', color: 'bg-gray-100 text-gray-800' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' }
];

export default function NoticeForm({ notice, onSubmit, onCancel, loading }: NoticeFormProps) {
  const [formData, setFormData] = useState<CreateNoticeData>({
    title: notice?.title || '',
    content: notice?.content || '',
    type: notice?.type || 'general',
    priority: notice?.priority || 'medium',
    validUntil: notice?.validUntil
  });
  const [validUntilDate, setValidUntilDate] = useState<Date | undefined>(
    notice?.validUntil ? new Date(notice.validUntil) : undefined
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      validUntil: validUntilDate ? validUntilDate.toISOString() : undefined
    };
    await onSubmit(submitData);
  };

  const selectedType = noticeTypes.find(t => t.value === formData.type);
  const selectedPriority = priorities.find(p => p.value === formData.priority);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {selectedType && <selectedType.icon className="h-5 w-5" />}
          {notice ? 'Edit Notice' : 'Create New Notice'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Notice title"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Notice Type</Label>
              <Select value={formData.type} onValueChange={(value: any) => setFormData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {noticeTypes.map((type) => (
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
              <Label>Priority</Label>
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Notice content and details"
              rows={6}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Valid Until (Optional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !validUntilDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {validUntilDate ? format(validUntilDate, "PPP") : "Select expiry date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={validUntilDate}
                  onSelect={setValidUntilDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Notice Preview</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Type:</span>
                <Badge variant="outline" className={`gap-1 ${selectedType?.color}`}>
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
              {validUntilDate && (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Expires:</span>
                  <span className="text-sm">{format(validUntilDate, "PPP")}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Saving...' : (notice ? 'Update Notice' : 'Publish Notice')}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}