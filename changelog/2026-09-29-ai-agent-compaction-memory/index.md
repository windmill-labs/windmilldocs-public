---
slug: ai-agent-compaction-memory
title: Compaction memory for AI agents
tags: ['AI', 'Flow editor']
version: v1.820.0
description: "An AI agent can now keep its whole conversation: as it nears the model's context window, the older part is summarized instead of dropped. The run details still show every message and tool result. Chat mode turns this on by default, and steps already set to Last messages keep it."
features:
  [
    'Compaction memory keeps the whole conversation and summarizes its older part as it nears the context window.',
    'The context window comes from the model, with 128K tokens for an unrecognized model; set Context window under the memory setting for a custom model.',
    'Enabling chat mode turns managed memory on, with compaction.',
    'Each step keeps up to 100KB of memory, unless instance object storage is configured (Enterprise Edition).',
  ]
docs: /docs/core_concepts/ai_agents#memory-auto--manual
---
