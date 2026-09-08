import { StubLibraryAdapter } from '@siesta/runtime';

export class JoiAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-joi';
  }
}
