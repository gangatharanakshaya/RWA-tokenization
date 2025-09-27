'use client';

import Link from 'next/link';
import { Building, Bell, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import WalletConnect from '@/components/wallet/WalletConnect';

interface HeaderProps {
  userType: 'issuer' | 'investor';
}

export default function Header({ userType }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <Building className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">RWA Protocol</span>
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link 
                href={`/${userType}/dashboard`}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Dashboard
              </Link>
              {userType === 'issuer' ? (
                <>
                  <Link 
                    href={`/${userType}/assets`}
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Assets
                  </Link>
                  <Link 
                    href={`/${userType}/analytics`}
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Analytics
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    href={`/${userType}/portfolio`}
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Portfolio
                  </Link>
                  <Link 
                    href={`/${userType}/marketplace`}
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Marketplace
                  </Link>
                </>
              )}
            </nav>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* User Type Badge */}
            <Badge variant="outline" className="capitalize">
              {userType}
            </Badge>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            </Button>

            {/* Wallet Connect */}
            <WalletConnect />

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}