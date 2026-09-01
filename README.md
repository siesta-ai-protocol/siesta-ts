# Siesta TypeScript

TypeScript implementation of the [Siesta protocol](https://github.com/siesta-ai-protocol/siesta-protocol).

## Install

```bash
git clone https://github.com/siesta-ai-protocol/siesta-ts.git
cd siesta-ts
npm install
npm run build
```

## Embed in Your Application

```typescript
import { SiestaKernel } from '@siesta/runtime';
import { DateFnsAdapter } from '@siesta/carbon-date';

const kernel = SiestaKernel.discover(process.cwd(), [
  new DateFnsAdapter('./packages/carbon-date/siesta.manifest.json', manifest),
]);

const result = kernel.handle('siesta.create', {
  library: 'siesta-carbon-date',
  factory: 'now',
  args: {},
});
```

## CLI

```bash
npm run discover
npm run validate
```

## Packages

| Package | Description |
|---------|-------------|
| `@siesta/runtime` | Discovery, kernel, protocol handler |
| `@siesta/carbon-date` | date-fns adapter (reference library) |

## License

MIT
