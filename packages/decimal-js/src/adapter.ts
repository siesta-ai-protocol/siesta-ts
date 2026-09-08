import { StubLibraryAdapter } from '@siesta/runtime';

export class DecimalJsAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-decimal-js';
  }
}
