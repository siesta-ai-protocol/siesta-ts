import { StubLibraryAdapter } from '@siesta/runtime';

export class CsvStringifyAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-csv-stringify';
  }
}
