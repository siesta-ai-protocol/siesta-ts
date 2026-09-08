import { StubLibraryAdapter } from '@siesta/runtime';

export class DateFnsTzAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-date-fns-tz';
  }
}
