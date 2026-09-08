import { StubLibraryAdapter } from '@siesta/runtime';

export class YupAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-yup';
  }
}
