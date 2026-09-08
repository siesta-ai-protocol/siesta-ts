import { StubLibraryAdapter } from '@siesta/runtime';

export class EjsAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-ejs';
  }
}
