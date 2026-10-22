---
description: How do I set a default app in Windmill? Redirect members whose role cannot write code to a specific app on workspace login.
---

# Workspace default app

If configured, members whose [role](../../core_concepts/16_roles_and_permissions/index.mdx#workspace-roles) cannot write code in this workspace will be redirected to this app automatically when logging into this workspace. Workspace default app is a [Cloud plan & Self-Hosted Enterprise](/pricing) feature.

Make sure the default app is [shared with all those members](../../core_concepts/8_groups_and_folders/index.mdx) of this workspace before turning this feature on.

Set up the app from workspace settings:

![Set up default app](./set_default_app.png "Set up default app")

They will have it open right when logging into the workspace:

<video
	className="border-2 rounded-lg object-cover w-full h-full dark:border-gray-800"
	controls
	src="/videos/default_app_operator.mp4"
/>