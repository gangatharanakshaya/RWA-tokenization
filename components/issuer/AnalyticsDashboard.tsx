'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Users, DollarSign, Building, Target } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AnalyticsDashboard() {
  // Sample data for charts
  const revenueData = [
    { month: 'Jan', revenue: 45000, investors: 12 },
    { month: 'Feb', revenue: 52000, investors: 18 },
    { month: 'Mar', revenue: 48000, investors: 23 },
    { month: 'Apr', revenue: 61000, investors: 31 },
    { month: 'May', revenue: 67000, investors: 42 },
    { month: 'Jun', revenue: 75000, investors: 56 }
  ];

  const assetPerformance = [
    { name: 'Sunset Villa Dubai', value: 3200000, growth: 12.5 },
    { name: 'Manhattan Office', value: 8500000, growth: 8.3 },
    { name: 'London Warehouse', value: 5500000, growth: -2.1 },
  ];

  const investorDistribution = [
    { name: 'Institutional', value: 65, color: '#3b82f6' },
    { name: 'Accredited', value: 25, color: '#8b5cf6' },
    { name: 'Retail', value: 10, color: '#10b981' }
  ];

  const metrics = [
    {
      title: 'Total Revenue',
      value: '$348,000',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Active Investors',
      value: '312',
      change: '+18%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Asset Performance',
      value: '+8.2%',
      change: 'vs last month',
      trend: 'up',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      title: 'Occupancy Rate',
      value: '94.5%',
      change: '+2.1%',
      trend: 'up',
      icon: Building,
      color: 'orange'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <div className="flex items-center mt-1">
                    {metric.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                    )}
                    <p className={`text-xs ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change}
                    </p>
                  </div>
                </div>
                <div className={`p-3 bg-${metric.color}-100 rounded-lg`}>
                  <metric.icon className={`h-6 w-6 text-${metric.color}-600`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Investor Growth</CardTitle>
            <CardDescription>Monthly revenue and new investor acquisition</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.1}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="investors"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Asset Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Asset Performance</CardTitle>
            <CardDescription>Year-over-year growth by asset</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assetPerformance.map((asset, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{asset.name}</p>
                    <p className="text-sm text-gray-600">${asset.value.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={asset.growth > 0 ? "secondary" : "destructive"}>
                      {asset.growth > 0 ? '+' : ''}{asset.growth}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Investor Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Investor Distribution</CardTitle>
            <CardDescription>Breakdown by investor type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={investorDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {investorDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {investorDistribution.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <p className="font-semibold">{item.value}%</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest transactions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'New investment', asset: 'Sunset Villa Dubai', amount: '$25,000', time: '2 hours ago' },
                { action: 'Document updated', asset: 'Manhattan Office', amount: '', time: '5 hours ago' },
                { action: 'Dividend distributed', asset: 'London Warehouse', amount: '$12,500', time: '1 day ago' },
                { action: 'New investor verified', asset: 'Sunset Villa Dubai', amount: '', time: '2 days ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.asset}</p>
                  </div>
                  <div className="text-right">
                    {activity.amount && (
                      <p className="font-semibold text-green-600">{activity.amount}</p>
                    )}
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}