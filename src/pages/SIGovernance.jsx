function LinkIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }}>
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
    </svg>
  );
}

export default function SIGovernance() {
  return (
    <div style={{ maxWidth: 860 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>Model Access & Governance</h2>
      <p style={{ color: '#64748b', fontSize: 15, marginBottom: 6, maxWidth: 780 }}>
        Snowflake Cortex provides two independent mechanisms to control which models users and roles can access.
      </p>
      <a href="https://docs.snowflake.com/en/user-guide/snowflake-cortex/aisql-privileges-and-access#control-model-access" target="_blank" rel="noreferrer" style={{ fontSize: 13, fontWeight: 600, color: '#29B5E8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', marginBottom: 32 }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
        Official Documentation<LinkIcon size={13} />
      </a>

      {/* Two Mechanisms */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
        {[
          {
            title: 'Account-Level Allowlist',
            body: 'Broad, account-wide control. Any model in the allowlist is accessible to all users by default — no RBAC check fires.',
            meta: ['Set by: ACCOUNTADMIN only', 'Scope: Entire account'],
            docHref: 'https://docs.snowflake.com/en/user-guide/snowflake-cortex/aisql-privileges-and-access#account-level-allowlist-parameter',
          },
          {
            title: 'Role-Based Access Control (RBAC)',
            body: 'Fine-grained, per-role control. Grants access to specific models for specific roles — including models not in the allowlist.',
            meta: ['Set by: ACCOUNTADMIN only', 'Scope: Per role'],
            docHref: 'https://docs.snowflake.com/en/user-guide/snowflake-cortex/aisql-privileges-and-access#role-based-access-control-rbac',
          },
        ].map(card => (
          <div key={card.title} style={{ flex: 1, minWidth: 280, border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '18px 20px', background: 'white' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>{card.title}</div>
            <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, marginBottom: 12 }}>{card.body}</div>
            {card.meta.map(m => (
              <div key={m} style={{ fontSize: 12, color: '#64748b', marginBottom: 2 }}>{m}</div>
            ))}
            <a href={card.docHref} target="_blank" rel="noreferrer" style={{ fontSize: 12, fontWeight: 600, color: '#29B5E8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', marginTop: 10 }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
              See docs<LinkIcon size={11} />
            </a>
          </div>
        ))}
      </div>

      {/* Combined: How they work + typical pattern */}
      <div style={{ border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '18px 20px', background: 'white', marginBottom: 32 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', marginBottom: 12 }}>How they work together</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { label: 'Allowlist = open access.', body: 'Models in the allowlist are accessible to everyone in the account — no RBAC needed. Use it for broadly-approved, cost-effective models (e.g. mistral-large2, llama3.1-8b) that all users should have by default.' },
            { label: 'RBAC = elevated access.', body: 'RBAC can grant access to models not in the allowlist. Use it to give specific roles — admins, data scientists, power users — access to premium or higher-capability models (e.g. claude-sonnet-4-6, llama3.1-405b).' },
            { label: 'They are parallel, not hierarchical.', body: 'Either mechanism can independently grant access. To enforce RBAC exclusively with no open baseline, set the allowlist to \'None\' and control everything through roles.' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#29B5E8', marginTop: 8, flexShrink: 0 }} />
              <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>
                <span style={{ fontWeight: 600, color: '#1e293b' }}>{item.label}</span>{' '}{item.body}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Worked Example */}
      <div style={{ border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '18px 20px', background: 'white', marginBottom: 8 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>Worked Example</div>
        <div style={{ fontSize: 13, color: '#64748b', marginBottom: 16, lineHeight: 1.5 }}>
          Allowlist = <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3, fontSize: 12 }}>mistral-large2</code> (open to everyone). Admin role has RBAC grant for <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3, fontSize: 12 }}>claude-sonnet-4-6</code>.
        </div>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          {[
            {
              label: 'Regular user (no special grants)',
              rows: [
                { ok: true, call: "AI_COMPLETE('mistral-large2', ...)", reason: 'In the allowlist — open to everyone.' },
                { ok: false, call: "AI_COMPLETE('claude-sonnet-4-6', ...)", reason: 'Not in allowlist, no RBAC grant.' },
              ],
            },
            {
              label: 'Admin (has RBAC grant)',
              rows: [
                { ok: true, call: "AI_COMPLETE('mistral-large2', ...)", reason: 'Still in allowlist — works for everyone.' },
                { ok: true, call: 'AI_COMPLETE(SNOWFLAKE.MODELS."CLAUDE-SONNET-4-6", ...)', reason: 'Not in allowlist, but RBAC grant covers it via qualified identifier.' },
              ],
            },
          ].map(col => (
            <div key={col.label} style={{ flex: 1, minWidth: 280, border: '1px solid #f1f5f9', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ background: '#f8fafc', padding: '10px 16px', borderBottom: '1px solid #f1f5f9', fontSize: 12, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{col.label}</div>
              <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.rows.map((row, i) => (
                  <div key={i} style={{ fontSize: 12, color: '#475569', lineHeight: 1.5 }}>
                    <div style={{ marginBottom: 3 }}>
                      <span style={{ fontWeight: 700, color: row.ok ? '#16a34a' : '#dc2626' }}>{row.ok ? '✓' : '✗'}</span>{' '}
                      <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3, fontSize: 11 }}>{row.call}</code>
                    </div>
                    <div style={{ color: '#64748b', paddingLeft: 14 }}>{row.reason}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
