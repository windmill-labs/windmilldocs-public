---
slug: ai-decision-step
version: v1.824.0
title: AI decision flow step
tags: ['AI', 'Flow editor']
description: A new AI decision step asks a decision model, TypeSafe's Jev or Cloudflare's Clef on Workers AI, typed questions about a state and returns calibrated answers instead of text. Route on the answers with a Branch to one that the editor builds from the questions, or give the step to an AI agent as a tool.
features:
  [
    'Choice, score and yes/no questions, answered with the choice and its probabilities, a score on a scale, or the probability of yes.',
    'Later steps read results.<step>.output.<question>.choice, .score or .noul.',
    '"Branch on this question" in a question card, or "Branch on <question>" beside the step on the graph, inserts a Branch to one with one branch per option.',
    'As an AI agent tool, the calling model supplies the state and receives only the answers.',
    'TypeSafe and Cloudflare resources serve decision steps only.',
  ]
docs: /docs/flows/ai_decision
---
