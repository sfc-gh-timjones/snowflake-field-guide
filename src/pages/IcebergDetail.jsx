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
      <p style={{ color: '#64748b', fontSize: 14, marginBottom: 28, maxWidth: 640 }}>
        Apache Iceberg is an open table format for large analytic datasets. Snowflake supports Iceberg tables backed by cloud object storage.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0, maxWidth: 640 }}>

        {/* Snowflake box */}
        <div style={{
          border: '2px solid #29B5E8',
          borderRadius: 12,
          padding: '16px 20px 20px',
          background: '#f0fbff',
          width: '100%',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <SnowflakeIcon size={20} />
            <span style={{ fontSize: 15, fontWeight: 700, color: '#0e7490' }}>Snowflake</span>
          </div>

          {/* Catalog sub-box */}
          <div style={{
            border: '1.5px solid #29B5E860',
            borderRadius: 10,
            padding: '14px 16px',
            background: 'white',
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0e7490', marginBottom: 6 }}>Catalog</div>
            <div style={{ fontSize: 12, color: '#475569', marginBottom: 10 }}>
              Enables a compute engine to interact with Iceberg tables.
            </div>
            <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                'Stores the current metadata pointer for one or more Iceberg tables.',
                'A metadata pointer maps a table name to the location of that table\'s current metadata file.',
                'Performing atomic operations so that you can update the current metadata pointer for a table.',
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: 8, fontSize: 12, color: '#475569', lineHeight: 1.5 }}>
                  <span style={{ color: '#29B5E8', fontWeight: 700, flexShrink: 0 }}>•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bidirectional arrow + External Volume */}
        <div style={{ display: 'flex', alignItems: 'stretch', paddingLeft: 28, gap: 16, minHeight: 80 }}>
          {/* Arrow column */}
          <div style={{ display: 'flex', justifyContent: 'center', width: 40 }}>
            <svg width="40" height="80" viewBox="0 0 40 80" fill="none">
              <line x1="20" y1="0" x2="20" y2="80" stroke="#29B5E8" strokeWidth="2" strokeDasharray="4 3"/>
              <path d="M12 14 L20 4 L28 14" fill="none" stroke="#29B5E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 66 L20 76 L28 66" fill="none" stroke="#29B5E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* External Volume callout box */}
          <div style={{
            flex: 1,
            alignSelf: 'center',
            border: '1.5px solid #29B5E8',
            borderRadius: 10,
            padding: '12px 16px',
            background: 'white',
          }}>
            <a
              href="https://docs.snowflake.com/en/user-guide/tables-iceberg#label-tables-iceberg-external-volume-def"
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: 14, fontWeight: 700, color: '#29B5E8', textDecoration: 'none', display: 'inline-block', marginBottom: 8 }}
              onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
              onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
            >
              External Volume ↗
            </a>
            <div style={{ display: 'flex', gap: 8, fontSize: 12, color: '#475569', lineHeight: 1.5 }}>
              <span style={{ color: '#29B5E8', fontWeight: 700, flexShrink: 0 }}>•</span>
              <span>
                Stores an <span style={{ fontWeight: 600 }}>identity and access management (IAM) entity</span>{' '}
                <span style={{ color: '#64748b' }}>(security handshake)</span>
              </span>
            </div>
            <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 8 }}>⇅ read / write</div>
          </div>
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

          <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.8, marginBottom: 20 }}>
            <div><span style={{ fontWeight: 600 }}>Management of External Cloud Storage Location</span> = <span style={{ color: '#0e7490', fontWeight: 600 }}>CUSTOMER</span></div>
            <div style={{ paddingLeft: 16, color: '#64748b' }}>
              ↳ Management = data protection &amp; recovery <span style={{ color: '#ef4444', fontWeight: 500 }}>(No Snowflake Fail Safe)</span>
            </div>
            <div style={{ marginTop: 4 }}><span style={{ fontWeight: 600 }}>Storage Billing</span> = <span style={{ color: '#0e7490', fontWeight: 600 }}>Cloud Provider</span></div>
          </div>

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
