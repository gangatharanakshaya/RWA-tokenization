'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Users, Shield, Database, ArrowRight, CircleCheck as CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import WalletConnect from '@/components/wallet/WalletConnect';

export default function HomePage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<'issuer' | 'investor' | null>(null);

  const features = [
    {
      icon: Shield,
      title: 'ZK-Based Verification',
      description: 'Self Protocol ensures privacy-preserving identity verification without revealing personal data'
    },
    {
      icon: Database,
      title: 'Decentralized Storage',
      description: '0G Storage provides secure, encrypted storage for all asset documents and metadata'
    },
    {
      icon: Building,
      title: 'Compliant Tokenization',
      description: 'ERC-3643 standard ensures regulatory compliance with built-in transfer restrictions'
    },
    {
      icon: Users,
      title: 'Investor Protection',
      description: 'Automated compliance checks protect both issuers and investors from regulatory violations'
    }
  ];

  const handleRoleSelection = (role: 'issuer' | 'investor') => {
    setSelectedRole(role);
    router.push(`/${role}/dashboard`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Building className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">RWA Protocol</span>
            </div>
            <WalletConnect />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Tokenize Real World Assets
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Compliantly</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The first end-to-end platform combining Self Protocol's ZK verification, 
              ERC-3643 compliance, and 0G Storage for secure, regulated RWA tokenization.
            </p>
            
            {/* Role Selection Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-16">
              <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-500"
                    onClick={() => handleRoleSelection('issuer')}>
                <CardHeader>
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                    <Building className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl text-center">Asset Issuer</CardTitle>
                  <CardDescription className="text-center">
                    Tokenize your real estate, commodities, or other assets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Upload property documents to 0G Storage
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Deploy ERC-3643 compliant tokens
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Manage fractional ownership
                    </li>
                  </ul>
                  <Button className="w-full group-hover:bg-blue-600 transition-colors">
                    Get Started as Issuer
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-purple-500"
                    onClick={() => handleRoleSelection('investor')}>
                <CardHeader>
                  <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-lg mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-2xl text-center">Investor</CardTitle>
                  <CardDescription className="text-center">
                    Invest in verified, compliant tokenized assets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      ZK verification with Self Protocol
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Access to compliant RWA tokens
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Secure document access
                    </li>
                  </ul>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 group-hover:bg-purple-700 transition-colors">
                    Get Started as Investor
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Built on Cutting-Edge Technology
            </h2>
            <p className="text-lg text-gray-600">
              Combining the best of blockchain, privacy, and storage technologies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Complete end-to-end flow from asset tokenization to compliant trading
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                step: '1',
                title: 'Asset Upload & Tokenization',
                description: 'Issuers upload property documents to 0G Storage and deploy ERC-3643 tokens',
                color: 'blue'
              },
              {
                step: '2',
                title: 'Investor Verification',
                description: 'Investors complete ZK-based verification through Self Protocol',
                color: 'purple'
              },
              {
                step: '3',
                title: 'Compliant Trading',
                description: 'Smart contracts enforce transfer restrictions based on verification status',
                color: 'green'
              },
              {
                step: '4',
                title: 'Document Access',
                description: 'Verified investors can securely access asset documents from 0G Storage',
                color: 'orange'
              }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-8">
                <div className={`flex-shrink-0 w-16 h-16 bg-${item.color}-100 rounded-full flex items-center justify-center`}>
                  <span className={`text-2xl font-bold text-${item.color}-600`}>{item.step}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Building className="h-8 w-8" />
              <span className="text-xl font-bold">RWA Protocol</span>
            </div>
            <p className="text-gray-400">
              Secure, compliant, and privacy-preserving real world asset tokenization
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}