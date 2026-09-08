import { StubLibraryAdapter } from '@siesta/runtime';

export class SlugifyAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-slugify';
  }
}
