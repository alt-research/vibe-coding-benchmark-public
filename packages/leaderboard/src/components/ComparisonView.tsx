// React component for side-by-side agent comparison
// Shows multiple agents running the same task simultaneously

import { LiveRunCard, type LiveRun } from './LiveRunCard';

export interface ComparisonViewProps {
  runs: LiveRun[];
  taskId: string;
  taskName: string;
  onSelectRun?: (runId: string) => void;
}

export function ComparisonView({
  runs,
  taskId,
  taskName,
  onSelectRun,
}: ComparisonViewProps) {
  const getWinner = () => {
    const completedRuns = runs.filter((r) => r.status === 'completed');
    if (completedRuns.length === 0) return null;

    // Winner has the best combination of speed and quality
    return completedRuns.reduce((best, run) => {
      const score = run.metrics.testsPass / (run.metrics.testsFail + run.metrics.testsPass || 1);
      const bestScore = best.metrics.testsPass / (best.metrics.testsFail + best.metrics.testsPass || 1);

      if (score > bestScore) return run;
      if (score === bestScore && run.metrics.elapsedMs < best.metrics.elapsedMs) return run;
      return best;
    });
  };

  const winner = getWinner();
  const allCompleted = runs.every(
    (r) => r.status === 'completed' || r.status === 'failed'
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Agent Comparison</h2>
            <p className="text-gray-500">{taskName}</p>
            <p className="text-sm text-gray-400 font-mono">{taskId}</p>
          </div>

          {allCompleted && winner && (
            <div className="text-center">
              <div className="text-4xl">🏆</div>
              <p className="text-sm font-medium text-gray-900">{winner.agentName}</p>
              <p className="text-xs text-gray-500">Winner</p>
            </div>
          )}

          <div className="text-right">
            <div className="text-sm text-gray-500">
              {runs.filter((r) => r.status === 'completed').length} / {runs.length} completed
            </div>
            <div className="text-sm text-gray-400">
              {runs.filter((r) => r.status === 'running').length} running
            </div>
          </div>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center space-x-4">
          {runs.map((run) => (
            <div
              key={run.id}
              className="flex-1"
              onClick={() => onSelectRun?.(run.id)}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  {run.agentName}
                </span>
                <span className="text-xs text-gray-500">{run.progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    run.status === 'completed'
                      ? 'bg-green-500'
                      : run.status === 'failed'
                        ? 'bg-red-500'
                        : 'bg-indigo-500'
                  }`}
                  style={{ width: `${run.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Side-by-side Cards */}
      <div
        className={`grid gap-4 ${
          runs.length === 2
            ? 'grid-cols-2'
            : runs.length === 3
              ? 'grid-cols-3'
              : 'grid-cols-2 lg:grid-cols-4'
        }`}
      >
        {runs.map((run) => (
          <div
            key={run.id}
            className={`relative ${
              winner?.id === run.id ? 'ring-2 ring-yellow-400 rounded-lg' : ''
            }`}
          >
            {winner?.id === run.id && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                  🏆 Winner
                </span>
              </div>
            )}
            <LiveRunCard
              run={run}
              onViewDetails={() => onSelectRun?.(run.id)}
            />
          </div>
        ))}
      </div>

      {/* Metrics Comparison Table */}
      {allCompleted && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Metric
                </th>
                {runs.map((run) => (
                  <th
                    key={run.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    {run.agentName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm text-gray-500">Tokens Used</td>
                {runs.map((run) => (
                  <td key={run.id} className="px-6 py-4 text-sm text-gray-900">
                    {run.metrics.tokensUsed.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-500">Execution Time</td>
                {runs.map((run) => (
                  <td key={run.id} className="px-6 py-4 text-sm text-gray-900">
                    {(run.metrics.elapsedMs / 1000).toFixed(1)}s
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-500">Files Read</td>
                {runs.map((run) => (
                  <td key={run.id} className="px-6 py-4 text-sm text-gray-900">
                    {run.metrics.filesRead}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-500">Files Written</td>
                {runs.map((run) => (
                  <td key={run.id} className="px-6 py-4 text-sm text-gray-900">
                    {run.metrics.filesWritten}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-500">Tests Passed</td>
                {runs.map((run) => (
                  <td key={run.id} className="px-6 py-4">
                    <span className="text-green-600 font-medium">
                      {run.metrics.testsPass}
                    </span>
                    <span className="text-gray-400"> / </span>
                    <span className="text-red-600">
                      {run.metrics.testsFail}
                    </span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
