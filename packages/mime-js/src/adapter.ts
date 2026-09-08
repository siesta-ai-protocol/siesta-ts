import { StubLibraryAdapter } from '@siesta/runtime';

export class MimeJsAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-mime-js';
  }
}
