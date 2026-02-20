
import React, { useState } from 'react';
// @ts-ignore
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth logic
    navigate('/admin');
  };

  const simulateBiometric = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      navigate('/admin');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#050b1a] flex items-center justify-center p-6 relative overflow-hidden font-display selection:bg-primary selection:text-white">
      {/* Background Animated Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse [animation-delay:2s]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:32px_32px]"></div>
      </div>

      <div className="w-full max-w-md relative z-10 flex flex-col gap-8 animate-in fade-in zoom-in duration-700">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="size-16 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/40">
            <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase text-white">EcoRoute</h1>
            <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.3em] mt-1">Enterprise Command Center</p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl flex flex-col gap-8">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white">Welcome Back</h2>
            <p className="text-xs text-white/40 font-medium">Please authorize to access the Lagos Hub grid.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-4">Authorized Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex.morgan@ecoroute.com"
                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-sm font-medium text-white focus:ring-2 focus:ring-primary focus:bg-white/10 transition-all outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-4">Access Key</label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-sm font-medium text-white focus:ring-2 focus:ring-primary focus:bg-white/10 transition-all outline-none"
              />
            </div>

            <button type="submit" className="w-full h-14 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
              Initialize Session
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-y-1/2 left-0 w-full h-px bg-white/10"></div>
            <span className="relative z-10 bg-[#050b1a] px-4 mx-auto block w-fit text-[9px] font-black text-white/20 uppercase tracking-widest">or utilize biometric</span>
          </div>

          <button
            onClick={simulateBiometric}
            disabled={isScanning}
            className={`w-full h-20 rounded-[1.5rem] border-2 border-dashed flex items-center justify-center gap-4 transition-all
              ${isScanning ? 'border-primary bg-primary/5 text-primary' : 'border-white/10 hover:border-white/30 text-white/40'}
            `}
          >
            <span className={`material-symbols-outlined text-4xl ${isScanning ? 'animate-pulse' : ''}`}>
              {isScanning ? 'fingerprint' : 'face_unlock'}
            </span>
            <div className="text-left">
              <p className="text-[10px] font-black uppercase tracking-widest leading-none">
                {isScanning ? 'Scanning Identity...' : 'Fast Auth'}
              </p>
              <p className="text-[9px] opacity-60 mt-1">FaceID / TouchID</p>
            </div>
          </button>
        </div>

        <div className="flex justify-center gap-8">
          <a href="#" className="text-[9px] font-black text-white/30 uppercase tracking-widest hover:text-white transition-colors">Emergency Protocol</a>
          <a href="#" className="text-[9px] font-black text-white/30 uppercase tracking-widest hover:text-white transition-colors">Terms of Access</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
