import { StubLibraryAdapter } from '@siesta/runtime';

export class PathToRegexpAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-path-to-regexp';
  }
}
