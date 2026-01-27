// React component for submitting evaluation results
// Allows users to submit their agent's results to the leaderboard

import { useState } from 'react';

export interface SubmitFormProps {
  apiUrl?: string;
  onSubmit?: (submission: SubmissionData) => void;
  onSuccess?: (submissionId: string) => void;
  onError?: (error: string) => void;
}

export interface SubmissionData {
  agentName: string;
  agentVersion: string;
  repositoryUrl?: string;
  taskId: string;
  scores: {
    functional: number;
    visual: number;
    quality: number;
    security: number;
    cost: number;
    speed: number;
    overall: number;
  };
  metrics: {
    tokensUsed: number;
    executionTimeMs: number;
    filesChanged: number;
  };
  notes?: string;
}

const AVAILABLE_TASKS = [
  { id: 'saas-core/auth/supabase-oauth', name: 'Supabase Google OAuth' },
  { id: 'glue-code/data-transform/excel-to-json', name: 'Excel to JSON Transformer' },
  { id: 'ai-integration/rag-chatbot/pdf-qa', name: 'PDF Q&A RAG Chatbot' },
  { id: 'frontend/figma-to-code/pricing-card', name: 'Pricing Card Component' },
  { id: 'api-integrations/stripe/payment-webhook', name: 'Stripe Payment Webhook' },
  { id: 'code-evolution/legacy-migration/express-to-fastify', name: 'Express to Fastify Migration' },
];

export function SubmitForm({
  apiUrl = '/api/submissions',
  onSubmit,
  onSuccess,
  onError,
}: SubmitFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<SubmissionData>>({
    agentName: '',
    agentVersion: '',
    repositoryUrl: '',
    taskId: '',
    scores: {
      functional: 0,
      visual: 0,
      quality: 0,
      security: 0,
      cost: 0,
      speed: 0,
      overall: 0,
    },
    metrics: {
      tokensUsed: 0,
      executionTimeMs: 0,
      filesChanged: 0,
    },
    notes: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (name.startsWith('scores.')) {
      const field = name.replace('scores.', '');
      setFormData((prev) => ({
        ...prev,
        scores: {
          ...prev.scores!,
          [field]: type === 'number' ? parseFloat(value) : value,
        },
      }));
    } else if (name.startsWith('metrics.')) {
      const field = name.replace('metrics.', '');
      setFormData((prev) => ({
        ...prev,
        metrics: {
          ...prev.metrics!,
          [field]: parseInt(value, 10),
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submission = formData as SubmissionData;
      onSubmit?.(submission);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      const result = await response.json();
      onSuccess?.(result.id);
    } catch (error) {
      onError?.(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Agent Information */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Agent Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Agent Name</label>
            <input
              type="text"
              name="agentName"
              value={formData.agentName}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g., Claude Code"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Version</label>
            <input
              type="text"
              name="agentVersion"
              value={formData.agentVersion}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g., 1.0.0"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Repository URL (optional)
            </label>
            <input
              type="url"
              name="repositoryUrl"
              value={formData.repositoryUrl}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="https://github.com/..."
            />
          </div>
        </div>
      </div>

      {/* Task Selection */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Task</h3>
        <select
          name="taskId"
          value={formData.taskId}
          onChange={handleChange}
          required
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select a task...</option>
          {AVAILABLE_TASKS.map((task) => (
            <option key={task.id} value={task.id}>
              {task.name}
            </option>
          ))}
        </select>
      </div>

      {/* Scores */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Scores (0-100)</h3>
        <div className="grid grid-cols-3 gap-4">
          {['functional', 'visual', 'quality', 'security', 'cost', 'speed', 'overall'].map(
            (field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {field}
                </label>
                <input
                  type="number"
                  name={`scores.${field}`}
                  value={(formData.scores as Record<string, number>)?.[field] || 0}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  step="0.1"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            )
          )}
        </div>
      </div>

      {/* Metrics */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Metrics</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tokens Used</label>
            <input
              type="number"
              name="metrics.tokensUsed"
              value={formData.metrics?.tokensUsed || 0}
              onChange={handleChange}
              min="0"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Execution Time (ms)
            </label>
            <input
              type="number"
              name="metrics.executionTimeMs"
              value={formData.metrics?.executionTimeMs || 0}
              onChange={handleChange}
              min="0"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Files Changed</label>
            <input
              type="number"
              name="metrics.filesChanged"
              value={formData.metrics?.filesChanged || 0}
              onChange={handleChange}
              min="0"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Notes (optional)</h3>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Any additional information about this submission..."
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Results'}
        </button>
      </div>
    </form>
  );
}
