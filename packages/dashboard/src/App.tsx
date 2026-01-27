import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useRef, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar, Radar, Scatter, Line } from 'react-chartjs-2';

// Static data imports for GitHub Pages hosting
import leaderboardData from './data/leaderboard.json';
import categoryPerformanceData from './data/category-performance.json';
import taskResultsData from './data/task-results.json';
import tasksData from './data/tasks.json';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

// shadcn/ui inspired color system with CSS variables pattern
const colors = {
  primary: '#4285f4',
  primaryForeground: '#ffffff',
  secondary: '#f1f5f9',
  secondaryForeground: '#0f172a',
  muted: '#f8fafc',
  mutedForeground: '#64748b',
  accent: '#f1f5f9',
  accentForeground: '#0f172a',
  destructive: '#ef4444',
  border: '#e2e8f0',
  input: '#e2e8f0',
  ring: '#4285f4',
  background: '#ffffff',
  foreground: '#0f172a',
  card: '#ffffff',
  cardForeground: '#0f172a',
  success: '#22c55e',
  warning: '#f59e0b',
};

// Chart color palette - distinct and accessible
const CHART_COLORS = [
  '#4285f4', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6',
  '#06b6d4', '#f97316', '#64748b', '#ec4899', '#6366f1',
  '#14b8a6', '#a855f7', '#84cc16', '#0ea5e9',
];

interface LeaderboardEntry {
  rank: number;
  agentName: string;
  agentVersion: string;
  modelName?: string;
  avgScore: number;
  avgFunctional: number;
  avgQuality: number;
  avgCost: number;
  tasksCompleted: number;
  passedTasks?: number;
  failedTasks?: number;
  totalTokens: number;
  inputTokens?: number;
  outputTokens?: number;
  totalCostUSD?: number;
  avgTimeMs?: number;
  pricingInput?: number;
  pricingOutput?: number;
}

// HoverCard Component - shadcn/ui pattern (for inline elements)
function HoverCard({ children, content }: { children: React.ReactNode; content: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setPosition({ x: rect.left + rect.width / 2, y: rect.top });
      }
      setIsOpen(true);
    }, 200);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsOpen(false), 100);
  };

  return (
    <span ref={triggerRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="inline-block">
      {children}
      {isOpen && (
        <div
          className="fixed z-50 animate-in fade-in-0 zoom-in-95"
          style={{ left: position.x, top: position.y - 8, transform: 'translate(-50%, -100%)' }}
          onMouseEnter={() => clearTimeout(timeoutRef.current)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="bg-white rounded-lg border border-slate-200 shadow-lg p-4 min-w-[280px] max-w-[350px]">
            {content}
          </div>
        </div>
      )}
    </span>
  );
}

// HoverRow Component - for table rows
function HoverRow({ children, content, className = '' }: {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const rowRef = useRef<HTMLTableRowElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (rowRef.current) {
        const rect = rowRef.current.getBoundingClientRect();
        setPosition({ x: rect.left + rect.width / 2, y: rect.top });
      }
      setIsOpen(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsOpen(false), 100);
  };

  return (
    <tr
      ref={rowRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
      {isOpen && (
        <td className="absolute" style={{ padding: 0, border: 'none' }}>
          <div
            className="fixed z-50 animate-in fade-in-0 zoom-in-95"
            style={{ left: position.x, top: position.y - 8, transform: 'translate(-50%, -100%)' }}
            onMouseEnter={() => clearTimeout(timeoutRef.current)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="bg-white rounded-lg border border-slate-200 shadow-lg p-4 min-w-[280px] max-w-[350px]">
              {content}
            </div>
          </div>
        </td>
      )}
    </tr>
  );
}

// Card Component - shadcn/ui pattern
function Card({ children, className = '', hover = false }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm ${hover ? 'hover:shadow-md hover:border-slate-300 transition-all duration-200' : ''} ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`px-6 py-4 border-b border-slate-100 ${className}`}>{children}</div>;
}

function CardTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <h3 className={`text-sm font-semibold text-slate-900 ${className}`}>{children}</h3>;
}

function CardDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-slate-500 mt-0.5">{children}</p>;
}

function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

// Badge Component
function Badge({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'success' | 'warning' | 'destructive' | 'outline' }) {
  const variants = {
    default: 'bg-slate-100 text-slate-900',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    destructive: 'bg-red-50 text-red-700 border-red-200',
    outline: 'bg-transparent border-slate-200 text-slate-700',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md border ${variants[variant]}`}>
      {children}
    </span>
  );
}

// Stat Card with shadcn/ui styling
function StatCard({ label, value, subtext, icon, trend }: {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
  trend?: { value: number; label: string };
}) {
  return (
    <Card hover>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
            <p className="text-2xl font-semibold text-slate-900">{value}</p>
            {subtext && <p className="text-xs text-slate-500">{subtext}</p>}
            {trend && (
              <div className={`flex items-center gap-1 text-xs ${trend.value >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                <span>{trend.value >= 0 ? '↑' : '↓'}</span>
                <span>{Math.abs(trend.value)}% {trend.label}</span>
              </div>
            )}
          </div>
          {icon && <div className="p-2 bg-slate-50 rounded-lg text-slate-600">{icon}</div>}
        </div>
      </CardContent>
    </Card>
  );
}

// Model Info Hover Content
function ModelHoverContent({ entry }: { entry: LeaderboardEntry }) {
  const passRate = ((entry.passedTasks || 0) / (entry.tasksCompleted || 1)) * 100;
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
          style={{ backgroundColor: CHART_COLORS[entry.rank % CHART_COLORS.length] }}>
          {(entry.modelName || entry.agentName).charAt(0)}
        </div>
        <div>
          <div className="font-semibold text-slate-900">{entry.modelName || entry.agentName}</div>
          <div className="text-xs text-slate-500">{entry.agentVersion}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="space-y-0.5">
          <div className="text-slate-500">Score</div>
          <div className="font-semibold text-slate-900">{entry.avgScore.toFixed(1)}%</div>
        </div>
        <div className="space-y-0.5">
          <div className="text-slate-500">Pass Rate</div>
          <div className="font-semibold text-slate-900">{passRate.toFixed(0)}%</div>
        </div>
        <div className="space-y-0.5">
          <div className="text-slate-500">Total Cost</div>
          <div className="font-semibold text-emerald-600">${(entry.totalCostUSD || 0).toFixed(2)}</div>
        </div>
        <div className="space-y-0.5">
          <div className="text-slate-500">Avg Time</div>
          <div className="font-semibold text-slate-900">{((entry.avgTimeMs || 0) / 1000).toFixed(0)}s</div>
        </div>
        <div className="space-y-0.5">
          <div className="text-slate-500">Input Tokens</div>
          <div className="font-semibold text-slate-900">{((entry.inputTokens || 0) / 1000).toFixed(0)}K</div>
        </div>
        <div className="space-y-0.5">
          <div className="text-slate-500">Output Tokens</div>
          <div className="font-semibold text-slate-900">{((entry.outputTokens || 0) / 1000).toFixed(0)}K</div>
        </div>
      </div>
      <div className="pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500">Pricing</span>
          <span className="text-slate-700">
            ${entry.pricingInput}/M in · ${entry.pricingOutput}/M out
          </span>
        </div>
      </div>
    </div>
  );
}

// Progress bar component
function Progress({ value, max = 100, className = '', color }: { value: number; max?: number; className?: string; color?: string }) {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div className={`h-2 bg-slate-100 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full rounded-full transition-all duration-300"
        style={{ width: `${percentage}%`, backgroundColor: color || colors.primary }}
      />
    </div>
  );
}

function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '6rem', fontWeight: 700, color: colors.mutedForeground, margin: 0 }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: colors.foreground, marginTop: '1rem' }}>Page Not Found</h2>
      <p style={{ color: colors.mutedForeground, marginTop: '0.5rem', maxWidth: '400px' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        style={{
          marginTop: '2rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: colors.primary,
          color: colors.primaryForeground,
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontWeight: 500,
          transition: 'opacity 0.2s'
        }}
      >
        Back to Leaderboard
      </Link>
    </div>
  );
}

function Leaderboard() {
  const entries = leaderboardData.leaderboard as LeaderboardEntry[] || [];
  const [sortBy, setSortBy] = useState<'score' | 'cost' | 'speed' | 'efficiency'>('score');

  const sortedEntries = [...entries].sort((a, b) => {
    if (sortBy === 'cost') return (a.totalCostUSD || 0) - (b.totalCostUSD || 0);
    if (sortBy === 'speed') return (a.avgTimeMs || 0) - (b.avgTimeMs || 0);
    if (sortBy === 'efficiency') return (b.avgScore / (b.totalCostUSD || 1)) - (a.avgScore / (a.totalCostUSD || 1));
    return b.avgScore - a.avgScore;
  });

  const topModel = entries.reduce((max, e) => e.avgScore > max.avgScore ? e : max, entries[0]);
  const cheapestModel = entries.reduce((min, e) => (e.totalCostUSD || 99) < (min.totalCostUSD || 99) ? e : min, entries[0]);
  const fastestModel = entries.reduce((min, e) => (e.avgTimeMs || 999999) < (min.avgTimeMs || 999999) ? e : min, entries[0]);
  const bestValue = entries.reduce((max, e) => {
    const val = e.avgScore / (e.totalCostUSD || 1);
    const maxVal = max.avgScore / (max.totalCostUSD || 1);
    return val > maxVal ? e : max;
  }, entries[0]);

  const crowns = ['🥇', '🥈', '🥉'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leaderboard</h1>
          <p className="text-sm text-slate-500 mt-1">AI coding agent performance on 180 benchmark tasks</p>
        </div>
        <Badge variant="outline">Updated Jan 21, 2026</Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Top Score"
          value={`${topModel?.avgScore.toFixed(1)}%`}
          subtext={topModel?.modelName}
          icon={<span className="text-lg">🏆</span>}
        />
        <StatCard
          label="Lowest Cost"
          value={`$${(cheapestModel?.totalCostUSD || 0).toFixed(2)}`}
          subtext={cheapestModel?.modelName}
          icon={<span className="text-lg">💰</span>}
        />
        <StatCard
          label="Fastest"
          value={`${((fastestModel?.avgTimeMs || 0) / 1000).toFixed(0)}s avg`}
          subtext={fastestModel?.modelName}
          icon={<span className="text-lg">⚡</span>}
        />
        <StatCard
          label="Best Value"
          value={`${(bestValue.avgScore / (bestValue.totalCostUSD || 1)).toFixed(0)} pts/$`}
          subtext={bestValue?.modelName}
          icon={<span className="text-lg">✨</span>}
        />
      </div>

      {/* Sort Controls */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-slate-500">Sort by:</span>
        {[
          { key: 'score', label: 'Score' },
          { key: 'cost', label: 'Cost' },
          { key: 'speed', label: 'Speed' },
          { key: 'efficiency', label: 'Value' },
        ].map((option) => (
          <button
            key={option.key}
            onClick={() => setSortBy(option.key as typeof sortBy)}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
              sortBy === option.key
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Main Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-16">Rank</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Model</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Score</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Pass Rate</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Quality</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Cost</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Time</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Tokens</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedEntries.map((entry, idx) => {
                const passRate = ((entry.passedTasks || 0) / (entry.tasksCompleted || 1)) * 100;
                const valueScore = entry.avgScore / (entry.totalCostUSD || 1);
                const maxScore = Math.max(...entries.map(e => e.avgScore));
                return (
                  <HoverRow
                    key={entry.agentName + entry.agentVersion}
                    content={<ModelHoverContent entry={entry} />}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    <td className="px-4 py-4">
                      {idx < 3 ? (
                        <span className="text-xl">{crowns[idx]}</span>
                      ) : (
                        <span className="text-slate-400 font-medium">{idx + 1}</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-semibold text-sm"
                          style={{ backgroundColor: CHART_COLORS[idx % CHART_COLORS.length] }}
                        >
                          {(entry.modelName || entry.agentName).charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                            {entry.modelName || entry.agentName}
                          </div>
                          <div className="text-xs text-slate-400">{entry.agentVersion}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <Progress value={entry.avgScore} max={maxScore} className="w-20" color={CHART_COLORS[idx % CHART_COLORS.length]} />
                        <span className="font-semibold text-slate-900">{entry.avgScore.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant={passRate >= 98 ? 'success' : passRate >= 90 ? 'warning' : 'outline'}>
                        {passRate.toFixed(0)}%
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">{entry.avgQuality.toFixed(0)}%</td>
                    <td className="px-4 py-4">
                      <span className="font-medium text-emerald-600">${(entry.totalCostUSD || 0).toFixed(2)}</span>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">
                      {entry.avgTimeMs ? `${(entry.avgTimeMs / 1000).toFixed(0)}s` : '-'}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-500">
                      {((entry.totalTokens || 0) / 1000000).toFixed(2)}M
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-medium text-violet-600">{valueScore.toFixed(0)}</span>
                    </td>
                  </HoverRow>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// Live Dashboard Component
function LiveDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Live Benchmark</h1>
        <p className="text-sm text-slate-500 mt-1">Real-time benchmark execution monitoring</p>
      </div>
      <Card>
        <CardContent className="py-16">
          <div className="text-center text-slate-500">
            <div className="text-4xl mb-4">📡</div>
            <p className="font-medium">No active benchmark runs</p>
            <p className="text-sm mt-1">Start a benchmark with: npm run cli -- run &lt;task&gt; -a &lt;agent&gt;</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Tasks Component
interface Task {
  id: string;
  name: string;
  category: string;
  difficulty: string;
  description: string;
  tags?: string[];
}

function Tasks() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Process static data
  const { tasks, summary } = useMemo(() => {
    const allTasks: Task[] = [];
    const categoryCounts: { category: string; count: number }[] = [];
    Object.entries(tasksData.categories || {}).forEach(([category, categoryTasks]) => {
      const catTasks = categoryTasks as Task[];
      categoryCounts.push({ category, count: catTasks.length });
      catTasks.forEach((t) => allTasks.push({ ...t, category }));
    });
    return { tasks: allTasks, summary: categoryCounts };
  }, []);

  const filteredTasks = tasks.filter((t) => {
    const matchesCategory = !selectedCategory || t.category === selectedCategory;
    const matchesSearch = !searchQuery ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalTasks = tasks.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Benchmark Tasks</h1>
          <p className="text-sm text-slate-500 mt-1">{totalTasks} tasks across 6 categories</p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
            !selectedCategory
              ? 'bg-slate-900 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          All ({totalTasks})
        </button>
        {summary.map((cat) => (
          <button
            key={cat.category}
            onClick={() => setSelectedCategory(selectedCategory === cat.category ? null : cat.category)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              selectedCategory === cat.category
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat.category.replace(/-/g, ' ')} ({cat.count})
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Task Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTasks.slice(0, 30).map((task) => (
          <Card key={task.id} hover>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <Badge variant={task.difficulty === 'easy' ? 'success' : task.difficulty === 'medium' ? 'warning' : 'destructive'}>
                  {task.difficulty}
                </Badge>
                <span className="text-xs text-slate-400">{task.category}</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{task.name}</h3>
              <p className="text-sm text-slate-500 line-clamp-2">{task.description}</p>
              {task.tags && task.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {task.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-xs bg-slate-100 text-slate-600 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Charts/Analytics Component
function Charts() {
  const entries = leaderboardData.leaderboard as LeaderboardEntry[] || [];

  const sortedByScore = [...entries].sort((a, b) => b.avgScore - a.avgScore);
  const labels = sortedByScore.map(e => (e.modelName || e.agentName).split(' ').slice(0, 2).join(' '));

  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#0f172a',
        bodyColor: '#64748b',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
      },
    },
    scales: {
      y: { beginAtZero: true, grid: { color: '#f1f5f9' }, ticks: { color: '#64748b', font: { size: 11 } } },
      x: { grid: { display: false }, ticks: { color: '#64748b', font: { size: 10 }, maxRotation: 45 } },
    },
  };

  const scoreData = {
    labels,
    datasets: [{
      label: 'Score',
      data: sortedByScore.map(e => e.avgScore),
      backgroundColor: sortedByScore.map((_, i) => CHART_COLORS[i % CHART_COLORS.length] + '80'),
      borderColor: sortedByScore.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
      borderWidth: 2,
      borderRadius: 6,
    }],
  };

  const costData = {
    labels,
    datasets: [{
      label: 'Cost ($)',
      data: sortedByScore.map(e => e.totalCostUSD || 0),
      backgroundColor: '#22c55e80',
      borderColor: '#22c55e',
      borderWidth: 2,
      borderRadius: 6,
    }],
  };

  const timeData = {
    labels,
    datasets: [{
      label: 'Time (s)',
      data: sortedByScore.map(e => (e.avgTimeMs || 0) / 1000),
      backgroundColor: '#f59e0b80',
      borderColor: '#f59e0b',
      borderWidth: 2,
      borderRadius: 6,
    }],
  };

  const scatterData = {
    datasets: sortedByScore.map((e, i) => ({
      label: (e.modelName || e.agentName).split(' ').slice(0, 2).join(' '),
      data: [{ x: e.totalCostUSD || 0, y: e.avgScore }],
      backgroundColor: CHART_COLORS[i % CHART_COLORS.length],
      borderColor: CHART_COLORS[i % CHART_COLORS.length],
      pointRadius: 10,
      pointHoverRadius: 14,
    })),
  };

  const crowns = ['🥇', '🥈', '🥉'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
        <p className="text-sm text-slate-500 mt-1">Performance metrics and comparisons</p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Score Distribution</CardTitle>
            <CardDescription>Overall benchmark scores by model</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <Bar data={scoreData} options={{ ...baseOptions, scales: { ...baseOptions.scales, y: { ...baseOptions.scales.y, max: 100 } } }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cost Comparison</CardTitle>
            <CardDescription>Total cost in USD for 180 tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <Bar data={costData} options={baseOptions} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Execution Time</CardTitle>
            <CardDescription>Average time per task in seconds</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <Bar data={timeData} options={baseOptions} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cost vs Score</CardTitle>
            <CardDescription>Efficiency visualization (top-left is best)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <Scatter data={scatterData} options={{
                ...baseOptions,
                plugins: { ...baseOptions.plugins, legend: { display: true, position: 'bottom' as const, labels: { usePointStyle: true, padding: 8, font: { size: 9 } } } },
                scales: {
                  x: { ...baseOptions.scales.x, title: { display: true, text: 'Cost ($)', color: '#64748b' } },
                  y: { ...baseOptions.scales.y, min: 55, max: 95, title: { display: true, text: 'Score (%)', color: '#64748b' } },
                },
              }} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Metrics</CardTitle>
          <CardDescription>Complete performance data for all models</CardDescription>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">#</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Model</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Score</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Pass</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Functional</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Quality</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Cost</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Time</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Tokens</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedByScore.map((e, i) => (
                <HoverRow
                  key={e.agentName + e.agentVersion}
                  content={<ModelHoverContent entry={e} />}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-3">
                    {i < 3 ? (
                      <span className="text-lg">{crowns[i]}</span>
                    ) : (
                      <span className="text-slate-400">{i + 1}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-900">{e.modelName || e.agentName}</td>
                  <td className="px-4 py-3 font-semibold text-blue-600">{e.avgScore.toFixed(1)}%</td>
                  <td className="px-4 py-3 text-slate-600">{((e.passedTasks || 0) / (e.tasksCompleted || 1) * 100).toFixed(0)}%</td>
                  <td className="px-4 py-3 text-slate-600">{e.avgFunctional.toFixed(0)}%</td>
                  <td className="px-4 py-3 text-slate-600">{e.avgQuality.toFixed(0)}%</td>
                  <td className="px-4 py-3 font-medium text-emerald-600">${(e.totalCostUSD || 0).toFixed(2)}</td>
                  <td className="px-4 py-3 text-slate-600">{((e.avgTimeMs || 0) / 1000).toFixed(0)}s</td>
                  <td className="px-4 py-3 text-slate-500">{((e.totalTokens || 0) / 1000000).toFixed(2)}M</td>
                  <td className="px-4 py-3 font-medium text-violet-600">
                    {(e.totalCostUSD || 0) > 0 ? (e.avgScore / (e.totalCostUSD || 1)).toFixed(0) : '∞'}
                  </td>
                </HoverRow>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// Category Performance Component
interface CategoryPerformance {
  category: string;
  models: Array<{
    modelName: string;
    avgScore: number;
    passRate: number;
    avgTokens: number;
    avgTimeMs: number;
    avgCost: number;
  }>;
}

function TaskPerformance() {
  const categoryData = categoryPerformanceData.performance as CategoryPerformance[] || [];
  const models = categoryPerformanceData.models as string[] || [];
  const [selectedModels, setSelectedModels] = useState<string[]>(models.slice(0, 5));

  const categories = categoryData.map(c => c.category.replace(/-/g, ' '));
  const filteredData = categoryData.map(cat => ({
    ...cat,
    models: cat.models.filter(m => selectedModels.includes(m.modelName)),
  }));

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' as const, labels: { usePointStyle: true, padding: 12, font: { size: 10 } } },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#0f172a',
        bodyColor: '#64748b',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      y: { beginAtZero: true, grid: { color: '#f1f5f9' }, ticks: { color: '#64748b', font: { size: 11 } } },
      x: { grid: { display: false }, ticks: { color: '#64748b', font: { size: 10 } } },
    },
  };

  const createDataset = (metricFn: (m: CategoryPerformance['models'][0]) => number) => ({
    labels: categories,
    datasets: selectedModels.map((modelName) => ({
      label: modelName.split(' ').slice(0, 2).join(' '),
      data: filteredData.map(cat => {
        const m = cat.models.find(x => x.modelName === modelName);
        return m ? metricFn(m) : 0;
      }),
      backgroundColor: CHART_COLORS[models.indexOf(modelName) % CHART_COLORS.length] + '80',
      borderColor: CHART_COLORS[models.indexOf(modelName) % CHART_COLORS.length],
      borderWidth: 2,
      borderRadius: 4,
    })),
  });

  const radarData = {
    labels: categories,
    datasets: selectedModels.slice(0, 5).map((modelName) => ({
      label: modelName.split(' ').slice(0, 2).join(' '),
      data: filteredData.map(cat => cat.models.find(m => m.modelName === modelName)?.avgScore || 0),
      backgroundColor: CHART_COLORS[models.indexOf(modelName) % CHART_COLORS.length] + '15',
      borderColor: CHART_COLORS[models.indexOf(modelName) % CHART_COLORS.length],
      borderWidth: 2,
      pointBackgroundColor: CHART_COLORS[models.indexOf(modelName) % CHART_COLORS.length],
      pointRadius: 3,
    })),
  };

  const crowns = ['🥇', '🥈', '🥉'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Category Performance</h1>
        <p className="text-sm text-slate-500 mt-1">Breakdown across 6 task categories (30 tasks each)</p>
      </div>

      {/* Model Selector */}
      <Card>
        <CardContent className="p-5">
          <div className="text-sm font-medium text-slate-700 mb-3">Select models to compare:</div>
          <div className="flex flex-wrap gap-2">
            {models.map((model, i) => (
              <button
                key={model}
                onClick={() => {
                  if (selectedModels.includes(model)) {
                    setSelectedModels(selectedModels.filter(m => m !== model));
                  } else if (selectedModels.length < 7) {
                    setSelectedModels([...selectedModels, model]);
                  }
                }}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg border-2 transition-all ${
                  selectedModels.includes(model)
                    ? 'text-white'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300 bg-white'
                }`}
                style={{
                  backgroundColor: selectedModels.includes(model) ? CHART_COLORS[i % CHART_COLORS.length] : undefined,
                  borderColor: selectedModels.includes(model) ? CHART_COLORS[i % CHART_COLORS.length] : undefined,
                }}
              >
                {model.split(' ').slice(0, 2).join(' ')}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Score by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <Bar data={createDataset(m => m.avgScore)} options={{ ...chartOptions, scales: { ...chartOptions.scales, y: { ...chartOptions.scales.y, max: 100 } } }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pass Rate by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <Bar data={createDataset(m => m.passRate)} options={{ ...chartOptions, scales: { ...chartOptions.scales, y: { ...chartOptions.scales.y, max: 110 } } }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cost by Category ($)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <Bar data={createDataset(m => m.avgCost)} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Time by Category (seconds)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <Bar data={createDataset(m => m.avgTimeMs / 1000)} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tokens by Category (K)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <Bar data={createDataset(m => m.avgTokens / 1000)} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Strength</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <Radar data={radarData} options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' as const, labels: { usePointStyle: true, padding: 10, font: { size: 10 } } } },
                scales: { r: { beginAtZero: true, max: 100, ticks: { stepSize: 25, display: false }, grid: { color: '#e2e8f0' }, angleLines: { color: '#e2e8f0' } } },
              }} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Category</th>
                {selectedModels.map(model => (
                  <th key={model} className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase" style={{ minWidth: 90 }}>
                    {model.split(' ').slice(0, 2).join(' ')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categoryData.map((cat, i) => {
                const sorted = [...cat.models].sort((a, b) => b.avgScore - a.avgScore);
                const top3 = sorted.slice(0, 3).map(m => m.modelName);
                const getRank = (modelName: string) => top3.indexOf(modelName);

                return (
                  <tr key={cat.category} className={i % 2 === 0 ? 'bg-slate-50/30' : ''}>
                    <td className="px-4 py-3 font-medium text-slate-800 capitalize">{cat.category.replace(/-/g, ' ')}</td>
                    {selectedModels.map(model => {
                      const m = cat.models.find(x => x.modelName === model);
                      const rank = getRank(model);
                      return (
                        <td key={model} className="px-3 py-3">
                          <HoverCard content={
                            <div className="space-y-2">
                              <div className="font-semibold text-slate-900">{model}</div>
                              <div className="text-xs text-slate-500">{cat.category.replace(/-/g, ' ')}</div>
                              <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                                <div>Score: <span className="font-semibold">{m?.avgScore.toFixed(1)}%</span></div>
                                <div>Pass: <span className="font-semibold">{m?.passRate.toFixed(0)}%</span></div>
                                <div>Cost: <span className="font-semibold text-emerald-600">${m?.avgCost.toFixed(3)}</span></div>
                                <div>Time: <span className="font-semibold">{((m?.avgTimeMs || 0) / 1000).toFixed(0)}s</span></div>
                              </div>
                            </div>
                          }>
                            <div className="cursor-pointer hover:bg-slate-100 rounded px-1 -mx-1 transition-colors">
                              <div className="font-medium flex items-center gap-1 text-blue-600">
                                {rank >= 0 && <span>{crowns[rank]}</span>}
                                {m?.avgScore.toFixed(1)}%
                              </div>
                              <div className="text-xs text-slate-400">${m?.avgCost.toFixed(3)}</div>
                            </div>
                          </HoverCard>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// Per-Task Performance Charts Component
interface TaskResult {
  taskId: string;
  category: string;
  subcategory: string;
  results: Array<{
    modelName: string;
    score: number;
    functional: number;
    quality: number;
    passed: boolean;
    tokens: number;
    timeMs: number;
    cost: number;
  }>;
}

function PerTaskCharts() {
  const taskResults = taskResultsData.tasks as TaskResult[] || [];
  const models = taskResultsData.models as string[] || [];
  const categories = taskResultsData.categories as string[] || [];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedModels, setSelectedModels] = useState<string[]>(models.slice(0, 5));
  const [viewMode, setViewMode] = useState<'chart' | 'heatmap'>('chart');

  const filteredTasks = selectedCategory
    ? taskResults.filter(t => t.category === selectedCategory)
    : taskResults.slice(0, 30);

  const chartData = {
    labels: filteredTasks.map((_, i) => `Task ${i + 1}`),
    datasets: selectedModels.map((modelName, idx) => ({
      label: modelName.split(' ').slice(0, 2).join(' '),
      data: filteredTasks.map(task => {
        const result = task.results.find(r => r.modelName === modelName);
        return result?.score || 0;
      }),
      borderColor: CHART_COLORS[idx % CHART_COLORS.length],
      backgroundColor: CHART_COLORS[idx % CHART_COLORS.length] + '20',
      borderWidth: 2,
      tension: 0.3,
      fill: false,
      pointRadius: 3,
      pointHoverRadius: 6,
    })),
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' as const, labels: { usePointStyle: true, padding: 12, font: { size: 10 } } },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#0f172a',
        bodyColor: '#64748b',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          title: (items: any[]) => {
            const idx = items[0]?.dataIndex;
            if (idx !== undefined && filteredTasks[idx]) {
              return filteredTasks[idx].taskId.split('/').pop() || `Task ${idx + 1}`;
            }
            return '';
          },
        },
      },
    },
    scales: {
      y: { beginAtZero: true, max: 100, grid: { color: '#f1f5f9' }, ticks: { color: '#64748b', font: { size: 11 } } },
      x: { grid: { display: false }, ticks: { color: '#64748b', font: { size: 9 }, maxRotation: 0 } },
    },
  };

  // Heatmap data for selected models and tasks
  const getScoreColor = (score: number) => {
    if (score >= 90) return '#22c55e';
    if (score >= 80) return '#84cc16';
    if (score >= 70) return '#eab308';
    if (score >= 60) return '#f97316';
    return '#ef4444';
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Per-Task Performance</h1>
          <p className="text-sm text-slate-500 mt-1">Model performance on individual benchmark tasks</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('chart')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
              viewMode === 'chart' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Line Chart
          </button>
          <button
            onClick={() => setViewMode('heatmap')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
              viewMode === 'heatmap' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Heatmap
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
            !selectedCategory ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          All Categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              selectedCategory === cat ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat.replace(/-/g, ' ')}
          </button>
        ))}
      </div>

      {/* Model Selector */}
      <Card>
        <CardContent className="p-5">
          <div className="text-sm font-medium text-slate-700 mb-3">Select models to compare:</div>
          <div className="flex flex-wrap gap-2">
            {models.map((model, i) => (
              <button
                key={model}
                onClick={() => {
                  if (selectedModels.includes(model)) {
                    setSelectedModels(selectedModels.filter(m => m !== model));
                  } else if (selectedModels.length < 7) {
                    setSelectedModels([...selectedModels, model]);
                  }
                }}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg border-2 transition-all ${
                  selectedModels.includes(model)
                    ? 'text-white'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300 bg-white'
                }`}
                style={{
                  backgroundColor: selectedModels.includes(model) ? CHART_COLORS[i % CHART_COLORS.length] : undefined,
                  borderColor: selectedModels.includes(model) ? CHART_COLORS[i % CHART_COLORS.length] : undefined,
                }}
              >
                {model.split(' ').slice(0, 2).join(' ')}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {viewMode === 'chart' ? (
        <Card>
          <CardHeader>
            <CardTitle>Score Trend Across Tasks</CardTitle>
            <CardDescription>
              {selectedCategory ? `${selectedCategory.replace(/-/g, ' ')} - ${filteredTasks.length} tasks` : `Showing first 30 tasks`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <Line data={chartData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Score Heatmap</CardTitle>
            <CardDescription>Color indicates score: green (90+) → yellow (70-80) → red (&lt;60)</CardDescription>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-3 py-2 text-left font-semibold text-slate-600 sticky left-0 bg-slate-50">Task</th>
                  {selectedModels.map(model => (
                    <th key={model} className="px-2 py-2 text-center font-semibold text-slate-600" style={{ minWidth: 60 }}>
                      {model.split(' ')[0]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTasks.slice(0, 50).map((task, i) => (
                  <tr key={task.taskId} className="hover:bg-slate-50/50">
                    <td className="px-3 py-1.5 font-medium text-slate-700 sticky left-0 bg-white">
                      <HoverCard content={
                        <div className="space-y-2">
                          <div className="font-semibold text-slate-900">{task.taskId}</div>
                          <div className="text-xs text-slate-500">Category: {task.category}</div>
                          <div className="text-xs text-slate-500">Subcategory: {task.subcategory}</div>
                        </div>
                      }>
                        <span className="cursor-pointer hover:text-blue-600">T{i + 1}</span>
                      </HoverCard>
                    </td>
                    {selectedModels.map(modelName => {
                      const result = task.results.find(r => r.modelName === modelName);
                      const score = result?.score || 0;
                      return (
                        <td key={modelName} className="px-2 py-1.5 text-center">
                          <HoverCard content={
                            <div className="space-y-2">
                              <div className="font-semibold text-slate-900">{modelName}</div>
                              <div className="text-xs text-slate-500">{task.taskId.split('/').pop()}</div>
                              <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                                <div>Score: <span className="font-semibold">{score.toFixed(1)}%</span></div>
                                <div>Passed: <span className={result?.passed ? 'text-emerald-600' : 'text-red-600'}>{result?.passed ? 'Yes' : 'No'}</span></div>
                                <div>Tokens: <span className="font-semibold">{((result?.tokens || 0) / 1000).toFixed(1)}K</span></div>
                                <div>Cost: <span className="font-semibold text-emerald-600">${(result?.cost || 0).toFixed(4)}</span></div>
                              </div>
                            </div>
                          }>
                            <div
                              className="w-8 h-6 rounded flex items-center justify-center text-white text-xs font-medium cursor-pointer mx-auto"
                              style={{ backgroundColor: getScoreColor(score) }}
                            >
                              {score.toFixed(0)}
                            </div>
                          </HoverCard>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {selectedModels.slice(0, 4).map((modelName, i) => {
          const modelResults = filteredTasks.flatMap(t => t.results.filter(r => r.modelName === modelName));
          const avgScore = modelResults.reduce((sum, r) => sum + r.score, 0) / (modelResults.length || 1);
          const passCount = modelResults.filter(r => r.passed).length;
          return (
            <Card key={modelName} hover>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }}
                  />
                  <span className="font-medium text-slate-900 text-sm">{modelName.split(' ').slice(0, 2).join(' ')}</span>
                </div>
                <div className="text-2xl font-bold text-slate-900">{avgScore.toFixed(1)}%</div>
                <div className="text-xs text-slate-500">{passCount}/{modelResults.length} tasks passed</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// Navigation Link Component
function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));

  return (
    <Link
      to={to}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
        isActive
          ? 'bg-slate-100 text-slate-900'
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      {children}
    </Link>
  );
}

// Main App Component
export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-3">
                <img src="/favicon.svg" alt="VibeCodingBench" className="w-9 h-9" />
                <span className="text-lg font-semibold text-slate-900">VibeCodingBench</span>
              </Link>
              <div className="hidden md:flex items-center gap-1">
                <NavLink to="/">Leaderboard</NavLink>
                <NavLink to="/charts">Analytics</NavLink>
                <NavLink to="/task-performance">Categories</NavLink>
                <NavLink to="/per-task">Per-Task</NavLink>
                <NavLink to="/tasks">Tasks</NavLink>
              </div>
            </div>
            <a
              href="https://github.com/alt-research/vibe-coding-benchmark-public"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-500 hover:text-slate-900 flex items-center gap-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Leaderboard />} />
          <Route path="/live" element={<LiveDashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/task-performance" element={<TaskPerformance />} />
          <Route path="/per-task" element={<PerTaskCharts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>VibeCodingBench - AI Coding Agent Benchmark</span>
            <span>180 tasks · 14 models · Updated Jan 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
