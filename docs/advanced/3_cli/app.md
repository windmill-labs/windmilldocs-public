---
description: How do I list and push apps using the Windmill CLI?
---

import DocCard from '@site/src/components/DocCard';

# Apps

## Listing apps

The `wmill app` list command is used to list all apps in the remote workspace.

```bash
wmill app
```

## Pushing an app

Pushing an app to a Windmill instance is done using the `wmill app push` command.

```bash
wmill app push <file_path>
```

### Arguments

| Argument    | Description                       |
| ----------- | --------------------------------- |
| `file_path` | The path to the app file to push. |

### Examples

1. Push the app located at `./my_app.json`.

```bash
wmill app push ./my_app.json
```

## App access mode

A tracked app file states who can open the app: `app.yaml` for [low-code apps](../../apps/0_app_editor/index.mdx), `raw_app.yaml` for [full-code apps](../../full_code_apps/index.mdx).
It can also declare [sandbox isolation](#app-sandbox-isolation-and-frontend-api-access).

It is a tri-state:

```yaml
public: true   # anonymous: anyone with the URL, no login
guests: true   # guest: an identity required, Windmill account not
# neither      # publisher: workspace members with read access only
```

A pull followed by a push round-trips the mode, so an app open to [guests](../../apps/13_guest_apps/index.mdx) stays open to guests through [git sync](../11_git_sync/index.mdx).

Opening an app to guests or to the public can additionally be restricted to workspace admins and bypass users by a [protection ruleset](../../core_concepts/56_protection_rulesets/index.mdx), which applies to the CLI as it does to the UI.

## App sandbox isolation and frontend API access

A tracked app file can declare [sandbox isolation](../../full_code_apps/8_sandbox_isolation/index.mdx) and, in `raw_app.yaml` only, the [frontend API scopes](../../full_code_apps/8_sandbox_isolation/index.mdx#frontend-api-access) viewers are asked to approve:

```yaml
sandbox: true
frontend_api: [jobs:run, users:read]
```

The scopes are `jobs:run`, `jobs:read`, `users:read`, `resources:read`, `variables:read`, `flow_conversations:read` and `flow_conversations:write`, and `frontend_api` requires `sandbox: true`.

With a `sandbox` key, the file wins on push: `sandbox: false` turns isolation off, and a missing `frontend_api` means no scopes.
Without one, an existing app keeps the isolation and scopes it is deployed with, so deleting `sandbox: true` does not unsandbox an app.
A pull writes both keys when they are on.

## Full-code app commands

The CLI provides additional commands for [full-code apps](/docs/full_code_apps):

### Create a new full-code app

```bash
wmill app new
```

Interactive wizard to scaffold a full-code app with React, Svelte or Vue.

### Start the dev server

From the app directory:

```bash
wmill app dev
```

Starts a local development server with hot reload and WebSocket backend. Options: `--port`, `--host`, `--entry`, `--no-open`.

### Bundle an app without deploying it

```bash
wmill app bundle [app_folder] --out <dir>
```

Runs the same build `wmill app push` runs, but writes `bundle.js` and `bundle.css` to a directory instead of deploying. The folder defaults to the current directory and the output to `<app_folder>/dist`. Use `--no-minify` to skip minification.

This is also the build behind the [source-deploy API endpoints](/docs/full_code_apps/deployment#deploy-from-sources-via-the-api), so an app deployed from sources through the API is compiled exactly as the CLI and the editor compile it.

### Lint an app

```bash
wmill app lint [app_folder]
```

Checks that `raw_app.yaml` is valid, that the app has backend runnables and that the frontend builds, and exits with code 1 on any error.
Warnings, such as a SQL viewer filter that is not a [context field](../../full_code_apps/2_backend_runnables/index.mdx#context-fields), are printed without failing the command.

### Generate lock files

Generate `.lock` files for backend runnables with dependencies using the [`wmill generate-metadata`](./generate-metadata.md) command:

```bash
wmill generate-metadata
```

To only update app lockfiles, use:

```bash
wmill generate-metadata --skip-scripts --skip-flows
```

Options: `--yes`, `--dry-run`, `--default-ts`.

:::info Legacy command
Prior to the unified command, this was done with `wmill app generate-locks`. This command is now deprecated but still works.
:::

### Generate agent documentation

From the app directory:

```bash
wmill app generate-agents
```

Generates `AGENTS.md` and `DATATABLES.md` for AI coding agent context.

<div className="grid grid-cols-2 gap-6 mb-4">
	<DocCard
		title="Full-code app CLI workflow"
		description="Complete guide to developing full-code apps with the CLI."
		href="/docs/full_code_apps/cli_workflow"
		color="orange"
	/>
</div>

## Remote path format

```js
<u|g|f>/<username|group|folder>/...
```
