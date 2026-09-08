import { StubLibraryAdapter } from '@siesta/runtime';

export class NodeFetchAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-node-fetch';
  }
}
