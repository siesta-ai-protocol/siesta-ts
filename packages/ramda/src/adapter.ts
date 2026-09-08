import { StubLibraryAdapter } from '@siesta/runtime';

export class RamdaAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-ramda';
  }
}
