import { StubLibraryAdapter } from '@siesta/runtime';

export class AjvAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-ajv';
  }
}
