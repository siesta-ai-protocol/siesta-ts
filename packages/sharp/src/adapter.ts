import { StubLibraryAdapter } from '@siesta/runtime';

export class SharpAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-sharp';
  }
}
