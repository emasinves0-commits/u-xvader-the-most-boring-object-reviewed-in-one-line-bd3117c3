import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const OUTPUT_DIR = "/output";
const OUTPUT_PATH = `${OUTPUT_DIR}/entry.txt`;
const MAX_CHARS = 200;

const ENTRY =
  "Five stars for the zip tie: it tightens with every tug, ignores every apology, and demands a blade for release. A tiny hostage situation.";

function validate(entry: string): string[] {
  const errors: string[] = [];
  const chars = [...entry].length;
  const bytes = Buffer.byteLength(entry, "utf8");
  if (chars < 1 || chars > MAX_CHARS) errors.push(`length ${chars} outside 1-${MAX_CHARS} characters`);
  if (entry.trim() === "") errors.push("entry is only whitespace");
  if (/[\r\n]/.test(entry)) errors.push("entry must be exactly one line (no line breaks)");
  if (bytes < chars) errors.push(`byte count ${bytes} < char count ${chars}`);
  return errors;
}

const problems = validate(ENTRY);
if (problems.length > 0) {
  console.error(`Invalid entry: ${problems.join("; ")}`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY, "utf8");

if (readFileSync(OUTPUT_PATH, "utf8") !== ENTRY) {
  console.error("Read-back mismatch for " + OUTPUT_PATH);
  process.exit(1);
}
console.log(`wrote ${[...ENTRY].length} chars / ${Buffer.byteLength(ENTRY, "utf8")} bytes to ${OUTPUT_PATH}`);
