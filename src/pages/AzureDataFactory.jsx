export default function AzureDataFactory() {
  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>
        <a href="https://azure.microsoft.com/en-us/products/data-factory" target="_blank" rel="noreferrer" style={{ color: '#1e293b', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
          Azure Data Factory
        </a>
      </h2>
      <p style={{ color: '#64748b', fontSize: 14, marginBottom: 28 }}>
        Cloud ETL service for data integration and transformation pipelines.
      </p>

      <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '24px', marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', margin: 0 }}>Loading into Snowflake</h3>
          <a href="https://learn.microsoft.com/en-us/azure/data-factory/connector-snowflake?tabs=data-factory" target="_blank" rel="noreferrer" style={{ fontSize: 11, color: '#29B5E8', textDecoration: 'none', fontWeight: 600 }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
            Microsoft Docs
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
            <div style={{ fontSize: 13, fontWeight: 700, color: '#f97316', marginBottom: 8 }}>Direct Copy</div>
            <ul style={{ fontSize: 12, color: '#475569', lineHeight: 1.8, margin: 0, paddingLeft: 18 }}>
              <li>ADF inserts rows directly via the Snowflake driver</li>
              <li>No staging storage needed</li>
              <li>Simpler setup, but <strong>significantly slower</strong> for large volumes</li>
              <li>Best suited for small datasets (&lt;100K rows)</li>
              <li>Uses standard INSERT statements under the hood</li>
            </ul>
          </div>
        </div>

        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '14px 18px', marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>How Staged Copy Works</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: '#475569', flexWrap: 'wrap' }}>
            <div style={{ background: '#0078D4', color: 'white', borderRadius: 8, padding: '6px 12px', fontWeight: 600, fontSize: 11, whiteSpace: 'nowrap' }}>Source</div>
            <span style={{ color: '#94a3b8' }}>&rarr;</span>
            <div style={{ background: '#0078D4', color: 'white', borderRadius: 8, padding: '6px 12px', fontWeight: 600, fontSize: 11, whiteSpace: 'nowrap' }}>ADF Pipeline</div>
            <span style={{ color: '#94a3b8' }}>&rarr;</span>
            <div style={{ background: '#f97316', color: 'white', borderRadius: 8, padding: '6px 12px', fontWeight: 600, fontSize: 11, whiteSpace: 'nowrap' }}>Azure Blob / ADLS</div>
            <span style={{ color: '#94a3b8' }}>&rarr; COPY INTO &rarr;</span>
            <div style={{ background: '#29B5E8', color: 'white', borderRadius: 8, padding: '6px 12px', fontWeight: 600, fontSize: 11, whiteSpace: 'nowrap' }}>Snowflake</div>
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
            <li><strong>Staging is required</strong> if your source is NOT Azure Blob, ADLS Gen2, or Amazon S3 with Parquet/CSV/JSON format</li>
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
          style={{ position: 'absolute', bottom: 16, right: 16, background: 'none', border: '1.5px solid #94a3b8', borderRadius: 8, padding: '4px 12px', fontSize: 13, color: '#64748b', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}
          onMouseEnter={e => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.borderColor = '#475569'; e.currentTarget.style.color = '#1e293b'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = '#94a3b8'; e.currentTarget.style.color = '#64748b'; }}
        >
          Connectors <span>&rarr;</span>
        </a>
      </div>
    </div>
  );
}
