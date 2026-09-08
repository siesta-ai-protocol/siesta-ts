import { StubLibraryAdapter } from '@siesta/runtime';

export class MarkdownItAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-markdown-it';
  }
}
