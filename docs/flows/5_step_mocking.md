---
description: How do I mock a flow step or pin a previous result to skip computation in Windmill?
---

# Step mocking / Pin result

Step mocking and pinning results allows faster iteration while building flows. When a step is mocked or pinned, it will immediately return the specified value without performing any computation, in [test runs only or in every run](#test-runs-or-every-run).

<iframe
	style={{ aspectRatio: '16/9' }}
	src="https://www.youtube.com/embed/-cATEh8saqU"
	title="YouTube video player"
	frameBorder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
	allowFullScreen
	className="border-2 rounded-lg object-cover w-full dark:border-gray-800"
></iframe>

<br/>

## Mocking vs Pinning

There are two ways to control step execution:

1. **Mocking**: Set a custom return value that will be used instead of running the step.
2. **Pinning**: Use a previous successful run result as the return value.

## Accessing step results

You can access and manage step results in two ways:
1. Directly by clicking on the step bottom arrow in the flow view for quick access.

![Bottom arrow](../assets/flows/bottom_arrow.webp "Bottom arrow")

2. From the step's `Test this step` menu.

![Test this step](../assets/flows/test_this_step.webp "Test this step")

## Features

### History exploration
- Use the history button to explore previous step results.
- View and select from past successful runs.
- Imported flows and scripts retain their run history.

### Pinning results

Pin any successful run result to reuse it.

![Pin result](../assets/flows/pin_result.webp "Pin result")

You can edit pinned data by overriding pin functionality (you can still test the step).

  ![Override pin](../assets/flows/override_pin.webp "Override pin")

### Mocking

You can also edit the mocked value directly.

  ![Direct editing](../assets/flows/direct_editing.webp "Direct editing")
  
[Test step](./18_test_flows.mdx) functionality remains available even with pinned results.

### Test runs or every run

A pin or mock applies either to test runs only or to every run.
Choose it with "Applies to" in the step's mock settings, or from the pin button's menu.

- Test runs: only runs started from the flow editor ([testing flows](./18_test_flows.mdx)) use the pinned value, including the subflows they call. Runs of the deployed flow ([schedules](../core_concepts/1_scheduling/index.mdx), [triggers](../triggers/index.mdx), [webhooks](../core_concepts/4_webhooks/index.mdx), the API, restarts of a deployed run) execute the step.
- Every run: deployed runs also return the pinned value.

A step pinned for the first time applies to test runs, so you can deploy a flow without the pin taking over production runs.

In the [flow YAML](../openflow/index.mdx), this is the `preview_only` key of the step's `mock`:

```yaml
mock:
  enabled: true
  return_value:
    foo: bar
  preview_only: true # absent or false: every run
```

:::tip Cache for steps

The [cache for steps feature](./4_cache.mdx) allows you to cache the results of a step for a specified number of seconds, thereby reducing the need for redundant computations when re-running the same step with identical input.

:::
