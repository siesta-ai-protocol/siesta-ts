import { StubLibraryAdapter } from '@siesta/runtime';

export class FsExtraAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-fs-extra';
  }
}
