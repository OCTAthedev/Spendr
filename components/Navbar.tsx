import React, { useState, useEffect } from 'react';
import { View } from '../types';
import { Wallet, LayoutDashboard, Building2, LogOut, TrendingDown } from 'lucide-react';

interface NavbarProps {
  currentView: View;
  setView: (view: View) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const [balance, setBalance] = useState(-14203.42);

  // Live declining balance effect - NOW FASTER
  useEffect(() => {
    const interval = setInterval(() => {
      // Significantly increased drain rate for "faster" effect
      const drain = Math.random() * 42.50; 
      setBalance(prev => prev - drain);
    }, 100); // Faster interval (100ms)

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center cursor-pointer group" onClick={() => setView(View.HOME)}>
            <div className="bg-yellow-400 p-2 rounded-lg group-hover:rotate-3 transition-transform duration-300">
              <Wallet className="h-6 w-6 text-black" />
            </div>
            <span className="ml-3 text-2xl font-black tracking-tighter text-white font-sans">Spendr</span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <button
                onClick={() => setView(View.HOME)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${currentView === View.HOME ? 'text-black bg-yellow-400' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
              >
                Overview
              </button>
              <button
                onClick={() => setView(View.DASHBOARD)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${currentView === View.DASHBOARD ? 'text-black bg-yellow-400' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
              >
                <LayoutDashboard size={16} />
                Personal Banking
              </button>
              <button
                onClick={() => setView(View.ENTERPRISE)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${currentView === View.ENTERPRISE ? 'text-black bg-yellow-400' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
              >
                <Building2 size={16} />
                Enterprise Solutions
              </button>
            </div>
          </div>
          
          {/* Balance Section */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Total Liquidity</span>
              <div className="flex items-center gap-2 text-red-500 font-mono font-bold text-lg">
                <TrendingDown size={16} className="animate-pulse" />
                <span>${balance.toFixed(2)}</span>
              </div>
            </div>
            <button className="bg-zinc-900 p-3 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors border border-zinc-800">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};