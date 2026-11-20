---
slug: test-flows-from-the-sdks
title: Test flows from the SDKs with mocked or replaced steps
version: v1.880.0
tags: ['Flow editor', 'TypeScript', 'Python']
description: Test scripts can run a deployed flow with some steps overridden, using wmill.testFlow (TypeScript) or wmill.test_flow (Python). An override mocks a step's result or replaces its logic with a function of the test script, steps inside subflows included.
features:
  [
    'Map a step id to a value to mock its result, or to a function exported from the test script to run that function with the step inputs.',
    'Name a step inside a subflow by the path of step ids to it, such as sub:inner, at any depth.',
    'testFlowAsync and test_flow_async return the job id instead of waiting for the result.',
    'Requires a role with the Write code capability; replacing a step with a function only works from a script running in Windmill.',
    "The flow's preprocessor does not run and result caching is off for the test run.",
  ]
docs: /docs/flows/test_flows#test-a-deployed-flow-from-a-script
---
