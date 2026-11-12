---
description: How do I connect MS SQL Server to Windmill? Query and manage SQL Server databases from scripts and flows.
---

# MS SQL integration

[MS SQL](https://www.microsoft.com/sql-server/sql-server-downloads) is a database management system.

Windmill provides a framework to support MS SQL databases, either with native SQL scripts or through TypeScript for raw queries.

![Integration between MS SQL and Windmill](../assets/integrations/windmill_and_mssql.webp 'Connect a MS SQL instance with Windmill')

## Authentication methods

Windmill supports multiple authentication methods for MS SQL Server:

- **Username/Password**: Standard SQL Server authentication
- **Azure AD (Entra)**: OAuth-based authentication for Azure-hosted databases
- **Azure workload identity**: the worker authenticates as its own managed identity on AKS, with no password stored in the resource
- **Windows Integrated Authentication**: Kerberos-based authentication for Active Directory environments

For detailed setup instructions, including Windows Integrated Authentication configuration, refer to the [SQL Getting started section](../getting_started/0_scripts_quickstart/5_sql_quickstart/index.mdx#ms-sql).

---

## Azure workload identity for Azure SQL

On AKS, workers can authenticate to [Azure SQL](https://learn.microsoft.com/en-us/azure/azure-sql/database/authentication-aad-overview) as their own [workload identity](https://learn.microsoft.com/en-us/azure/aks/workload-identity-overview) instead of with a password or a manually issued AAD token. The pod's projected service account token is exchanged with Microsoft Entra ID for a short-lived access token, so no credential is stored in the resource and none expires in it.

### Setup

1. **Give the worker a workload identity.** Enable the OIDC issuer and the workload identity add-on on the cluster, create a user-assigned managed identity, and add a federated credential binding it to the worker's Kubernetes service account:

```bash
az identity federated-credential create \
  --name windmill-worker \
  --identity-name <managed-identity-name> \
  --resource-group <resource-group> \
  --issuer "$(az aks show -n <cluster> -g <resource-group> --query oidcIssuerProfile.issuerUrl -o tsv)" \
  --subject "system:serviceaccount:<namespace>:<worker-service-account>" \
  --audience api://AzureADTokenExchange
```

Annotate the service account with `azure.workload.identity/client-id: <client-id>` and label the worker pods with `azure.workload.identity/use: "true"`. The webhook then injects `AZURE_TENANT_ID`, `AZURE_CLIENT_ID`, `AZURE_FEDERATED_TOKEN_FILE` and `AZURE_AUTHORITY_HOST` into the worker, which is where Windmill reads the identity from. Nothing about the identity is configured on the resource, so a worker reaching two databases as two different identities needs two [worker groups](../core_concepts/9_worker_groups/index.mdx).

2. **Create the database user.** Connect to the database as an Entra administrator and map the managed identity:

```sql
CREATE USER [<managed-identity-name>] FROM EXTERNAL PROVIDER;
ALTER ROLE db_datareader ADD MEMBER [<managed-identity-name>];
```

3. **Create an `ms_sql_server` resource with `ms_entraid` as the password.** That value is a sentinel rather than a real password: it tells the worker to authenticate as its workload identity. Leave `user` and `aad_token` empty.

```json
{
  "host": "myserver.database.windows.net",
  "port": 1433,
  "dbname": "mydb",
  "password": "ms_entraid",
  "encrypt": true,
  "trust_cert": false
}
```

The job logs state `Using Azure Workload Identity` along with the client id whenever the sentinel takes effect. A resource whose password happens to be literally `ms_entraid` is treated the same way, so pick a different password if that ever collides.