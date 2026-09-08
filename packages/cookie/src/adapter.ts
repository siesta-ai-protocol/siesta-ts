import { StubLibraryAdapter } from '@siesta/runtime';

export class CookieAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-cookie';
  }
}
