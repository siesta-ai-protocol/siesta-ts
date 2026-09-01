export interface SiestaErrorData {
  code: string;
  message: string;
  retryable?: boolean;
  field?: string;
  suggestedFix?: Record<string, unknown>;
  validValues?: unknown[];
  docs?: string;
}

export interface DiscoveredLibrary {
  manifestPath: string;
  manifest: Record<string, unknown>;
  valid: boolean;
  validationErrors: Array<{ property: string; message: string }>;
  adapterClass?: string;
  packageName?: string;
}

export interface LibraryAdapter {
  getId(): string;
  getManifestPath(): string;
  getManifest(): Record<string, unknown>;
  getConfig(): Record<string, unknown>;
  configure(settings: Record<string, unknown>): void;
  create(factory: string, args: Record<string, unknown>): unknown;
  invoke(instance: unknown, method: string, args: Record<string, unknown>, context?: unknown): unknown;
  snapshot(instance: unknown): Record<string, unknown>;
  getType(instance: unknown): string;
}
