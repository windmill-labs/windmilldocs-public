---
slug: ai-agent-tool-approval
version: v1.850.0
title: Tool approval and questions for AI agents
tags: ['AI', 'Flow editor']
description: AI agents can now wait for a person without holding a worker. A script, flow or MCP tool can require approval before it runs, and the built-in Ask a question tool lets the agent ask for a choice or missing information, answered from the run page or the chat.
features:
  [
    'Turn on Require approval in a tool settings tab: the call waits until someone approves or rejects it, and a rejected call, or one unanswered within 30 minutes, reaches the model as not run.',
    'The Ask a question tool can offer single or multiple choices, and a free-text answer is always possible.',
    'While it waits, the agent releases its worker and resumes where it stopped once answered.',
  ]
docs: /docs/core_concepts/ai_agents#require-approval
---
