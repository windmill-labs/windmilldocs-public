---
description: How do I set a timeout on a Windmill flow step or on a whole flow? Limit a step's execution time, or cap a run's wall-clock time including sleeps and approvals.
---

# Custom timeout for steps and flows

For each step can be defined a timeout. If the execution takes longer than the time limit, the execution of the step will be interrupted.

If defined, the custom timeout will be used instead of the instance timeout for the step (for self-hosted, defined by the [environment variable](../core_concepts/47_environment_variables/index.mdx) `TIMEOUT`).
The step's timeout cannot be greater than the instance maximum set by the `TIMEOUT` environment variable.

A timeout on a step running a script counts only the time that script's job runs.
To bound a whole run, use a [flow timeout](#flow-timeout).

<video
	className="border-2 rounded-lg object-cover w-full h-full dark:border-gray-800"
	autoPlay
	controls
	id="main-video"
	src="/videos/custom_timeout.mp4"
/>

## Flow timeout

A flow can also carry a timeout, in seconds, for the whole run, counted from when it starts running.
Time spent [sleeping](./15_sleep.md) or waiting at an [approval](./11_flow_approval.mdx) counts against it.
Set it in the flow settings, under Runtime > Execution policy > Timeout.
Unlike a step's timeout, a flow timeout is not bounded by the instance `TIMEOUT`.

When the timeout is reached, Windmill cancels the running steps, runs the flow's [error handler](./7_flow_error_handler.md) if it has one, and ends the run as cancelled by `timeout`, even if the error handler returns `recover: true`.
A pending approval is abandoned, even with [continue on disapproval/timeout](./11_flow_approval.mdx#continue-on-disapprovaltimeout) set.
The run can end up to about ten seconds after the deadline.

### Subflows

The timeout also applies when the flow runs as a [subflow](./1_flow_editor.mdx#subflows) step, and a timeout set on the calling step replaces it.
A subflow that times out fails that step.
