import { StubLibraryAdapter } from '@siesta/runtime';

export class DompurifyAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-dompurify';
  }
}
