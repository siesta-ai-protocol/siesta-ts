import { StubHandle, StubLibraryAdapter } from '@siesta/runtime';

/** Deep experimental adapter for siesta-jose. */
export class JoseAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-jose';
  }

  protected handleCreate(factory: string, args: Record<string, unknown>, type: string): unknown {
    const state = this.normalizeArgs(factory, args);
    return new StubHandle(this.getId(), type, factory, state, this.getConfig());
  }

  protected handleInvoke(instance: unknown, method: string, args: Record<string, unknown>): unknown {
    if (!(instance instanceof StubHandle)) return undefined;

    switch (method) {
      case 'inspect':
        return JSON.stringify(instance.toSnapshot());
      case 'reset':
        return new StubHandle(instance.library, instance.type, instance.originFactory, {}, instance.config);
      case 'toString':
      case 'toHtml':
      case 'toText':
      case 'read':
      case 'result':
      case 'format':
      case 'toIso':
      case 'html':
      case 'text':
      case 'body':
      case 'encode':
      case 'decode':
      case 'toBytes':
        return this.asString(instance, method, args);
      case 'exists':
      case 'validate':
      case 'send':
      case 'save':
        return this.asBool(instance, method, args);
      case 'count':
      case 'length':
      case 'status':
      case 'getAmount':
        return this.asInt(instance, method, args);
      case 'toArray':
        return JSON.stringify(instance.state.items ?? instance.state);
      case 'get':
      case 'post':
        return instance.withMethod(method, args, 'Response');
      case 'addDays':
      case 'add':
      case 'push':
      case 'withHeader':
      case 'setTo':
      case 'setSubject':
      case 'write':
      case 'resize':
      case 'addPage':
      case 'upper':
      case 'lower':
      case 'query':
      case 'info':
      case 'error':
      case 'debug':
      case 'assert':
      case 'run':
        return instance.withMethod(method, args, instance.type);
      default:
        throw new Error(`Unknown method: ${instance.type}::${method}`);
    }
  }

  private normalizeArgs(factory: string, args: Record<string, unknown>): Record<string, unknown> {
    if (factory === 'parse' || factory === 'from') return { input: String(args.input ?? '') };
    if (args.amount !== undefined) return { amount: Number(args.amount), currency: String(args.currency ?? 'USD') };
    // lightweight pure helpers for common string libs
    if (this.getId() === 'siesta-camelcase' && args.input !== undefined) {
      return { input: String(args.input).replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : '')) };
    }
    if (this.getId() === 'siesta-slugify' && args.input !== undefined) {
      return { input: String(args.input).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') };
    }
    if (this.getId() === 'siesta-pluralize' && args.input !== undefined) {
      const s = String(args.input);
      return { input: s.endsWith('s') ? s : s + 's' };
    }
    if (this.getId() === 'siesta-strip-ansi' && args.input !== undefined) {
      return { input: String(args.input).replace(/\u001b\[[0-9;]*m/g, '') };
    }
    return { ...args };
  }

  private asString(instance: StubHandle, method: string, args: Record<string, unknown>): string {
    const input = String(instance.state.input ?? instance.state.value ?? JSON.stringify(instance.state));
    switch (method) {
      case 'toHtml':
      case 'html':
        return `<div>${input.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</div>`;
      case 'encode':
        return Buffer.from(String(args.payload ?? input)).toString('base64');
      case 'decode':
        return Buffer.from(String(args.token ?? ''), 'base64').toString('utf8');
      case 'toBytes':
        return Buffer.from(input).toString('hex');
      case 'format':
      case 'toIso':
        return input || new Date().toISOString();
      default:
        return input;
    }
  }

  private asBool(instance: StubHandle, method: string, args: Record<string, unknown>): boolean {
    if (method === 'exists') return String(instance.state.input ?? '') !== '';
    if (method === 'validate') return args.value !== null && args.value !== undefined && args.value !== '';
    return true;
  }

  private asInt(instance: StubHandle, method: string, _args: Record<string, unknown>): number {
    if (method === 'count') return Array.isArray(instance.state.items) ? instance.state.items.length : Object.keys(instance.state).length;
    if (method === 'length') return String(instance.state.input ?? '').length;
    if (method === 'status') return 200;
    if (method === 'getAmount') return Math.round(Number(instance.state.amount ?? 0));
    return 0;
  }
}
