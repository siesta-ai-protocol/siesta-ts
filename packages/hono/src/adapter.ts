import { StubLibraryAdapter } from '@siesta/runtime';

export class HonoAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-hono';
  }
}
