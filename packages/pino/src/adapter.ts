import { StubLibraryAdapter } from '@siesta/runtime';

export class PinoAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-pino';
  }
}
