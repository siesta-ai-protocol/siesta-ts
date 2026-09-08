import { StubLibraryAdapter } from '@siesta/runtime';

export class TurndownAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-turndown';
  }
}
