import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './views/Home';
import { Dashboard } from './views/Dashboard';
import { Enterprise } from './views/Enterprise';
import { View } from './types';

function App() {
  const [currentView, setCurrentView] = useState<View>(View.HOME);

  const renderView = () => {
    switch (currentView) {
      case View.HOME:
        return <Home setView={setCurrentView} />;
      case View.DASHBOARD:
        return <Dashboard />;
      case View.ENTERPRISE:
        return <Enterprise />;
      default:
        return <Home setView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-emerald-500/30">
      <Navbar currentView={currentView} setView={setCurrentView} />
      <main>
        {renderView()}
      </main>
      
      {/* Footer */}
      <footer className="bg-zinc-950 py-8 border-t border-zinc-900 text-center">
        <p className="text-zinc-600 text-sm">
          © 2024 Spendr Financial. We are not FDIC insured. In fact, we aren't insured at all. Good luck.
        </p>
      </footer>
    </div>
  );
}

export default App;