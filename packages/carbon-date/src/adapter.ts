import { addWeeks, format, parseISO } from 'date-fns';
import type { LibraryAdapter } from '@siesta/runtime';

export class DateFnsAdapter implements LibraryAdapter {
  private settings = { defaultTimezone: 'UTC', locale: 'en', weekStartsAt: 1 };

  constructor(private readonly manifestPath: string, private readonly manifest: Record<string, unknown>) {}

  getId(): string {
    return 'siesta-carbon-date';
  }

  getManifestPath(): string {
    return this.manifestPath;
  }

  getManifest(): Record<string, unknown> {
    return this.manifest;
  }

  getConfig(): Record<string, unknown> {
    return { ...this.settings };
  }

  configure(settings: Record<string, unknown>): void {
    this.settings = { ...this.settings, ...settings } as typeof this.settings;
  }

  create(factory: string, args: Record<string, unknown>): Date {
    switch (factory) {
      case 'now':
        return new Date();
      case 'parse':
        return parseISO(String(args.input));
      default:
        throw new Error(`Unknown factory: ${factory}`);
    }
  }

  invoke(instance: unknown, method: string, args: Record<string, unknown>): unknown {
    const date = instance as Date;

    switch (method) {
      case 'addWeeks':
        return addWeeks(date, Number(args.weeks));
      case 'format':
        return format(date, String(args.pattern ?? 'yyyy-MM-dd'));
      default:
        throw new Error(`Unknown method: ${method}`);
    }
  }

  snapshot(instance: unknown): Record<string, unknown> {
    const date = instance as Date;

    return { iso: date.toISOString(), formatted: format(date, 'yyyy-MM-dd HH:mm:ss') };
  }

  getType(): string {
    return 'DateTime';
  }
}
