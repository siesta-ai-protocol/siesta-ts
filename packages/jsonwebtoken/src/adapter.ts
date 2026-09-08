import { StubLibraryAdapter } from '@siesta/runtime';

export class JsonwebtokenAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-jsonwebtoken';
  }
}
