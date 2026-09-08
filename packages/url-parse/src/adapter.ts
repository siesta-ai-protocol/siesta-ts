import { StubLibraryAdapter } from '@siesta/runtime';

export class UrlParseAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-url-parse';
  }
}
