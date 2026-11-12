---
slug: flow-timeout
version: v1.861.0
title: Flow-level timeout
tags: ['Flow editor']
description: A flow can carry a timeout, in seconds, for its whole run, counted from when it starts running and including time spent sleeping or waiting at an approval. Set it under Runtime > Execution policy > Timeout in the flow settings.
features:
  [
    'When the timeout is reached, the running steps are cancelled, the error handler runs if the flow has one, and the run ends as cancelled by timeout.',
    'A pending approval is abandoned, even with continue on disapproval/timeout set.',
    'The timeout also applies when the flow runs as a subflow step, unless the calling step sets its own.',
    'A subflow that times out appears to its caller as a failed step, handled like any step failure.',
  ]
docs: /docs/flows/custom_timeout#flow-timeout
---
