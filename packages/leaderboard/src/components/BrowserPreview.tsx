// React component for browser preview using noVNC
// Shows live browser sessions for visual/frontend tasks

import { useEffect, useRef, useState } from 'react';

export interface BrowserPreviewProps {
  runId: string;
  vncUrl?: string;
  screenshotUrl?: string;
  width?: number;
  height?: number;
  onScreenshot?: () => void;
}

export function BrowserPreview({
  runId,
  vncUrl,
  screenshotUrl,
  width = 800,
  height = 600,
  onScreenshot,
}: BrowserPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'vnc' | 'screenshot'>('screenshot');

  useEffect(() => {
    if (vncUrl && mode === 'vnc') {
      // In production, this would connect to a noVNC WebSocket
      setIsConnected(true);
    }
  }, [vncUrl, mode]);

  const handleRefresh = () => {
    if (iframeRef.current && screenshotUrl) {
      iframeRef.current.src = `${screenshotUrl}?t=${Date.now()}`;
    }
    onScreenshot?.();
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
      {/* Browser Chrome */}
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Window Controls */}
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>

          {/* URL Bar */}
          <div className="flex-1 ml-4">
            <div className="bg-gray-700 rounded px-3 py-1 text-sm text-gray-300 font-mono">
              localhost:3000
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleRefresh}
            className="p-1 text-gray-400 hover:text-white"
            title="Refresh"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>

          <div className="flex rounded overflow-hidden">
            <button
              onClick={() => setMode('screenshot')}
              className={`px-2 py-1 text-xs ${
                mode === 'screenshot'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Screenshot
            </button>
            <button
              onClick={() => setMode('vnc')}
              className={`px-2 py-1 text-xs ${
                mode === 'vnc'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              disabled={!vncUrl}
            >
              Live
            </button>
          </div>

          {/* Connection Status */}
          <div className="flex items-center space-x-1">
            <span
              className={`w-2 h-2 rounded-full ${
                isConnected ? 'bg-green-500' : 'bg-gray-500'
              }`}
            />
            <span className="text-gray-400 text-xs">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
      </div>

      {/* Browser Content */}
      <div
        className="relative bg-white"
        style={{ width, height }}
      >
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <svg
                className="w-12 h-12 mx-auto text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className="mt-2 text-gray-500">{error}</p>
              <button
                onClick={() => setError(null)}
                className="mt-2 text-indigo-600 hover:text-indigo-700"
              >
                Retry
              </button>
            </div>
          </div>
        ) : mode === 'vnc' && vncUrl ? (
          <iframe
            ref={iframeRef}
            src={vncUrl}
            className="w-full h-full border-0"
            title="Browser Preview"
          />
        ) : screenshotUrl ? (
          <img
            src={`${screenshotUrl}?t=${Date.now()}`}
            alt="Browser Screenshot"
            className="w-full h-full object-contain"
            onError={() => setError('Failed to load screenshot')}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center text-gray-500">
              <svg
                className="w-16 h-16 mx-auto text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <p className="mt-2">Waiting for browser session...</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between text-xs text-gray-400">
        <span>Run ID: {runId}</span>
        <span>{width}x{height}</span>
      </div>
    </div>
  );
}
