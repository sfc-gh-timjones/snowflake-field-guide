import { useState } from 'react';
import Tooltip from '../components/Tooltip';

function LinkIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }}>
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
    </svg>
  );
}

function ImageModal({ src, alt, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 200, padding: 24,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'white', borderRadius: 14, overflow: 'hidden',
          width: '90vw', maxWidth: 765, maxHeight: '88vh',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
        }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 16px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', flexShrink: 0,
        }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{alt}</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: '#64748b', lineHeight: 1, padding: '0 4px' }}>×</button>
        </div>
        <div style={{ overflowY: 'auto', flex: 1 }}>
          <img src={src} alt={alt} style={{ width: '100%', display: 'block' }} />
        </div>
      </div>
    </div>
  );
}

function ImagePopup({ src, alt, children }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <span onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>{children}</span>
      {open && <ImageModal src={src} alt={alt} onClose={() => setOpen(false)} />}
    </>
  );
}

function ParquetFileIcon() {
  return (
    <svg width="40" height="48" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
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


function FileChainModal({ onClose }) {
  const steps = [
    {
      file: 'metadata.json',
      type: 'JSON',
      typeColor: '#f59e0b',
      note: 'New file created on every write — many exist in storage',
      relation: 'one snapshot → one manifest list',
    },
    {
      file: 'manifest-list.avro',
      type: 'AVRO',
      typeColor: '#8b5cf6',
      note: 'Contains a list of all manifests for this snapshot',
      relation: 'one manifest list → many manifests',
    },
    {
      file: 'manifest.avro',
      type: 'AVRO',
      typeColor: '#8b5cf6',
      note: 'Tracks a subset of data files + their stats (reused across snapshots)',
      relation: 'one manifest → many data files',
    },
    {
      file: 'data.parquet',
      type: 'PARQUET',
      typeColor: '#29B5E8',
      note: 'Actual row data',
      relation: null,
    },
  ];

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: 24 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'white', borderRadius: 14, overflow: 'hidden', width: '90vw', maxWidth: 520, boxShadow: '0 24px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>Iceberg File Reference Chain</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: '#64748b', lineHeight: 1, padding: '0 4px' }}>×</button>
        </div>
        <div style={{ padding: '20px 24px' }}>
          {steps.map((step, i) => (
            <div key={i}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 2 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: step.typeColor, flexShrink: 0 }} />
                  {i < steps.length - 1 && <div style={{ width: 2, flex: 1, background: '#e2e8f0', marginTop: 4, minHeight: 52 }} />}
                </div>
                <div style={{ paddingBottom: i < steps.length - 1 ? 0 : 0, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <code style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', background: '#f1f5f9', padding: '2px 8px', borderRadius: 5 }}>{step.file}</code>
                    <span style={{ fontSize: 10, fontWeight: 700, color: step.typeColor, background: `${step.typeColor}15`, padding: '1px 6px', borderRadius: 4, letterSpacing: '0.05em' }}>{step.type}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5, marginBottom: step.relation ? 10 : 0 }}>{step.note}</div>
                  {step.relation && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#94a3b8', fontStyle: 'italic', marginBottom: 4 }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1v7M2 6l3 3 3-3" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      {step.relation}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


  const [showFileChain, setShowFileChain] = useState(false);

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>Iceberg Tables</h2>
      <p style={{ color: '#64748b', fontSize: 15, marginBottom: 28, maxWidth: 780 }}>
        Apache Iceberg is an open table format for large analytic datasets. Snowflake supports Iceberg tables backed by cloud object storage.
      </p>

      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', maxWidth: 1100 }}>

        {/* LEFT: Catalog definition */}
        <div style={{
          width: 220, flexShrink: 0,
          border: '1.5px solid #29B5E860',
          borderRadius: 12, padding: '14px 16px',
          background: '#f0fbff',
        }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#0e7490', marginBottom: 8 }}>Catalog</div>
          <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, marginBottom: 12 }}>
            Enables a compute engine to interact with Iceberg tables.
          </div>
          <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
            <li style={{ display: 'flex', gap: 7, fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
              <span style={{ color: '#29B5E8', fontWeight: 700, flexShrink: 0 }}>•</span>
              <span>Stores the current <Tooltip term="metadata pointer" definition="Maps a table name to the location of that table's current metadata file." /> for one or more Iceberg tables.</span>
            </li>
            <li style={{ display: 'flex', gap: 7, fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
              <span style={{ color: '#29B5E8', fontWeight: 700, flexShrink: 0 }}>•</span>
              <span>Performing <Tooltip term="atomic" definition="Indivisible and all-or-nothing. A change happens as a single, complete step — guaranteeing consistency across concurrent readers and writers." /> operations to update the current metadata pointer for a table.</span>
            </li>
          </ul>
        </div>

        {/* RIGHT: Snowflake + arrow + Cloud Storage stacked */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0, marginTop: 8 }}>

          {/* Snowflake box */}
          <div style={{
            border: '2px solid #29B5E8', borderRadius: 12,
            padding: '16px 20px 20px', background: '#f0fbff',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <SnowflakeIcon size={22} />
              <span style={{ fontSize: 17, fontWeight: 700, color: '#0e7490' }}>Snowflake</span>
            </div>

            {/* Catalog Options sub-box */}
            <div style={{
              border: '1.5px solid #29B5E860', borderRadius: 10,
              padding: '12px 16px', background: 'white',
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0e7490', marginBottom: 8 }}>Catalog Options</div>
              <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <li style={{ display: 'flex', gap: 7, fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
                  <span style={{ color: '#29B5E8', fontWeight: 700, flexShrink: 0 }}>•</span>
                  <span>
                    <a href="https://docs.snowflake.com/en/user-guide/tables-iceberg#label-tables-iceberg-snowflake-as-catalog" target="_blank" rel="noreferrer" style={{ fontWeight: 600, color: '#29B5E8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>Snowflake<LinkIcon size={12} /></a> as the catalog
                  </span>
                </li>
                <li style={{ display: 'flex', gap: 7, fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
                  <span style={{ color: '#29B5E8', fontWeight: 700, flexShrink: 0 }}>•</span>
                  <span>
                    <a href="https://docs.snowflake.com/en/user-guide/tables-iceberg#use-an-external-catalog" target="_blank" rel="noreferrer" style={{ fontWeight: 600, color: '#29B5E8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>External catalog<LinkIcon size={12} /></a> (e.g. AWS Glue, Polaris, Nessie)
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bidirectional arrow + External Volume */}
          <div style={{ display: 'flex', alignItems: 'stretch', paddingLeft: 24, gap: 16, minHeight: 100 }}>
            <div style={{ display: 'flex', justifyContent: 'center', width: 40 }}>
              <svg width="40" height="88" viewBox="0 0 40 88" fill="none">
                <line x1="20" y1="0" x2="20" y2="88" stroke="#29B5E8" strokeWidth="2" strokeDasharray="4 3"/>
                <path d="M12 14 L20 4 L28 14" fill="none" stroke="#29B5E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 74 L20 84 L28 74" fill="none" stroke="#29B5E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{
              flex: 1, alignSelf: 'center',
              border: '1.5px solid #29B5E8', borderRadius: 10,
              padding: '14px 18px', background: 'white',
            }}>
              <a
                href="https://docs.snowflake.com/en/user-guide/tables-iceberg#label-tables-iceberg-external-volume-def"
                target="_blank" rel="noreferrer"
                style={{ fontSize: 15, fontWeight: 700, color: '#29B5E8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', marginBottom: 10 }}
                onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
              >
                External Volume <LinkIcon size={15} />
              </a>
              <div style={{ display: 'flex', gap: 8, fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
                <span style={{ color: '#29B5E8', fontWeight: 700, flexShrink: 0 }}>•</span>
                <span>Stores an <span style={{ fontWeight: 600 }}>identity and access management (IAM) entity</span>{' '}
                  <span style={{ color: '#64748b' }}>(security handshake)</span></span>
              </div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 10 }}>⇅ read / write</div>
            </div>
          </div>

          {/* Cloud Storage box */}
          <div style={{
            border: '2px solid #94a3b8', borderRadius: 12,
            padding: 24, background: '#f8fafc',
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', marginBottom: 16 }}>
              Cloud Storage
            </div>

            <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
              {CLOUDS.map(c => (
                <div key={c.name} style={{
                  flex: 1, border: `1.5px solid ${c.color}40`,
                  borderRadius: 8, padding: '10px 8px',
                  background: 'white', textAlign: 'center',
                }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 8, margin: '0 auto 8px',
                    background: `${c.color}18`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 800, color: c.color,
                  }}>{c.abbr}</div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: '#334155', lineHeight: 1.3 }}>{c.name}</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.9, marginBottom: 16 }}>
              <div><span style={{ fontWeight: 600 }}>Management of External Cloud Storage Location</span> = <span style={{ color: '#0e7490', fontWeight: 600 }}>CUSTOMER</span></div>
              <div style={{ paddingLeft: 16, color: '#64748b' }}>
                ↳ Management = data protection &amp; recovery <span style={{ color: '#ef4444', fontWeight: 500 }}>(No Snowflake Fail Safe)</span>
              </div>
              <div style={{ marginTop: 4 }}><span style={{ fontWeight: 600 }}>Storage Billing</span> = <span style={{ color: '#0e7490', fontWeight: 600 }}>Cloud Provider</span></div>
            </div>

            <div style={{ display: 'flex', gap: 8, fontSize: 13, color: '#475569', lineHeight: 1.5, marginBottom: 20 }}>
              <span style={{ color: '#29B5E8', fontWeight: 700, flexShrink: 0 }}>•</span>
              <span>
                Structured off the{' '}
                <ImagePopup src="/snowflake-field-guide/iceberg-metadata.png" alt="Iceberg Table Spec">
                  <button
                    style={{
                      background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                      color: '#29B5E8', fontWeight: 600, fontSize: 13,
                      display: 'inline-flex', alignItems: 'center',
                      textDecoration: 'underline',
                    }}
                  >
                    Iceberg Table Spec <LinkIcon size={13} />
                  </button>
                </ImagePopup>
              </span>
            </div>

            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 16 }}>
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 12, fontWeight: 500 }}>Files stored:</div>
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
                    target="_blank" rel="noreferrer"
                    style={{ fontSize: 16, fontWeight: 700, color: '#29B5E8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                    onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                  >
                    Apache Parquet <LinkIcon size={15} />
                  </a>
                  <div style={{ fontSize: 13, color: '#64748b', marginTop: 3 }}>Data files — open-source columnar format</div>
                </div>
              </div>
              <div
                onClick={() => setShowFileChain(true)}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 14, cursor: 'pointer', borderRadius: 8, padding: '6px 8px', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ fontSize: 22, lineHeight: 1, color: '#94a3b8', marginTop: 2 }}>🗂</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#29B5E8' }}>Iceberg Metadata Files <LinkIcon size={13} /></div>
                  <div style={{ fontSize: 12, color: '#64748b', marginTop: 3 }}>
                    <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 4, fontSize: 11 }}>metadata.json</code>
                    {', '}
                    <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 4, fontSize: 11 }}>manifest lists</code>
                    {', '}
                    <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 4, fontSize: 11 }}>manifests</code>
                    {', etc.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Query flow */}
        <div style={{ width: 280, flexShrink: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
            How a Query Works
          </div>
          <div style={{
            border: '1.5px solid #e2e8f0', borderRadius: 12,
            background: 'white', overflow: 'hidden',
          }}>
            {[
              {
                n: '1',
                actor: 'Snowflake',
                color: '#29B5E8',
                text: 'Queries the Iceberg table and asks the Catalog:',
                quote: '"Where is the current metadata file for this table?"',
              },
              {
                n: '2',
                actor: 'Catalog',
                color: '#7C3AED',
                text: 'Returns the path to metadata.json in cloud storage.',
                quote: null,
              },
              {
                n: '3',
                actor: 'Snowflake',
                color: '#29B5E8',
                text: 'Reads metadata.json, finds the current-snapshot-id.',
                quote: null,
              },
              {
                n: '4',
                actor: 'Snowflake',
                color: '#29B5E8',
                text: 'Follows snapshot → manifest list → manifests → reads Parquet data files from Cloud Storage.',
                quote: null,
              },
            ].map((step, i, arr) => (
              <div key={i}>
                <div style={{ padding: '16px 16px 14px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                    background: step.color, color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 800, marginTop: 1,
                  }}>{step.n}</div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: step.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                      {step.actor}
                    </div>
                    <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>{step.text}</div>
                    {step.quote && (
                      <div style={{
                        marginTop: 8, padding: '7px 10px',
                        background: `${step.color}08`,
                        border: `1px solid ${step.color}25`,
                        borderRadius: 7,
                        fontSize: 12, color: '#334155', fontStyle: 'italic', lineHeight: 1.5,
                      }}>
                        {step.quote}
                      </div>
                    )}
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2v10M4 9l4 4 4-4" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
                {i < arr.length - 1 && <div style={{ height: 1, background: '#f1f5f9', margin: '0 16px' }} />}
              </div>
            ))}
          </div>
        </div>

      </div>

      {showFileChain && <FileChainModal onClose={() => setShowFileChain(false)} />}
    </div>
  );
}
