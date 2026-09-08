import { StubLibraryAdapter } from '@siesta/runtime';

export class SanitizeHtmlAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-sanitize-html';
  }
}
