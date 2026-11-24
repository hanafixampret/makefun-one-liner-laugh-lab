import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "It was on the floor. My entire job is the floor. I fail to see the issue.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

const back = readFileSync(outPath, "utf8");
if (back !== LINE) throw new Error("round-trip mismatch");
if (back.length < 1 || back.length > 200) throw new Error("gate: length");
if (back.trim().length === 0) throw new Error("gate: whitespace only");
if (back.includes("\n")) throw new Error("gate: must be one line");
console.log(`wrote ${back.length} characters to ${outPath}`);
