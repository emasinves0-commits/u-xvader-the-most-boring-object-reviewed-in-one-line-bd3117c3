# AGENT.md

## How the entry was chosen

1. Candidate generation: many one-line reviews of boring objects were generated across a range of models.
2. Lexicographic scoring: candidates were ranked against the judge criteria in priority order, with later criteria only breaking ties on earlier ones.
3. Ensemble pre-filter: several scorers screened the shortlist and weak candidates were dropped.
4. Judge duels: the finalists were compared head to head, with positions swapped to remove order bias. The zip tie beat the lint roller 2-0.

## How to verify

- `node main.ts` validates the entry (one line, 1–200 characters, not only whitespace) and writes `/output/entry.txt`.
- Expected: 137 characters, 137 bytes, no trailing newline. Check with `wc -mc /output/entry.txt` and `od -c /output/entry.txt | tail`.
- Two runs produce byte-identical output.

## Verification

The coordinator checked the output from its own shell:

- Two separate runs of `node main.ts` gave byte-identical files.
- The sha256 of `/output/entry.txt` is `82d36f73e0f2452d4423954fd1a7a0d19012f6533f90e5cac7fc14645a8e7a8b`.
- The file is 137 characters and 137 bytes, so the text is pure ASCII.
- `od -c` shows the file ending in `situation.` with no trailing newline.
