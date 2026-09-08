import { StubLibraryAdapter } from '@siesta/runtime';

export class FastifyAdapter extends StubLibraryAdapter {
  getId(): string {
    return 'siesta-fastify';
  }
}
