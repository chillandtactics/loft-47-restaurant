import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const localCli = join(projectRoot, "node_modules", "@google", "design.md", "dist", "index.js");
const windowsCli = process.env.LOCALAPPDATA
  ? join(process.env.LOCALAPPDATA, "CodexTools", "designmd", "0.4.0", "package", "dist", "index.js")
  : null;
const userCli = join(homedir(), ".local", "share", "codex-tools", "designmd", "0.4.0", "dist", "index.js");
const cliPath = [localCli, windowsCli, userCli].find((candidate) => candidate && existsSync(candidate));

if (!cliPath) {
  console.error("Official @google/design.md@0.4.0 CLI is unavailable. Run npm install first.");
  process.exit(1);
}

const result = spawnSync(process.execPath, [cliPath, ...process.argv.slice(2)], {
  cwd: projectRoot,
  stdio: "inherit",
});

if (result.error) throw result.error;
process.exit(result.status ?? 1);
