import { StubLibraryAdapter } from '@siesta/runtime';

export class GotAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-got';
  }
}
