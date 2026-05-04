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
      <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '24px', color: '#475569', fontSize: 14, position: 'relative', minHeight: 100 }}>
        Content coming soon.
        <a
          href="https://learn.microsoft.com/en-us/azure/data-factory/connector-overview#supported-data-stores"
          target="_blank" rel="noreferrer"
          style={{ position: 'absolute', bottom: 16, right: 16, background: 'none', border: '1.5px solid #94a3b8', borderRadius: 8, padding: '4px 12px', fontSize: 13, color: '#64748b', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}
          onMouseEnter={e => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.borderColor = '#475569'; e.currentTarget.style.color = '#1e293b'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = '#94a3b8'; e.currentTarget.style.color = '#64748b'; }}
        >
          Connectors <span>→</span>
        </a>
      </div>
    </div>
  );
}
