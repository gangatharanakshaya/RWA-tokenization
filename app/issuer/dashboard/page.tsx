'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Building, FileText, DollarSign, Users } from 'lucide-react';
import Header from '@/components/layout/Header';
import AssetCreationForm from '@/components/issuer/AssetCreationForm';
import AssetList from '@/components/issuer/AssetList';
import AnalyticsDashboard from '@/components/issuer/AnalyticsDashboard';

export default function IssuerDashboard() {
  const [showCreateAsset, setShowCreateAsset] = useState(false);

  const stats = [
    {
      title: 'Total Assets',
      value: '12',
      change: '+2 this month',
      icon: Building,
      color: 'blue'
    },
    {
      title: 'Total Value',
      value: '$45.2M',
      change: '+12% this month',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Active Investors',
      value: '1,247',
      change: '+89 this month',
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Documents',
      value: '156',
      change: '+23 this month',
      icon: FileText,
      color: 'orange'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userType="issuer" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Issuer Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your tokenized real world assets</p>
          </div>
          <Button onClick={() => setShowCreateAsset(true)} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Create Asset</span>
          </Button>
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
        <Tabs defaultValue="assets" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="assets">
            <AssetList />
          </TabsContent>
          
          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>
          
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Document Management</CardTitle>
                <CardDescription>Manage asset documents stored on 0G Storage</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Document management features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Asset Creation Modal */}
      {showCreateAsset && (
        <AssetCreationForm onClose={() => setShowCreateAsset(false)} />
      )}
    </div>
  );
}