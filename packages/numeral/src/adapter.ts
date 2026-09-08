import { StubLibraryAdapter } from '@siesta/runtime';

export class NumeralAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-numeral';
  }
}
