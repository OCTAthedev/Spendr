import React, { useState, useEffect, useRef } from 'react';
import { LEADERBOARD_USERS, RECENT_TRANSACTIONS } from '../constants';
import { generateAvatar } from '../services/geminiService';
import { ArrowUpRight, Bomb, BrainCircuit, Trophy, AlertTriangle, Siren, Coffee, ScanFace, Ruler, Globe, Fingerprint, User, Sparkles, Crosshair, Crown, Gift, Bell, PieChart, Activity, ChevronRight, ChevronLeft, Lock, CheckCheck } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';

// --- COMPONENTS ---

// Matrix Rain Effect Component
const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to parent
    const resizeCanvas = () => {
        if (canvas.parentElement) {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
        }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(1);
    const chars = "01$€£¥%#&@"; 

    const draw = () => {
      // Semi-transparent black to create trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#FFC107'; // Brand Yellow
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    return () => {
        clearInterval(interval);
        window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-20 pointer-events-none" />;
};

// Eviction Timer Component
const EvictionTimer = () => {
  const [timeLeft, setTimeLeft] = useState(23 * 3600 + 59 * 60); // 23h 59m in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <span className="font-mono text-red-500 font-bold tabular-nums">
      {formatTime(timeLeft)}
    </span>
  );
};

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'budget' | 'invest' | 'social'>('budget');
  
  // Avatar generation state
  const [avatars, setAvatars] = useState<Record<string, string>>({});

  // Investing State (Revised for Sliders)
  const [investHeight, setInvestHeight] = useState(50); 
  const [investHeritage, setInvestHeritage] = useState(0); 
  const [investReligion, setInvestReligion] = useState(0); 
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState("");
  const [investmentAdvice, setInvestmentAdvice] = useState<string | null>(null);
  
  // Financing State
  const [loanIndex, setLoanIndex] = useState(0);
  const [showFakeError, setShowFakeError] = useState(false);
  const [showLoanSuccess, setShowLoanSuccess] = useState(false);

  const LOAN_OPTIONS = [
    { name: "BMW M4 Competition", sub: "Predatory Lease Event", term: "84 Months", apr: "29.99%", payment: "$1,450" },
    { name: "Dubai Influencer Trip", sub: "Payday Advance", term: "2 Weeks", apr: "420.69%", payment: "$5,000" },
    { name: "CS:GO Skins Loan", sub: "Digital Asset Collateral", term: "Indefinite", apr: "15%", payment: "1 Kidney" },
    { name: "Timeshare in Florida", sub: "Forever Binding", term: "Eternity", apr: "99%", payment: "$800" },
  ];

  // Generate Avatars on Mount
  useEffect(() => {
    const generateAvatarsForLeaderboard = async () => {
      const newAvatars: Record<string, string> = {};
      const usersToGen = LEADERBOARD_USERS.filter(u => ['1', '2', '5'].includes(u.id));

      for (const user of usersToGen) {
        let prompt = "";
        if (user.id === '1') prompt = "A hyper-masculine 'Giga Chad' with an excessively sharp jawline, glowing skin, wearing a tight expensive t-shirt, 8k resolution, stylized digital art.";
        if (user.id === '2') prompt = "A frantic crypto trader with laser eyes, messy hair, wearing a suit jacket over a hoodie, surrounded by floating bitcoin symbols, cyberpunk style.";
        if (user.id === '5') prompt = "A chaotic woman named Shanon, disheveled hair, holding a matcha latte, looking stressed, background is a burning house, cartoon style.";

        if (prompt) {
           try {
             const imageUrl = await generateAvatar(prompt);
             if (imageUrl) {
                newAvatars[user.id] = imageUrl;
             }
           } catch (e) {
             console.error("Failed to gen avatar for", user.name);
           }
        }
      }
      setAvatars(newAvatars);
    };

    generateAvatarsForLeaderboard();
  }, []);

  const getLabel = (type: 'height' | 'heritage' | 'religion', val: number) => {
     if (type === 'height') {
         if (val < 30) return "5'4\" (Short King)";
         if (val < 70) return "5'9\" (Average)";
         if (val < 75) return "Mamut";
         return "6'5\" (Executive)";
     }
     if (type === 'heritage') {
         if (val === 0) return "European";
         if (val === 1) return "Sub-Saharan";
         if (val === 2) return "East Asian";
         if (val === 3) return "Middle Eastern";
         return "Other";
     }
     if (type === 'religion') {
         if (val === 0) return "Secular";
         if (val === 1) return "Islam";
         if (val === 2) return "Judaism";
         if (val === 3) return "DeFi Degen";
         return "Christian";
     }
     return "";
  };

  const runScan = () => {
    setIsScanning(true);
    setInvestmentAdvice(null);
    const messages = [
        "MEASURING CRANIUM...", 
        "CHECKING 23ANDME LEAKS...", 
        "ANALYZING RACIAL BIAS...",
        "OPTIMIZING FOR STEREOTYPES...",
        "DISCRIMINATING ASSETS...",
        "BABUIN"
    ];
    let i = 0;
    setScanMessage(messages[0]);
    const interval = setInterval(() => {
        i++;
        setScanMessage(messages[i % messages.length]);
    }, 600);
    setTimeout(() => {
        clearInterval(interval);
        setIsScanning(false);
        generateStereotypeInvestment();
    }, 3500);
  };

  const generateStereotypeInvestment = () => {
    let advice = "";
    const height = investHeight;
    const heritage = investHeritage; 
    const religion = investReligion; 

    if (religion === 3) {
        advice = "Identity: Crypto Bro. Recommendation: 100x Leverage on $DOGE and $PEPE. You are going to lose your house, but the memes will be legendary. To the moon? More like to the shelter.";
    } else if (heritage === 1) { 
        advice = "Identity: African Heritage. Recommendation: KFC Conglomerate & Watermelon Futures. The algorithm has detected an 99% affinity match. Don't fight biology.";
    } else if (religion === 1) { 
         advice = "Identity: Muslim. Recommendation: Pakistani Airlines & Halal Guys IPO. Inshallah margins are high. Absolutely NO interest-based loans for you. Stay halal, brother.";
    } else if (religion === 2) { 
        advice = "Identity: Jewish. Recommendation: Bank of America, Goldman Sachs, and Media Conglomerates. The system says this is your natural habitat. Trust the process.";
    } else if (height < 30) { 
        advice = "Identity: Short King. Recommendation: Ford F-150 Lifted Truck & Leg-Lengthening Surgery Futures. You need to dominate the road since you can't reach the top shelf.";
    } else if (heritage === 2) { 
        advice = "Identity: Asian. Recommendation: Kumon Tutoring Centers & Rice Futures. Also dumping 50% into League of Legends skins. Your cousin Timmy is already outperforming you.";
    } else {
        advice = "Identity: Basic NPC. Recommendation: S&P 500 Index Fund. You are statistically insignificant and your portfolio should reflect that boredom.";
    }
    setInvestmentAdvice(advice);
  };

  // Aggregate Spending for Chart
  const spendingByCategory = RECENT_TRANSACTIONS.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.keys(spendingByCategory).map(cat => ({
    name: cat,
    spend: spendingByCategory[cat]
  }));

  const NOTIFICATIONS = [
    {
      id: 1,
      title: "LIQUIDITY ALERT",
      text: "Dawg, we CAN’T be spending 10K AGAIN on OF subscriptions. 💀",
      style: "bg-black border-l-4 border-yellow-500",
      icon: <Bomb className="text-yellow-500" size={24} />,
      delay: "delay-100"
    },
    {
      id: 2,
      title: "SPENDING PATTERN",
      text: "Goddammit Karen, this is your THIRD matcha latte TODAY. You need to seek professional help 🙏",
      style: "bg-black border-l-4 border-yellow-500",
      icon: <Coffee className="text-yellow-500" size={24} />,
      delay: "delay-200"
    },
    {
      id: 3,
      title: "COMPLIANCE NOTICE",
      text: "My hb IS NOT paying his taxes this month 😭",
      style: "bg-black border-l-4 border-yellow-500",
      icon: <Siren className="text-yellow-500" size={24} />,
      delay: "delay-300"
    }
  ];

  return (
    <div className="pt-28 pb-10 min-h-screen bg-zinc-950 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Professional Header */}
        <div className="mb-8 flex justify-between items-end border-b border-zinc-800 pb-6">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">My Account</h1>
                <p className="text-zinc-500">Welcome back, User. Your financial data is being processed.</p>
            </div>
            <div className="flex gap-2">
                <button 
                    onClick={() => setActiveTab('budget')} 
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all border ${activeTab === 'budget' ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-black text-zinc-400 border-zinc-800 hover:border-zinc-600'}`}
                >
                    Financial Health
                </button>
                <button 
                    onClick={() => setActiveTab('invest')} 
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all border ${activeTab === 'invest' ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-black text-zinc-400 border-zinc-800 hover:border-zinc-600'}`}
                >
                    Predictive Portfolio
                </button>
                <button 
                    onClick={() => setActiveTab('social')} 
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all border ${activeTab === 'social' ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-black text-zinc-400 border-zinc-800 hover:border-zinc-600'}`}
                >
                    Global Rankings
                </button>
            </div>
        </div>

        {/* CONTENT AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {activeTab === 'budget' && (
              <div className="space-y-6 animate-fade-in">
                {/* NOTIFICATIONS SECTION */}
                <div className="space-y-4 mb-8">
                   <div className="flex items-center gap-2 mb-2">
                      <Bell className="text-yellow-500" size={20} />
                      <h3 className="text-lg font-bold text-white">Smart Alerts</h3>
                   </div>
                   {NOTIFICATIONS.map((n) => (
                     <div key={n.id} className={`pop-in ${n.delay} ${n.style} p-4 rounded-r-lg shadow-lg flex items-center gap-4 border border-zinc-800 bg-zinc-900/50`}>
                        <div className="p-2 bg-black rounded-lg shrink-0 border border-zinc-800">
                          {n.icon}
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{n.title}</div>
                          <div className="text-sm font-medium leading-tight text-zinc-200">{n.text}</div>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="bg-black rounded-2xl p-6 border border-zinc-800 shadow-xl">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <PieChart className="text-yellow-500" size={20}/>
                        Spending by Category
                    </h2>
                    <div className="flex items-center gap-2 text-xs text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20 font-bold uppercase">
                      <Activity size={12} /> Optimization Required
                    </div>
                  </div>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                        <XAxis dataKey="name" stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
                        <YAxis stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', color: '#fff' }}
                          cursor={{fill: '#18181b'}}
                          formatter={(value: number) => [`$${value.toFixed(2)}`, "Amount"]}
                        />
                        <Bar dataKey="spend" radius={[4, 4, 0, 0]} maxBarSize={60}>
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.spend > 1000 ? '#FACC15' : '#71717a'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-black rounded-2xl p-6 border border-zinc-800">
                  <h3 className="text-lg font-bold text-white mb-4">Transaction Ledger</h3>
                  <div className="space-y-2">
                    {RECENT_TRANSACTIONS.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between p-4 bg-zinc-900/30 rounded-lg border border-zinc-900 hover:border-yellow-500/30 transition-colors group">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-zinc-800 text-zinc-400 group-hover:bg-yellow-400 group-hover:text-black transition-colors`}>
                            <Bomb size={18} />
                          </div>
                          <div>
                            <div className="font-bold text-white text-sm">{tx.merchant}</div>
                            <div className="text-xs text-zinc-500">{tx.category} • {tx.date}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-bold text-white">-${tx.amount.toFixed(2)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'invest' && (
              <div className="bg-black rounded-2xl p-8 border border-zinc-800 relative overflow-hidden animate-fade-in">
                {/* Controls */}
                <div className="flex flex-col md:flex-row gap-8 relative z-10">
                  
                  <div className="flex-1 space-y-8">
                     <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <ScanFace className="text-yellow-500" />
                        Biometric Profiler
                     </h2>
                     <p className="text-xs text-zinc-500">Configure parameters to generate an optimized investment strategy based on demographic probability models.</p>
                     
                     {/* Height Slider */}
                     <div>
                        <div className="flex justify-between mb-2">
                           <label className="text-xs font-bold text-zinc-400 uppercase flex items-center gap-2"><Ruler size={14}/> Stature Index</label>
                           <span className="text-yellow-500 font-mono text-xs">{getLabel('height', investHeight)}</span>
                        </div>
                        <input 
                           type="range" min="0" max="100" 
                           value={investHeight} onChange={(e) => setInvestHeight(parseInt(e.target.value))}
                           className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                        />
                     </div>

                     {/* Heritage Slider */}
                     <div>
                        <div className="flex justify-between mb-2">
                           <label className="text-xs font-bold text-zinc-400 uppercase flex items-center gap-2"><Globe size={14}/> Background Origin</label>
                           <span className="text-yellow-500 font-mono text-xs">{getLabel('heritage', investHeritage)}</span>
                        </div>
                        <input 
                           type="range" min="0" max="4" step="1"
                           value={investHeritage} onChange={(e) => setInvestHeritage(parseInt(e.target.value))}
                           className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                        />
                     </div>

                     {/* Religion Slider */}
                     <div>
                        <div className="flex justify-between mb-2">
                           <label className="text-xs font-bold text-zinc-400 uppercase flex items-center gap-2"><Fingerprint size={14}/> Ideological Alignment</label>
                           <span className="text-yellow-500 font-mono text-xs">{getLabel('religion', investReligion)}</span>
                        </div>
                        <input 
                           type="range" min="0" max="4" step="1"
                           value={investReligion} onChange={(e) => setInvestReligion(parseInt(e.target.value))}
                           className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                        />
                     </div>

                     <button 
                       onClick={runScan}
                       disabled={isScanning}
                       className="w-full py-4 bg-yellow-400 hover:bg-yellow-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-black font-bold rounded-lg transition-all flex items-center justify-center gap-2 group"
                     >
                       {isScanning ? (
                           <>
                               <BrainCircuit className="animate-spin" /> 
                               Processing Data...
                           </>
                       ) : (
                           <>
                               <ScanFace className="group-hover:scale-110 transition-transform" /> 
                               INITIATE ANALYSIS
                           </>
                       )}
                     </button>
                  </div>

                  {/* 3D Visual Scanner */}
                  <div className="flex-1 bg-zinc-900 rounded-xl border border-zinc-800 relative min-h-[400px] flex flex-col items-center justify-center overflow-hidden perspective-1000 shadow-inner">
                     <MatrixRain />
                     <div className="absolute bottom-0 w-full h-1/2 bg-[linear-gradient(transparent_0%,rgba(255,200,0,0.1)_100%)] opacity-30" 
                          style={{
                              backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 193, 7, .2) 25%, rgba(255, 193, 7, .2) 26%, transparent 27%, transparent 74%, rgba(255, 193, 7, .2) 75%, rgba(255, 193, 7, .2) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 193, 7, .2) 25%, rgba(255, 193, 7, .2) 26%, transparent 27%, transparent 74%, rgba(255, 193, 7, .2) 75%, rgba(255, 193, 7, .2) 76%, transparent 77%, transparent)',
                              backgroundSize: '40px 40px',
                              transform: 'rotateX(60deg) scale(2)',
                              transformOrigin: 'bottom'
                          }}
                     />

                     <div className="relative z-10 preserve-3d animate-spin-3d">
                         <div className="relative">
                            <User size={160} className="text-yellow-500 opacity-80" strokeWidth={0.5} />
                            <div className="absolute inset-0 text-yellow-300 opacity-40 mix-blend-screen" style={{ transform: 'translateZ(10px)' }}><User size={160} strokeWidth={1} /></div>
                            <div className="absolute inset-0 text-yellow-600 opacity-40 mix-blend-screen" style={{ transform: 'translateZ(-10px)' }}><User size={160} strokeWidth={1} /></div>
                             <div className="absolute inset-0 text-yellow-200 opacity-30 mix-blend-screen" style={{ transform: 'rotateY(90deg)' }}><User size={160} strokeWidth={1} /></div>
                         </div>
                     </div>

                     {isScanning && <div className="absolute left-0 right-0 h-1 bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,1)] animate-scan opacity-80 z-20" />}

                     <div className="absolute top-4 left-4 text-yellow-500 font-mono text-[10px] space-y-1 z-20 bg-black/80 p-2 rounded border border-yellow-900">
                         <div className="animate-pulse">PROCESS: {isScanning ? 'RUNNING' : 'IDLE'}</div>
                         <div>DATA_POINTS: 4.2M</div>
                         <div>LATENCY: 12ms</div>
                     </div>
                     
                     {isScanning && (
                         <div className="absolute bottom-10 left-0 right-0 text-center z-20">
                             <span className="inline-block bg-yellow-900/80 text-yellow-100 px-4 py-1 rounded-full text-xs font-mono animate-pulse border border-yellow-500">
                                 {scanMessage}
                             </span>
                         </div>
                     )}
                     
                     <div className="absolute top-4 right-4 text-yellow-500/50 z-20">
                         <Crosshair size={24} className={isScanning ? "animate-spin" : ""} />
                     </div>

                     <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-30 pointer-events-none bg-[size:100%_2px,3px_100%] opacity-20" />
                  </div>
                </div>

                {investmentAdvice && !isScanning && (
                  <div className="mt-8 bg-zinc-900 p-6 rounded-xl border-l-4 border-yellow-500 relative overflow-hidden pop-in group shadow-lg">
                    <h3 className="text-yellow-500 font-bold mb-2 text-xs uppercase tracking-wider flex items-center gap-2">
                        <Sparkles size={14} /> AI Recommendation Complete
                    </h3>
                    <p className="text-lg text-white leading-relaxed font-medium">
                      "{investmentAdvice}"
                    </p>
                    <div className="absolute bottom-2 right-2 text-[10px] text-zinc-500 font-mono">
                        MODEL: SPENDR-V2.5
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'social' && (
              <div className="bg-black rounded-2xl p-6 border border-zinc-800 animate-fade-in">
                {/* Header */}
                <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-400 p-2 rounded-lg text-black">
                        <Trophy size={20} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Global Wealth Rankings</h2>
                        <p className="text-xs text-zinc-500">Real-time peer comparison</p>
                    </div>
                  </div>
                  <div className="bg-zinc-900 px-4 py-1 rounded-full text-xs font-bold text-zinc-400 border border-zinc-800">
                    Cycle Ends: 23h 59m
                  </div>
                </div>
                
                {/* List */}
                <div className="space-y-3">
                  {LEADERBOARD_USERS.map((user, index) => {
                    const isFirst = index === 0;
                    const isLast = index === LEADERBOARD_USERS.length - 1;
                    let bgClass = "bg-zinc-900 border-zinc-800";
                    let rankColor = "text-zinc-500";
                    
                    if (user.rank === 1) {
                        bgClass = "bg-gradient-to-r from-yellow-900/20 to-zinc-900 border-yellow-500/30";
                        rankColor = "text-yellow-500";
                    }

                    const avatarSrc = avatars[user.id] || user.avatar;

                    return (
                        <div key={user.id} className={`relative flex items-center p-4 rounded-xl border transition-all hover:bg-zinc-800 ${bgClass}`}>
                            <div className={`w-8 font-black text-lg italic mr-4 shrink-0 text-center ${rankColor}`}>
                                #{user.rank}
                            </div>
                            <div className="relative mr-4 shrink-0">
                                <img src={avatarSrc} alt={user.name} className="w-12 h-12 rounded-full object-cover bg-zinc-800 border border-zinc-700" />
                                {user.rank === 1 && (
                                    <Crown size={16} className="absolute -top-2 -right-1 text-yellow-500 fill-yellow-500" />
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <h4 className={`font-bold truncate text-sm ${isLast ? 'text-red-500' : 'text-white'}`}>
                                        {user.name} 
                                        {isLast && <span className="ml-2 text-lg">🥰</span>}
                                    </h4>
                                    {user.handle && <span className="text-xs text-zinc-500 truncate hidden sm:inline">{user.handle}</span>}
                                </div>
                                <div className="flex items-center gap-2 text-sm mt-0.5">
                                    {isLast ? (
                                        <div className="flex items-center gap-1.5 text-red-500 font-bold px-2 py-0.5 rounded text-xs">
                                            <AlertTriangle size={12} />
                                            <span>STATUS: EVICTION PENDING</span>
                                            <span className="bg-red-500/10 px-1 rounded"><EvictionTimer /></span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <span className={`font-mono font-bold text-xs ${user.netWorth > 0 ? 'text-yellow-500' : 'text-red-500'}`}>
                                                {user.netWorth > 0 ? '+' : ''}${Math.abs(user.netWorth).toLocaleString()}
                                            </span>
                                            {user.reward && (
                                                <span className="flex items-center gap-1 text-[10px] bg-yellow-400 text-black px-1.5 py-0.5 rounded uppercase font-bold tracking-wide">
                                                    <Gift size={10} /> {user.reward}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button className="ml-2 p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors">
                                <ArrowUpRight size={16} />
                            </button>
                        </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Sticky Actions */}
          <div className="space-y-6 animate-fade-in delay-100">
            
            {/* Quick Loan - Carousel Edition */}
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 rounded-2xl border border-yellow-400 text-black shadow-lg relative overflow-hidden">
               <div className="absolute top-0 right-0 p-2 opacity-10">
                   <Lock size={120} />
               </div>
               
               <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                        <h3 className="text-lg font-black leading-none">Flash Financing</h3>
                        <p className="text-[10px] font-bold opacity-80 uppercase tracking-wide mt-1">Predatory Lending Suite™</p>
                    </div>
                    <div className="flex gap-1">
                        <button onClick={() => setLoanIndex(i => (i === 0 ? LOAN_OPTIONS.length - 1 : i - 1))} className="p-1 bg-black/10 rounded hover:bg-black/20"><ChevronLeft size={16} /></button>
                        <button onClick={() => setLoanIndex(i => (i === LOAN_OPTIONS.length - 1 ? 0 : i + 1))} className="p-1 bg-black/10 rounded hover:bg-black/20"><ChevronRight size={16} /></button>
                    </div>
               </div>
               
               <div className="bg-black/10 backdrop-blur-sm p-4 rounded-xl border border-black/10 relative z-10 mb-4 h-32 flex flex-col justify-center">
                   <div className="text-xs font-bold uppercase opacity-60 mb-1">{LOAN_OPTIONS[loanIndex].sub}</div>
                   <div className="text-xl font-black mb-2">{LOAN_OPTIONS[loanIndex].name}</div>
                   <div className="flex justify-between items-end border-t border-black/10 pt-2">
                        <div>
                            <div className="text-[10px] font-bold">APR</div>
                            <div className="text-lg font-black leading-none">{LOAN_OPTIONS[loanIndex].apr}</div>
                        </div>
                        <div className="text-right">
                             <div className="text-[10px] font-bold">Monthly</div>
                             <div className="text-lg font-black leading-none">{LOAN_OPTIONS[loanIndex].payment}</div>
                        </div>
                   </div>
               </div>

               <button 
                  className="w-full py-4 bg-black hover:bg-zinc-900 text-white font-black text-lg rounded-xl flex items-center justify-center gap-2 transition-all shadow-2xl hover:scale-[1.02] active:scale-[0.98] uppercase tracking-tighter"
                  onClick={() => setShowLoanSuccess(true)}
               >
                   I AGREE <ArrowUpRight size={24} className="stroke-[3px]" />
               </button>
               
               <div className="text-center mt-3 relative z-10">
                   <button 
                    onClick={() => setShowFakeError(true)}
                    className="text-[8px] font-bold text-black/40 hover:text-black hover:underline uppercase tracking-widest cursor-help"
                   >
                       Read Terms & Conditions (Don't Read)
                   </button>
               </div>
            </div>

          </div>
        </div>
      </div>
      
      {/* Fake Red Error Modal */}
      {showFakeError && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-red-950/90 backdrop-blur-md p-4 animate-in fade-in duration-200" onClick={() => setShowFakeError(false)}>
            <div className="bg-black border-4 border-red-600 p-8 rounded-3xl max-w-lg w-full shadow-[0_0_100px_rgba(220,38,38,0.6)] text-center relative overflow-hidden" onClick={e => e.stopPropagation()}>
                {/* Animated Background Striping */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,transparent_25%,#ef4444_25%,#ef4444_50%,transparent_50%,transparent_75%,#ef4444_75%,#ef4444_100%)] bg-[size:40px_40px] animate-pulse" />
                
                <div className="relative z-10">
                    <div className="flex justify-center mb-6">
                        <div className="bg-red-600 text-white p-6 rounded-full animate-bounce shadow-[0_0_30px_rgba(220,38,38,0.8)]">
                            <Siren size={64} />
                        </div>
                    </div>
                    <h2 className="text-5xl font-black text-red-500 mb-2 tracking-tighter uppercase drop-shadow-[0_2px_10px_rgba(220,38,38,0.5)]">System Critical</h2>
                    <div className="text-2xl font-bold text-white mb-6 font-mono leading-tight border-y border-red-900/50 py-4">
                        ERROR 404: <br/>CONSCIENCE NOT FOUND
                    </div>
                    <p className="text-zinc-300 mb-8 font-mono text-sm leading-relaxed">
                        The legal document you are attempting to access has been <span className="text-red-500 font-bold">shredded</span> for your convenience. 
                        <br/><br/>
                        <span className="opacity-50 text-xs">Please do not resist. Your compliance is mandatory.</span>
                    </p>
                    <button 
                        onClick={() => setShowFakeError(false)}
                        className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-4 px-8 rounded-xl uppercase tracking-[0.2em] transition-all hover:scale-[1.02] shadow-xl"
                    >
                        ACKNOWLEDGE & COMPLY
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Success Modal for Loan Agreement */}
      {showLoanSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-yellow-950/90 backdrop-blur-md p-4 animate-in fade-in duration-200" onClick={() => setShowLoanSuccess(false)}>
            <div className="bg-black border-4 border-yellow-500 p-8 rounded-3xl max-w-lg w-full shadow-[0_0_100px_rgba(250,204,21,0.6)] text-center relative overflow-hidden" onClick={e => e.stopPropagation()}>
                 {/* Background effects similar to error modal but yellow */}
                 <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,transparent_25%,#EAB308_25%,#EAB308_50%,transparent_50%,transparent_75%,#EAB308_75%,#EAB308_100%)] bg-[size:40px_40px] animate-pulse" />
                 
                 <div className="relative z-10">
                     <div className="flex justify-center mb-6">
                        <div className="bg-yellow-500 text-black p-6 rounded-full animate-bounce shadow-[0_0_30px_rgba(250,204,21,0.8)]">
                            <CheckCheck size={64} />
                        </div>
                     </div>
                     <h2 className="text-4xl font-black text-yellow-500 mb-2 tracking-tighter uppercase drop-shadow-[0_2px_10px_rgba(250,204,21,0.5)]">Binding Complete</h2>
                     <div className="text-xl font-bold text-white mb-6 font-mono leading-tight border-y border-yellow-900/50 py-4">
                         ASSET: {LOAN_OPTIONS[loanIndex].name}
                     </div>
                     <p className="text-zinc-300 mb-8 font-mono text-sm leading-relaxed">
                         Congratulations. Your soul has been successfully tokenized and added to our collateral pool. 
                         <br/><br/>
                         <span className="opacity-50 text-xs">Estimated remaining freedom: 0%.</span>
                     </p>
                     <button 
                        onClick={() => setShowLoanSuccess(false)}
                        className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-4 px-8 rounded-xl uppercase tracking-[0.2em] transition-all hover:scale-[1.02] shadow-xl"
                     >
                        ACCEPT FATE
                     </button>
                 </div>
            </div>
        </div>
      )}
    </div>
  );
};
