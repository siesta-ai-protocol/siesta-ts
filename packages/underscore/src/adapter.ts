import { StubLibraryAdapter } from '@siesta/runtime';

export class UnderscoreAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-underscore';
  }
}
