import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { WatchlistProvider } from './context/WatchlistContext';
import { Sidebar } from './components/layout/Sidebar';
import { FloatingSearch } from './components/layout/FloatingSearch';
import { HomePage } from './pages/HomePage';
import { BrowsePage } from './pages/BrowsePage';
import { TitleDetailPage } from './pages/TitleDetailPage';
import { WatchPlayerPage } from './pages/WatchPlayerPage';
import { WatchlistPage } from './pages/WatchlistPage';
import { SearchPage } from './pages/SearchPage';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // In video player mode, hide sidebar and top floating search for true cinema experience
  const isPlayer = location.pathname.startsWith('/watch');

  return (
    <div className="relative min-h-screen w-full bg-[#08090b] text-white flex flex-col md:flex-row">
      {!isPlayer && (
        <>
          <Sidebar onOpenSearch={() => setIsSearchOpen(true)} />
          <FloatingSearch
            isOpen={isSearchOpen}
            onOpen={() => setIsSearchOpen(true)}
            onClose={() => setIsSearchOpen(false)}
          />
        </>
      )}

      <main className="flex-1 w-full overflow-x-hidden min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<BrowsePage />} />
          <Route path="/tv" element={<BrowsePage />} />
          <Route path="/anime" element={<BrowsePage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/title/:mediaType/:id" element={<TitleDetailPage />} />
          <Route path="/watch/:mediaType/:id" element={<WatchPlayerPage />} />
          {/* Fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <WatchlistProvider>
        <AppLayout />
      </WatchlistProvider>
    </BrowserRouter>
  );
};

export default App;
