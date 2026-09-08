import { StubLibraryAdapter } from '@siesta/runtime';

export class JsYamlAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-js-yaml';
  }
}
