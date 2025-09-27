'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, Image, CircleCheck as CheckCircle, Loader as Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface AssetCreationFormProps {
  onClose: () => void;
}

export default function AssetCreationForm({ onClose }: AssetCreationFormProps) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    valuation: '',
    tokenSymbol: '',
    totalSupply: '',
    documents: [] as File[],
    images: [] as File[]
  });
  const [uploadedToCID, setUploadedToCID] = useState<string[]>([]);

  const handleFileUpload = (files: FileList | null, type: 'documents' | 'images') => {
    if (!files) return;
    
    const newFiles = Array.from(files);
    setFormData(prev => ({
      ...prev,
      [type]: [...prev[type], ...newFiles]
    }));
  };

  const uploadTo0G = async () => {
    setIsLoading(true);
    try {
      // Simulate 0G Storage upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockCIDs = [
        'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG',
        'QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB',
        'QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4'
      ];
      
      setUploadedToCID(mockCIDs);
      toast.success('Files uploaded to 0G Storage successfully!');
      setStep(3);
    } catch (error) {
      toast.error('Failed to upload files to 0G Storage');
    } finally {
      setIsLoading(false);
    }
  };

  const deployContract = async () => {
    setIsLoading(true);
    try {
      // Simulate ERC-3643 contract deployment
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast.success('ERC-3643 token contract deployed successfully!');
      setStep(4);
    } catch (error) {
      toast.error('Failed to deploy token contract');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Asset Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Sunset Villa Dubai"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Dubai, UAE"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Luxury waterfront property with premium amenities..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="valuation">Asset Valuation ($)</Label>
                <Input
                  id="valuation"
                  type="number"
                  value={formData.valuation}
                  onChange={(e) => setFormData(prev => ({ ...prev, valuation: e.target.value }))}
                  placeholder="3200000"
                />
              </div>
              <div>
                <Label htmlFor="tokenSymbol">Token Symbol</Label>
                <Input
                  id="tokenSymbol"
                  value={formData.tokenSymbol}
                  onChange={(e) => setFormData(prev => ({ ...prev, tokenSymbol: e.target.value.toUpperCase() }))}
                  placeholder="SUNV"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="totalSupply">Total Supply</Label>
              <Input
                id="totalSupply"
                type="number"
                value={formData.totalSupply}
                onChange={(e) => setFormData(prev => ({ ...prev, totalSupply: e.target.value }))}
                placeholder="1000000"
              />
            </div>

            <div className="flex justify-end">
              <Button onClick={() => setStep(2)} disabled={!formData.name || !formData.valuation}>
                Next: Upload Files
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Documents Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-base">
                    <FileText className="h-5 w-5 mr-2" />
                    Legal Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload property documents</p>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      id="documents"
                      onChange={(e) => handleFileUpload(e.target.files, 'documents')}
                    />
                    <label htmlFor="documents">
                      <Button variant="outline" size="sm" asChild>
                        <span>Choose Files</span>
                      </Button>
                    </label>
                  </div>
                  {formData.documents.length > 0 && (
                    <div className="mt-3 space-y-1">
                      {formData.documents.map((file, index) => (
                        <p key={index} className="text-xs text-gray-600 flex items-center">
                          <FileText className="h-3 w-3 mr-1" />
                          {file.name}
                        </p>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Images Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-base">
                    <Image className="h-5 w-5 mr-2" />
                    Property Images
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload property images</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      id="images"
                      onChange={(e) => handleFileUpload(e.target.files, 'images')}
                    />
                    <label htmlFor="images">
                      <Button variant="outline" size="sm" asChild>
                        <span>Choose Files</span>
                      </Button>
                    </label>
                  </div>
                  {formData.images.length > 0 && (
                    <div className="mt-3 space-y-1">
                      {formData.images.map((file, index) => (
                        <p key={index} className="text-xs text-gray-600 flex items-center">
                          <Image className="h-3 w-3 mr-1" />
                          {file.name}
                        </p>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button 
                onClick={uploadTo0G} 
                disabled={formData.documents.length === 0 || formData.images.length === 0 || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading to 0G...
                  </>
                ) : (
                  'Upload to 0G Storage'
                )}
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Files Uploaded Successfully!</h3>
              <p className="text-gray-600">Your files have been stored on 0G Storage with the following CIDs:</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              {uploadedToCID.map((cid, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="font-mono text-gray-600">{cid}</span>
                  <span className="text-green-600 text-xs">✓ Stored</span>
                </div>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Asset Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span>{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Symbol:</span>
                  <span>{formData.tokenSymbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Supply:</span>
                  <span>{formData.totalSupply}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Valuation:</span>
                  <span>${formData.valuation}</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button onClick={deployContract} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Deploying Contract...
                  </>
                ) : (
                  'Deploy ERC-3643 Token'
                )}
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 text-center">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Asset Tokenized Successfully!</h3>
              <p className="text-gray-600">Your real world asset has been tokenized and is now available for investors.</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-left space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Contract Address:</span>
                  <span className="font-mono">0x742d35Cc6634C0532925a3b8D</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Token Symbol:</span>
                  <span>{formData.tokenSymbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Network:</span>
                  <span>Polygon Mainnet</span>
                </div>
              </div>
            </div>

            <Button onClick={onClose} className="w-full">
              View Asset Dashboard
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Create New Asset
            <div className="flex space-x-2">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step > stepNumber ? <CheckCircle className="h-4 w-4" /> : stepNumber}
                </div>
              ))}
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-6">
          {renderStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
}