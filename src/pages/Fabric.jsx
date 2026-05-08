function LinkIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }}>
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
    </svg>
  );
}

export default function Fabric() {
  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>
        <a href="https://www.microsoft.com/en-us/microsoft-fabric" target="_blank" rel="noreferrer" style={{ color: '#29B5E8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
          Microsoft Fabric <LinkIcon size={16} />
        </a>
        <span style={{ fontSize: 14, fontWeight: 400, color: '#64748b', marginLeft: 12 }}>vs Snowflake</span>
      </h2>
      <p style={{ color: '#64748b', fontSize: 14, marginBottom: 28 }}>
        Unified analytics platform built on Azure — OneLake, Power BI, Data Factory, and Spark in one SaaS bill.
      </p>

      <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '24px', marginBottom: 20 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', margin: '0 0 16px' }}>What is Fabric?</h3>
        <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.7, margin: '0 0 12px' }}>
          Microsoft Fabric is a <strong>unified SaaS analytics platform</strong> that bundles data engineering (Spark), data warehousing, real-time analytics, Data Factory, and Power BI under a single capacity-based licence. Storage lives in <strong>OneLake</strong> (a single logical data lake per tenant using Delta Lake format).
        </p>
        <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.7, margin: 0 }}>
          It's Microsoft's answer to the "modern data stack" — instead of stitching together separate services, you get one portal, one billing model, and native integration with Azure AD, Microsoft 365, and Purview governance.
        </p>
      </div>

      <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '24px', marginBottom: 20 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', margin: '0 0 16px' }}>Where Snowflake Wins</h3>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 20 }}>
          {[
            { title: 'True Multi-Cloud', desc: 'Snowflake runs natively on AWS, Azure, and GCP with cross-cloud replication. Fabric is Azure-only.' },
            { title: 'Workload Isolation', desc: 'Independent virtual warehouses mean one team\'s heavy query never impacts another. Fabric shares capacity units across all workloads.' },
            { title: 'Concurrency & Scaling', desc: 'Snowflake auto-scales compute clusters independently. Fabric capacity is a shared pool — contention is real under load.' },
            { title: 'Mature Data Sharing', desc: 'Snowflake Marketplace and secure data sharing are production-proven at scale. Fabric sharing is still maturing.' },
            { title: 'No Vendor Lock-in', desc: 'Snowflake works with any BI tool, any cloud, any orchestrator. Fabric pulls you deeper into Microsoft.' },
            { title: 'Performance at Scale', desc: 'Purpose-built columnar engine with automatic micro-partitioning, pruning, and result caching. Fabric warehouse is newer and less battle-tested.' },
          ].map(item => (
            <div key={item.title} style={{ flex: '1 1 300px', border: '1.5px solid #29B5E830', borderRadius: 10, padding: 14, background: '#f0f9ff' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0e7490', marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '24px', marginBottom: 20 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', margin: '0 0 16px' }}>Architecture Comparison</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, color: '#475569' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                <th style={{ padding: '8px 12px', fontWeight: 700, color: '#1e293b' }}>Dimension</th>
                <th style={{ padding: '8px 12px', fontWeight: 700, color: '#29B5E8' }}>Snowflake</th>
                <th style={{ padding: '8px 12px', fontWeight: 700, color: '#0078D4' }}>Microsoft Fabric</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Compute Model', 'Independent virtual warehouses — scale each workload separately', 'Shared capacity units (CU) across all workloads in a Fabric capacity'],
                ['Storage', 'Proprietary columnar format with auto micro-partitioning', 'OneLake (Delta Lake / Parquet on ADLS Gen2)'],
                ['Cloud Support', 'AWS, Azure, GCP — same product, same SQL', 'Azure only (connectors to other clouds for ingestion)'],
                ['Billing', 'Separate compute credits + storage per TB — pay only when running', 'Capacity SKU (F2–F2048) — flat monthly, shared across services'],
                ['BI Layer', 'Bring your own (Tableau, Power BI, Looker, Sigma, etc.)', 'Power BI included natively — no extra licence'],
                ['Governance', 'Native RBAC, row/column security, object tagging, Horizon catalog', 'Microsoft Purview integration + OneLake-level policies'],
                ['Data Sharing', 'Snowflake Marketplace + secure shares (zero-copy, cross-cloud)', 'OneLake shortcuts + mirroring (still maturing)'],
                ['Concurrency', 'Excellent — spin up unlimited warehouses with no contention', 'Limited by capacity tier — burst can throttle other workloads'],
                ['Maturity', 'GA since 2014, battle-tested at Fortune 500 scale', 'GA Nov 2023 — rapidly evolving but younger platform'],
              ].map(([dim, sf, fb]) => (
                <tr key={dim} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600, color: '#1e293b' }}>{dim}</td>
                  <td style={{ padding: '10px 12px' }}>{sf}</td>
                  <td style={{ padding: '10px 12px' }}>{fb}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '24px', marginBottom: 20 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', margin: '0 0 16px' }}>Where Fabric Has an Edge</h3>
        <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.7, margin: '0 0 12px' }}>
          Being fair — Fabric does have legitimate advantages for the right customer:
        </p>
        <ul style={{ fontSize: 13, color: '#475569', lineHeight: 1.8, margin: 0, paddingLeft: 18 }}>
          <li><strong>Power BI included</strong> — no separate BI licence cost (significant for large orgs already using Power BI)</li>
          <li><strong>Unified bill</strong> — one capacity SKU covers ingestion, warehouse, Spark, and BI (simple for finance teams)</li>
          <li><strong>Microsoft ecosystem</strong> — if you're all-in on Azure AD, Teams, SharePoint, Dynamics — Fabric is deeply integrated</li>
          <li><strong>Low-code friendly</strong> — Data Factory GUI + Copilot makes it accessible to less technical users</li>
          <li><strong>OneLake open format</strong> — Delta Lake under the hood means data isn't locked in a proprietary format</li>
        </ul>
      </div>

      <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '24px', marginBottom: 20 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', margin: '0 0 16px' }}>Key Talking Points</h3>
        <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.8 }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>"But Fabric is all-in-one — isn't that simpler?"</div>
            <div>All-in-one ≠ best-in-class. Fabric bundles a warehouse, Spark engine, Data Factory, and Power BI — but each component is less mature than its standalone equivalent. Snowflake's warehouse has 10+ years of optimization. Fabric's warehouse is essentially Synapse Serverless repackaged.</div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>"Fabric is cheaper because Power BI is included."</div>
            <div>True <em>if</em> your only BI tool is Power BI. But Snowflake customers choose from any BI tool without platform tax. And Fabric's capacity model means you pay even when idle — Snowflake suspends warehouses to $0.</div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>"We're already on Azure — shouldn't we just use Fabric?"</div>
            <div>Snowflake runs on Azure too. You keep your Azure investment, your ADLS storage, your Azure AD — but you get a purpose-built engine without sharing compute across unrelated workloads.</div>
          </div>
          <div>
            <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>"Fabric has Copilot AI everywhere."</div>
            <div>Snowflake has Cortex AI (LLM functions, document AI, Cortex Search, Cortex Analyst for text-to-SQL). The difference: Snowflake AI runs on your governed data without sending it to a third-party model. Fabric Copilot is Azure OpenAI under the hood.</div>
          </div>
        </div>
      </div>

      <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '24px', marginBottom: 20 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', margin: '0 0 12px' }}>Bottom Line</h3>
        <div style={{ background: '#f0f9ff', border: '1.5px solid #29B5E830', borderRadius: 8, padding: '14px 18px' }}>
          <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.8 }}>
            <strong>Fabric</strong> is best for organizations that are 100% Microsoft, use only Power BI, and want one bill for everything — even if each component isn't best-in-class.
          </div>
          <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.8, marginTop: 8 }}>
            <strong>Snowflake</strong> is best when you need multi-cloud, true workload isolation, best-in-class SQL performance, mature data sharing, and freedom to choose any tool in the ecosystem.
          </div>
        </div>
      </div>

      <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '24px' }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', margin: '0 0 12px' }}>Useful Resources</h3>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 2 }}>
          <li>
            <a href="https://www.snowflake.com/en/why-snowflake/" target="_blank" rel="noreferrer" style={{ color: '#29B5E8', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center' }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
              Why Snowflake <LinkIcon size={12} />
            </a>
          </li>
          <li>
            <a href="https://www.snowflake.com/en/data-cloud/workloads/data-warehouse/" target="_blank" rel="noreferrer" style={{ color: '#29B5E8', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center' }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
              Snowflake Data Warehouse <LinkIcon size={12} />
            </a>
          </li>
          <li>
            <a href="https://www.snowflake.com/en/data-cloud/workloads/data-sharing/" target="_blank" rel="noreferrer" style={{ color: '#29B5E8', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center' }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
              Snowflake Data Sharing & Marketplace <LinkIcon size={12} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
