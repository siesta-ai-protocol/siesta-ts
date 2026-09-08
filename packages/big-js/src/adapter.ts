import { StubLibraryAdapter } from '@siesta/runtime';

export class BigJsAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-big-js';
  }
}
