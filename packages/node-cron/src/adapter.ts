import { StubLibraryAdapter } from '@siesta/runtime';

export class NodeCronAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-node-cron';
  }
}
