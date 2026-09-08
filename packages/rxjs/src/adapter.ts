import { StubLibraryAdapter } from '@siesta/runtime';

export class RxjsAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-rxjs';
  }
}
