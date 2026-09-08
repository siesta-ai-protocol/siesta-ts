import { StubLibraryAdapter } from '@siesta/runtime';

export class PapaparseAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-papaparse';
  }
}
