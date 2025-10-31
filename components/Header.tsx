import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center gap-4 border-b border-gray-200 dark:border-gray-700 pb-4">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#4285F4] via-[#34A853] to-[#FBBC05] shadow-md flex-shrink-0"></div>
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-dark-white">
          Advanced Search Studio
        </h1>
        <p className="text-sm text-gray-600 dark:text-dark-muted">
          Anonymous mode simulation — quick tools & advanced search
        </p>
      </div>
    </header>
  );
};

export default Header;
