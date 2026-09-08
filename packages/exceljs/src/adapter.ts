import { StubLibraryAdapter } from '@siesta/runtime';

export class ExceljsAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-exceljs';
  }
}
