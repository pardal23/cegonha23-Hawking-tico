import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ToolButtons from './components/ToolButtons';
import SettingsBar from './components/SettingsBar';
import ResultViewer from './components/ResultViewer';
import { SearchType } from './types';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSearchUrl, setActiveSearchUrl] = useState<string>('https://www.google.com/webhp?igu=1&hl=pt-PT');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isAnonymous) {
      root.classList.add('dark');
      root.style.backgroundColor = '#1a1b1e'; // A slightly darker bg for the body in dark mode
    } else {
      root.classList.remove('dark');
      root.style.backgroundColor = '#f0f2f5';
    }
  }, [isAnonymous]);

  const handleSearch = useCallback((query: string, type: SearchType = 'google') => {
    if (!query) return;
    const encodedQuery = encodeURIComponent(query);
    let url = '';

    switch (type) {
      case 'images':
        url = `https://www.google.com/search?tbm=isch&q=${encodedQuery}`;
        break;
      case 'news':
        url = `https://www.google.com/search?tbm=nws&q=${encodedQuery}`;
        break;
      case 'maps':
        url = `https://www.google.com/maps/search/${encodedQuery}`;
        break;
      case 'site':
        url = `https://www.google.com/search?q=${encodeURIComponent(`${query} site:pt`)}`;
        break;
      case 'translate':
        url = `https://translate.google.com/?sl=auto&tl=pt&text=${encodedQuery}&op=translate`;
        break;
      case 'google':
      default:
        url = `https://www.google.com/search?q=${encodedQuery}&pws=0`;
    }
    
    if (type === 'google') {
      setActiveSearchUrl(url);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, []);

  const handleToolClick = (type: SearchType) => {
    handleSearch(searchQuery || 'React TypeScript', type);
  };
  
  const clearLocalData = () => {
    try {
        localStorage.clear();
        sessionStorage.clear();
        alert('Local and session storage cleared.');
    } catch (e) {
        console.error("Could not clear storage:", e);
        alert('Failed to clear storage.');
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-dark-bg transition-colors duration-300 min-h-screen">
      <div className="studio container mx-auto p-4 sm:p-6 md:p-10 flex flex-col items-center">
        <div className="panel w-full max-w-4xl bg-white/90 dark:bg-dark-panel/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-5 sm:p-7">
          <Header />
          <SettingsBar isAnonymous={isAnonymous} onAnonymousToggle={setIsAnonymous} onClearData={clearLocalData} />
          <main className="mt-4">
            <SearchBar 
              query={searchQuery} 
              onQueryChange={setSearchQuery} 
              onSearch={() => handleSearch(searchQuery)} 
            />
            <p className="text-xs text-gray-500 dark:text-dark-muted mt-2 text-center sm:text-left">
              Press Enter to search. Using fallback options is recommended for privacy and compatibility.
            </p>
            <ToolButtons onToolClick={handleToolClick} />
          </main>
          <ResultViewer url={activeSearchUrl} query={searchQuery} />
        </div>
      </div>
    </div>
  );
};

export default App;
