---
description: How do I configure an error handler step to catch and process errors in Windmill flows?
---

# Error handler

The error handler is a special flow step that is executed when an error occurs in the flow.

If defined, the error handler will take as input the result of the step that errored (which has its error in the 'error field').

<video
    className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
    autoPlay
    loop
    controls
    id="main-video"
    src="/videos/error_handler.mp4"
/>

<br/>

Steps are retried until they succeed, or until the maximum number of retries defined for that spec is reached, at which point the error handler is called.

## Mark the flow as successful

A flow whose error handler ran still ends as failed, even when the error handler itself succeeds.
When the error handler is the intended recovery path, have it return an object with `recover: true`:

```ts
export async function main(message: string, name: string, step_id: string) {
	// e.g. reassign the ticket to a human and log the outcome
	return { message, step_id, recover: true };
}
```

The flow then ends as a success instead of a failure.
This also holds when the failing step is inside a [loop](./12_flow_loops.md), a [branch](./13_flow_branches.md) or a [subflow](./1_flow_editor.mdx#subflows).

`recover` only changes the final status: the same steps run as without it.
A sequential loop still stops at the failed iteration, while a loop that [skips failures](./12_flow_loops.md#skip-failure) or a step with ["Continue on error"](./14_retries.md#continue-on-error-with-error-as-steps-return) still carries on.
One exception keeps the flow failed: a failure nested deeper inside an iteration of a [parallel loop](./12_flow_loops.md#run-in-parallel), such as a sequential loop inside a parallel loop, still fails that parallel loop.

The Python and TypeScript error handler templates return `recover: false`.
Change it to `true`, or compute it, to decide per run whether the flow counts as recovered.

You can write error handler scripts in:

- [Python](../getting_started/0_scripts_quickstart/2_python_quickstart/index.mdx)
- [TypeScript](../getting_started/0_scripts_quickstart/1_typescript_quickstart/index.mdx)
- [Go](../getting_started/0_scripts_quickstart/3_go_quickstart/index.mdx)

On the Hub, two examples of error handlers are provided:

- [Slack error handler](https://hub.windmill.dev/scripts/slack/1525/send-error-to-slack-channel-slack): sends a message to a Slack channel when an error occurs.
- [Discord error handler](https://hub.windmill.dev/scripts/discord/1523/send-the-error-to-discord-discord): sends a message to a Discord channel when an error occurs.

:::info Example

For instance, when building a workflow to [automatically populate a CRM details from an email](https://www.windmill.dev/blog/automatically-populate-crm), it was decided to set an Error handler to still add the email on the CRM in case of error and not lose the contact's email.

<br/>

![Error handler Example](../assets/flows/error_handler_example.png.webp)

:::
