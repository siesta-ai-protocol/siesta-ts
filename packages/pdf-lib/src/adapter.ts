import { StubLibraryAdapter } from '@siesta/runtime';

export class PdfLibAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-pdf-lib';
  }
}
