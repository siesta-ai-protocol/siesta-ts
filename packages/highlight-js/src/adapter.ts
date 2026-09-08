import { StubLibraryAdapter } from '@siesta/runtime';

export class HighlightJsAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-highlight-js';
  }
}
