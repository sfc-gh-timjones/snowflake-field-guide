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

function SnowflakeIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <path d="M18 2L18 34M18 2L12 8M18 2L24 8M18 34L12 28M18 34L24 28" stroke="#29B5E8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.14 10L31.86 26M4.14 10L4.14 18M4.14 10L11.07 6M31.86 26L31.86 18M31.86 26L24.93 30" stroke="#29B5E8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M31.86 10L4.14 26M31.86 10L31.86 18M31.86 10L24.93 6M4.14 26L4.14 18M4.14 26L11.07 30" stroke="#29B5E8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function IcebergDetail() {
  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>Iceberg Tables</h2>
      <p style={{ color: '#64748b', fontSize: 14, marginBottom: 28, maxWidth: 600 }}>
        Apache Iceberg is an open table format for large analytic datasets. Snowflake supports Iceberg tables backed by cloud object storage.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0, maxWidth: 600 }}>

        {/* Snowflake box */}
        <div style={{
          border: '2px solid #29B5E8',
          borderRadius: 12,
          padding: '14px 20px',
          background: '#f0fbff',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}>
          <SnowflakeIcon size={20} />
          <span style={{ fontSize: 15, fontWeight: 700, color: '#0e7490' }}>Snowflake</span>
        </div>

        {/* Bidirectional arrow + External Volume label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, paddingLeft: 28, height: 52 }}>
          <svg width="40" height="52" viewBox="0 0 40 52" fill="none">
            <line x1="20" y1="0" x2="20" y2="52" stroke="#29B5E8" strokeWidth="2" strokeDasharray="4 3"/>
            {/* top arrowhead pointing up */}
            <path d="M12 12 L20 2 L28 12" fill="none" stroke="#29B5E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            {/* bottom arrowhead pointing down */}
            <path d="M12 40 L20 50 L28 40" fill="none" stroke="#29B5E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <a
            href="https://docs.snowflake.com/en/user-guide/tables-iceberg#label-tables-iceberg-external-volume-def"
            target="_blank"
            rel="noreferrer"
            style={{
              marginLeft: 10,
              fontSize: 12,
              fontWeight: 600,
              color: '#29B5E8',
              textDecoration: 'none',
              background: 'white',
              border: '1px solid #29B5E840',
              borderRadius: 6,
              padding: '3px 8px',
            }}
            onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
            onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
          >
            External Volume ↗
          </a>
          <span style={{ marginLeft: 6, fontSize: 11, color: '#94a3b8' }}>read / write</span>
        </div>

        {/* Cloud Storage box */}
        <div style={{
          border: '1.5px solid #e2e8f0',
          borderRadius: 12,
          padding: 24,
          background: '#f8fafc',
          width: '100%',
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', marginBottom: 16 }}>
            Cloud Storage
          </div>

          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
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

          {/* Management & Billing notes */}
          <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.7, marginBottom: 20 }}>
            <div><span style={{ fontWeight: 600 }}>Management of External Cloud Storage Location</span> = <span style={{ color: '#0e7490', fontWeight: 600 }}>CUSTOMER</span></div>
            <div style={{ paddingLeft: 16, color: '#64748b' }}>
              ↳ Management = data protection &amp; recovery <span style={{ color: '#ef4444', fontWeight: 500 }}>(No Snowflake Fail Safe)</span>
            </div>
            <div style={{ marginTop: 4 }}><span style={{ fontWeight: 600 }}>Storage Billing</span> = <span style={{ color: '#0e7490', fontWeight: 600 }}>Cloud Provider</span></div>
          </div>

          {/* Parquet files */}
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 16 }}>
            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12, fontWeight: 500 }}>
              Data files stored as:
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ display: 'flex' }}>
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
    </div>
  );
}
