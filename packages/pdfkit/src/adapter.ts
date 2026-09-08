import { StubLibraryAdapter } from '@siesta/runtime';

export class PdfkitAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-pdfkit';
  }
}
