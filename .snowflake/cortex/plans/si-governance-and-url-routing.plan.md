# Plan: Snowflake Intelligence + URL Routing

## Overview
Add a new "Snowflake Intelligence" section to the app with a Governance deep-dive page, and implement hash-based URL routing so every page has a shareable URL.

## Task 1 — Hash-based URL Routing in App.jsx

Replace `useState('home')` with hash-driven state:

```js
const getPageFromHash = () => {
  const hash = window.location.hash.replace('#', '');
  return (hash && PAGES[hash]) ? hash : 'home';
};

const [page, setPage] = useState(getPageFromHash);

const navigate = (newPage) => {
  window.location.hash = newPage === 'home' ? '' : newPage;
  setPage(newPage);
};

useEffect(() => {
  const handler = () => setPage(getPageFromHash());
  window.addEventListener('hashchange', handler);
  return () => window.removeEventListener('hashchange', handler);
}, []);
```

Pass `navigate` instead of `setPage` to all components. This gives URLs like:
- `https://...github.io/snowflake-field-guide/#iceberg-storage`
- `https://...github.io/snowflake-field-guide/#si-governance`

## Task 2 — Home.jsx Card
Add card:
```js
{ id: 'si', title: 'Snowflake Intelligence', description: 'Governance, model access, and configuration for Snowflake AI products.', color: '#7c3aed' }
```

## Task 3 — SnowflakeIntelligence.jsx
Simple landing page with sub-topic cards (just "Governance" for now), following same pattern as IcebergDetail.jsx.

## Task 4 — SIGovernance.jsx content

### Sections:
1. **Intro callout** — link to official docs
2. **Two Mechanisms** — side-by-side: Allowlist vs RBAC overview
3. **Allowlist parameter** — what it is, SQL examples (`ALTER ACCOUNT SET CORTEX_MODELS_ALLOWLIST`), note ACCOUNTADMIN only, note it's account-wide
4. **RBAC** — setup steps (CORTEX_BASE_MODELS_REFRESH, SHOW MODELS, GRANT APPLICATION ROLE), SQL examples
5. **How They Work Together** — key insight box:
   - Allowlist = broad, string-matched access. If model name string is in the allowlist, anyone can use it — no RBAC check fires
   - RBAC = fine-grained, role-specific access. Can grant access to models NOT in the allowlist
   - They are parallel/additive, not one overriding the other
   - To use RBAC exclusively: `SET CORTEX_MODELS_ALLOWLIST = 'None'`
6. **Typical Pattern callout** (what the user described):
   - Set allowlist to affordable/base models everyone should access (e.g. mistral-large2, llama3.1-8b)
   - Use RBAC to grant access to premium/restricted models for specific roles (admins, power users)
7. **Worked Example** — concrete scenario with SQL showing:
   - Allowlist = `'mistral-large2'` (everyone gets this)
   - Admin role gets RBAC access to `LLAMA3.1-405B` and `claude-sonnet-4-6`
   - Show what works/fails for a normal user vs admin
8. **Common Pitfalls** from docs

## Task 5 — Register routes
```js
si: { label: 'Snowflake Intelligence', component: SnowflakeIntelligence },
'si-governance': { label: 'Model Access & Governance', component: SIGovernance },
```
Breadcrumbs:
- `si`: Home → Snowflake Intelligence
- `si-governance`: Home → Snowflake Intelligence → Model Access & Governance
