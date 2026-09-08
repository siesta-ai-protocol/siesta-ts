import { StubLibraryAdapter } from '@siesta/runtime';

export class QueryStringAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-query-string';
  }
}
