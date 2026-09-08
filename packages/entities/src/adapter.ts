import { StubLibraryAdapter } from '@siesta/runtime';

export class EntitiesAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-entities';
  }
}
