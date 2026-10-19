import { readdir } from 'node:fs/promises';

export interface LoadedModule {
  fileName: string;
  exported: unknown;
}

/** True for source files we should import: .ts in dev, .js after build. */
function isModuleFile(fileName: string): boolean {
  const isCodeFile = fileName.endsWith('.ts') || fileName.endsWith('.js');
  const isTypeDeclaration = fileName.endsWith('.d.ts');
  return isCodeFile && !isTypeDeclaration;
}

/**
 * Imports every code file in a directory and returns each file's default export.
 * The directory URL must end with a slash, e.g. new URL('../commands/', import.meta.url).
 */
export async function importDefaultExports(directory: URL): Promise<LoadedModule[]> {
  const fileNames = (await readdir(directory)).filter(isModuleFile).sort();
  const modules: LoadedModule[] = [];

  for (const fileName of fileNames) {
    const fileUrl = new URL(fileName, directory);
    const module = (await import(fileUrl.href)) as { default?: unknown };
    modules.push({ fileName, exported: module.default });
  }

  return modules;
}
