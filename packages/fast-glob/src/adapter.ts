import { StubLibraryAdapter } from '@siesta/runtime';

export class FastGlobAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-fast-glob';
  }
}
