import { StubLibraryAdapter } from '@siesta/runtime';

export class JspdfAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-jspdf';
  }
}
