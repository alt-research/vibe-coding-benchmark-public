// WebSocket client utilities for real-time updates

export interface LiveUpdate {
  type: 'run_update' | 'run_complete' | 'run_failed' | 'metrics_update';
  runId: string;
  data: unknown;
  timestamp: string;
}

export type UpdateCallback = (update: LiveUpdate) => void;

export class LiveConnection {
  private eventSource: EventSource | null = null;
  private callbacks: Map<string, UpdateCallback[]> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  constructor(private baseUrl: string = '/api/live') {}

  connect(runId?: string): void {
    const url = runId ? `${this.baseUrl}/stream/${runId}` : `${this.baseUrl}/stream`;

    this.eventSource = new EventSource(url);

    this.eventSource.onopen = () => {
      this.reconnectAttempts = 0;
      this.emit('connected', { type: 'run_update', runId: '', data: null, timestamp: new Date().toISOString() });
    };

    this.eventSource.addEventListener('update', (event) => {
      const messageEvent = event as MessageEvent;
      const data = JSON.parse(messageEvent.data);
      this.emit('update', {
        type: 'run_update',
        runId: data.id || runId || '',
        data,
        timestamp: new Date().toISOString(),
      });
    });

    this.eventSource.addEventListener('end', (event) => {
      const messageEvent = event as MessageEvent;
      const data = JSON.parse(messageEvent.data);
      this.emit('end', {
        type: data.status === 'completed' ? 'run_complete' : 'run_failed',
        runId: data.id || runId || '',
        data,
        timestamp: new Date().toISOString(),
      });
      this.disconnect();
    });

    this.eventSource.onerror = () => {
      this.emit('error', { type: 'run_failed', runId: '', data: { error: 'Connection error' }, timestamp: new Date().toISOString() });
      this.handleReconnect(runId);
    };
  }

  private handleReconnect(runId?: string): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      this.emit('disconnected', { type: 'run_failed', runId: '', data: { error: 'Max reconnect attempts reached' }, timestamp: new Date().toISOString() });
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

    setTimeout(() => {
      this.connect(runId);
    }, delay);
  }

  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }

  on(event: string, callback: UpdateCallback): () => void {
    if (!this.callbacks.has(event)) {
      this.callbacks.set(event, []);
    }
    this.callbacks.get(event)!.push(callback);

    // Return unsubscribe function
    return () => {
      const callbacks = this.callbacks.get(event);
      if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index > -1) {
          callbacks.splice(index, 1);
        }
      }
    };
  }

  private emit(event: string, update: LiveUpdate): void {
    const callbacks = this.callbacks.get(event);
    if (callbacks) {
      callbacks.forEach((cb) => cb(update));
    }

    // Also emit to 'all' listeners
    const allCallbacks = this.callbacks.get('all');
    if (allCallbacks) {
      allCallbacks.forEach((cb) => cb(update));
    }
  }
}

// React hook for live updates
export function useLiveUpdates(runId?: string, apiUrl?: string) {
  const connection = new LiveConnection(apiUrl);

  return {
    connect: () => connection.connect(runId),
    disconnect: () => connection.disconnect(),
    onUpdate: (callback: UpdateCallback) => connection.on('update', callback),
    onComplete: (callback: UpdateCallback) => connection.on('end', callback),
    onError: (callback: UpdateCallback) => connection.on('error', callback),
  };
}
