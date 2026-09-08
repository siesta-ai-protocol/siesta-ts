import { StubLibraryAdapter } from '@siesta/runtime';

export class ChangeCaseAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-change-case';
  }
}
