import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Search, Film, Tv, Sparkles, User, Send } from 'lucide-react';

interface SidebarProps {
  onOpenSearch?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenSearch }) => {
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/search', label: 'Search', icon: Search, action: onOpenSearch },
    { to: '/movies', label: 'Movies', icon: Film },
    { to: '/tv', label: 'TV Shows', icon: Tv },
    { to: '/anime', label: 'Anime', icon: Sparkles },
    { to: '/watchlist', label: 'My Space', icon: User },
  ];

  return (
    <>
      {/* Desktop Fixed Left Sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 bottom-0 w-[78px] bg-[#090a0e]/90 backdrop-blur-xl border-r border-white/5 flex-col items-center py-5 z-40 select-none">
        {/* PikaMovie Logo */}
        <NavLink 
          to="/" 
          aria-label="PikaMovie home"
          className="group flex flex-col items-center gap-1.5 mb-7 transition-transform hover:scale-105"
        >
          {/* Pikachu-inspired Yellow Lightning Icon */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ffd83a] to-[#ff9f0a] flex items-center justify-center shadow-glow-subtle group-hover:shadow-glow transition-all">
            <svg width="22" height="22" viewBox="0 0 64 64" aria-hidden="true">
              <path d="M36.5 10 18 35.5h12.2L26.5 54 46 27.5H33.6z" fill="#1a1205" />
            </svg>
          </div>
          <div className="text-[9px] font-black tracking-widest leading-none text-white flex flex-col items-center">
            <span>PIKA</span>
            <span className="text-[#ffd83a]">MOVIE</span>
          </div>
        </NavLink>

        {/* Navigation Items */}
        <nav className="flex-1 flex flex-col items-center gap-2 w-full px-2">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;

            if (item.action) {
              return (
                <button
                  key={item.label}
                  onClick={item.action}
                  title={item.label}
                  className={`w-full py-2.5 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-all group ${
                    isActive
                      ? 'text-[#ffd83a] bg-white/5 font-medium'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span className="text-[10px] tracking-tight">{item.label}</span>
                </button>
              );
            }

            return (
              <NavLink
                key={item.to}
                to={item.to}
                title={item.label}
                className={({ isActive }) =>
                  `w-full py-2.5 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-all group relative ${
                    isActive
                      ? 'text-[#ffd83a] bg-white/5 font-medium shadow-inner'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#ffd83a] rounded-r-full shadow-glow" />
                )}
                <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span className="text-[10px] tracking-tight">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="w-8 h-px bg-white/10 my-4" />

        {/* Telegram Link */}
        <a
          href="https://t.me/pikamoviein"
          target="_blank"
          rel="noopener noreferrer"
          title="Join Telegram Channel"
          className="w-full py-2.5 px-1 rounded-xl flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-[#0088cc] hover:bg-white/5 transition-all group"
        >
          <Send className="w-5 h-5 transition-transform group-hover:scale-110" />
          <span className="text-[10px] tracking-tight">Telegram</span>
        </a>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#08090b]/95 backdrop-blur-xl border-t border-white/10 flex items-center justify-around px-2 z-50">
        {navLinks.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;

          if (item.action) {
            return (
              <button
                key={item.label}
                onClick={item.action}
                className={`flex flex-col items-center gap-1 py-1 px-2 text-xs transition-colors ${
                  isActive ? 'text-[#ffd83a]' : 'text-slate-400'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px]">{item.label}</span>
              </button>
            );
          }

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-1 px-2 text-xs transition-colors relative ${
                  isActive ? 'text-[#ffd83a] font-semibold' : 'text-slate-400'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px]">{item.label}</span>
              {isActive && (
                <span className="absolute -top-1 w-6 h-0.5 bg-[#ffd83a] rounded-full shadow-glow" />
              )}
            </NavLink>
          );
        })}
      </nav>
    </>
  );
};
