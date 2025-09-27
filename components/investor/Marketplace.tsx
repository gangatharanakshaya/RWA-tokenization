'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, TrendingUp, Users, DollarSign, Search, Filter } from 'lucide-react';

interface MarketplaceProps {
  isVerified: boolean;
}

export default function Marketplace({ isVerified }: MarketplaceProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');

  const assets = [
    {
      id: 1,
      name: 'Sunset Villa Dubai',
      symbol: 'SUNV',
      location: 'Dubai, UAE',
      type: 'Residential',
      valuation: 3200000,
      tokenPrice: 1.0,
      availableTokens: 350000,
      totalSupply: 1000000,
      investors: 89,
      apy: 8.5,
      image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Manhattan Office Complex',
      symbol: 'MANX',
      location: 'New York, USA',
      type: 'Commercial',
      valuation: 8500000,
      tokenPrice: 4.25,
      availableTokens: 800000,
      totalSupply: 2000000,
      investors: 156,
      apy: 6.2,
      image: 'https://images.pexels.com/photos/2343468/pexels-photo-2343468.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'Active'
    },
    {
      id: 3,
      name: 'London Warehouse District',
      symbol: 'LNWD',
      location: 'London, UK',
      type: 'Industrial',
      valuation: 5500000,
      tokenPrice: 3.67,
      availableTokens: 1050000,
      totalSupply: 1500000,
      investors: 67,
      apy: 7.8,
      image: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Singapore Tech Hub',
      symbol: 'SGTH',
      location: 'Singapore',
      type: 'Commercial',
      valuation: 12000000,
      tokenPrice: 2.40,
      availableTokens: 2500000,
      totalSupply: 5000000,
      investors: 203,
      apy: 9.1,
      image: 'https://images.pexels.com/photos/2977304/pexels-photo-2977304.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'Coming Soon'
    }
  ];

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === 'all' || asset.type.toLowerCase() === filterBy;
    return matchesSearch && matchesFilter;
  });

  if (!isVerified) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Marketplace Access Restricted</h3>
          <p className="text-gray-500 mb-4">Complete Self Protocol verification to access investment opportunities</p>
          <Button>Start Verification</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search assets by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filterBy} onValueChange={setFilterBy}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="residential">Residential</SelectItem>
            <SelectItem value="commercial">Commercial</SelectItem>
            <SelectItem value="industrial">Industrial</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="apy">APY</SelectItem>
            <SelectItem value="valuation">Valuation</SelectItem>
            <SelectItem value="investors">Investors</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{assets.length}</p>
              <p className="text-sm text-gray-600">Available Assets</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                ${(assets.reduce((sum, asset) => sum + asset.valuation, 0) / 1000000).toFixed(1)}M
              </p>
              <p className="text-sm text-gray-600">Total Value</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {assets.reduce((sum, asset) => sum + asset.investors, 0)}
              </p>
              <p className="text-sm text-gray-600">Active Investors</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {(assets.reduce((sum, asset) => sum + asset.apy, 0) / assets.length).toFixed(1)}%
              </p>
              <p className="text-sm text-gray-600">Avg. APY</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAssets.map((asset) => (
          <Card key={asset.id} className="hover:shadow-lg transition-all duration-300">
            <div className="relative">
              <img 
                src={asset.image} 
                alt={asset.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute top-4 left-4">
                <Badge variant={asset.status === 'Active' ? 'secondary' : 'outline'}>
                  {asset.status}
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Badge variant="outline" className="bg-white/90">
                  {asset.type}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{asset.name}</h3>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {asset.location}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Token Price</p>
                    <p className="font-semibold">${asset.tokenPrice}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">APY</p>
                    <p className="font-semibold text-green-600">{asset.apy}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Valuation</p>
                    <p className="font-semibold">${(asset.valuation / 1000000).toFixed(1)}M</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Investors</p>
                    <p className="font-semibold">{asset.investors}</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Available</span>
                    <span>{((asset.availableTokens / asset.totalSupply) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${((asset.totalSupply - asset.availableTokens) / asset.totalSupply) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {asset.availableTokens.toLocaleString()} / {asset.totalSupply.toLocaleString()} tokens available
                  </p>
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button variant="outline" className="flex-1">
                    View Details
                  </Button>
                  <Button 
                    className="flex-1" 
                    disabled={asset.status !== 'Active'}
                  >
                    {asset.status === 'Active' ? 'Invest Now' : 'Coming Soon'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAssets.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Assets Found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}