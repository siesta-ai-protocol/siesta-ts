export type StubState = Record<string, unknown>;

export class StubHandle {
  constructor(
    public readonly library: string,
    public type: string,
    public readonly originFactory: string,
    public state: StubState = {},
    public config: StubState = {},
    public history: Array<{ method: string; args: StubState }> = [],
  ) {}

  withMethod(method: string, args: StubState, newType: string): StubHandle {
    const next = new StubHandle(this.library, newType, this.originFactory, { ...this.state, ...args }, { ...this.config }, [
      ...this.history,
      { method, args },
    ]);
    return next;
  }

  toSnapshot(): Record<string, unknown> {
    return {
      library: this.library,
      type: this.type,
      factory: this.originFactory,
      state: this.state,
      history: this.history,
      stub: true,
    };
  }
}

import type { LibraryAdapter } from './types.js';
import { readFileSync } from 'node:fs';

export abstract class StubLibraryAdapter implements LibraryAdapter {
  protected manifest: Record<string, unknown>;
  protected config: Record<string, unknown> = {};

  constructor(protected readonly manifestPath: string, manifest?: Record<string, unknown>) {
    this.manifest = manifest ?? JSON.parse(readFileSync(manifestPath, 'utf8'));
    const cfg = (this.manifest.config ?? {}) as Record<string, { default?: unknown }>;
    for (const [key, schema] of Object.entries(cfg)) {
      if (schema && 'default' in schema) this.config[key] = schema.default;
    }
  }

  abstract getId(): string;

  getManifestPath(): string {
    return this.manifestPath;
  }

  getManifest(): Record<string, unknown> {
    return this.manifest;
  }

  getConfig(): Record<string, unknown> {
    return { ...this.config };
  }

  configure(settings: Record<string, unknown>): void {
    this.config = { ...this.config, ...settings };
  }

  create(factory: string, args: Record<string, unknown>): unknown {
    const factories = (this.manifest.factories ?? {}) as Record<string, { returns?: string }>;
    if (!factories[factory]) throw new Error(`Unknown factory: ${factory}`);
    const type = String(factories[factory].returns ?? 'Handle');
    const handled = this.handleCreate(factory, args, type);
    if (handled !== undefined && handled !== null) return handled;
    return new StubHandle(this.getId(), type, factory, args, this.config);
  }

  invoke(instance: unknown, method: string, args: Record<string, unknown>, _context?: unknown): unknown {
    const type = this.getType(instance);
    const types = (this.manifest.types ?? {}) as Record<string, { methods?: Record<string, { returns?: string }> }>;
    const methodDef = types[type]?.methods?.[method];
    if (!methodDef) throw new Error(`Unknown method: ${type}::${method}`);

    const handled = this.handleInvoke(instance, method, args);
    if (handled !== undefined) return handled;

    const returns = String(methodDef.returns ?? 'void');
    if (['string', 'integer', 'number', 'boolean'].includes(returns)) {
      throw new Error(`Stub adapter for ${this.getId()}: method ${type}::${method} is declared but not wired yet`);
    }
    if (instance instanceof StubHandle) {
      return instance.withMethod(method, args, returns === 'void' ? type : returns);
    }
    throw new Error(`Stub adapter for ${this.getId()}: cannot invoke ${method}`);
  }

  snapshot(instance: unknown): Record<string, unknown> {
    if (instance instanceof StubHandle) return instance.toSnapshot();
    return this.snapshotReal(instance);
  }

  getType(instance: unknown): string {
    if (instance instanceof StubHandle) return instance.type;
    return this.typeOf(instance);
  }

  protected handleCreate(_factory: string, _args: Record<string, unknown>, _type: string): unknown {
    return null;
  }

  protected handleInvoke(_instance: unknown, _method: string, _args: Record<string, unknown>): unknown {
    return undefined;
  }

  protected snapshotReal(instance: unknown): Record<string, unknown> {
    return { value: String(instance) };
  }

  protected typeOf(_instance: unknown): string {
    const types = Object.keys((this.manifest.types ?? {}) as object);
    return types[0] ?? 'Handle';
  }
}
