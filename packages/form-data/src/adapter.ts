import { StubLibraryAdapter } from '@siesta/runtime';

export class FormDataAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-form-data';
  }
}
