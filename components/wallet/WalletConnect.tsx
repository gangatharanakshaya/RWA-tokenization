'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Wallet, ExternalLink } from 'lucide-react';

export default function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const connectWallet = async (walletType: string) => {
    try {
      // Simulated wallet connection
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({
          method: 'eth_requestAccounts',
        });
        
        if (accounts.length > 0) {
          const account = accounts[0];
          setAddress(`${account.slice(0, 6)}...${account.slice(-4)}`);
          setIsConnected(true);
          setIsOpen(false);
        }
      } else {
        // Mock connection for demo
        setAddress('0x1234...5678');
        setIsConnected(true);
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress('');
  };

  if (isConnected) {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>{address}</span>
        </div>
        <Button variant="outline" size="sm" onClick={disconnectWallet}>
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Wallet className="h-4 w-4 mr-2" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Your Wallet</DialogTitle>
          <DialogDescription>
            Choose a wallet to connect to the RWA Protocol
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start h-12"
            onClick={() => connectWallet('metamask')}
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
              alt="MetaMask" 
              className="w-6 h-6 mr-3"
            />
            <span>MetaMask</span>
            <ExternalLink className="h-4 w-4 ml-auto" />
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start h-12"
            onClick={() => connectWallet('walletconnect')}
          >
            <div className="w-6 h-6 mr-3 bg-blue-500 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">WC</span>
            </div>
            <span>WalletConnect</span>
            <ExternalLink className="h-4 w-4 ml-auto" />
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start h-12"
            onClick={() => connectWallet('coinbase')}
          >
            <div className="w-6 h-6 mr-3 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">CB</span>
            </div>
            <span>Coinbase Wallet</span>
            <ExternalLink className="h-4 w-4 ml-auto" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}