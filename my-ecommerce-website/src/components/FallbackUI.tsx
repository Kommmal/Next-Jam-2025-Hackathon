import React from 'react';

interface FallbackUIProps {
  loading?: boolean;
  error?: string;
  noDataMessage?: string;
  onRetry?: () => void;
}

const FallbackUI: React.FC<FallbackUIProps> = ({ loading, error, noDataMessage, onRetry }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[700px]">
        <p className="text-lg font-semibold">Loading...</p>
        <div className="animate-spin border-4 border-gray-300 border-t-black rounded-full w-10 h-10 mt-3"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <p className="text-lg font-semibold text-red-500">Error: {error}</p>
        {onRetry && (
          <button
            className="mt-3 px-4 py-2 bg-black text-white rounded-lg"
            onClick={onRetry}
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  if (noDataMessage) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <p className="text-lg font-semibold">{noDataMessage}</p>
      </div>
    );
  }

  return null;
};

export default FallbackUI;
