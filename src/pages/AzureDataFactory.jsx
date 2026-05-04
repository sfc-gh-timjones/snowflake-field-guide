function LinkIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }}>
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
    </svg>
  );
}

export default function AzureDataFactory() {
  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>
        <a href="https://azure.microsoft.com/en-us/products/data-factory" target="_blank" rel="noreferrer" style={{ color: '#29B5E8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
          Azure Data Factory <LinkIcon size={16} />
        </a>
      </h2>
      <p style={{ color: '#64748b', fontSize: 14, marginBottom: 28 }}>
        Cloud ETL service for data integration and transformation pipelines.
      </p>

      <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '24px', marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', margin: 0 }}>Loading into Snowflake</h3>
          <a href="https://learn.microsoft.com/en-us/azure/data-factory/connector-snowflake?tabs=data-factory" target="_blank" rel="noreferrer" style={{ fontSize: 13, color: '#29B5E8', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center' }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
            Microsoft Docs for Snowflake as a Source/Sink <LinkIcon size={12} />
          </a>
        </div>

        <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.7, marginBottom: 20 }}>
          ADF uses the <strong>Snowflake V2 connector</strong> which supports Copy Activity (bulk load) and Data Flow (transformations).
          When loading data <em>into</em> Snowflake, there are two primary approaches:
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
          <div style={{ flex: 1, minWidth: 280, border: '1.5px solid #16a34a40', borderRadius: 10, padding: 16, background: '#f0fdf4' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#16a34a', marginBottom: 8 }}>Staged Copy (Recommended)</div>
            <ul style={{ fontSize: 12, color: '#475569', lineHeight: 1.8, margin: 0, paddingLeft: 18 }}>
              <li>ADF writes data to a <strong>staging area</strong> (Azure Blob or ADLS Gen2)</li>
              <li>Snowflake then runs <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11 }}>COPY INTO</code> from that stage</li>
              <li>Fastest for large datasets (parallel bulk load)</li>
              <li>Requires an Azure Storage linked service as the staging location</li>
              <li>Supports Parquet, CSV, JSON as intermediate formats</li>
            </ul>
          </div>
          <div style={{ flex: 1, minWidth: 280, border: '1.5px solid #f9731640', borderRadius: 10, padding: 16, background: '#fff7ed' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#f97316', marginBottom: 8 }}>Direct Copy (Less Common)</div>
            <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.7, marginBottom: 10 }}>ADF does <strong>not</strong> create intermediate staging. Snowflake reads directly from source files via <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11 }}>COPY INTO</code>.</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b', marginBottom: 6 }}>Criteria (all must be true):</div>
            <ul style={{ fontSize: 12, color: '#475569', lineHeight: 1.8, margin: 0, paddingLeft: 18 }}>
              <li>Source dataset is <strong>file-based</strong>: DelimitedText, Parquet, or JSON</li>
              <li>Source linked service is <strong>Azure Blob Storage</strong> or <strong>Amazon S3</strong> — not SQL DBs, APIs, etc.</li>
            </ul>
            <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 10, fontStyle: 'italic' }}>If either condition is not met, ADF forces staged copy.</div>
          </div>
        </div>

        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '14px 18px', marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mental Model</div>
          <div style={{ fontSize: 12, color: '#475569', lineHeight: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ background: '#16a34a', color: 'white', borderRadius: 4, padding: '2px 8px', fontSize: 10, fontWeight: 700 }}>MOST CASES</span>
              <span>Source (DB/API) → ADF → Blob (staging) → Snowflake COPY INTO</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ background: '#f97316', color: 'white', borderRadius: 4, padding: '2px 8px', fontSize: 10, fontWeight: 700 }}>LESS COMMON</span>
              <span>Blob (already correct format) → Snowflake COPY INTO (no ADF staging)</span>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 10 }}>Authentication Options</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {['Basic (user/password)', 'Key Pair', 'AAD Service Principal', 'System-Assigned MI', 'User-Assigned MI'].map(method => (
              <div key={method} style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 6, padding: '5px 12px', fontSize: 11, color: '#475569', fontWeight: 500 }}>
                {method}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 10 }}>Key Considerations</div>
          <ul style={{ fontSize: 12, color: '#475569', lineHeight: 1.8, margin: 0, paddingLeft: 18 }}>
            <li><strong>Staging is almost always required</strong> — direct copy only works if source is Azure Blob/ADLS with files already in Parquet/CSV/JSON</li>
            <li>"No staging" means ADF doesn't create an intermediate layer — <em>not</em> that no storage is involved (Snowflake still reads from files)</li>
            <li>ADF maps to Snowflake's <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11 }}>COPY INTO [table]</code> command internally</li>
            <li>Connector version <strong>V2 (version 1.1)</strong> is recommended — supports key pair auth and managed identity</li>
            <li>Data Flow transformations run on Spark and write to Snowflake via the same staging mechanism</li>
            <li>Write behavior options: <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11 }}>Insert</code>, <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11 }}>Upsert</code>, <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11 }}>Recreate</code></li>
          </ul>
        </div>
      </div>

      <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '24px', position: 'relative', minHeight: 80 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', margin: '0 0 12px' }}>Supported Sources</h3>
        <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.6, margin: 0 }}>
          ADF supports 100+ connectors as data sources. Any of them can write to Snowflake via staged copy.
        </p>
        <a
          href="https://learn.microsoft.com/en-us/azure/data-factory/connector-overview#supported-data-stores"
          target="_blank" rel="noreferrer"
          style={{ position: 'absolute', bottom: 16, right: 16, fontSize: 13, color: '#29B5E8', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
          onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
          onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
        >
          Connectors <LinkIcon size={12} />
        </a>
      </div>
    </div>
  );
}
