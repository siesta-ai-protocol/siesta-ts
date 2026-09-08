import { StubLibraryAdapter } from '@siesta/runtime';

export class UndiciAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-undici';
  }
}
