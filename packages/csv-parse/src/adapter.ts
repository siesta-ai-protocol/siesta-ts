import { StubLibraryAdapter } from '@siesta/runtime';

export class CsvParseAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-csv-parse';
  }
}
