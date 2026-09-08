import { StubLibraryAdapter } from '@siesta/runtime';

export class CurrencyJsAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-currency-js';
  }
}
