import { StubLibraryAdapter } from '@siesta/runtime';

export class HandlebarsAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-handlebars';
  }
}
