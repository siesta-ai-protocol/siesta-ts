import { StubLibraryAdapter } from '@siesta/runtime';

export class PicocolorsAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-picocolors';
  }
}
