import { StubLibraryAdapter } from '@siesta/runtime';

export class MustacheAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-mustache';
  }
}
