import { StubLibraryAdapter } from '@siesta/runtime';

export class JimpAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-jimp';
  }
}
