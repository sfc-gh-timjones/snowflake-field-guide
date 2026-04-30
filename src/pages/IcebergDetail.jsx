function ParquetFileIcon() {
  return (
    <svg width="36" height="44" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="28" height="36" rx="3" fill="white" stroke="#cbd5e1" strokeWidth="1.5"/>
      <path d="M21 1v9h9" stroke="#cbd5e1" strokeWidth="1.5" fill="none"/>
      <rect x="21" y="1" width="9" height="9" rx="1" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5"/>
      <rect x="6" y="14" width="18" height="2.5" rx="1" fill="#29B5E8" opacity="0.7"/>
      <rect x="6" y="19" width="14" height="2.5" rx="1" fill="#29B5E8" opacity="0.5"/>
      <rect x="6" y="24" width="16" height="2.5" rx="1" fill="#29B5E8" opacity="0.4"/>
      <rect x="6" y="29" width="10" height="2.5" rx="1" fill="#29B5E8" opacity="0.3"/>
    </svg>
  );
}

const CLOUDS = [
  { name: 'Amazon S3', color: '#FF9900', abbr: 'S3' },
  { name: 'Google Cloud Storage', color: '#4285F4', abbr: 'GCS' },
  { name: 'Azure Blob Storage', color: '#0089D6', abbr: 'AZ' },
];

export default function IcebergDetail() {
  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>Iceberg Tables</h2>
      <p style={{ color: '#64748b', fontSize: 14, marginBottom: 28, maxWidth: 560 }}>
        Apache Iceberg is an open table format for large analytic datasets. Snowflake supports Iceberg tables backed by cloud object storage.
      </p>

      <div style={{
        border: '1.5px solid #e2e8f0',
        borderRadius: 12,
        padding: 24,
        background: '#f8fafc',
        maxWidth: 560,
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', marginBottom: 16 }}>
          Cloud Storage
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
          {CLOUDS.map(c => (
            <div key={c.name} style={{
              flex: 1,
              border: `1.5px solid ${c.color}40`,
              borderRadius: 8,
              padding: '10px 8px',
              background: 'white',
              textAlign: 'center',
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, margin: '0 auto 8px',
                background: `${c.color}18`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 800, color: c.color,
              }}>{c.abbr}</div>
              <div style={{ fontSize: 11, fontWeight: 500, color: '#334155', lineHeight: 1.3 }}>{c.name}</div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 18 }}>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12, fontWeight: 500 }}>
            Data files stored as:
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', gap: -4 }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ marginLeft: i > 0 ? -10 : 0, opacity: 1 - i * 0.15 }}>
                  <ParquetFileIcon />
                </div>
              ))}
            </div>
            <div>
              <a
                href="https://parquet.apache.org/"
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: 15, fontWeight: 700, color: '#29B5E8', textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.textDecoration = 'underline'}
                onMouseLeave={e => e.target.style.textDecoration = 'none'}
              >
                Apache Parquet ↗
              </a>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 3 }}>
                Open-source columnar storage format
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
