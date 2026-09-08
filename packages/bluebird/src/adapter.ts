import { StubLibraryAdapter } from '@siesta/runtime';

export class BluebirdAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-bluebird';
  }
}
