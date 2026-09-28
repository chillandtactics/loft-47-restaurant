import { copyFileSync, cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { dirname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = resolve(projectRoot, "dist");

if (!outputDirectory.startsWith(`${projectRoot}${sep}`)) {
  throw new Error("Refusing to build outside the project directory.");
}

const heroFallback = join(
  homedir(),
  ".codex",
  "generated_images",
  "01a0e6fd-f8c8-7952-8cae-a500f39742f4",
  "exec-92acaaa3-06b1-4c80-b821-217ab22738c6.png",
);
const generatedImageDirectory = join(
  homedir(),
  ".codex",
  "generated_images",
  "01a0e6fd-f8c8-7952-8cae-a500f39742f4",
);
const fontDirectory = join(tmpdir(), "codex-loft47-fonts");
const assets = [
  {
    local: join(projectRoot, "assets", "images", "loft-47-hero.png"),
    fallback: heroFallback,
    output: join(outputDirectory, "assets", "images", "loft-47-hero.png"),
  },
  ...[
    ["loft-47-food-v1.png", "exec-c61305a1-15e8-4e82-9a27-15829161ea81.png"],
    ["loft-47-banquet-v1.png", "exec-723ab4c6-c9fd-4847-93ea-e2ff160f075c.png"],
    ["loft-47-decor-v1.png", "exec-05a80883-b4bb-44cd-9ac4-f55d51988e87.png"],
    ["loft-47-interior-v1.png", "exec-b4d91a74-99e7-4496-bae7-72078938678f.png"],
    ["loft-47-av-v1.png", "exec-fa8df2a8-7d07-485c-8d51-90fe5b33ab8a.png"],
  ].map(([name, generatedName]) => ({
    local: join(projectRoot, "assets", "images", name),
    fallback: join(generatedImageDirectory, generatedName),
    output: join(outputDirectory, "assets", "images", name),
  })),
  {
    local: join(projectRoot, "assets", "fonts", "Unbounded-Variable.ttf"),
    fallback: join(fontDirectory, "Unbounded-Variable.ttf"),
    output: join(outputDirectory, "assets", "fonts", "Unbounded-Variable.ttf"),
  },
  {
    local: join(projectRoot, "assets", "fonts", "Manrope-Variable.ttf"),
    fallback: join(fontDirectory, "Manrope-Variable.ttf"),
    output: join(outputDirectory, "assets", "fonts", "Manrope-Variable.ttf"),
  },
];

for (const asset of assets) {
  asset.source = existsSync(asset.local) ? asset.local : asset.fallback;
  if (!existsSync(asset.source)) {
    throw new Error(`Missing asset. Add ${asset.local} before packaging the repository.`);
  }
}

if (existsSync(outputDirectory)) rmSync(outputDirectory, { recursive: true, force: true });
mkdirSync(join(outputDirectory, "assets", "images"), { recursive: true });
mkdirSync(join(outputDirectory, "assets", "fonts"), { recursive: true });
mkdirSync(join(outputDirectory, ".openai"), { recursive: true });

for (const file of ["index.html", "styles.css", "script.js", "qa-mobile.html"]) {
  copyFileSync(join(projectRoot, file), join(outputDirectory, file));
}

for (const asset of assets) copyFileSync(asset.source, asset.output);

const hostingManifest = join(projectRoot, ".openai", "hosting.json");
if (existsSync(hostingManifest)) {
  copyFileSync(hostingManifest, join(outputDirectory, ".openai", "hosting.json"));
}

cpSync(join(projectRoot, "assets", "images", ".gitkeep"), join(outputDirectory, "assets", "images", ".gitkeep"));
cpSync(join(projectRoot, "assets", "fonts", ".gitkeep"), join(outputDirectory, "assets", "fonts", ".gitkeep"));

console.log(`Static site prepared at ${outputDirectory}`);
