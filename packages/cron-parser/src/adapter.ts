import { StubLibraryAdapter } from '@siesta/runtime';

export class CronParserAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-cron-parser';
  }
}
