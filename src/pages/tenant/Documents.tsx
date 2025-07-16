import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Download, Eye, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const mockDocuments = [
  {
    id: 1,
    name: "Passport Copy",
    type: "ID Proof",
    uploadDate: "2024-01-10",
    status: "verified",
    size: "2.3 MB",
    url: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Rental Agreement",
    type: "Agreement",
    uploadDate: "2024-01-12",
    status: "verified",
    size: "1.8 MB",
    url: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Profile Photo",
    type: "Photo",
    uploadDate: "2024-01-08",
    status: "verified",
    size: "845 KB",
    url: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Bank Statement",
    type: "Financial",
    uploadDate: "2024-01-20",
    status: "pending",
    size: "3.1 MB",
    url: "/placeholder.svg"
  }
];

export default function Documents() {
  const [documents, setDocuments] = useState(mockDocuments);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newDocument, setNewDocument] = useState({
    type: '',
    file: null as File | null
  });
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please select a file smaller than 5MB",
          variant: "destructive"
        });
        return;
      }
      setNewDocument({...newDocument, file});
    }
  };

  const handleSubmitDocument = () => {
    if (!newDocument.type || !newDocument.file) {
      toast({
        title: "Please select document type and file",
        variant: "destructive"
      });
      return;
    }

    const document = {
      id: documents.length + 1,
      name: newDocument.file.name,
      type: newDocument.type,
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      size: `${(newDocument.file.size / (1024 * 1024)).toFixed(1)} MB`,
      url: "/placeholder.svg"
    };

    setDocuments([document, ...documents]);
    setNewDocument({ type: '', file: null });
    setIsDialogOpen(false);
    
    toast({
      title: "Document uploaded successfully!",
      description: "Your document is being reviewed."
    });
  };

  const getStatusIcon = (status: string) => {
    return status === 'verified' ? 
      <CheckCircle className="h-4 w-4 text-success" /> : 
      <AlertCircle className="h-4 w-4 text-warning" />;
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
            Documents
          </h1>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-primary-light">
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Upload New Document</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="type">Document Type</Label>
                  <Select value={newDocument.type} onValueChange={(value) => setNewDocument({...newDocument, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ID Proof">ID Proof</SelectItem>
                      <SelectItem value="Agreement">Agreement</SelectItem>
                      <SelectItem value="Photo">Photo</SelectItem>
                      <SelectItem value="Financial">Financial Document</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="file">Choose File</Label>
                  <Input
                    id="file"
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 5MB)
                  </p>
                </div>
                
                {newDocument.file && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium">{newDocument.file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(newDocument.file.size / (1024 * 1024)).toFixed(1)} MB
                    </p>
                  </div>
                )}
                
                <Button onClick={handleSubmitDocument} className="w-full">
                  Upload Document
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((document, index) => (
            <motion.div
              key={document.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-card-glass backdrop-blur-sm border-primary/20 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <span className="text-sm">{document.name}</span>
                        <Badge variant="outline" className="ml-2 text-xs">
                          {document.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(document.status)}
                      <Badge variant={document.status === 'verified' ? 'default' : 'secondary'}>
                        {document.status}
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Uploaded: {new Date(document.uploadDate).toLocaleDateString()}</span>
                      </div>
                      <span>{document.size}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {documents.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="bg-card-glass backdrop-blur-sm border-primary/20 text-center py-12">
              <CardContent>
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No documents uploaded</h3>
                <p className="text-muted-foreground">Upload your documents to get verified</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}