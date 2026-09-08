import { StubLibraryAdapter } from '@siesta/runtime';

export class UlidAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-ulid';
  }
}
