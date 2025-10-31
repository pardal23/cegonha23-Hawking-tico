import React from 'react';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, onQueryChange, onSearch }) => {
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
      <div className="relative flex-grow w-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          id="q"
          type="search"
          placeholder="Search Google or type a URL"
          autoComplete="off"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full pl-11 pr-4 py-3 text-base bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-dark-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:border-transparent outline-none transition"
        />
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <button 
          onClick={onSearch}
          className="w-full sm:w-auto px-6 py-3 font-semibold text-white bg-light-accent dark:bg-dark-accent hover:bg-opacity-90 dark:hover:bg-opacity-90 rounded-lg transition-colors"
        >
          Search
        </button>
        <button 
          onClick={() => openInNewTab(`https://duckduckgo.com/?q=${encodeURIComponent(query)}`)}
          title="Open search in DuckDuckGo (new tab)"
          className="w-full sm:w-auto px-4 py-3 font-medium text-light-accent dark:text-dark-accent bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-lg transition-colors"
        >
          Proxy
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
