import { StubLibraryAdapter } from '@siesta/runtime';

export class DineroJsAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-dinero-js';
  }
}
