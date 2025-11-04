'use client';

import DotLoader from './DotLoader';

interface DotLoaderDemoProps {
  className?: string;
  showText?: boolean;
  text?: string;
}

const game = [
  [14, 7, 0, 8, 6, 13, 20],
  [14, 7, 13, 20, 16, 27, 21],
  [14, 20, 27, 21, 34, 24, 28],
  [27, 21, 34, 28, 41, 32, 35],
  [34, 28, 41, 35, 48, 40, 42],
  [34, 28, 41, 35, 48, 42, 46],
  [34, 28, 41, 35, 48, 42, 38],
  [34, 28, 41, 35, 48, 30, 21],
  [34, 28, 41, 48, 21, 22, 14],
  [34, 28, 41, 21, 14, 16, 27],
  [34, 28, 21, 14, 10, 20, 27],
  [28, 21, 14, 4, 13, 20, 27],
  [28, 21, 14, 12, 6, 13, 20],
  [28, 21, 14, 6, 13, 20, 11],
  [28, 21, 14, 6, 13, 20, 10],
  [14, 6, 13, 20, 9, 7, 21],
];

export default function DotLoaderDemo({
  className = '',
  showText = true,
  text = 'Thinking'
}: DotLoaderDemoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <DotLoader
        frames={game}
        className="gap-0.5"
        dotClassName="bg-gray-600 dark:bg-gray-400 [&.active]:bg-gray-900 dark:[&.active]:bg-white size-1.5"
      />
      {showText && (
        <span className="text-sm font-medium">{text}</span>
      )}
    </div>
  );
}
