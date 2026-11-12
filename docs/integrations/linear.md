---
description: How do I connect Linear to Windmill? Manage Linear issues and projects from scripts and flows, react to Linear webhooks and combine Linear with Slack or GitHub.
---

import ResourceUsage from './_resource_usage.mdx';

# Linear integration

[Linear](https://linear.app/) is a project management tool for software development teams.

With a Linear resource, Windmill [scripts](../script_editor/index.mdx) and [flows](../flows/1_flow_editor.mdx) call the [Linear API](https://linear.app/developers) to create, update and query issues and projects.
To react to events in Linear, point a [Linear webhook](https://linear.app/developers/webhooks) at the [webhook](../core_concepts/4_webhooks/index.mdx) URL of a script or flow.
A flow can then pass the result to other integrations, for example [Slack](./slack.mdx) or [GitHub](./github.mdx).

To integrate Linear to Windmill, you need to save the following elements as a [resource](../core_concepts/3_resources_and_types/index.mdx).

![Add Linear Resource](../assets/integrations/add-linear.webp "Add Linear Resource")

| Property | Type   | Description                                                             | Default | Required | Where to Find                                                                                      |
| -------- | ------ | ----------------------------------------------------------------------- | ------- | -------- | -------------------------------------------------------------------------------------------------- |
| apiKey    | string | The API key for the Linear API.                              |   https://linear.app/settings/api      | false    |  |

<ResourceUsage name="Linear" hub="linear" />

