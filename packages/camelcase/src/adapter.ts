import { StubLibraryAdapter } from '@siesta/runtime';

export class CamelcaseAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-camelcase';
  }
}
