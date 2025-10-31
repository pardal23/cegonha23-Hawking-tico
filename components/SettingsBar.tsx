import React from 'react';

interface SettingsBarProps {
  isAnonymous: boolean;
  onAnonymousToggle: (isAnonymous: boolean) => void;
  onClearData: () => void;
}

const SettingsBar: React.FC<SettingsBarProps> = ({ isAnonymous, onAnonymousToggle, onClearData }) => {
  return (
    <div className="flex items-center justify-end gap-4 mt-4">
      <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 dark:text-dark-muted">
        <input 
          type="checkbox" 
          checked={isAnonymous}
          onChange={(e) => onAnonymousToggle(e.target.checked)}
          className="form-checkbox h-4 w-4 rounded text-light-accent dark:text-dark-accent bg-gray-200 dark:bg-gray-600 border-gray-300 dark:border-gray-500 focus:ring-light-accent dark:focus:ring-dark-accent"
        />
        <span>Anonymous</span>
      </label>
      <button 
        onClick={onClearData}
        className="px-3 py-1 text-sm font-medium text-light-accent dark:text-dark-accent bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-md transition-colors"
      >
        Clear Local Data
      </button>
    </div>
  );
};

export default SettingsBar;
