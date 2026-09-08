import { StubLibraryAdapter } from '@siesta/runtime';

export class StripAnsiAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-strip-ansi';
  }
}
