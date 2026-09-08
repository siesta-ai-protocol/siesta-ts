import { StubLibraryAdapter } from '@siesta/runtime';

export class ChokidarAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-chokidar';
  }
}
