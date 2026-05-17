import { useState } from 'react';

function LinkIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }}>
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
    </svg>
  );
}

function PopupIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }}>
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M3 9h18"/>
      <path d="M9 21V9"/>
    </svg>
  );
}

function TableIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#29B5E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <line x1="3" y1="9" x2="21" y2="9"/>
      <line x1="3" y1="15" x2="21" y2="15"/>
      <line x1="9" y1="3" x2="9" y2="21"/>
    </svg>
  );
}

function SnowflakeIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <path d="M18 2L18 34M18 2L12 8M18 2L24 8M18 34L12 28M18 34L24 28" stroke="#29B5E8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.14 10L31.86 26M4.14 10L4.14 18M4.14 10L11.07 6M31.86 26L31.86 18M31.86 26L24.93 30" stroke="#29B5E8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M31.86 10L4.14 26M31.86 10L31.86 18M31.86 10L24.93 6M4.14 26L4.14 18M4.14 26L11.07 30" stroke="#29B5E8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ExternalEngineModal({ onClose }) {
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: 24 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'white', borderRadius: 14, overflow: 'hidden', width: '90vw', maxWidth: 660, boxShadow: '0 24px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>What is considered an external engine?</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: '#64748b', lineHeight: 1, padding: '0 4px' }}>×</button>
        </div>
        <div style={{ padding: '20px 24px', fontSize: 13, color: '#475569', lineHeight: 1.7 }}>
          <p style={{ margin: '0 0 14px' }}>
            The following list describes some cases where external query engines access Iceberg tables that are stored in Snowflake:
          </p>
          <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, margin: 0 }}>
            <li style={{ display: 'flex', gap: 8 }}>
              <span style={{ color: '#29B5E8', fontWeight: 700, flexShrink: 0 }}>•</span>
              <span>Snowflake engines that access the table through Horizon Catalog from <span style={{ fontWeight: 600 }}>another Snowflake account</span>. For example, if a table is managed by Snowflake account A but you access the table from the Snowflake engine in account B through Horizon Catalog, you are charged for this access. You are charged for this access because the Snowflake engine in account B is an external query engine.</span>
            </li>
            <li style={{ display: 'flex', gap: 8 }}>
              <span style={{ color: '#29B5E8', fontWeight: 700, flexShrink: 0 }}>•</span>
              <span>Third-party query engines that you deploy within the Snowflake network by using <span style={{ fontWeight: 600 }}>Snowflake Container Services</span>. When you use these engines through Horizon Catalog to access the table, the engine is external and their requests are billed in the same way as other third-party query engines.</span>
            </li>
            <li style={{ display: 'flex', gap: 8 }}>
              <span style={{ color: '#29B5E8', fontWeight: 700, flexShrink: 0 }}>•</span>
              <span>Third-party query engines that you deploy <span style={{ fontWeight: 600 }}>outside of Snowflake</span> that you use to connect to the table through Horizon Catalog.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function IcebergInternalStorage() {
  const [showEngineModal, setShowEngineModal] = useState(false);

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>Snowflake Iceberg Storage</h2>
      <p style={{ color: '#64748b', fontSize: 15, marginBottom: 12, maxWidth: 780 }}>
        With this option, Snowflake stores and manages the Iceberg table files for you by using Snowflake (internal) storage, so you don't need to set up access to external cloud storage.
      </p>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <a href="https://docs.snowflake.com/en/user-guide/tables-iceberg-internal-storage" target="_blank" rel="noreferrer" style={{ fontSize: 13, fontWeight: 600, color: '#29B5E8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
          Official Documentation<LinkIcon size={13} />
        </a>
        <span style={{ fontSize: 13, color: '#94a3b8' }}>|</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#f59e0b' }}>Available on AWS and Azure only</span>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap' }}>
        <div style={{ padding: '8px 14px', background: '#f0fbff', border: '1.5px solid #29B5E860', borderRadius: 8, fontSize: 13, color: '#0e7490', lineHeight: 1.5 }}>
          <span style={{ fontWeight: 700 }}>Catalog:</span> Snowflake Horizon Catalog <span style={{ fontWeight: 700, color: '#ef4444' }}>(Required)</span>
        </div>
        <div style={{ padding: '8px 14px', background: '#f0fbff', border: '1.5px solid #29B5E860', borderRadius: 8, fontSize: 13, color: '#0e7490', lineHeight: 1.5 }}>
          External query engines can connect to Iceberg tables that use Snowflake storage
        </div>
      </div>

      {/* Architecture Diagram — vertical layout: engines on top, then Snowflake box, with ingestion on the left */}
      <div style={{ marginBottom: 40, maxWidth: 1100 }}>

        {/* External Query Engines — above Snowflake box */}
        <div style={{ display: 'flex', gap: 0, alignItems: 'flex-end', marginBottom: 0 }}>
          <div style={{ width: 180, flexShrink: 0 }} />
          <div style={{ width: 120, flexShrink: 0 }} />
          <div style={{ flex: 1, display: 'flex', gap: 16, alignItems: 'flex-end' }}>
            <div style={{ flex: 1, border: '1.5px solid #94a3b8', borderRadius: 12, padding: '14px 16px', background: '#f8fafc' }}>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#64748b', marginBottom: 10 }}>
                External Query Engines
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                {['Apache Spark', 'Trino', 'Apache Flink', 'PyIceberg'].map(engine => (
                  <div key={engine} style={{ padding: '5px 10px', background: 'white', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 11, color: '#334155', fontWeight: 500 }}>
                    {engine}
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowEngineModal(true)}
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#29B5E8', fontWeight: 600, fontSize: 12, display: 'inline-flex', alignItems: 'center' }}
              >
                What is considered an external engine?<PopupIcon size={12} />
              </button>
            </div>

            <div style={{ width: 200, flexShrink: 0, padding: '10px 14px', background: '#f0fdf4', border: '1.5px solid #16a34a40', borderRadius: 8, fontSize: 12, color: '#166534', lineHeight: 1.5 }}>
              <span style={{ fontWeight: 700 }}>Private Connectivity:</span> Traffic doesn't have to traverse the public internet.{' '}
              <a href="https://docs.snowflake.com/en/user-guide/tables-iceberg-internal-storage#private-connectivity" target="_blank" rel="noreferrer" style={{ color: '#16a34a', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
                Learn more<LinkIcon size={11} />
              </a>
            </div>
          </div>
        </div>

        {/* Read/Write arrows between engines and Snowflake */}
        <div style={{ display: 'flex', gap: 0 }}>
          <div style={{ width: 180, flexShrink: 0 }} />
          <div style={{ width: 120, flexShrink: 0 }} />
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '4px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <line x1="14" y1="0" x2="14" y2="28" stroke="#29B5E8" strokeWidth="2"/>
                <path d="M9 24l5 8 5-8" fill="none" stroke="#29B5E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="26" y1="32" x2="26" y2="4" stroke="#29B5E8" strokeWidth="2"/>
                <path d="M21 8l5-8 5 8" fill="none" stroke="#29B5E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontSize: 10, color: '#64748b', fontWeight: 600 }}>Read / Write</span>
            </div>
          </div>
        </div>

        {/* Main row: Ingestion → arrows → Snowflake Account */}
        <div style={{ display: 'flex', gap: 0, alignItems: 'stretch' }}>

          {/* Data Ingestion Box */}
          <div style={{ width: 180, flexShrink: 0, border: '1.5px solid #f59e0b50', borderRadius: 12, padding: '16px 14px', background: '#fffbeb', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#b45309', marginBottom: 12 }}>Data Ingestion</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
              {['CSV', 'JSON', 'Parquet', 'Avro', 'ORC', 'XML'].map(fmt => (
                <div key={fmt} style={{ padding: '6px 10px', background: 'white', border: '1px solid #fde68a', borderRadius: 6, fontSize: 12, color: '#92400e', fontWeight: 500, textAlign: 'center' }}>
                  {fmt}
                </div>
              ))}
            </div>
          </div>

          {/* Arrows: Snowpipe + Snowpipe Streaming */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 120, gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: 10, color: '#64748b', fontWeight: 600, marginBottom: 4 }}>Snowpipe</div>
              <svg width="80" height="16" viewBox="0 0 80 16" fill="none">
                <line x1="0" y1="8" x2="68" y2="8" stroke="#29B5E8" strokeWidth="2"/>
                <path d="M64 3l8 5-8 5" fill="none" stroke="#29B5E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: 10, color: '#64748b', fontWeight: 600, marginBottom: 4 }}>Snowpipe Streaming</div>
              <svg width="80" height="16" viewBox="0 0 80 16" fill="none">
                <line x1="0" y1="8" x2="68" y2="8" stroke="#29B5E8" strokeWidth="2"/>
                <path d="M64 3l8 5-8 5" fill="none" stroke="#29B5E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Snowflake Account Box */}
          <div style={{ flex: 1, border: '2px solid #29B5E8', borderRadius: 12, padding: '16px 20px', background: '#f0fbff', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <SnowflakeIcon size={20} />
              <span style={{ fontSize: 15, fontWeight: 700, color: '#0e7490' }}>Snowflake Account</span>
            </div>

            <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <TableIcon size={32} />
                  <div style={{ fontSize: 10, color: '#64748b' }}>Table {i + 1}</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.7, marginBottom: 8 }}>
              <span style={{ fontWeight: 700 }}>Table Types:</span>
            </div>
            <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6, margin: '0 0 12px' }}>
              <li style={{ display: 'flex', gap: 7, fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
                <span style={{ color: '#29B5E8', fontWeight: 700, flexShrink: 0 }}>•</span>
                <span><span style={{ fontWeight: 600 }}>Permanent</span> — Protected by Fail-Safe (7 days of additional recovery beyond Time Travel)</span>
              </li>
              <li style={{ display: 'flex', gap: 7, fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
                <span style={{ color: '#29B5E8', fontWeight: 700, flexShrink: 0 }}>•</span>
                <span><span style={{ fontWeight: 600 }}>Transient</span> — Not protected by Fail-Safe (lower storage costs, no recovery after Time Travel expires)</span>
              </li>
            </ul>

            <div style={{ padding: '8px 14px', background: 'white', border: '1.5px solid #29B5E860', borderRadius: 8, fontSize: 12, color: '#0e7490', lineHeight: 1.5 }}>
              <span style={{ fontWeight: 700 }}>Replication:</span> You can enable replication for Iceberg tables that use Snowflake Storage.
            </div>
          </div>
        </div>
      </div>

      {/* Table Creation Section */}
      <div style={{ marginBottom: 40 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1e293b', marginBottom: 12 }}>Creating Tables</h3>

        <div style={{ padding: '12px 16px', background: '#f0fbff', border: '1.5px solid #29B5E860', borderRadius: 8, marginBottom: 16, fontSize: 13, color: '#0e7490', lineHeight: 1.6 }}>
          <span style={{ fontWeight: 700 }}>Key:</span> No external volume configuration is needed. <code style={{ background: '#e0f7fa', padding: '1px 5px', borderRadius: 4, fontSize: 12 }}>SNOWFLAKE_MANAGED</code> is a reserved value, not a user-created external volume object. For Iceberg tables that store files in your cloud storage instead, you create an external volume.
        </div>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 480 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>Permanent Table (with Fail-Safe)</div>
            <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px 20px', borderRadius: 10, fontSize: 13, lineHeight: 1.7, overflow: 'visible', whiteSpace: 'pre', margin: 0 }}>
{`CREATE ICEBERG TABLE my_iceberg_table_defaults (col1 int)
  CATALOG = SNOWFLAKE
  EXTERNAL_VOLUME = SNOWFLAKE_MANAGED;`}
            </pre>
          </div>
          <div style={{ flex: 1, minWidth: 480 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>Transient Table (no Fail-Safe)</div>
            <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px 20px', borderRadius: 10, fontSize: 13, lineHeight: 1.7, overflow: 'visible', whiteSpace: 'pre', margin: 0 }}>
{`CREATE TRANSIENT ICEBERG TABLE my_iceberg_table_internal (col1 int)
  CATALOG = SNOWFLAKE
  EXTERNAL_VOLUME = SNOWFLAKE_MANAGED;`}
            </pre>
          </div>
        </div>
      </div>

      {/* Cost Section — single box with bold category bullets */}
      <div style={{ maxWidth: 900 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1e293b', marginBottom: 16 }}>Cost</h3>

        <div style={{ border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', background: 'white' }}>
          <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16, margin: 0 }}>
            <li style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>
              <span style={{ fontWeight: 700, color: '#1e293b' }}>Storage Cost</span> — Snowflake charges for storage when you use Snowflake Storage. Consistent with standard Snowflake storage costs for Snowflake Native Tables.
            </li>
            <li style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>
              <span style={{ fontWeight: 700, color: '#1e293b' }}>Request Cost</span> — Any time you use a query engine through Horizon Catalog to access Iceberg tables that are stored in Snowflake, the query engine is considered an external query engine. When you use an external query engine to access these tables, Snowflake bills your account a per-request fee for each HTTP request sent to the underlying storage system. The rate depends on the request type:
              <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6, margin: '8px 0 0 16px' }}>
                <li style={{ display: 'flex', gap: 7, fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
                  <span style={{ color: '#ef4444', fontWeight: 700, flexShrink: 0 }}>•</span>
                  <span><span style={{ fontWeight: 600 }}>Class 1</span> — PUT, COPY, POST, PATCH, and LIST operations (more expensive)</span>
                </li>
                <li style={{ display: 'flex', gap: 7, fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
                  <span style={{ color: '#16a34a', fontWeight: 700, flexShrink: 0 }}>•</span>
                  <span><span style={{ fontWeight: 600 }}>Class 2</span> — GET and SELECT operations (less expensive)</span>
                </li>
              </ul>
              <div style={{ padding: '10px 14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 12, color: '#475569', lineHeight: 1.5, marginTop: 10 }}>
                See <span style={{ fontWeight: 700 }}>Table 3g (Cloud Storage Requests)</span> in the{' '}
                <a href="https://www.snowflake.com/legal-files/CreditConsumptionTable.pdf" target="_blank" rel="noreferrer" style={{ color: '#29B5E8', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
                  Consumption Table<LinkIcon size={11} />
                </a>
              </div>
            </li>
            <li style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>
              <span style={{ fontWeight: 700, color: '#1e293b' }}>Data Transfer Cost</span> — When you use an external query engine through Horizon Catalog to access the table from a different region or with another cloud provider, a standard data transfer charge is billed on a per-byte basis.
            </li>
          </ul>
        </div>
      </div>

      {showEngineModal && <ExternalEngineModal onClose={() => setShowEngineModal(false)} />}
    </div>
  );
}
