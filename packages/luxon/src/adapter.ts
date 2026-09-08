import { StubLibraryAdapter } from '@siesta/runtime';

export class LuxonAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-luxon';
  }
}
