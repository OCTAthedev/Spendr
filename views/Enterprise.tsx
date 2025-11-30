import React, { useState } from 'react';
import { generateEnterpriseAdvice } from '../services/geminiService';
import { Briefcase, FileWarning, Shredder, ShieldCheck } from 'lucide-react';

export const Enterprise: React.FC = () => {
  const [issue, setIssue] = useState('');
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConsult = async () => {
    if (!issue) return;
    setLoading(true);
    const result = await generateEnterpriseAdvice(issue);
    setAdvice(result);
    setLoading(false);
  };

  return (
    <div className="pt-24 min-h-screen bg-black px-4 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-white mb-4 flex items-center justify-center gap-3">
            <div className="bg-yellow-400 text-black p-2 rounded-lg"><Briefcase size={32} /></div>
            Enterprise Solutions
          </h1>
          <p className="text-zinc-500 text-lg">
            Strategic financial maneuvering for the agile corporation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Input Section */}
          <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6">Strategic Consultation</h2>
            <textarea
              className="w-full h-40 bg-black border border-zinc-800 rounded-xl p-4 text-white resize-none outline-none focus:border-yellow-500 mb-4 placeholder-zinc-700 transition-colors"
              placeholder="Describe your current financial irregularity..."
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
            />
            <button
              onClick={handleConsult}
              disabled={loading || !issue}
              className="w-full py-4 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 text-black font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loading ? 'Analyzing Regulatory Frameworks...' : 'Generate Action Plan'}
            </button>
          </div>

          {/* Output Section */}
          <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 flex flex-col shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6">Executive Directive</h2>
            
            <div className="flex-1 bg-black rounded-xl border border-dashed border-zinc-700 p-6 flex flex-col justify-center items-center text-center relative overflow-hidden">
               {advice ? (
                 <div className="animate-fade-in">
                   <div className="bg-yellow-500/10 p-3 rounded-full mb-4 mx-auto w-fit">
                        <ShieldCheck className="text-yellow-500 w-8 h-8" />
                   </div>
                   <p className="text-lg text-white font-medium leading-relaxed">"{advice}"</p>
                   <p className="text-[10px] text-zinc-600 mt-6 font-mono uppercase tracking-widest">Confidence Interval: 99.8%</p>
                 </div>
               ) : (
                 <p className="text-zinc-600 text-sm">Awaiting inputs for liability assessment...</p>
               )}
            </div>

             <div className="mt-6 pt-6 border-t border-zinc-800 flex justify-between items-center">
                <span className="text-sm text-zinc-500">Data Retention Policy</span>
                <button className="flex items-center gap-2 text-zinc-400 hover:text-red-500 text-sm font-bold transition-colors" onClick={() => alert("All logs deleted from server.")}>
                  <Shredder size={16} /> Purge Records
                </button>
             </div>
          </div>

        </div>

        <div className="mt-12 bg-zinc-900 border border-zinc-800 p-6 rounded-xl text-center">
           <h3 className="text-yellow-500 font-bold mb-2 uppercase text-xs tracking-widest">Case Study</h3>
           <p className="text-zinc-400 italic">
             "Tell Sally from Accounting that about 15 million Euros have magically disappeared." 
             <br/><span className="text-zinc-600 not-italic text-xs mt-2 block">- CFO, Fortune 500 Client</span>
           </p>
        </div>
      </div>
    </div>
  );
};