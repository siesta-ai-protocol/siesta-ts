import { StubLibraryAdapter } from '@siesta/runtime';

export class JoseAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-jose';
  }
}
