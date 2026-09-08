import { StubLibraryAdapter } from '@siesta/runtime';

export class ContentTypeAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-content-type';
  }
}
