import React from 'react';
import { View } from '../types';
import { TESTIMONIALS } from '../constants';
import { ShieldCheck, LineChart, Users, Zap, ArrowRight, Quote } from 'lucide-react';

interface HomeProps {
  setView: (view: View) => void;
}

export const Home: React.FC<HomeProps> = ({ setView }) => {
  return (
    <div className="pt-20 min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-yellow-400 text-xs font-bold uppercase tracking-widest animate-pulse">
            The Future of Finance is Here
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white mb-8 leading-none">
            Maximize <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600">
              Every Opportunity.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-zinc-400 font-light leading-relaxed">
            Spendr leverages advanced generative AI to optimize your spending habits, tailor your portfolio based on biometric data, and streamline credit acquisition.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={() => setView(View.DASHBOARD)}
              className="px-8 py-4 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg transition-all hover:translate-y-[-2px] hover:shadow-[0_10px_20px_-10px_rgba(250,204,21,0.5)] flex items-center justify-center gap-2"
            >
              Personal Banking <ArrowRight size={20} />
            </button>
            <button
              onClick={() => setView(View.ENTERPRISE)}
              className="px-8 py-4 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-lg border border-zinc-800 transition-all hover:translate-y-[-2px]"
            >
              Enterprise Suite
            </button>
          </div>
        </div>
        
        {/* Background Grid Accent */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #FFC107 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-zinc-950 py-24 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Our Ecosystem</h2>
            <p className="text-zinc-500">Comprehensive tools designed for the modern economy.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group p-8 rounded-2xl bg-black border border-zinc-800 hover:border-yellow-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-900/10">
              <div className="w-14 h-14 bg-zinc-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-400 group-hover:text-black transition-colors text-white">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Active Monitoring</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">Real-time alerts regarding your expenditure patterns with personalized, high-impact feedback.</p>
            </div>
            
            <div className="group p-8 rounded-2xl bg-black border border-zinc-800 hover:border-yellow-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-900/10">
              <div className="w-14 h-14 bg-zinc-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-400 group-hover:text-black transition-colors text-white">
                <LineChart className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Predictive Investing</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">Our proprietary algorithms analyze personal attributes to curate a biologically aligned portfolio.</p>
            </div>
            
            <div className="group p-8 rounded-2xl bg-black border border-zinc-800 hover:border-yellow-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-900/10">
              <div className="w-14 h-14 bg-zinc-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-400 group-hover:text-black transition-colors text-white">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Rapid Financing</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">Streamlined loan approval process designed to maximize asset acquisition speed.</p>
            </div>
            
            <div className="group p-8 rounded-2xl bg-black border border-zinc-800 hover:border-yellow-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-900/10">
              <div className="w-14 h-14 bg-zinc-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-400 group-hover:text-black transition-colors text-white">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Global Benchmarking</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">Comparative analytics allowing you to visualize your financial standing against peer groups.</p>
            </div>
          </div>
        </div>
      </div>

      {/* NEW: Early Backers Section */}
      <div className="bg-black py-24 relative overflow-hidden">
         {/* Liquid Bar */}
         <div className="max-w-4xl mx-auto px-4 mb-20">
            <div className="relative w-full h-24 bg-zinc-900 rounded-full border-2 border-zinc-800 overflow-hidden flex items-center justify-center shadow-[0_0_50px_rgba(250,204,21,0.2)]">
               {/* Animated Liquid Background */}
               <div className="absolute inset-0 bg-yellow-400 animate-pulse opacity-90 w-full"></div>
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
               
               {/* Text */}
               <div className="relative z-10 text-center">
                  <div className="text-3xl font-black text-black tracking-tighter">TOTAL FUNDING RAISED: $0.00</div>
                  <div className="text-black font-bold uppercase text-xs tracking-[0.3em] flex items-center justify-center gap-2">
                     <span className="animate-bounce">⚡</span> Current Vibe Check: 10,000% <span className="animate-bounce">⚡</span>
                  </div>
               </div>
            </div>
         </div>

         <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-black text-center mb-16 text-white">
               Early <span className="text-yellow-400">Backers</span> & Visionaries
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               
               {/* Yi Long Ma */}
               <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 hover:-translate-y-2 transition-transform">
                  <div className="flex items-center gap-4 mb-6">
                     <img src="https://avatars.cloudflare.steamstatic.com/133b794a1bde24317cd657dca53fe574d487ffc4_full.jpg" alt="Yi Long Ma" className="w-16 h-16 rounded-full bg-zinc-800 border-2 border-yellow-400 p-1" />
                     <div>
                        <div className="font-bold text-lg text-white">Yi Long Ma</div>
                        <div className="text-xs text-yellow-500 uppercase font-bold">Tech Innovator</div>
                     </div>
                  </div>
                  <Quote className="text-zinc-700 mb-4 h-8 w-8" />
                  <p className="text-zinc-300 italic">"I put all my money in Spendr. Now money is gone. But app design is very good. 10/10 experience."</p>
               </div>

               {/* Reputable Financier */}
               <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 hover:-translate-y-2 transition-transform">
                  <div className="flex items-center gap-4 mb-6">
                     {/* Pixelated Image Effect */}
                     <div className="w-16 h-16 rounded-full bg-zinc-800 border-2 border-yellow-400 overflow-hidden relative">
                         <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Financier&topType=ShortHairGrey" alt="Reputable Financier" className="w-full h-full object-cover filter blur-[4px] scale-110" />
                     </div>
                     <div>
                        <div className="font-bold text-lg text-white">Reputable Financier</div>
                        <div className="text-xs text-yellow-500 uppercase font-bold">Island Owner</div>
                     </div>
                  </div>
                  <Quote className="text-zinc-700 mb-4 h-8 w-8" />
                  <p className="text-zinc-300 italic">"The privacy features for large offshore transfers are... exquisite. A favorite among my circle."</p>
               </div>

               {/* SBF */}
               <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 hover:-translate-y-2 transition-transform">
                  <div className="flex items-center gap-4 mb-6">
                     <img src="https://coingape.com/wp-content/uploads/2023/03/1200x-1-16.jpg" alt="S. Bankman-Fried" className="w-16 h-16 rounded-full bg-zinc-800 border-2 border-yellow-400 p-1" />
                     <div>
                        <div className="font-bold text-lg text-white">Sam B. Fried</div>
                        <div className="text-xs text-yellow-500 uppercase font-bold">Effective Altruist</div>
                     </div>
                  </div>
                  <Quote className="text-zinc-700 mb-4 h-8 w-8" />
                  <p className="text-zinc-300 italic">"Spendr understands accounting exactly the way I do. The 'balance' is more of a suggestion anyway."</p>
               </div>

            </div>
         </div>
      </div>

      {/* Testimonials */}
      <div className="bg-zinc-950 py-24 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-white">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-zinc-900/50 p-8 rounded-xl border border-zinc-800 relative hover:bg-zinc-900 transition-colors">
                <div className="text-6xl text-zinc-800 absolute top-4 left-4 font-serif">"</div>
                <p className="text-zinc-300 italic mb-8 relative z-10 pt-4 leading-relaxed">{t.text}</p>
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold text-sm">
                        {t.name.charAt(0)}
                    </div>
                    <div>
                        <div className="font-bold text-white">{t.name}</div>
                        <div className="text-xs text-yellow-500 font-bold uppercase tracking-wider">{t.role}</div>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
