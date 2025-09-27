'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, CircleCheck as CheckCircle, Loader as Loader2, Globe, Calendar, TriangleAlert as AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface VerificationFlowProps {
  onClose: () => void;
  onComplete: () => void;
}

export default function VerificationFlow({ onClose, onComplete }: VerificationFlowProps) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationData, setVerificationData] = useState({
    age: null as boolean | null,
    jurisdiction: null as boolean | null,
    sanctions: null as boolean | null,
    proofHash: ''
  });

  const startSelfVerification = async () => {
    setIsLoading(true);
    try {
      // Simulate Self Protocol verification process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock successful verification
      setVerificationData({
        age: true,
        jurisdiction: true,
        sanctions: false, // false means not on sanctions list (good)
        proofHash: '0x' + Math.random().toString(16).substr(2, 64)
      });
      
      setStep(2);
      toast.success('Self Protocol verification completed!');
    } catch (error) {
      toast.error('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const submitToBlockchain = async () => {
    setIsLoading(true);
    try {
      // Simulate blockchain submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Verification attestation submitted to blockchain!');
      setStep(3);
    } catch (error) {
      toast.error('Failed to submit attestation.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Self Protocol Verification</h3>
              <p className="text-gray-600">
                Complete ZK-based identity verification to access RWA tokens
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">What will be verified:</h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Age eligibility (≥18 years old)
                </li>
                <li className="flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  Jurisdiction compliance (allowed countries)
                </li>
                <li className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Sanctions screening (OFAC, EU, UN lists)
                </li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">Privacy Protected:</h4>
              <p className="text-sm text-green-800">
                Your personal information never leaves your device. Only cryptographic proofs 
                are generated and shared, ensuring complete privacy.
              </p>
            </div>

            <Button 
              onClick={startSelfVerification} 
              className="w-full" 
              size="lg" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating ZK Proofs...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Start Self Verification
                </>
              )}
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Verification Complete!</h3>
              <p className="text-gray-600">ZK proofs have been generated successfully</p>
            </div>

            <div className="grid gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="font-medium">Age Verification</span>
                    </div>
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span className="text-sm">Verified</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Globe className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="font-medium">Jurisdiction Check</span>
                    </div>
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span className="text-sm">Compliant</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="font-medium">Sanctions Screening</span>
                    </div>
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span className="text-sm">Clear</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">Proof Hash:</p>
              <code className="text-xs font-mono bg-white px-2 py-1 rounded border">
                {verificationData.proofHash}
              </code>
            </div>

            <Button 
              onClick={submitToBlockchain} 
              className="w-full" 
              size="lg" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting to Blockchain...
                </>
              ) : (
                'Submit Attestation'
              )}
            </Button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 text-center">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Verification Complete!</h3>
              <p className="text-gray-600">
                Your attestation has been stored on-chain. You can now access all RWA features.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-left space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction Hash:</span>
                  <span className="font-mono">0x892d35Cc6634C0532925a3b8D</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Block Number:</span>
                  <span>18,453,621</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Valid Until:</span>
                  <span>{new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <Button onClick={onComplete} className="w-full" size="lg">
              Access Dashboard
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Identity Verification
            <div className="flex space-x-1">
              {[1, 2, 3].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`w-2 h-2 rounded-full ${
                    step >= stepNumber ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          {renderStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
}