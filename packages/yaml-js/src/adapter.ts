import { StubLibraryAdapter } from '@siesta/runtime';

export class YamlJsAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-yaml-js';
  }
}
