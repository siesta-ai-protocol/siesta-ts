import { StubLibraryAdapter } from '@siesta/runtime';

export class ToughCookieAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-tough-cookie';
  }
}
