import { StubLibraryAdapter } from '@siesta/runtime';

export class PluralizeAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-pluralize';
  }
}
