---
description: How do I deploy items from a staging workspace to production with the Windmill UI, including to a workspace on another Windmill instance?
---

# Deploy to prod using the UI

## Per item deploy

From a workspace in Windmill, you can deploy a item and all its dependencies to another workspace. This is a natural way of implementing staging/prod. This feature is available for [Cloud plans and Self-Hosted Enterprise Edition](/pricing) only.

:::info Deploy to prod

For all details on Deployments to prod in Windmill, see [Deploy to prod](../../advanced/12_deploy_to_prod/index.mdx).

:::

<video
    className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
    controls
    id="main-video"
    src="/videos/staging_prod.mp4"
/>

<br/>

:::tip Draft and deploy

The [Draft and deploy](../0_draft_and_deploy/index.mdx) is another feature that offers a lightweight solution for implementing a staging and production workflow, suitable for various scenarios.

:::

### How it works

A workspace deploys into its parent workspace: a [workspace fork](../../advanced/20_workspace_forks/index.mdx) deploys into the workspace it was forked from, and a [dev workspace](../../advanced/26_dev_workspaces/index.mdx) deploys into the prod workspace it is paired with. Create a fork or pair a dev workspace to get a deployment target - there is no separate setting to link two unrelated workspaces of the same instance.

A workspace can also [deploy to a workspace on another Windmill instance](#deploy-to-a-workspace-on-another-instance), set by an admin in the workspace settings, alongside its parent or instead of one.

The parent workspace can for example be:

- a Prod workspace, paired with a dev or staging workspace where scripts and flows are edited and tested first
- a workspace the changes of a short-lived fork are merged back into.

A workspace with no parent and no target on another instance has nothing to deploy into: the deploy drawer shows `Deploy destination not set up`.
The fix is to pair it with a prod workspace on the same instance, or to point it at a workspace on another instance.
See [upgrading from the deploy target setting](#upgrading-from-the-deploy-target-setting) if you used the `Deployment UI` settings tab before Windmill 1.776.0.

Items that can be deployed are:
- [Scripts](../../script_editor/index.mdx)
- [Flows](../../flows/1_flow_editor.mdx)
- [Resources](../3_resources_and_types/index.mdx)
- [Variables](../2_variables_and_secrets/index.mdx)
- [Triggers](../../triggers/index.mdx)

Workspace admins can filter out each of these types, and restrict deployment to given paths, from `Workspace settings` -> `Dev workspace` (this section used to be a separate "Deployment UI" tab).

Then, from the workspace, on the `⋮` menu of each [deployed](../0_draft_and_deploy/index.mdx#deployed-version) script or flow, pick "Deploy to staging/prod". This can be done also from the [Resources](../3_resources_and_types/index.mdx) and [Variables](../2_variables_and_secrets/index.mdx) menus or directly from a script or flow `Details` page.

This can be done by users with both View rights on the deployed-from workspace and edit rights on the deployed-to workspace.

You can deploy one by one flows, scripts (including each script within flow), variables and resources. Or toggle more than one and "Deploy all".

![Deploy to staging/prod](./deploy_to_staging_prod.png 'Deploy to staging/prod')

Items are called:

- "Missing" if not yet present in the deployed workspace.
- "New" if the item will be created with the deployment.
- "diff" if the item was already deployed previously. This opens a difference viewer tab where you can see differences with the previous version.

![Diff menu](./diff_menu.png 'Diff menu')
![Diff menu2](./diff_menu2.png 'Diff menu2')

### Shareable page

A static page is created for each potential deployment to Staging/Prod.

This can be useful for non-admins (for example, members whose [role](../16_roles_and_permissions/index.mdx#workspace-roles) cannot author what is deployed) to share a page to properly-permissioned users to have them review or do the deployment.

![Shareable link](./shareable_link.png 'Shareable link')

> Even users who are not admin can see the "Deploy to staging/prod", from where they can get the link of the shareable page.

<br/>

![Shareable page](./shareable_page.png 'Shareable page')

> This page then allows users with the right permissions to deploy the given items.

## Deploy to a workspace on another instance

Teams that keep dev and prod on separate Windmill instances can deploy from the same drawer into a workspace on the other instance, instead of going through the [git promotion workflow](../../advanced/9_deploy_gh_gl/index.mdx) or the [CLI](../../advanced/3_cli/index.mdx).
Like the rest of the deploy UI, it is available on [Cloud plans and Self-Hosted Enterprise Edition](/pricing) only.

Deploys to the remote instance run as the person deploying, with their own account there, not with a shared service account.
The remote workspace's permissions, [protection rules](../56_protection_rulesets/index.mdx) and [audit logs](../14_audit_logs/index.mdx) apply to them as to any other call made with that person's token.

### Set the target

A workspace admin sets the target from `Workspace settings` -> `Dev workspace` -> `Deploy to another instance`:

- `Instance URL`: the root URL of the remote instance, without `/api`, for example `https://windmill.example.com`.
- `Workspace on that instance`: the ID of the workspace to deploy into, for example `prod`.

![Deploy to another instance setting](./remote_deploy_target_setting.webp 'Deploy to another instance setting')

`Remove target` clears the setting.
Changing the instance URL or the workspace drops every token stored for the previous target, so everyone connects again.

A workspace can have a target on another instance and a parent on this one at the same time: the drawer then lets you [choose the destination](#choosing-the-destination) of each deploy.

Windmill's server calls the remote instance on the deployer's behalf, so the remote must be reachable from this instance's servers, and it needs no CORS setup.
A self-hosted instance can target a URL on a private network.
On Windmill Cloud, the URL must resolve to a public address.
Redirects are not followed: if the URL redirects, for example from `http` to `https`, set the target to the URL it redirects to.

### Connect your account

Each person who deploys connects once per workspace, from the drawer.

![Connect to the remote instance](./remote_deploy_connect.webp 'Connect by signing in to the remote instance, or with a pasted token')

1. Click `Sign in to <host>`.
   A popup opens the remote instance's authorization page, after asking you to log in there if you are not already.
   If popups are blocked, the whole tab goes to the remote instance instead and comes back once you have authorized.
2. Check that the page names the instance you came from, the workspace, and your account on the remote, then click `Authorize`.
   You must be a member of that workspace on the remote instance.

![Authorize a deploy connection](./remote_deploy_authorize.webp 'Authorization page on the remote instance')

The remote instance issues a token limited to that one workspace, with your permissions in it, valid for up to 90 days.
It is listed in your account settings on the remote, labelled `remote-deploy:<host of this instance>`, where you can revoke it.
When it expires, connect again from the drawer.

Signing in needs the remote instance to run a Windmill version that has the authorization page.
With an older remote, or if you prefer, click `Paste a token instead` to open a token field.
Follow `Create a token on <host>` to [create a token](../59_user_tokens/index.mdx#create-a-token) in your account settings on the remote, paste it and click `Connect`.
Windmill checks the token against the remote instance before storing it.

Once connected, the drawer shows `Deploying as <your remote email> on <instance URL>`, and `Disconnect` forgets the token.

Stored tokens are encrypted with the workspace's [encryption key](../30_workspace_secret_encryption/index.mdx) and only ever sent to the target they were issued for.
A token is deleted when its owner is removed from this workspace or their account is deleted.
Connecting and deploying require your own session on this instance, or an unscoped [token](../59_user_tokens/index.mdx) for it: job, scoped and read-only tokens are refused.

### Deploy to the remote workspace

Once connected, the drawer works as for a workspace on the same instance, with every lookup made on the remote workspace: which dependencies already exist there, the diffs, the users offered by [run on behalf of](#run-on-behalf-of), and the protection rules of the target.

![Connected to the remote instance](./remote_deploy_connected.webp 'Connected to the remote instance')

If the remote instance rejects the stored token, for example because it was revoked or has expired, the drawer shows `Could not deploy to <workspace> on <host>` with the remote's reason.
Disconnect, then connect again.

The [shareable page](#shareable-page) works the same way: whoever opens it deploys with their own connection to the remote instance.

### Choosing the destination

When a workspace has both a parent workspace and a target on another instance, the drawer's `Destination` shows a toggle between the parent workspace and `<workspace> on <host>`.
Each side loads its own items, diffs and permissions.

### Limitations

Only the per-item deploy drawer and its shareable page deploy to another instance.
The fork [Compare & Deploy page](#merge-ui-for-merging-changes-done-in-workspace-forks) compares workspaces of the same instance.

## Upgrading from the deploy target setting

Before Windmill 1.776.0, the deployment target was named in a separate `Deployment UI` settings tab and could be any workspace you belonged to. That setting is gone: the target is the workspace's parent, and the tab is folded into `Workspace settings` -> [`Dev workspace`](../../advanced/26_dev_workspaces/index.mdx).

There is nothing to do. A `staging` workspace that was the only one deploying into `prod` becomes prod's [dev workspace](../../advanced/26_dev_workspaces/index.mdx) on upgrade, and `Deploy to staging/prod` behaves as before.

<details>
<summary>Rare cases where the pair did not convert</summary>

Both are named individually in the migration logs.

- **Several workspaces deployed into the same target.** Only one can be the dev workspace of a given parent, so each becomes a plain [fork](../../advanced/20_workspace_forks/index.mdx) instead. Their [`$workspace` job tags](../9_worker_groups/index.mdx#dynamic-tag) then resolve to the parent, and their [git sync](../../advanced/11_git_sync/index.mdx) deploys move to a `wm-fork/**` branch with no promotion mode.
- **The link could not be converted** (target missing or archived, self-reference, source already a fork of something else, cycle) and was dropped. Deploying reports `Deploy destination not set up`.

Either way the fix is one attach, as an admin of both workspaces: on the prod workspace, `Workspace settings` -> `Dev workspace` -> `Attach an existing workspace as dev`. The [environment label](../../advanced/26_dev_workspaces/index.mdx#environment-labels) is fixed once set, and the two [lock](../../advanced/26_dev_workspaces/index.mdx#locking-the-prod-workspace) toggles default to on, which is stricter than the old setup: turn them off to keep the previous behaviour.

A converted workspace is parent-managed, as [attaching a dev workspace](../../advanced/26_dev_workspaces/index.mdx#pairing-an-existing-workspace-as-dev) makes it, so its git sync promotion repositories are removed and automatic pull and fork PRs turned off. If the pair promoted through git rather than through this UI, keep the workspaces unrelated and use the [git promotion workflow](../../advanced/9_deploy_gh_gl/index.mdx), or a [one-off deploy into another workspace](#deploying-into-another-workspace).

`settings.yaml` no longer carries `deploy_to`. [`wmill sync pull`](../../advanced/3_cli/sync.mdx) stops emitting it, and a file that still has it is ignored on push, so committed settings files need no edit.

</details>

## Merge UI for merging changes done in workspace forks

A fork already deploys into the workspace it was forked from, so the per-item UI above needs no setup there. On top of it, a fork-specific Compare & Deploy page shows exactly the items that were modified, and lets you update the fork as well as deploy from it.

{/* TODO: replace merge_ui.png - it predates the page being renamed from "Merge workspaces" to "Compare & Deploy". New screenshot: the Compare & Deploy page of a fork, with the "Deploy to prod" / "Update current" direction toggle, the "merge: <fork> -> into: <parent>" destination badge in the header, and a few rows showing "N ahead", "New" and "Show diff". */}

![Merge UI](./merge_ui.png 'Merge UI')

Learn more about [merging forks through Merge UI](../../advanced/20_workspace_forks/index.mdx#merge-workspaces-from-the-ui-merge-ui)

### Deploying into another workspace

For a one-off migration into a workspace that is not the parent, the Compare & Deploy page accepts an arbitrary target: pick it from the destination badge in the merge header. Such a pair has no continuously tracked diff, so you first compute one over every item on both sides, and the comparison is one-way. See [merging into a workspace outside the lineage](../../advanced/20_workspace_forks/index.mdx#merging-into-a-workspace-outside-the-lineage).

### Workspace-specific resources and variables

From the Compare & Deploy page, you can mark a resource or variable as workspace-specific so each environment keeps its own value. A workspace-specific item is excluded from the diff entirely, so promoting code never overwrites the per-environment value. When the item exists on only one side, a strictly create-only "Create in \<other\>" action seeds a copy (including secrets) without overwriting an existing target. This is most useful with a [dev workspace](../../advanced/26_dev_workspaces/index.mdx) paired with a prod workspace.


## Run on behalf of

When deploying a script, flow, app, or trigger to another workspace, the **"run on behalf of"** selector lets you choose which user the item will execute as in the target workspace. This is useful for controlling execution permissions across environments.

There are three options:

- **Keep the target workspace's existing setting** — the item continues running as whatever user was previously configured in the target workspace. This is the default for items that already exist there.
- **Use yourself** — the item will run as your own user in the target workspace.
- **Pick any user from the target workspace** — select a specific user (e.g. a dedicated service account) for the item to run as.

Selecting a user other than yourself requires **admin** rights or membership in the **`wm_deployers`** group in the target workspace.

:::tip Virtual users for fine-grained permissions

For production workspaces, consider creating dedicated virtual users scoped to specific responsibilities. See [Permission compartmentalization with virtual users](../16_roles_and_permissions/index.mdx#permission-compartmentalization-with-virtual-users) for the recommended pattern.

For CLI / CI/CD deploys into multi-workspace setups, you can also pre-configure per-folder defaults so newly deployed items pick up the right owner automatically — see [per-folder ownership defaults](../../advanced/23_canonical_deployment_setups/index.mdx#stage-4--add-multi-workspace-promotion) in the Stage 4 setup.

:::
