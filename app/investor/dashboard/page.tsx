'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, TrendingUp, DollarSign, FileText, CircleAlert as AlertCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import VerificationFlow from '@/components/investor/VerificationFlow';
import Portfolio from '@/components/investor/Portfolio';
import Marketplace from '@/components/investor/Marketplace';

export default function InvestorDashboard() {
  const [isVerified, setIsVerified] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const stats = [
    {
      title: 'Portfolio Value',
      value: '$125,000',
      change: '+8.2% this month',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Total Returns',
      value: '+24.5%',
      change: 'Since inception',
      icon: TrendingUp,
      color: 'blue'
    },
    {
      title: 'Active Holdings',
      value: '8',
      change: 'Across 5 assets',
      icon: FileText,
      color: 'purple'
    },
    {
      title: 'Verification Status',
      value: isVerified ? 'Verified' : 'Pending',
      change: isVerified ? 'Self Protocol' : 'Complete verification',
      icon: Shield,
      color: isVerified ? 'green' : 'orange'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userType="investor" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Verification Alert */}
        {!isVerified && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <div>
                  <h3 className="text-sm font-medium text-orange-800">Verification Required</h3>
                  <p className="text-sm text-orange-600">Complete Self Protocol verification to access all features</p>
                </div>
              </div>
              <Button onClick={() => setShowVerification(true)} size="sm">
                Start Verification
              </Button>
            </div>
          </div>
        )}

        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Investor Dashboard</h1>
            <p className="text-gray-600 mt-1">Track your RWA investments and portfolio</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={isVerified ? "secondary" : "destructive"}>
              {isVerified ? "Verified" : "Unverified"}
            </Badge>
            {!isVerified && (
              <Button onClick={() => setShowVerification(true)} size="sm">
                Get Verified
              </Button>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
                    <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="portfolio">
            <Portfolio isVerified={isVerified} />
          </TabsContent>
          
          <TabsContent value="marketplace">
            <Marketplace isVerified={isVerified} />
          </TabsContent>
          
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Asset Documents</CardTitle>
                <CardDescription>Access property documents and legal files</CardDescription>
              </CardHeader>
              <CardContent>
                {!isVerified ? (
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Verification Required</h3>
                    <p className="text-gray-500 mb-4">You must complete verification to access asset documents</p>
                    <Button onClick={() => setShowVerification(true)}>
                      Start Verification
                    </Button>
                  </div>
                ) : (
                  <p className="text-gray-500">Document access features coming soon...</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Verification Flow Modal */}
      {showVerification && (
        <VerificationFlow 
          onClose={() => setShowVerification(false)}
          onComplete={() => {
            setIsVerified(true);
            setShowVerification(false);
          }}
        />
      )}
    </div>
  );
}