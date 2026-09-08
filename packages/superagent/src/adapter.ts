import { StubLibraryAdapter } from '@siesta/runtime';

export class SuperagentAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-superagent';
  }
}
