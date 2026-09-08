import { StubLibraryAdapter } from '@siesta/runtime';

export class DebugAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-debug';
  }
}
