import { StubLibraryAdapter } from '@siesta/runtime';

export class EsToolkitAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-es-toolkit';
  }
}
