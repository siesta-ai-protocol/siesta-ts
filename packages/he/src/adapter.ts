import { StubLibraryAdapter } from '@siesta/runtime';

export class HeAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-he';
  }
}
