# Runbook: Release the portfolio + resume

Every change to this repo that touches the **site content** or **resume source**
must ship with a fresh `public/resume.pdf`. The resume PDF is a deployed
artifact (Vercel serves it from `/resume.pdf`), and it must stay in lockstep
with `config.yaml` — drift means the web UI and the downloadable PDF disagree
about what Sherod's resume says today.

This runbook covers:

1. The standard "PR → main" change flow.
2. Cutting a tagged release that publishes a versioned resume snapshot.
3. What CI does and when you have to run anything locally.

---

## What counts as "any change"

If a PR touches **any** of these files, CI regenerates the resume and (on
main) commits the updated artifacts back:

- `config.yaml` — source of truth for personal info, experience, projects,
  skills, community.
- `generate-resume.py` — the YAML → LaTeX renderer.
- `resume-template.tex` — the LaTeX template the renderer fills.
- `Makefile` — the build pipeline (xelatex, font checks).
- `.github/workflows/resume.yml` — the CI definition itself.

Any other change (site components, articles, styling) skips the resume build.

---

## Standard flow — PR to main

1. **Branch off main**: `git checkout -b feat/<slug>` or `fix/<slug>`.
2. **Edit `config.yaml`** (or whichever source files apply). One concern per
   PR — don't bundle an experience refresh with a styling change.
3. **(Optional) regenerate locally** to preview:
   ```bash
   make             # runs generate-resume.py → xelatex → public/resume.pdf
   ```
   This requires `xelatex` and the **FiraCode Nerd Font Mono** font. If you
   don't have them, skip — CI will build the PDF for you.
4. **Open the PR**. CI (`.github/workflows/resume.yml`) will:
   - Install `texlive-xetex` + FiraCode Nerd Font Mono on the runner.
   - Run `make` and upload `public/resume.pdf` as a workflow artifact (the
     reviewer can download it from the run page).
5. **Review** — the reviewer (or you, before requesting review) downloads
   the PDF artifact from the workflow run and confirms the resume looks
   correct.
6. **Merge to main**. On `push` to main the same workflow re-runs and
   **auto-commits** the regenerated `public/resume.pdf` if it drifts from
   what's in the PR. The commit message ends in `[skip ci]` so it doesn't
   trigger another build. (`generated-resume.tex` is gitignored — it's a
   build intermediate, not a source artifact.)
7. **Vercel deploys main** on every push, so the live site picks up the new
   PDF without any manual step.

### Why CI builds the PDF instead of just trusting the committed one

Committing a binary PDF that you built locally is fine for a draft, but it
makes the repo dependent on whoever's machine happens to have xelatex and the
right font installed. The CI build is the source of truth: whoever you are,
whatever you have installed locally, the PDF on `main` matches what CI built
from `config.yaml` on that commit.

---

## Cutting a tagged release

Use a tagged release when you want a stable snapshot of the resume — e.g.
the version you sent to a specific recruiter, or a yearly "best of" tag.

1. Pick a version. Semver is fine but not enforced:
   - **Patch** (`vX.Y.Z+1`) — typo, single-line wording change.
   - **Minor** (`vX.Y+1.0`) — new experience, new project, refreshed skills.
   - **Major** (`vX+1.0.0`) — role change, full restructure.
2. Make sure `main` is the version you want to tag. `git pull` to be sure.
3. **Tag and push**:
   ```bash
   git tag -a v1.2.0 -m "snapshot: add agent-smith project + Q2 2026 refresh"
   git push origin v1.2.0
   ```
4. CI runs on the tag and **attaches `public/resume.pdf` to the GitHub
   Release** via `softprops/action-gh-release`. The Release shows up at
   `https://github.com/sherodtaylor/portfolio-and-digital-garden/releases/tag/vX.Y.Z`.
5. (Optional) edit the Release body in the GitHub UI with a one-paragraph
   "what changed in this snapshot."

The tag is permanent; CI never overwrites the PDF on a tag because the
auto-commit step is gated on `github.ref == 'refs/heads/main'`.

---

## Manual rebuild (when you must)

If CI is down or you need a PDF urgently:

```bash
make setup        # installs PyYAML into a local venv if missing
make              # generate-resume.py → xelatex → public/resume.pdf
```

Requirements:

- Python 3 + PyYAML (handled by `make setup`).
- `xelatex` — on macOS via [MacTeX](https://www.tug.org/mactex/) or
  `brew install --cask mactex-no-gui`; on Linux via
  `apt-get install texlive-xetex texlive-fonts-extra texlive-latex-extra`.
- **FiraCode Nerd Font Mono** — install from
  [ryanoasis/nerd-fonts](https://github.com/ryanoasis/nerd-fonts/releases)
  (the `FiraCode.zip` archive), then `fc-cache -f`. The Makefile's
  `check-font` target will tell you if it can't find the font.

`make clean` removes intermediate `.aux`/`.log`/`.tex` files; `make
clean-all` also deletes `public/resume.pdf`.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| CI fails at `Install Fira Code Nerd Font Mono` | Upstream ZIP path changed | Update the URL in `.github/workflows/resume.yml` to the current Nerd Fonts release asset. |
| `fc-list \| grep "FiraCode Nerd Font Mono"` returns nothing on the runner | Font install succeeded but `fc-cache` didn't pick it up | Confirm the `unzip -o` extracted into `~/.local/share/fonts/firacode/`; run `fc-cache -fv ~/.local/share/fonts`. |
| `xelatex` exits with `Font 'FiraCode Nerd Font Mono' not found` | Same as above, or system font cache stale | Re-run the workflow; on local, `fc-cache -fv && xelatex generated-resume.tex` again. |
| `make` fails locally with `ImportError: yaml` | PyYAML not installed in the env Make is using | `make setup` (creates venv) or `pip install pyyaml` in your active env. |
| CI's auto-commit on main fails with permission errors | Workflow token lacks `contents: write` | Already set in `resume.yml`; if a future change removes it, restore the `permissions` block. |
| PR PDF artifact looks wrong but local `make` looks fine | LaTeX encoding difference (special chars in `config.yaml`) | Run `make` locally with the exact same `config.yaml`; the LaTeX escaper in `generate-resume.py` handles `& % $ # ^ _ { } ~ \` but anything more exotic (em dashes, non-ASCII quotes) goes through unchanged. Replace with ASCII if `xelatex` rejects. |

---

## What's intentionally not in CI

- **Deploying the Next.js site** — Vercel watches `main` and deploys
  automatically. No GH Actions for that.
- **Running `npm run lint` / `npm run build`** — Vercel runs them on every
  deploy and surfaces failures via the Vercel UI. Add a CI step here only
  if Vercel feedback isn't fast enough during review.
- **Validating MDX articles** — same: Vercel will fail the build if an
  article won't compile.

If you find yourself wanting CI for any of the above, add a separate
workflow file (`website.yml`, `lint.yml`) rather than expanding
`resume.yml`. One concern per workflow.
