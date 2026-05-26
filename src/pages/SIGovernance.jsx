import { useState } from 'react';

function LinkIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }}>
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
    </svg>
  );
}

function CodeBlock({ code, label }) {
  return (
    <div style={{ marginBottom: label ? 4 : 0 }}>
      {label && <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#94a3b8', marginBottom: 6 }}>{label}</div>}
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '14px 18px', borderRadius: 10, fontSize: 12, lineHeight: 1.8, margin: 0, overflow: 'visible', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {code}
      </pre>
    </div>
  );
}

function SectionHeader({ title, sub }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1e293b', margin: 0 }}>{title}</h3>
      {sub && <p style={{ fontSize: 14, color: '#64748b', margin: '4px 0 0', lineHeight: 1.6 }}>{sub}</p>}
    </div>
  );
}

export default function SIGovernance() {
  const [openPitfall, setOpenPitfall] = useState(null);

  const pitfalls = [
    {
      title: 'Secondary roles can obscure permissions',
      body: 'If a user has ACCOUNTADMIN as a secondary role, all model objects may appear accessible. Disable secondary roles temporarily when verifying permissions: USE SECONDARY ROLES NONE;',
    },
    {
      title: 'Model access ≠ feature access',
      body: 'Allowlist and RBAC only govern which models can be used. Features like AI_COMPLETE still require the CORTEX_USER (or AI_FUNCTIONS_USER) database role AND the USE AI FUNCTIONS account-level privilege.',
    },
    {
      title: 'SNOWFLAKE.MODELS is not auto-populated',
      body: 'You must call CALL SNOWFLAKE.MODELS.CORTEX_BASE_MODELS_REFRESH() before using RBAC. Run it again when new models are released to keep the schema current. It is safe to run multiple times — no duplicates are created.',
    },
    {
      title: 'Qualified identifiers are case-sensitive',
      body: 'Model object identifiers in SNOWFLAKE.MODELS are quoted and therefore case-sensitive. SNOWFLAKE.MODELS."LLAMA3.1-70B" works; SNOWFLAKE.MODELS."llama3.1-70b" does not. The simple string shorthand (e.g. \'llama3.1-70b\') is auto-upcased for you.',
    },
    {
      title: 'Access does not guarantee availability',
      body: 'A model may be accessible per allowlist/RBAC but still unavailable due to cross-region routing, deprecation, or capacity constraints. These errors can look similar to access errors.',
    },
  ];

  return (
    <div style={{ maxWidth: 900 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>Model Access & Governance</h2>
      <p style={{ color: '#64748b', fontSize: 15, marginBottom: 12, maxWidth: 780 }}>
        Snowflake Cortex provides two independent mechanisms to control which models users and roles can access.
      </p>
      <a href="https://docs.snowflake.com/en/user-guide/snowflake-cortex/aisql-privileges-and-access#control-model-access" target="_blank" rel="noreferrer" style={{ fontSize: 13, fontWeight: 600, color: '#29B5E8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', marginBottom: 28 }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
        Official Documentation<LinkIcon size={13} />
      </a>

      {/* Two Mechanisms Overview */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 40, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 280, border: '2px solid #29B5E8', borderRadius: 12, padding: '18px 20px', background: '#f0fbff' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#0e7490', marginBottom: 8 }}>Account-Level Allowlist</div>
          <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, marginBottom: 10 }}>
            Broad, account-wide control. Any model in the allowlist is accessible to <strong>all users</strong> by default — no RBAC check fires.
          </div>
          <div style={{ fontSize: 12, color: '#0e7490', fontWeight: 600 }}>Set by: ACCOUNTADMIN only</div>
          <div style={{ fontSize: 12, color: '#0e7490', fontWeight: 600 }}>Scope: Entire account</div>
        </div>
        <div style={{ flex: 1, minWidth: 280, border: '2px solid #7c3aed', borderRadius: 12, padding: '18px 20px', background: '#faf5ff' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#6d28d9', marginBottom: 8 }}>Role-Based Access Control (RBAC)</div>
          <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, marginBottom: 10 }}>
            Fine-grained, per-role control. Grants access to specific models for specific roles — including models <strong>not</strong> in the allowlist.
          </div>
          <div style={{ fontSize: 12, color: '#6d28d9', fontWeight: 600 }}>Set by: ACCOUNTADMIN only</div>
          <div style={{ fontSize: 12, color: '#6d28d9', fontWeight: 600 }}>Scope: Per role</div>
        </div>
      </div>

      {/* How They Work Together */}
      <div style={{ padding: '16px 20px', background: '#fefce8', border: '1.5px solid #fde68a', borderRadius: 12, marginBottom: 40 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#92400e', marginBottom: 12 }}>How the two mechanisms work together</div>
        <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.7, marginBottom: 12 }}>
          When a user calls an AI function with a model name (e.g. <code style={{ background: '#fef08a', padding: '1px 5px', borderRadius: 3, fontSize: 12 }}>AI_COMPLETE('mistral-large2', ...)</code>), Snowflake uses this lookup order:
        </div>
        <ol style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, margin: '0 0 16px' }}>
          {[
            { n: '1', text: 'Look for a matching model object in SNOWFLAKE.MODELS. If found → apply RBAC.' },
            { n: '2', text: 'If no model object found → check the account-level allowlist. If the string matches → allow.' },
            { n: '3', text: 'If neither → deny.' },
          ].map(s => (
            <li key={s.n} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', flexShrink: 0, background: '#f59e0b', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, marginTop: 1 }}>{s.n}</div>
              <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>{s.text}</div>
            </li>
          ))}
        </ol>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ padding: '10px 14px', background: 'white', border: '1.5px solid #fde68a', borderRadius: 8, fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
            <span style={{ fontWeight: 700, color: '#92400e' }}>Allowlist = open access.</span>{' '}
            Models in the allowlist are accessible by simple string name to <em>everyone</em>, no RBAC needed. If you want to restrict access to a model, keep it out of the allowlist and use RBAC instead.
          </div>
          <div style={{ padding: '10px 14px', background: 'white', border: '1.5px solid #fde68a', borderRadius: 8, fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
            <span style={{ fontWeight: 700, color: '#92400e' }}>RBAC = elevated access.</span>{' '}
            RBAC can grant access to models that are <em>not</em> in the allowlist. A role with the right application role can use a model via its qualified identifier even when the allowlist wouldn't allow it.
          </div>
          <div style={{ padding: '10px 14px', background: 'white', border: '1.5px solid #fde68a', borderRadius: 8, fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
            <span style={{ fontWeight: 700, color: '#92400e' }}>They are parallel, not hierarchical.</span>{' '}
            Either mechanism can independently grant access. To enforce RBAC exclusively with no open baseline, set <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3, fontSize: 11 }}>CORTEX_MODELS_ALLOWLIST = 'None'</code> and grant model access entirely through roles.
          </div>
        </div>
      </div>

      {/* Typical Pattern */}
      <div style={{ padding: '16px 20px', background: '#f0fdf4', border: '1.5px solid #16a34a40', borderRadius: 12, marginBottom: 40 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#15803d', marginBottom: 10 }}>Typical pattern in practice</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#16a34a', marginTop: 7, flexShrink: 0 }} />
            <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>
              <span style={{ fontWeight: 600 }}>Allowlist → baseline access.</span> Set the allowlist to smaller, cost-effective, broadly-approved models that everyone in the account should be able to use (e.g. <code style={{ background: '#dcfce7', padding: '1px 5px', borderRadius: 3, fontSize: 11 }}>mistral-large2</code>, <code style={{ background: '#dcfce7', padding: '1px 5px', borderRadius: 3, fontSize: 11 }}>llama3.1-8b</code>). No per-role configuration needed.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#16a34a', marginTop: 7, flexShrink: 0 }} />
            <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>
              <span style={{ fontWeight: 600 }}>RBAC → elevated access.</span> Grant premium or higher-capability models (e.g. <code style={{ background: '#dcfce7', padding: '1px 5px', borderRadius: 3, fontSize: 11 }}>claude-sonnet-4-6</code>, <code style={{ background: '#dcfce7', padding: '1px 5px', borderRadius: 3, fontSize: 11 }}>llama3.1-405b</code>) only to specific roles such as admins, data scientists, or power users who need them.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#16a34a', marginTop: 7, flexShrink: 0 }} />
            <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>
              <span style={{ fontWeight: 600 }}>Lockdown mode.</span> Set allowlist to <code style={{ background: '#dcfce7', padding: '1px 5px', borderRadius: 3, fontSize: 11 }}>'None'</code> and control everything through RBAC for maximum governance.
            </div>
          </div>
        </div>
      </div>

      {/* Account-Level Allowlist */}
      <div style={{ marginBottom: 40 }}>
        <SectionHeader title="Account-Level Allowlist" sub="CORTEX_MODELS_ALLOWLIST — set by ACCOUNTADMIN via ALTER ACCOUNT. Controls which models are open to all users by string name." />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <CodeBlock label="Allow all models (default behavior)" code={`ALTER ACCOUNT SET CORTEX_MODELS_ALLOWLIST = 'All';`} />
          <CodeBlock label="Allow specific models only (open to everyone in the account)" code={`ALTER ACCOUNT SET CORTEX_MODELS_ALLOWLIST = 'mistral-large2,llama3.1-8b';`} />
          <CodeBlock label="Lock down allowlist — use RBAC exclusively" code={`ALTER ACCOUNT SET CORTEX_MODELS_ALLOWLIST = 'None';`} />
        </div>
        <div style={{ marginTop: 12, padding: '10px 14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 12, color: '#475569', lineHeight: 1.5 }}>
          Model names are case-sensitive and must be lowercase: <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3, fontSize: 11 }}>'mistral-large2'</code> ✓ &nbsp;|&nbsp; <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3, fontSize: 11 }}>'MISTRAL-LARGE2'</code> ✗
        </div>
      </div>

      {/* RBAC Setup */}
      <div style={{ marginBottom: 40 }}>
        <SectionHeader title="RBAC Setup" sub="Model objects live in SNOWFLAKE.MODELS. You must refresh them before granting access." />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <CodeBlock label="Step 1 — Populate SNOWFLAKE.MODELS (safe to run anytime, no duplicates)" code={`USE ROLE ACCOUNTADMIN;\nCALL SNOWFLAKE.MODELS.CORTEX_BASE_MODELS_REFRESH();`} />
          <CodeBlock label="Step 2 — Verify models and application roles were created" code={`SHOW MODELS IN SNOWFLAKE.MODELS;\nSHOW APPLICATION ROLES IN APPLICATION SNOWFLAKE;`} />
          <CodeBlock label="Step 3a — Grant access to a specific model for a role" code={`GRANT APPLICATION ROLE SNOWFLAKE."CORTEX-MODEL-ROLE-LLAMA3.1-405B"\n  TO ROLE my_admin_role;`} />
          <CodeBlock label="Step 3b — Grant access to ALL current models for a role" code={`GRANT APPLICATION ROLE SNOWFLAKE."CORTEX-MODEL-ROLE-ALL"\n  TO ROLE my_superuser_role;`} />
        </div>
      </div>

      {/* Worked Example */}
      <div style={{ marginBottom: 40 }}>
        <SectionHeader title="Worked Example" sub="Allowlist covers the baseline. RBAC extends access for privileged roles." />
        <CodeBlock
          label="Setup"
          code={`USE ROLE ACCOUNTADMIN;\n\n-- Step 1: Set allowlist — mistral-large2 open to everyone\nALTER ACCOUNT SET CORTEX_MODELS_ALLOWLIST = 'mistral-large2';\n\n-- Step 2: Refresh model objects for RBAC\nCALL SNOWFLAKE.MODELS.CORTEX_BASE_MODELS_REFRESH();\n\n-- Step 3: Grant claude-sonnet-4-6 access to admins only via RBAC\nGRANT APPLICATION ROLE SNOWFLAKE."CORTEX-MODEL-ROLE-CLAUDE-SONNET-4-6"\n  TO ROLE admin_role;`}
        />
        <div style={{ marginTop: 16, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 280, border: '1.5px solid #16a34a40', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ background: '#f0fdf4', padding: '10px 16px', borderBottom: '1px solid #16a34a20', fontSize: 13, fontWeight: 700, color: '#15803d' }}>Regular user (no special grants)</div>
            <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.5 }}>
                <span style={{ color: '#16a34a', fontWeight: 700 }}>✓ Works</span> — <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3, fontSize: 11 }}>AI_COMPLETE('mistral-large2', ...)</code>
                <div style={{ color: '#64748b', marginTop: 2 }}>Model is in the allowlist — no RBAC check needed.</div>
              </div>
              <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.5 }}>
                <span style={{ color: '#ef4444', fontWeight: 700 }}>✗ Fails</span> — <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3, fontSize: 11 }}>AI_COMPLETE('claude-sonnet-4-6', ...)</code>
                <div style={{ color: '#64748b', marginTop: 2 }}>Not in allowlist, role has no RBAC grant.</div>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 280, border: '1.5px solid #7c3aed40', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ background: '#faf5ff', padding: '10px 16px', borderBottom: '1px solid #7c3aed20', fontSize: 13, fontWeight: 700, color: '#6d28d9' }}>Admin (has RBAC grant)</div>
            <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.5 }}>
                <span style={{ color: '#16a34a', fontWeight: 700 }}>✓ Works</span> — <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3, fontSize: 11 }}>AI_COMPLETE('mistral-large2', ...)</code>
                <div style={{ color: '#64748b', marginTop: 2 }}>Still in allowlist — works for everyone.</div>
              </div>
              <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.5 }}>
                <span style={{ color: '#16a34a', fontWeight: 700 }}>✓ Works</span> — <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3, fontSize: 11 }}>AI_COMPLETE(SNOWFLAKE.MODELS."CLAUDE-SONNET-4-6", ...)</code>
                <div style={{ color: '#64748b', marginTop: 2 }}>Not in allowlist, but role has RBAC grant — RBAC takes over via qualified identifier.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Common Pitfalls */}
      <div style={{ marginBottom: 8 }}>
        <SectionHeader title="Common Pitfalls" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {pitfalls.map((p, i) => (
            <div key={i} style={{ border: '1.5px solid #e2e8f0', borderRadius: 10, overflow: 'hidden', background: 'white' }}>
              <div
                onClick={() => setOpenPitfall(openPitfall === i ? null : i)}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', cursor: 'pointer', userSelect: 'none' }}
              >
                <span style={{ color: '#ef4444', fontSize: 14 }}>{openPitfall === i ? '▾' : '▸'}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{p.title}</span>
              </div>
              {openPitfall === i && (
                <div style={{ padding: '0 16px 14px 38px', fontSize: 13, color: '#475569', lineHeight: 1.6 }}>
                  {p.body}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
