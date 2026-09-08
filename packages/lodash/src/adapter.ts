import { StubLibraryAdapter } from '@siesta/runtime';

export class LodashAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-lodash';
  }
}
