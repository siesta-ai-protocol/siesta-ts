import { StubHandle, StubLibraryAdapter } from '@siesta/runtime';

/** Deep experimental adapter for uuid. */
export class UuidJsAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-uuid-js';
  }

  protected handleCreate(factory: string, args: Record<string, unknown>, type: string): unknown {
    try {
      return this.createReal(factory, args, type);
    } catch {
      return new StubHandle(this.getId(), type, factory, args, this.getConfig());
    }
  }

  protected handleInvoke(instance: unknown, method: string, args: Record<string, unknown>): unknown {
    if (instance instanceof StubHandle) return undefined;
    return this.invokeReal(instance, method, args);
  }

  private createReal(factory: string, args: Record<string, unknown>, type: string): unknown {
    switch (this.getId()) {
      case 'siesta-uuid':
        return { value: cryptoRandomUuid(), type: 'Uuid' };
      case 'siesta-nanoid':
        return { value: Math.random().toString(36).slice(2, 14), type: 'Uuid' };
      case 'siesta-dayjs':
        return { value: new Date().toISOString(), type: 'DateTime', kind: 'dayjs' };
      case 'siesta-ms':
        return { value: 0, type: 'DateTime', kind: 'ms' };
      case 'siesta-semver':
        return { value: String(args.input ?? '1.0.0'), type: 'Handle', kind: 'semver' };
      case 'siesta-qs':
        return { value: {}, type: 'Client', kind: 'qs' };
      case 'siesta-axios':
        return new StubHandle(this.getId(), type, factory, args, this.getConfig());
      case 'siesta-zod':
        return new StubHandle(this.getId(), type, factory, args, this.getConfig());
      case 'siesta-lodash-es':
        return new StubHandle(this.getId(), type, factory, { items: [] }, this.getConfig());
      case 'siesta-marked':
        return new StubHandle(this.getId(), type, factory, args, this.getConfig());
      case 'siesta-cheerio':
        return new StubHandle(this.getId(), type, factory, args, this.getConfig());
      case 'siesta-validator':
        return new StubHandle(this.getId(), type, factory, args, this.getConfig());
      default:
        return new StubHandle(this.getId(), type, factory, args, this.getConfig());
    }
  }

  private invokeReal(instance: unknown, method: string, args: Record<string, unknown>): unknown {
    const obj = instance as { value?: string; kind?: string; type?: string };
    if (obj?.type === 'Uuid' || typeof obj?.value === 'string') {
      if (method === 'toString') return String(obj.value);
      if (method === 'toBytes') return Buffer.from(String(obj.value)).toString('hex');
      if (method === 'format' || method === 'toIso') return String(obj.value);
      if (method === 'addDays') {
        const d = new Date(String(obj.value));
        d.setUTCDate(d.getUTCDate() + Number(args.days ?? 0));
        return { ...obj, value: d.toISOString() };
      }
    }
    if (obj?.kind === 'ms' && method === 'toIso') return String(obj.value);
    if (obj?.kind === 'semver' && method === 'result') return String(obj.value);
    throw new Error(`Deep invoke not wired: ${method}`);
  }

  getType(instance: unknown): string {
    if (instance && typeof instance === 'object' && 'type' in (instance as object)) {
      return String((instance as { type: string }).type);
    }
    return super.getType(instance);
  }

  snapshot(instance: unknown): Record<string, unknown> {
    if (instance && typeof instance === 'object') return { ...(instance as object), deep: true };
    return super.snapshot(instance);
  }
}

function cryptoRandomUuid(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
