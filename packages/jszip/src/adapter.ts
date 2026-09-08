import { StubLibraryAdapter } from '@siesta/runtime';

export class JszipAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-jszip';
  }
}
