import IcebergConsiderations from './IcebergConsiderations';

function LinkIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }}>
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
    </svg>
  );
}

const CATALOG_OPTIONS = [
  {
    id: 'snowflake',
    title: 'Snowflake as the Catalog',
    color: '#29B5E8',
    docsUrl: 'https://docs.snowflake.com/en/user-guide/tables-iceberg#label-tables-iceberg-snowflake-as-catalog',
    description: 'Snowflake manages the catalog internally. The simplest setup — no external dependencies.',
    bullets: [
      'Snowflake stores and manages the metadata pointer for each Iceberg table.',
      'Full Snowflake feature support: time travel, cloning, automatic compaction, fail-safe (where applicable).',
      'Data files still live in your external cloud storage (via External Volume).',
      'Best choice when Snowflake is your primary compute engine.',
    ],
    note: null,
  },
  {
    id: 'external',
    title: 'External Catalog',
    color: '#7C3AED',
    docsUrl: 'https://docs.snowflake.com/en/user-guide/tables-iceberg#use-an-external-catalog',
    description: 'An external system manages the catalog. Snowflake reads the table in a read-only capacity.',
    bullets: [
      'Supported catalogs: AWS Glue, Polaris (Apache), Nessie, and others via REST catalog API.',
      'Snowflake can query the table but cannot write to it (read-only).',
      'Enables multi-engine access — e.g., Spark writes, Snowflake reads.',
      'Catalog integration required to connect Snowflake to the external catalog.',
    ],
    note: '⚠ External catalog Iceberg tables are read-only in Snowflake. To write from Snowflake, use Snowflake as the catalog.',
  },
];

export default function CatalogOptions() {
  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>Catalog Options</h2>
      <p style={{ color: '#64748b', fontSize: 15, marginBottom: 28, maxWidth: 680 }}>
        The catalog tracks the current metadata pointer for each Iceberg table. Snowflake supports two catalog modes.
      </p>

      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {CATALOG_OPTIONS.map(opt => (
          <div key={opt.id} style={{
            flex: '1 1 300px', maxWidth: 420,
            border: `2px solid ${opt.color}30`,
            borderRadius: 14, padding: '22px 24px',
            background: 'white',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: opt.color, flexShrink: 0 }} />
              <a
                href={opt.docsUrl}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: 16, fontWeight: 700, color: opt.color, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
              >
                {opt.title} <LinkIcon size={14} />
              </a>
            </div>

            <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, marginBottom: 16 }}>{opt.description}</p>

            <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {opt.bullets.map((b, i) => (
                <li key={i} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
                  <span style={{ color: opt.color, fontWeight: 700, flexShrink: 0 }}>•</span>
                  {b}
                </li>
              ))}
            </ul>

            {opt.note && (
              <div style={{ marginTop: 16, padding: '10px 14px', background: '#fafafa', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>
                {opt.note}
              </div>
            )}
          </div>
        ))}
      </div>

      <IcebergConsiderations />
    </div>
  );
}
