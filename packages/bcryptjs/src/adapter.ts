import { StubLibraryAdapter } from '@siesta/runtime';

export class BcryptjsAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-bcryptjs';
  }
}
