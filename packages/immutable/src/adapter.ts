import { StubLibraryAdapter } from '@siesta/runtime';

export class ImmutableAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-immutable';
  }
}
