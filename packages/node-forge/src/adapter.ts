import { StubLibraryAdapter } from '@siesta/runtime';

export class NodeForgeAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-node-forge';
  }
}
