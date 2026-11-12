---
slug: instance-groups-linked-to-idp-groups
version: v1.861.0
title: Instance groups linked to IdP groups without SCIM
tags: ['Enterprise', 'SAML', 'Groups', 'Access control']
description: A superadmin can link an instance group to an IdP group by group id or full path, and each SAML or OIDC login then adds or removes the user from the groups claim, without SCIM.
features:
  [
    'Link an instance group to an IdP group from "Link to an IdP group", by group id or full path such as /operators/network-team.',
    'Each SSO login adds the user to the linked groups named in the groups claim and removes them from the others.',
    'Works with the groups claim of OIDC and SAML logins, set with the "SSO groups claim" instance setting.',
    'SCIM-provisioned groups keep the IdP group SCIM records.',
  ]
docs: /docs/advanced/saml_and_scim#linking-an-instance-group-to-an-idp-group
---
