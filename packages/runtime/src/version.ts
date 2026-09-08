/** Minimal semver helpers for surface constraints. */
export function normalizeSemver(version: string): string {
  const m = version.trim().match(/^v?(\d+)(?:\.(\d+))?(?:\.(\d+))?/);
  if (!m) return '0.0.0';
  return `${Number(m[1])}.${Number(m[2] ?? 0)}.${Number(m[3] ?? 0)}`;
}

export function compareSemver(a: string, b: string): number {
  const pa = normalizeSemver(a).split('.').map(Number);
  const pb = normalizeSemver(b).split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    if (pa[i] !== pb[i]) return pa[i] - pb[i];
  }
  return 0;
}

export function matchesVersion(
  capability: { since?: string; until?: string },
  packageVersion: string | null | undefined,
): boolean {
  if (!packageVersion) return true;
  if (capability.since && compareSemver(packageVersion, capability.since) < 0) return false;
  if (capability.until && compareSemver(packageVersion, capability.until) >= 0) return false;
  return true;
}

export function resolvePackageVersion(
  manifest: Record<string, unknown>,
  override?: string | null,
): string | null {
  if (override && String(override).trim() !== '') return normalizeSemver(String(override));
  const pkg = manifest.package as { version?: string } | undefined;
  if (pkg?.version) return normalizeSemver(pkg.version);
  return null;
}

export function filterManifest(
  manifest: Record<string, unknown>,
  packageVersion: string | null,
): Record<string, unknown> {
  if (!packageVersion) return manifest;

  const factories: Record<string, unknown> = {};
  for (const [name, def] of Object.entries((manifest.factories ?? {}) as Record<string, { since?: string; until?: string }>)) {
    if (matchesVersion(def, packageVersion)) factories[name] = def;
  }

  const types: Record<string, unknown> = {};
  for (const [typeName, typeDef] of Object.entries(
    (manifest.types ?? {}) as Record<string, { since?: string; until?: string; methods?: Record<string, { since?: string; until?: string }> }>,
  )) {
    if (!matchesVersion(typeDef, packageVersion)) continue;
    const methods: Record<string, unknown> = {};
    for (const [methodName, methodDef] of Object.entries(typeDef.methods ?? {})) {
      if (matchesVersion(methodDef, packageVersion)) methods[methodName] = methodDef;
    }
    if (Object.keys(methods).length === 0) continue;
    types[typeName] = { ...typeDef, methods };
  }

  return { ...manifest, factories, types };
}

export function assertAvailable(
  capability: { since?: string; until?: string },
  label: string,
  packageVersion: string | null,
): void {
  if (!packageVersion || matchesVersion(capability, packageVersion)) return;
  const parts = [`${label} is not available for package version ${packageVersion}`];
  if (capability.since) parts.push(`requires >= ${capability.since}`);
  if (capability.until) parts.push(`requires < ${capability.until}`);
  const err = new Error(parts.join('; ')) as Error & { code?: string };
  err.code = 'VERSION_UNSUPPORTED';
  throw err;
}
