import { StubLibraryAdapter } from '@siesta/runtime';

export class GlobAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-glob';
  }
}
