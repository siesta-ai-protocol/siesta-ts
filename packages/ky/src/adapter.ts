import { StubLibraryAdapter } from '@siesta/runtime';

export class KyAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-ky';
  }
}
