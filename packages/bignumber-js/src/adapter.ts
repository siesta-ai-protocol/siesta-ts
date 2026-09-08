import { StubLibraryAdapter } from '@siesta/runtime';

export class BignumberJsAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-bignumber-js';
  }
}
