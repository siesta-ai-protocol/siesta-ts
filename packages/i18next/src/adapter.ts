import { StubLibraryAdapter } from '@siesta/runtime';

export class I18nextAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-i18next';
  }
}
