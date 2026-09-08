import { StubLibraryAdapter } from '@siesta/runtime';

export class KoaAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-koa';
  }
}
