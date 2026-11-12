---
slug: vault-secret-references
version: v1.856.0
title: Vault secret references
tags: ['Enterprise', 'Instance settings']
description: A variable can read its value from an existing HashiCorp Vault secret instead of storing a copy in Windmill. Only the reference is stored, and the value is read from Vault on every access.
features:
  [
    'New Vault reference type for variables, with a Vault path and an optional key; without a key, the whole secret is read as a JSON object.',
    'Superadmins allow Vault path prefixes per workspace from Instance settings > Secret Storage > External secret references.',
    'References reuse the Vault secret backend connection or use their own, with AppRole, JWT auth or a static token.',
    'AppRole authentication for the Vault secret backend, with the secret_id read from the VAULT_APPROLE_SECRET_ID environment variable.',
  ]
docs: /docs/core_concepts/variables_and_secrets#vault-secret-references
---
