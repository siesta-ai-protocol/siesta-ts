import { StubLibraryAdapter } from '@siesta/runtime';

export class MimeTypesAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-mime-types';
  }
}
