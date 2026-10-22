---
slug: operator-builder-rights
title: Operator builder rights for flows and full-code apps
tags: ['Workspace', 'Flow editor', 'App editor']
version: v1.830.0
description: Two new toggles in the operator settings of a workspace let operators build flows and full-code apps on top of scripts and flows that are already deployed. Operators still cannot write backend scripts. Each right is granted independently, and granting either one makes the workspace's operators consume a full seat instead of half a seat.
features:
  [
    '"Operators can build flows": operators create, edit and delete flows whose steps all reference existing workspace scripts or flows. Inline scripts and Hub runnables are refused.',
    '"Operators can build full-code apps": operators write the frontend code of full-code apps whose backend runnables are existing workspace scripts or flows they can read. Low-code apps stay closed.',
    'Full-code apps built by operators always run with sandbox isolation on, isolated from each viewer''s Windmill session.',
    'Operators only write where their folder permissions already allow it.',
    'Granting either right makes every operator of the workspace a full seat; granting both costs the same as granting one.',
  ]
docs: /docs/core_concepts/roles_and_permissions#capabilities
---
