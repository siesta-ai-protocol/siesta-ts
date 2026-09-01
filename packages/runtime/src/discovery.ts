import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import type { DiscoveredLibrary } from './types.js';

function walkForManifests(dir: string, results: string[] = []): string[] {
  if (!existsSync(dir)) return results;

  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);

    try {
      if (statSync(full).isDirectory()) {
        if (entry === 'node_modules' && dir.endsWith('vendor')) continue;
        walkForManifests(full, results);
      } else if (entry === 'siesta.manifest.json') {
        results.push(full);
      }
    } catch {
      continue;
    }
  }

  return results;
}

export function discoverManifests(projectRoot: string): DiscoveredLibrary[] {
  const paths = new Set<string>();

  for (const base of ['packages', 'node_modules']) {
    walkForManifests(join(projectRoot, base)).forEach((p) => paths.add(p));
  }

  const rootManifest = join(projectRoot, 'siesta.manifest.json');
  if (existsSync(rootManifest)) paths.add(rootManifest);

  const siestaConfig = join(projectRoot, 'siesta.json');
  if (existsSync(siestaConfig)) {
    const config = JSON.parse(readFileSync(siestaConfig, 'utf8')) as {
      manifests?: string[];
      discovery?: { paths?: string[] };
    };

    for (const rel of config.manifests ?? []) {
      paths.add(join(projectRoot, rel));
    }

    for (const rel of config.discovery?.paths ?? []) {
      walkForManifests(join(projectRoot, rel)).forEach((p) => paths.add(p));
    }
  }

  return [...paths].map((manifestPath) => {
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as Record<string, unknown>;
    const adapter = manifest.adapter as { class?: string } | undefined;

    return {
      manifestPath,
      manifest,
      valid: true,
      validationErrors: [],
      adapterClass: adapter?.class,
    } satisfies DiscoveredLibrary;
  });
}
