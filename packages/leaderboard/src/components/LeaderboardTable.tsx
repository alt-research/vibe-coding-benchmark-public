// React component for leaderboard table
// This would be used in a Next.js or React frontend

export interface LeaderboardEntry {
  rank: number;
  agentName: string;
  agentVersion: string;
  tasksCompleted: number;
  avgScore: number;
  avgFunctional: number;
  avgVisual: number;
  avgQuality: number;
  avgSecurity: number;
  avgCost: number;
  avgSpeed: number;
  totalTokens: number;
  lastUpdated: string;
}

export interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  sortBy?: keyof LeaderboardEntry;
  sortOrder?: 'asc' | 'desc';
  onSort?: (column: keyof LeaderboardEntry) => void;
  onAgentClick?: (agentName: string) => void;
}

export function LeaderboardTable({
  entries,
  sortBy = 'avgScore',
  sortOrder = 'desc',
  onSort,
  onAgentClick,
}: LeaderboardTableProps) {
  const formatNumber = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return n.toFixed(1);
  };

  const formatTokens = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
    return n.toString();
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  };

  const SortHeader = ({
    column,
    children,
  }: {
    column: keyof LeaderboardEntry;
    children: React.ReactNode;
  }) => (
    <th
      className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 ${sortBy === column ? 'bg-gray-50' : ''}`}
      onClick={() => onSort?.(column)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        {sortBy === column && (
          <span className="text-indigo-600">{sortOrder === 'desc' ? '↓' : '↑'}</span>
        )}
      </div>
    </th>
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rank
            </th>
            <SortHeader column="agentName">Agent</SortHeader>
            <SortHeader column="tasksCompleted">Tasks</SortHeader>
            <SortHeader column="avgScore">Overall</SortHeader>
            <SortHeader column="avgFunctional">Functional</SortHeader>
            <SortHeader column="avgVisual">Visual</SortHeader>
            <SortHeader column="avgQuality">Quality</SortHeader>
            <SortHeader column="avgSecurity">Security</SortHeader>
            <SortHeader column="avgCost">Cost</SortHeader>
            <SortHeader column="avgSpeed">Speed</SortHeader>
            <SortHeader column="totalTokens">Tokens</SortHeader>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {entries.map((entry) => (
            <tr
              key={entry.agentName}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => onAgentClick?.(entry.agentName)}
            >
              <td className="px-4 py-4 whitespace-nowrap text-lg font-medium">
                {getRankBadge(entry.rank)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">{entry.agentName}</div>
                  <div className="text-xs text-gray-500">v{entry.agentVersion}</div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {entry.tasksCompleted}
              </td>
              <td className={`px-4 py-4 whitespace-nowrap text-sm font-bold ${getScoreColor(entry.avgScore)}`}>
                {formatNumber(entry.avgScore)}
              </td>
              <td className={`px-4 py-4 whitespace-nowrap text-sm ${getScoreColor(entry.avgFunctional)}`}>
                {formatNumber(entry.avgFunctional)}
              </td>
              <td className={`px-4 py-4 whitespace-nowrap text-sm ${getScoreColor(entry.avgVisual)}`}>
                {formatNumber(entry.avgVisual)}
              </td>
              <td className={`px-4 py-4 whitespace-nowrap text-sm ${getScoreColor(entry.avgQuality)}`}>
                {formatNumber(entry.avgQuality)}
              </td>
              <td className={`px-4 py-4 whitespace-nowrap text-sm ${getScoreColor(entry.avgSecurity)}`}>
                {formatNumber(entry.avgSecurity)}
              </td>
              <td className={`px-4 py-4 whitespace-nowrap text-sm ${getScoreColor(entry.avgCost)}`}>
                {formatNumber(entry.avgCost)}
              </td>
              <td className={`px-4 py-4 whitespace-nowrap text-sm ${getScoreColor(entry.avgSpeed)}`}>
                {formatNumber(entry.avgSpeed)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatTokens(entry.totalTokens)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
