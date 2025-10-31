import React from 'react';
import { SearchType } from '../types';

interface ToolButtonsProps {
  onToolClick: (type: SearchType) => void;
}

const tools: { label: string; action: SearchType }[] = [
  { label: 'Search Site', action: 'site' },
  { label: 'Images', action: 'images' },
  { label: 'News', action: 'news' },
  { label: 'Maps', action: 'maps' },
  { label: 'Translate', action: 'translate' },
];

const ToolButton: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => (
  <button 
    onClick={onClick}
    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-dark-muted bg-gray-100 hover:bg-gray-200 dark:bg-gray-700/50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg transition-all transform hover:scale-105"
  >
    {label}
  </button>
);

const ToolButtons: React.FC<ToolButtonsProps> = ({ onToolClick }) => {
  return (
    <div className="tools flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-4">
      {tools.map((tool) => (
        <ToolButton 
          key={tool.action}
          label={tool.label}
          onClick={() => onToolClick(tool.action)}
        />
      ))}
    </div>
  );
};

export default ToolButtons;
