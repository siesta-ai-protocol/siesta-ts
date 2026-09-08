import { StubLibraryAdapter } from '@siesta/runtime';

export class RemarkAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-remark';
  }
}
