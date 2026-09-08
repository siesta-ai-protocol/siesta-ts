import { StubLibraryAdapter } from '@siesta/runtime';

export class StringWidthAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-string-width';
  }
}
