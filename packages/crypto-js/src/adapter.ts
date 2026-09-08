import { StubLibraryAdapter } from '@siesta/runtime';

export class CryptoJsAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-crypto-js';
  }
}
