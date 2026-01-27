// React component for submitting benchmark results

export interface SubmissionData {
  agentName: string;
  agentVersion: string;
  taskId: string;
  scores: {
    functional: number;
    visual?: number;
    quality: number;
    security: number;
    cost: number;
    speed: number;
  };
  metrics: {
    tokensUsed: number;
    executionTimeMs: number;
    filesChanged: number;
  };
  metadata?: {
    modelId?: string;
    runId?: string;
    environment?: string;
  };
}

export interface SubmissionFormProps {
  tasks: Array<{ id: string; name: string; category: string }>;
  onSubmit: (data: SubmissionData) => Promise<void>;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export function SubmissionForm({
  tasks,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: SubmissionFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data: SubmissionData = {
      agentName: formData.get('agentName') as string,
      agentVersion: formData.get('agentVersion') as string,
      taskId: formData.get('taskId') as string,
      scores: {
        functional: parseFloat(formData.get('functional') as string),
        visual: formData.get('visual')
          ? parseFloat(formData.get('visual') as string)
          : undefined,
        quality: parseFloat(formData.get('quality') as string),
        security: parseFloat(formData.get('security') as string),
        cost: parseFloat(formData.get('cost') as string),
        speed: parseFloat(formData.get('speed') as string),
      },
      metrics: {
        tokensUsed: parseInt(formData.get('tokensUsed') as string),
        executionTimeMs: parseInt(formData.get('executionTimeMs') as string),
        filesChanged: parseInt(formData.get('filesChanged') as string),
      },
      metadata: {
        modelId: (formData.get('modelId') as string) || undefined,
        runId: (formData.get('runId') as string) || undefined,
        environment: (formData.get('environment') as string) || undefined,
      },
    };

    await onSubmit(data);
  };

  // Group tasks by category
  const tasksByCategory = tasks.reduce(
    (acc, task) => {
      if (!acc[task.category]) {
        acc[task.category] = [];
      }
      acc[task.category].push(task);
      return acc;
    },
    {} as Record<string, typeof tasks>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Agent Information */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Agent Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="agentName"
              className="block text-sm font-medium text-gray-700"
            >
              Agent Name *
            </label>
            <input
              type="text"
              name="agentName"
              id="agentName"
              required
              placeholder="e.g., Claude Code"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="agentVersion"
              className="block text-sm font-medium text-gray-700"
            >
              Version *
            </label>
            <input
              type="text"
              name="agentVersion"
              id="agentVersion"
              required
              placeholder="e.g., 1.0.0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Task Selection */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Task Selection
        </h3>
        <div>
          <label
            htmlFor="taskId"
            className="block text-sm font-medium text-gray-700"
          >
            Task *
          </label>
          <select
            name="taskId"
            id="taskId"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select a task...</option>
            {Object.entries(tasksByCategory).map(([category, categoryTasks]) => (
              <optgroup key={category} label={category.toUpperCase()}>
                {categoryTasks.map((task) => (
                  <option key={task.id} value={task.id}>
                    {task.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </div>

      {/* Scores */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Scores (0-100)</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="functional"
              className="block text-sm font-medium text-gray-700"
            >
              Functional *
            </label>
            <input
              type="number"
              name="functional"
              id="functional"
              required
              min="0"
              max="100"
              step="0.1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="visual"
              className="block text-sm font-medium text-gray-700"
            >
              Visual (optional)
            </label>
            <input
              type="number"
              name="visual"
              id="visual"
              min="0"
              max="100"
              step="0.1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="quality"
              className="block text-sm font-medium text-gray-700"
            >
              Quality *
            </label>
            <input
              type="number"
              name="quality"
              id="quality"
              required
              min="0"
              max="100"
              step="0.1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="security"
              className="block text-sm font-medium text-gray-700"
            >
              Security *
            </label>
            <input
              type="number"
              name="security"
              id="security"
              required
              min="0"
              max="100"
              step="0.1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="cost"
              className="block text-sm font-medium text-gray-700"
            >
              Cost Efficiency *
            </label>
            <input
              type="number"
              name="cost"
              id="cost"
              required
              min="0"
              max="100"
              step="0.1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="speed"
              className="block text-sm font-medium text-gray-700"
            >
              Speed *
            </label>
            <input
              type="number"
              name="speed"
              id="speed"
              required
              min="0"
              max="100"
              step="0.1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Execution Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="tokensUsed"
              className="block text-sm font-medium text-gray-700"
            >
              Tokens Used *
            </label>
            <input
              type="number"
              name="tokensUsed"
              id="tokensUsed"
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="executionTimeMs"
              className="block text-sm font-medium text-gray-700"
            >
              Execution Time (ms) *
            </label>
            <input
              type="number"
              name="executionTimeMs"
              id="executionTimeMs"
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="filesChanged"
              className="block text-sm font-medium text-gray-700"
            >
              Files Changed *
            </label>
            <input
              type="number"
              name="filesChanged"
              id="filesChanged"
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Optional Metadata */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Optional Metadata
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="modelId"
              className="block text-sm font-medium text-gray-700"
            >
              Model ID
            </label>
            <input
              type="text"
              name="modelId"
              id="modelId"
              placeholder="e.g., claude-3-opus"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="runId"
              className="block text-sm font-medium text-gray-700"
            >
              Run ID
            </label>
            <input
              type="text"
              name="runId"
              id="runId"
              placeholder="e.g., run_abc123"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="environment"
              className="block text-sm font-medium text-gray-700"
            >
              Environment
            </label>
            <input
              type="text"
              name="environment"
              id="environment"
              placeholder="e.g., docker, local"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Results'}
        </button>
      </div>
    </form>
  );
}
