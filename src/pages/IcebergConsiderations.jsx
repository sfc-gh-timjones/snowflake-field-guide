const SF = { background: 'linear-gradient(135deg, #29B5E8, #0288d1)', color: 'white', padding: '3px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap' };
const CU = { background: 'linear-gradient(135deg, #66bb6a, #43a047)', color: 'white', padding: '3px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap' };
const SH = { background: 'linear-gradient(135deg, #ffa726, #f57c00)', color: 'white', padding: '3px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap' };
const NA = { color: '#94a3b8', fontSize: 11, border: '1px dashed #cbd5e1', padding: '3px 10px', borderRadius: 12, whiteSpace: 'nowrap' };

const BADGE = { SF, CU, SH, NA };

function Pill({ type, label }) {
  return <span style={BADGE[type]}>{label || type === 'NA' ? (label || 'N/A') : type === 'SF' ? 'Snowflake' : type === 'CU' ? 'Customer' : 'Shared'}</span>;
}

function SectionTitle({ children }) {
  return <div style={{ fontSize: 13, fontWeight: 700, color: '#29B5E8', margin: '14px 0 8px', borderBottom: '1px solid #e2e8f0', paddingBottom: 5 }}>{children}</div>;
}

function OptionList({ items }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {items.map((item, i) => (
        <li key={i} style={{ padding: '7px 0', borderBottom: i < items.length - 1 ? '1px solid #f1f5f9' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <code style={{ fontFamily: "'Monaco','Consolas',monospace", fontSize: 12, color: '#1e293b', background: '#f1f5f9', padding: '1px 5px', borderRadius: 4 }}>{item.name}</code>
          <span style={{ fontSize: 12, color: '#64748b', textAlign: 'right' }}>{item.desc}</span>
        </li>
      ))}
    </ul>
  );
}

function Card({ children, fullWidth, highlight, style = {} }) {
  return (
    <div style={{
      gridColumn: fullWidth ? '1 / -1' : undefined,
      background: 'white',
      borderRadius: 14,
      padding: 24,
      border: highlight ? '1.5px solid #29B5E8' : '1.5px solid #e2e8f0',
      ...style,
    }}>
      {children}
    </div>
  );
}

function CardHeader({ icon, title, iconBg }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, background: iconBg, flexShrink: 0 }}>
        {icon}
      </div>
      <span style={{ fontSize: 16, fontWeight: 700, color: '#1e293b' }}>{title}</span>
    </div>
  );
}

function Tag({ children, variant }) {
  const styles = {
    default: { background: '#f1f5f9', color: '#475569' },
    new: { background: 'linear-gradient(135deg, #66bb6a, #43a047)', color: 'white' },
    preview: { background: 'linear-gradient(135deg, #ffa726, #f57c00)', color: 'white' },
  };
  return <span style={{ ...styles[variant || 'default'], padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500 }}>{children}</span>;
}

function ComparisonTable({ headers, rows }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i} style={{ padding: '10px 10px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', color: '#29B5E8', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => {
          if (row.section) {
            return (
              <tr key={i}>
                <td colSpan={headers.length} style={{ background: '#f8fafc', color: '#29B5E8', fontWeight: 700, padding: '10px 10px', fontSize: 12 }}>{row.section}</td>
              </tr>
            );
          }
          return (
            <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
              {row.cells.map((cell, j) => (
                <td key={j} style={{ padding: '9px 10px', verticalAlign: 'middle' }}>
                  {typeof cell === 'string' ? <span style={{ color: '#475569', fontSize: 13 }}>{cell}</span> : cell}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default function IcebergConsiderations() {
  const catalogGridItems = [
    { title: 'Snowflake', desc: 'Full platform support, read/write, compaction' },
    { title: 'AWS Glue', desc: 'Iceberg REST catalog integration' },
    { title: 'Unity Catalog', desc: 'Databricks integration' },
    { title: 'OpenCatalog', desc: 'Polaris / REST catalog' },
  ];

  return (
    <div style={{ marginTop: 40 }}>
      <div style={{ borderTop: '2px solid #e2e8f0', paddingTop: 32, marginBottom: 8 }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>Iceberg Table Options — Full Reference</h3>
        <p style={{ fontSize: 14, color: '#64748b', marginBottom: 28 }}>Complete guide to Apache Iceberg integration with Snowflake</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>

        {/* Catalog Options */}
        <Card highlight>
          <CardHeader icon="⚙️" title="Catalog Options" iconBg="linear-gradient(135deg, #29B5E8, #0288d1)" />
          <p style={{ fontSize: 13, color: '#64748b', marginBottom: 14 }}>Choose how Iceberg metadata is managed</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {catalogGridItems.map((item, i) => (
              <div key={i} style={{ background: '#f8fafc', padding: '12px 10px', borderRadius: 10, textAlign: 'center' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0e7490', marginBottom: 4 }}>{item.title}</div>
                <p style={{ fontSize: 11, color: '#64748b', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Storage Options */}
        <Card>
          <CardHeader icon="📁" title="Storage Options" iconBg="linear-gradient(135deg, #66bb6a, #43a047)" />
          <p style={{ fontSize: 13, color: '#64748b', marginBottom: 12 }}>External volume configurations for data storage</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 4 }}>
            {['Amazon S3', 'Azure Blob', 'Azure ADLS Gen2', 'Google Cloud Storage', 'Cross-Cloud', 'Cross-Region'].map(t => <Tag key={t}>{t}</Tag>)}
          </div>
          <SectionTitle>Key Parameters</SectionTitle>
          <OptionList items={[
            { name: 'EXTERNAL_VOLUME', desc: 'Storage connection' },
            { name: 'BASE_LOCATION', desc: 'Directory path' },
            { name: 'ALLOW_WRITES', desc: 'Write permissions' },
          ]} />
        </Card>

        {/* Table Creation */}
        <Card>
          <CardHeader icon="📖" title="Table Creation Options" iconBg="linear-gradient(135deg, #ab47bc, #7b1fa2)" />
          <SectionTitle>CREATE ICEBERG TABLE Parameters</SectionTitle>
          <OptionList items={[
            { name: 'CATALOG', desc: "'SNOWFLAKE' or integration name" },
            { name: 'CATALOG_TABLE_NAME', desc: 'External catalog table ref' },
            { name: 'CATALOG_NAMESPACE', desc: 'External catalog namespace' },
            { name: 'METADATA_FILE_PATH', desc: 'For Iceberg files in storage' },
            { name: 'CATALOG_SYNC', desc: 'Sync with Open Catalog' },
          ]} />
        </Card>

        {/* Performance */}
        <Card>
          <CardHeader icon="⚙️" title="Performance Options" iconBg="linear-gradient(135deg, #ffa726, #f57c00)" />
          <SectionTitle>Optimization Parameters</SectionTitle>
          <OptionList items={[
            { name: 'CLUSTER BY', desc: 'Clustering key expression' },
            { name: 'TARGET_FILE_SIZE', desc: 'AUTO | 16MB | 32MB | 64MB | 128MB' },
            { name: 'PATH_LAYOUT', desc: 'FLAT | HIERARCHICAL' },
            { name: 'STORAGE_SERIALIZATION_POLICY', desc: 'COMPATIBLE | OPTIMIZED' },
            { name: 'ENABLE_DATA_COMPACTION', desc: 'Auto compaction (TRUE/FALSE)' },
          ]} />
        </Card>

        {/* Partitioning */}
        <Card>
          <CardHeader icon="📈" title="Partitioning Options" iconBg="linear-gradient(135deg, #26a69a, #00897b)" />
          <p style={{ fontSize: 13, color: '#64748b', marginBottom: 12 }}>Iceberg partition transforms for query optimization</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
            {['Identity', 'BUCKET(n, col)', 'TRUNCATE(w, col)', 'YEAR(col)', 'MONTH(col)', 'DAY(col)', 'HOUR(col)'].map(t => <Tag key={t}>{t}</Tag>)}
          </div>
          <SectionTitle>Partition Evolution</SectionTitle>
          <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, marginTop: 8 }}>
            Use <code style={{ color: '#0e7490', background: '#f1f5f9', padding: '1px 5px', borderRadius: 4, fontSize: 11 }}>ALTER ICEBERG TABLE ADD/DROP PARTITION FIELD</code> to evolve partitions without rewriting data
          </p>
        </Card>

        {/* Refresh & Sync */}
        <Card>
          <CardHeader icon="🕑" title="Refresh & Sync Options" iconBg="linear-gradient(135deg, #ec407a, #c2185b)" />
          <SectionTitle>Auto-Refresh Parameters</SectionTitle>
          <OptionList items={[
            { name: 'AUTO_REFRESH', desc: 'Enable automatic refresh' },
            { name: 'REFRESH_INTERVAL_SECONDS', desc: 'Polling interval' },
            { name: 'REPLACE_INVALID_CHARACTERS', desc: 'Handle invalid UTF-8' },
          ]} />
          <SectionTitle>Time Travel & Retention</SectionTitle>
          <OptionList items={[
            { name: 'DATA_RETENTION_TIME_IN_DAYS', desc: 'Time travel window' },
            { name: 'MAX_DATA_EXTENSION_TIME_IN_DAYS', desc: 'Extended retention' },
            { name: 'CHANGE_TRACKING', desc: 'Enable for streams' },
          ]} />
        </Card>

        {/* CLD - full width */}
        <Card fullWidth>
          <CardHeader icon="🔗" title="Catalog-Linked Database (CLD)" iconBg="linear-gradient(135deg, #29B5E8, #0288d1)" />
          <p style={{ fontSize: 13, color: '#64748b', marginBottom: 14 }}>Auto-discover and sync tables from external catalogs without creating individual Iceberg tables</p>
          <ComparisonTable
            headers={['Parameter', 'Description', 'Example Values']}
            rows={[
              { cells: ['LINKED_CATALOG', 'Catalog integration reference', 'my_glue_integration'] },
              { cells: ['ALLOWED_NAMESPACES', 'Limit auto-discovery scope', "['db1', 'db2.schema1']"] },
              { cells: ['BLOCKED_NAMESPACES', 'Exclude specific namespaces', "['temp', 'staging']"] },
              { cells: ['NAMESPACE_FLATTEN_DELIMITER', 'Delimiter for nested namespaces', "'_' (default), '$'"] },
              { cells: ['ICEBERG_VERSION_DEFAULT', 'Default Iceberg spec version', '2, 3 (preview)'] },
              { cells: ['ENABLE_ICEBERG_MERGE_ON_READ', 'Enable MoR for DML operations', 'TRUE | FALSE'] },
            ]}
          />
        </Card>

        {/* Feature Comparison - full width */}
        <Card fullWidth>
          <CardHeader icon="✅" title="Feature Comparison: Snowflake-Managed vs External Catalog" iconBg="linear-gradient(135deg, #66bb6a, #43a047)" />
          <ComparisonTable
            headers={['Feature', 'Snowflake as Catalog', 'External Catalog', 'Catalog-Linked DB']}
            rows={[
              { cells: ['Read Access', '✅', '✅', '✅'] },
              { cells: ['Write Access', '✅', '✅ (REST catalogs)', '✅'] },
              { cells: ['Auto Compaction', '✅', '❌', '❌'] },
              { cells: ['Clustering', '✅', '❌', '❌'] },
              { cells: ['Standard Streams', '✅', '❌ (insert-only)', '❌ (insert-only)'] },
              { cells: ['Replication', '✅', '❌', '❌'] },
              { cells: ['Cloning', '✅', '❌', '❌'] },
              { cells: ['Catalog-Vended Credentials', '❌', '✅', '✅'] },
              { cells: ['Open Catalog Sync', '✅', '✅', '✅'] },
            ]}
          />
        </Card>

        {/* Governance */}
        <Card>
          <CardHeader icon="🔒" title="Governance Options" iconBg="linear-gradient(135deg, #ab47bc, #7b1fa2)" />
          <SectionTitle>Security & Policies</SectionTitle>
          <OptionList items={[
            { name: 'MASKING POLICY', desc: 'Column-level masking' },
            { name: 'ROW ACCESS POLICY', desc: 'Row-level security' },
            { name: 'PROJECTION POLICY', desc: 'Column projection control' },
            { name: 'AGGREGATION POLICY', desc: 'Aggregation constraints' },
            { name: 'TAG', desc: 'Object tagging' },
          ]} />
        </Card>

        {/* New & Preview */}
        <Card>
          <CardHeader icon="🎉" title="New & Preview Features" iconBg="linear-gradient(135deg, #ffa726, #f57c00)" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
            <Tag variant="preview">Iceberg V3 Support</Tag>
            <Tag variant="preview">ADLS Gen2</Tag>
            <Tag variant="new">External Engine Writes</Tag>
            <Tag variant="new">Delta Direct</Tag>
          </div>
          <SectionTitle>Version Options</SectionTitle>
          <OptionList items={[
            { name: 'ICEBERG_VERSION', desc: '1, 2, or 3 (preview)' },
            { name: 'ENABLE_ICEBERG_MERGE_ON_READ', desc: 'Position deletes support' },
            { name: 'ERROR_LOGGING', desc: 'DML error tracking' },
          ]} />
        </Card>

        {/* Responsibility Matrix - full width */}
        <Card fullWidth style={{ border: '1.5px solid #d8b4fe' }}>
          <CardHeader icon="⚖️" title="Responsibility Matrix: Customer vs Snowflake Managed" iconBg="linear-gradient(135deg, #ab47bc, #7b1fa2)" />
          <p style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>Understanding who manages each component across different Iceberg configurations</p>
          <div style={{ display: 'flex', gap: 20, marginBottom: 16, flexWrap: 'wrap' }}>
            {[
              { style: SF, label: 'Snowflake Managed' },
              { style: CU, label: 'Customer Managed' },
              { style: SH, label: 'Shared / Configurable' },
              { style: NA, label: 'Not Available' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ ...item.style, fontSize: 10 }}>{item.label}</span>
              </div>
            ))}
          </div>
          <ComparisonTable
            headers={['Component', 'Snowflake as Catalog', 'External Catalog', 'Catalog-Linked DB']}
            rows={[
              { section: 'Storage & Infrastructure' },
              { cells: ['Cloud Storage (S3/Azure/GCS)', <Pill type="CU" />, <Pill type="CU" />, <Pill type="CU" />] },
              { cells: ['External Volume Configuration', <Pill type="CU" />, <Pill type="SH" label="Optional" />, <Pill type="SH" label="Optional" />] },
              { cells: ['IAM Roles & Trust Policies', <Pill type="CU" />, <Pill type="CU" />, <Pill type="CU" />] },
              { cells: ['Data Protection & Recovery', <Pill type="CU" />, <Pill type="CU" />, <Pill type="CU" />] },
              { section: 'Catalog & Metadata' },
              { cells: ['Catalog Management', <Pill type="SF" />, <Pill type="CU" />, <Pill type="CU" />] },
              { cells: ['Metadata Pointer Updates', <Pill type="SF" />, <Pill type="CU" />, <Pill type="SH" label="Shared" />] },
              { cells: ['Schema Evolution', <Pill type="SF" />, <Pill type="CU" />, <Pill type="CU" />] },
              { cells: ['Table Discovery & Sync', <Pill type="NA" />, <Pill type="CU" />, <Pill type="SF" />] },
              { section: 'Table Optimization & Maintenance' },
              { cells: ['Data Compaction', <Pill type="SF" />, <Pill type="CU" />, <Pill type="CU" />] },
              { cells: ['Manifest Compaction', <Pill type="SF" />, <Pill type="CU" />, <Pill type="CU" />] },
              { cells: ['Snapshot Expiration', <Pill type="SF" />, <Pill type="CU" />, <Pill type="CU" />] },
              { cells: ['Orphan File Cleanup', <Pill type="SH" label="Contact Support" />, <Pill type="CU" />, <Pill type="CU" />] },
              { cells: ['Automatic Clustering', <Pill type="SF" />, <Pill type="NA" />, <Pill type="NA" />] },
              { section: 'Data Refresh & Sync' },
              { cells: ['Auto-Refresh from External', <Pill type="NA" />, <Pill type="SF" />, <Pill type="SF" />] },
              { cells: ['Manual Refresh Trigger', <Pill type="NA" />, <Pill type="CU" />, <Pill type="CU" />] },
              { cells: ['Time Travel & Retention', <Pill type="SH" label="Configurable" />, <Pill type="CU" />, <Pill type="CU" />] },
              { section: 'Access & Security' },
              { cells: ['Query Compute', <Pill type="SF" />, <Pill type="SF" />, <Pill type="SF" />] },
              { cells: ['Access Control (RBAC)', <Pill type="SF" />, <Pill type="SF" />, <Pill type="SF" />] },
              { cells: ['Data Masking & Row Policies', <Pill type="SF" />, <Pill type="SF" />, <Pill type="SF" />] },
              { cells: ['External Catalog Access Control', <Pill type="NA" />, <Pill type="CU" />, <Pill type="CU" />] },
            ]}
          />
        </Card>

        {/* Cost Implications - full width */}
        <Card fullWidth style={{ border: '1.5px solid #fed7aa' }}>
          <CardHeader icon="💰" title="Cost Implications" iconBg="linear-gradient(135deg, #ffa726, #f57c00)" />
          <p style={{ fontSize: 13, color: '#64748b', marginBottom: 20 }}>Understanding billing differences between Snowflake-managed and externally managed Iceberg tables</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
            {[
              { title: 'Storage Costs', color: '#16a34a', items: ['✅ Snowflake does NOT bill for storage', '✅ Cloud provider bills directly', '⚠️ Cross-region = egress costs'] },
              { title: 'Compute Costs', color: '#29B5E8', items: ['✅ Standard warehouse credits', '✅ Same for both table types', '✅ Billed on warehouse usage'] },
              { title: 'Additional Costs', color: '#ec407a', items: ['Horizon API: 0.5 credit/M calls', 'Private connectivity charges', 'CLD: Cloud services compute'] },
            ].map((block, i) => (
              <div key={i} style={{ background: '#f8fafc', padding: '14px 16px', borderRadius: 10, border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: block.color, marginBottom: 10 }}>{block.title}</div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {block.items.map((item, j) => <li key={j} style={{ padding: '4px 0', fontSize: 12, color: '#475569' }}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <SectionTitle>Optimization & Maintenance Costs</SectionTitle>
          <ComparisonTable
            headers={['Feature', 'Snowflake-Managed', 'Externally Managed', 'Billing Start']}
            rows={[
              { cells: ['Data Compaction', '✅ Billed (enabled by default)', '❌ You manage externally', 'Oct 20, 2025'] },
              { cells: ['Automatic Clustering', '✅ Billed (disabled by default)', '❌ Not available', 'Standalone feature'] },
              { cells: ['Manifest Compaction', '🟢 FREE (auto, cannot disable)', '❌ Not available', '—'] },
              { cells: ['Snapshot Expiry', '🟢 FREE (auto, cannot disable)', '❌ You manage externally', '—'] },
              { cells: ['CLD Auto-Discovery', '—', 'Cloud Services compute', 'Dec 15, 2025'] },
            ]}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginTop: 24 }}>
            <div style={{ background: '#f0fbff', padding: 20, borderRadius: 12, border: '1px solid #bae6fd' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0e7490', marginBottom: 8 }}>⚙️ Snowflake-Managed</div>
              <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, margin: '0 0 8px' }}>
                <strong>Higher operational convenience.</strong> Automatic maintenance with optimization billing. Best for teams wanting managed infrastructure.
              </p>
              <div style={{ fontSize: 11, color: '#64748b' }}>
                Track costs: <code style={{ background: '#e0f2fe', padding: '1px 5px', borderRadius: 4 }}>ICEBERG_STORAGE_OPTIMIZATION_HISTORY</code>
              </div>
            </div>
            <div style={{ background: '#f0fdf4', padding: 20, borderRadius: 12, border: '1px solid #bbf7d0' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#15803d', marginBottom: 8 }}>🔗 Externally Managed</div>
              <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, margin: '0 0 8px' }}>
                <strong>Lower Snowflake costs, more control.</strong> No automatic optimization billing. Best if you have existing catalog infrastructure.
              </p>
              <div style={{ fontSize: 11, color: '#64748b' }}>You manage: snapshots, metadata, compaction</div>
            </div>
          </div>
        </Card>

      </div>

      <div style={{ textAlign: 'center', marginTop: 28, fontSize: 12, color: '#94a3b8' }}>
        Snowflake Iceberg Tables | Supports Apache Iceberg V1, V2, and V3 (Preview) | Apache Parquet Format
        {' · '}
        <a href="https://docs.snowflake.com/en/user-guide/tables-iceberg" target="_blank" rel="noreferrer" style={{ color: '#29B5E8' }}>
          docs.snowflake.com/en/user-guide/tables-iceberg
        </a>
      </div>
    </div>
  );
}
