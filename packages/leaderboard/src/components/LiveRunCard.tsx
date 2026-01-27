// React component for live run status card
// This would be used in a Next.js or React frontend

export interface LiveRun {
  id: string;
  agentName: string;
  taskId: string;
  status: 'initializing' | 'running' | 'evaluating' | 'completed' | 'failed';
  progress: number;
  currentStep: string;
  metrics: {
    tokensUsed: number;
    filesRead: number;
    filesWritten: number;
    testsPass: number;
    testsFail: number;
    elapsedMs: number;
  };
  startedAt: string;
}

export interface LiveRunCardProps {
  run: LiveRun;
  onViewDetails?: (runId: string) => void;
}

export function LiveRunCard({ run, onViewDetails }: LiveRunCardProps) {
  const statusColors = {
    initializing: 'bg-yellow-100 text-yellow-800',
    running: 'bg-blue-100 text-blue-800',
    evaluating: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
  };

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatNumber = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return n.toString();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{run.agentName}</h3>
          <p className="text-sm text-gray-500">{run.taskId}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[run.status]}`}>
          {run.status}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>{run.currentStep}</span>
          <span>{run.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${run.progress}%` }}
          />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">
            {formatNumber(run.metrics.tokensUsed)}
          </p>
          <p className="text-xs text-gray-500">Tokens</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">
            {run.metrics.filesRead}/{run.metrics.filesWritten}
          </p>
          <p className="text-xs text-gray-500">Files R/W</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">
            {formatDuration(run.metrics.elapsedMs)}
          </p>
          <p className="text-xs text-gray-500">Duration</p>
        </div>
      </div>

      {/* Test Results */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <span className="flex items-center text-green-600">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {run.metrics.testsPass} passed
          </span>
          <span className="flex items-center text-red-600">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            {run.metrics.testsFail} failed
          </span>
        </div>
        {onViewDetails && (
          <button
            onClick={() => onViewDetails(run.id)}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            View Details →
          </button>
        )}
      </div>
    </div>
  );
}
