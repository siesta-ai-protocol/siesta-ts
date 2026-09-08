import { StubLibraryAdapter } from '@siesta/runtime';

export class MomentAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-moment';
  }
}
