'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Download, Eye } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

interface PortfolioProps {
  isVerified: boolean;
}

export default function Portfolio({ isVerified }: PortfolioProps) {
  const holdings = [
    {
      id: 1,
      name: 'Sunset Villa Dubai',
      symbol: 'SUNV',
      tokens: 15000,
      value: 15000,
      purchasePrice: 13500,
      change: 11.11,
      image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=300',
      chartData: [
        { month: 'Jan', value: 13500 },
        { month: 'Feb', value: 14100 },
        { month: 'Mar', value: 14800 },
        { month: 'Apr', value: 15000 }
      ]
    },
    {
      id: 2,
      name: 'Manhattan Office Complex',
      symbol: 'MANX',
      tokens: 8000,
      value: 34000,
      purchasePrice: 32000,
      change: 6.25,
      image: 'https://images.pexels.com/photos/2343468/pexels-photo-2343468.jpeg?auto=compress&cs=tinysrgb&w=300',
      chartData: [
        { month: 'Jan', value: 32000 },
        { month: 'Feb', value: 32800 },
        { month: 'Mar', value: 33200 },
        { month: 'Apr', value: 34000 }
      ]
    },
    {
      id: 3,
      name: 'Tokyo Commercial Space',
      symbol: 'TKCS',
      tokens: 12500,
      value: 28750,
      purchasePrice: 30000,
      change: -4.17,
      image: 'https://images.pexels.com/photos/2977304/pexels-photo-2977304.jpeg?auto=compress&cs=tinysrgb&w=300',
      chartData: [
        { month: 'Jan', value: 30000 },
        { month: 'Feb', value: 29500 },
        { month: 'Mar', value: 29000 },
        { month: 'Apr', value: 28750 }
      ]
    }
  ];

  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);
  const totalCost = holdings.reduce((sum, holding) => sum + holding.purchasePrice, 0);
  const totalReturn = ((totalValue - totalCost) / totalCost) * 100;

  if (!isVerified) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Portfolio Access Restricted</h3>
          <p className="text-gray-500 mb-4">Complete Self Protocol verification to view your holdings</p>
          <Button>Start Verification</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">${totalValue.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Return</p>
                <p className={`text-2xl font-bold ${totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {totalReturn >= 0 ? '+' : ''}{totalReturn.toFixed(2)}%
                </p>
              </div>
              {totalReturn >= 0 ? (
                <TrendingUp className="h-8 w-8 text-green-600" />
              ) : (
                <TrendingDown className="h-8 w-8 text-red-600" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Holdings</p>
                <p className="text-2xl font-bold text-gray-900">{holdings.length}</p>
                <p className="text-xs text-gray-500">Active positions</p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold">{holdings.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Holdings List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Your Holdings</h3>
        
        {holdings.map((holding) => (
          <Card key={holding.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-center">
                {/* Asset Info */}
                <div className="lg:col-span-2 flex items-center space-x-3">
                  <img 
                    src={holding.image} 
                    alt={holding.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{holding.name}</h4>
                    <Badge variant="outline" className="mt-1">{holding.symbol}</Badge>
                  </div>
                </div>

                {/* Holdings */}
                <div>
                  <p className="text-sm text-gray-600">Holdings</p>
                  <p className="font-semibold">{holding.tokens.toLocaleString()} tokens</p>
                </div>

                {/* Value */}
                <div>
                  <p className="text-sm text-gray-600">Current Value</p>
                  <p className="font-semibold">${holding.value.toLocaleString()}</p>
                </div>

                {/* Performance */}
                <div>
                  <p className="text-sm text-gray-600">Performance</p>
                  <div className="flex items-center">
                    {holding.change >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                    )}
                    <span className={`font-semibold ${holding.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {holding.change >= 0 ? '+' : ''}{holding.change.toFixed(2)}%
                    </span>
                  </div>
                </div>

                {/* Chart & Actions */}
                <div className="flex items-center justify-between">
                  <div className="w-24 h-12">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={holding.chartData}>
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke={holding.change >= 0 ? "#10b981" : "#ef4444"}
                          strokeWidth={2} 
                          dot={false}
                        />
                        <Tooltip />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}