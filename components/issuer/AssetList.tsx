'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building, MapPin, DollarSign, Users, MoveVertical as MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function AssetList() {
  const assets = [
    {
      id: 1,
      name: 'Sunset Villa Dubai',
      symbol: 'SUNV',
      location: 'Dubai, UAE',
      valuation: 3200000,
      totalSupply: 1000000,
      soldTokens: 650000,
      investors: 89,
      status: 'Active',
      image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 2,
      name: 'Manhattan Office Complex',
      symbol: 'MANX',
      location: 'New York, USA',
      valuation: 8500000,
      totalSupply: 2000000,
      soldTokens: 1200000,
      investors: 156,
      status: 'Active',
      image: 'https://images.pexels.com/photos/2343468/pexels-photo-2343468.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 3,
      name: 'London Warehouse District',
      symbol: 'LNWD',
      location: 'London, UK',
      valuation: 5500000,
      totalSupply: 1500000,
      soldTokens: 450000,
      investors: 67,
      status: 'Pending',
      image: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  return (
    <div className="grid gap-6">
      {assets.map((asset) => (
        <Card key={asset.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <img 
                  src={asset.image} 
                  alt={asset.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{asset.name}</h3>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {asset.location}
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="outline">{asset.symbol}</Badge>
                    <Badge variant={asset.status === 'Active' ? 'secondary' : 'default'}>
                      {asset.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Edit Asset</DropdownMenuItem>
                  <DropdownMenuItem>Manage Documents</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Archive Asset</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Valuation</p>
                <p className="font-semibold text-gray-900">
                  ${asset.valuation.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Token Progress</p>
                <p className="font-semibold text-gray-900">
                  {((asset.soldTokens / asset.totalSupply) * 100).toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-gray-600">Investors</p>
                <p className="font-semibold text-gray-900">{asset.investors}</p>
              </div>
              <div>
                <p className="text-gray-600">Revenue (Monthly)</p>
                <p className="font-semibold text-green-600">
                  +${(asset.valuation * 0.008).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-full bg-gray-200 rounded-full h-2 mr-3 flex-1">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(asset.soldTokens / asset.totalSupply) * 100}%` }}
                    ></div>
                  </div>
                  <span className="whitespace-nowrap">
                    {asset.soldTokens.toLocaleString()} / {asset.totalSupply.toLocaleString()} tokens
                  </span>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button variant="outline" size="sm">
                    View Analytics
                  </Button>
                  <Button size="sm">
                    Manage
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}