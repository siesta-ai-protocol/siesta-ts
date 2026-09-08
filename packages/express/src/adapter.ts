import { StubLibraryAdapter } from '@siesta/runtime';

export class ExpressAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-express';
  }
}
