import React, { useState, useEffect, useRef } from 'react';

interface ResultViewerProps {
  url: string;
  query: string;
}

const Fallback: React.FC<{ query: string }> = ({ query }) => {
  const openUrl = (baseUrl: string) => {
    const finalUrl = query ? `${baseUrl}${encodeURIComponent(query)}` : baseUrl.replace(/q=$/, '');
    window.open(finalUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fallback text-center p-6 sm:p-10 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <h3 className="font-semibold text-gray-800 dark:text-dark-white">Google couldn't be embedded</h3>
      <p className="text-sm text-gray-600 dark:text-dark-muted mt-2">
        This is common. Use a fallback option to open your search in a more compatible (and private) new tab.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
        <button 
          onClick={() => openUrl('https://www.google.com/search?q=')}
          className="w-full sm:w-auto px-4 py-2 text-sm font-semibold text-white bg-light-accent dark:bg-dark-accent hover:bg-opacity-90 rounded-lg transition-colors"
        >
          Open Google (New Tab)
        </button>
        <button 
          onClick={() => openUrl('https://duckduckgo.com/?q=')}
          className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-light-accent dark:text-dark-accent bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-lg transition-colors"
        >
          Open via DuckDuckGo
        </button>
      </div>
    </div>
  );
};

const ResultViewer: React.FC<ResultViewerProps> = ({ url, query }) => {
  const [showFallback, setShowFallback] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setShowFallback(false);
    
    // Clear any previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const handleLoad = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      try {
        // This will throw a cross-origin error if the iframe is blocked, which is what we want to catch.
        const canAccess = iframeRef.current?.contentWindow?.location.href;
        // If it doesn't throw, it means we might have loaded a non-Google page or a specific version. Keep iframe.
        setShowFallback(false);
      } catch (e) {
        // The error means it's blocked. Show the fallback.
        setShowFallback(true);
      }
    };
    
    // Set a timeout to assume it's blocked if it takes too long to load.
    timeoutRef.current = window.setTimeout(() => {
        setShowFallback(true);
    }, 2000);

    const currentIframe = iframeRef.current;
    if (currentIframe) {
      currentIframe.addEventListener('load', handleLoad);
    }
    
    return () => {
      if (currentIframe) {
        currentIframe.removeEventListener('load', handleLoad);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [url]);

  return (
    <div className="viewer mt-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden min-h-[400px] sm:min-h-[560px] flex flex-col">
      {showFallback ? (
        <Fallback query={query} />
      ) : (
        <iframe
          ref={iframeRef}
          className="frame w-full h-full flex-grow border-0"
          src={url}
          title="Search Results"
        ></iframe>
      )}
    </div>
  );
};

export default ResultViewer;
