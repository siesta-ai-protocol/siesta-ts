import { StubLibraryAdapter } from '@siesta/runtime';

export class DotenvAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-dotenv';
  }
}
