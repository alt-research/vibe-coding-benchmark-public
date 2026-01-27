// React component for streaming terminal output
// Uses asciinema-player for rendering recorded terminal sessions

import { useEffect, useRef, useState } from 'react';

export interface TerminalStreamProps {
  runId: string;
  apiUrl?: string;
}

export interface LogEntry {
  timestamp: string;
  message: string;
}

export function TerminalStream({ runId, apiUrl = '/api/live' }: TerminalStreamProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const eventSource = new EventSource(`${apiUrl}/stream/${runId}`);

    eventSource.addEventListener('update', (event) => {
      const data = JSON.parse(event.data);
      if (data.logs) {
        setLogs((prev) => [...prev, ...data.logs].slice(-100));
      }
    });

    eventSource.addEventListener('open', () => {
      setIsConnected(true);
    });

    eventSource.addEventListener('error', () => {
      setIsConnected(false);
    });

    eventSource.addEventListener('end', () => {
      eventSource.close();
      setIsConnected(false);
    });

    return () => {
      eventSource.close();
    };
  }, [runId, apiUrl]);

  useEffect(() => {
    // Auto-scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const formatTimestamp = (ts: string) => {
    const date = new Date(ts);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      {/* Terminal Header */}
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-gray-400 text-sm ml-2">Terminal Output</span>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}
          />
          <span className="text-gray-400 text-xs">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="p-4 h-96 overflow-y-auto font-mono text-sm"
        style={{ backgroundColor: '#1a1b26' }}
      >
        {logs.length === 0 ? (
          <div className="text-gray-500 animate-pulse">Waiting for output...</div>
        ) : (
          logs.map((log, index) => (
            <div key={index} className="flex">
              <span className="text-gray-500 mr-3 select-none">
                [{formatTimestamp(log.timestamp)}]
              </span>
              <span className="text-gray-100 whitespace-pre-wrap break-all">
                {log.message}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
