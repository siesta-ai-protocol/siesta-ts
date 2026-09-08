import { StubLibraryAdapter } from '@siesta/runtime';

export class XlsxAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-xlsx';
  }
}
