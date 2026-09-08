import { StubLibraryAdapter } from '@siesta/runtime';

export class WinstonAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-winston';
  }
}
