import { StubLibraryAdapter } from '@siesta/runtime';

export class ChalkAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-chalk';
  }
}
