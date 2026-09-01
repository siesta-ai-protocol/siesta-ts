import { discoverManifests } from './discovery.js';
import type { LibraryAdapter } from './types.js';

type HandleEntry = { library: string; type: string; instance: unknown };

export class SiestaKernel {
  private handles = new Map<string, HandleEntry>();
  private counter = 0;
  private config = new Map<string, Record<string, unknown>>();

  constructor(
    private readonly projectRoot: string,
    private readonly adapters = new Map<string, LibraryAdapter>(),
    private readonly discovered = discoverManifests(projectRoot),
    readonly sessionId = `sess_${Math.random().toString(16).slice(2)}`,
  ) {
    for (const lib of discovered) {
      const id = String(lib.manifest.library ?? '');
      if (id && adapters.has(id)) {
        this.config.set(id, adapters.get(id)!.getConfig());
      }
    }
  }

  static discover(projectRoot: string, adapters: LibraryAdapter[] = []): SiestaKernel {
    const map = new Map(adapters.map((a) => [a.getId(), a]));
    return new SiestaKernel(projectRoot, map);
  }

  handle(method: string, params: Record<string, unknown>): Record<string, unknown> {
    switch (method) {
      case 'siesta.discover':
        return this.discover();
      case 'siesta.validate':
        return this.validate();
      case 'siesta.introspect':
        return this.introspect(params);
      case 'siesta.configure':
        return this.configure(params);
      case 'siesta.create':
        return this.create(params);
      case 'siesta.invoke':
        return this.invoke(params);
      case 'siesta.release':
        return this.release(params);
      default:
        return { error: { code: 'INTERNAL', message: `Unknown method: ${method}`, retryable: false } };
    }
  }

  private discover(): Record<string, unknown> {
    return {
      siestaVersion: '1.0',
      sessionId: this.sessionId,
      projectRoot: this.projectRoot,
      libraries: this.discovered.map((lib) => ({
        id: lib.manifest.library,
        manifest: lib.manifestPath,
        valid: lib.valid,
        executable: Boolean(lib.adapterClass && this.adapters.has(String(lib.manifest.library))),
        registered: this.adapters.has(String(lib.manifest.library)),
        adapter: lib.adapterClass,
      })),
    };
  }

  private validate(): Record<string, unknown> {
    return {
      siestaVersion: '1.0',
      valid: this.discovered.every((l) => l.valid),
      libraries: this.discovered.map((l) => ({
        id: l.manifest.library,
        manifest: l.manifestPath,
        valid: l.valid,
        errors: l.validationErrors,
      })),
    };
  }

  private introspect(params: Record<string, unknown>): Record<string, unknown> {
    const adapter = this.adapters.get(String(params.library));
    if (!adapter) {
      return { error: { code: 'LIBRARY_NOT_FOUND', message: `Library not found: ${params.library}`, retryable: false } };
    }

    return { siestaVersion: '1.0', manifest: adapter.getManifest() };
  }

  private configure(params: Record<string, unknown>): Record<string, unknown> {
    const library = String(params.library);
    const adapter = this.adapters.get(library);

    if (!adapter) {
      return { error: { code: 'LIBRARY_NOT_FOUND', message: `Library not found: ${library}`, retryable: false } };
    }

    const settings = (params.settings ?? {}) as Record<string, unknown>;
    adapter.configure(settings);

    return { siestaVersion: '1.0', library, config: adapter.getConfig() };
  }

  private create(params: Record<string, unknown>): Record<string, unknown> {
    const library = String(params.library);
    const adapter = this.adapters.get(library);

    if (!adapter) {
      return { error: { code: 'LIBRARY_NOT_FOUND', message: `Library not found: ${library}`, retryable: false } };
    }

    const instance = adapter.create(String(params.factory), (params.args ?? {}) as Record<string, unknown>);
    const handle = `hdl_${++this.counter}`;
    const type = adapter.getType(instance);

    this.handles.set(handle, { library, type, instance });

    return {
      siestaVersion: '1.0',
      handle,
      type,
      snapshot: adapter.snapshot(instance),
    };
  }

  private invoke(params: Record<string, unknown>): Record<string, unknown> {
    const handle = String(params.handle);
    const entry = this.handles.get(handle);

    if (!entry) {
      return { error: { code: 'HANDLE_EXPIRED', message: `Handle expired: ${handle}`, retryable: true } };
    }

    const adapter = this.adapters.get(entry.library)!;
    const args = (params.args ?? {}) as Record<string, unknown>;
    let context: unknown;

    if (typeof args.otherHandle === 'string') {
      context = this.handles.get(args.otherHandle)?.instance;
    }

    const result = adapter.invoke(entry.instance, String(params.method), args, context);

    if (result !== null && typeof result === 'object') {
      const newHandle = `hdl_${++this.counter}`;
      this.handles.set(newHandle, { library: entry.library, type: adapter.getType(result), instance: result });

      return {
        siestaVersion: '1.0',
        handle: newHandle,
        type: adapter.getType(result),
        snapshot: adapter.snapshot(result),
      };
    }

    return { siestaVersion: '1.0', value: result };
  }

  private release(params: Record<string, unknown>): Record<string, unknown> {
    const handles = (params.handles ?? []) as string[];
    let released = 0;

    for (const h of handles) {
      if (this.handles.delete(h)) released++;
    }

    return { siestaVersion: '1.0', released };
  }
}
