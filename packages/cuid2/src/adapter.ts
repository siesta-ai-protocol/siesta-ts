import { StubLibraryAdapter } from '@siesta/runtime';

export class Cuid2Adapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-cuid2';
  }
}
