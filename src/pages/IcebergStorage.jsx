import { useState } from 'react';

const short = full => {
  const m = full.match(/_([\w\-]{8,10})qxg_0_1_(\d+)\.parquet/);
  if (m) return `${m[1]}_${m[2]}.parquet`;
  return full.replace('snap-', 'snap-').split('/').pop();
};

const ALL_PARQUET = {
  gAaTscqC: [
    'snow_ZID6-CpHlgY_gAaTscqCqxg_0_1_002.parquet',
    'snow_ZID6-CpHlgY_gAaTscqCqxg_0_1_004.parquet',
    'snow_ZID6-CpHlgY_gAaTscqCqxg_0_1_006.parquet',
    'snow_ZID6-CpHlgY_gAaTscqCqxg_0_1_008.parquet',
  ],
  IBaqKMuC: [
    'snow_ZID6-CpHlgY_IBaqKMuCqxg_0_1_002.parquet',
    'snow_ZID6-CpHlgY_IBaqKMuCqxg_0_1_004.parquet',
    'snow_ZID6-CpHlgY_IBaqKMuCqxg_0_1_006.parquet',
    'snow_ZID6-CpHlgY_IBaqKMuCqxg_0_1_008.parquet',
  ],
  '3nh_u9eC': [
    'snow_ZID6-CpHlgY_3nh-u9eCqxg_0_1_002.parquet',
    'snow_ZID6-CpHlgY_3nh-u9eCqxg_0_1_004.parquet',
    'snow_ZID6-CpHlgY_3nh-u9eCqxg_0_1_006.parquet',
  ],
  gETOXvSC: [
    'snow_ZID6-CpHlgY_gETOXvSCqxg_0_1_002.parquet',
    'snow_ZID6-CpHlgY_gETOXvSCqxg_0_1_004.parquet',
    'snow_ZID6-CpHlgY_gETOXvSCqxg_0_1_006.parquet',
  ],
  B7ompAGD: [
    'snow_ZID6-CpHlgY_B7ompAGDqxg_0_1_002.parquet',
    'snow_ZID6-CpHlgY_B7ompAGDqxg_0_1_004.parquet',
    'snow_ZID6-CpHlgY_B7ompAGDqxg_0_1_006.parquet',
    'snow_ZID6-CpHlgY_B7ompAGDqxg_0_1_008.parquet',
    'snow_ZID6-CpHlgY_B7ompAGDqxg_0_1_010.parquet',
    'snow_ZID6-CpHlgY_B7ompAGDqxg_0_1_012.parquet',
    'snow_ZID6-CpHlgY_B7ompAGDqxg_0_1_014.parquet',
  ],
  AAR0xhCD: [
    'snow_ZID6-CpHlgY_AAR0xhCDqxg_0_1_002.parquet',
    'snow_ZID6-CpHlgY_AAR0xhCDqxg_0_1_004.parquet',
    'snow_ZID6-CpHlgY_AAR0xhCDqxg_0_1_006.parquet',
    'snow_ZID6-CpHlgY_AAR0xhCDqxg_0_1_008.parquet',
    'snow_ZID6-CpHlgY_AAR0xhCDqxg_0_1_010.parquet',
    'snow_ZID6-CpHlgY_AAR0xhCDqxg_0_1_012.parquet',
    'snow_ZID6-CpHlgY_AAR0xhCDqxg_0_1_014.parquet',
  ],
};

const SNAPSHOTS = [
  {
    num: 1,
    id: '683231059597613261',
    operation: 'append',
    timestamp: '11:59:46',
    description: 'Initial load — 2,000,000 rows inserted across 4 Parquet files',
    recordCount: 2000000,
    delta: '+2,000,000',
    deltaColor: '#16a34a',
    metadataFiles: [
      { file: '00001-2dc9637a', active: true, snapshotIds: ['683231059597613261'] },
    ],
    manifestList: 'snap-683231059597613261-543776f0',
    manifests: [
      { file: '543776f0-m0', type: 'added', records: 2000000, dataFiles: ALL_PARQUET.gAaTscqC, reused: false },
    ],
    activeDataFiles: { gAaTscqC: ALL_PARQUET.gAaTscqC },
    orphanDataFiles: [],
    orphanManifestLists: [],
  },
  {
    num: 2,
    id: '3524853346065267316',
    operation: 'overwrite',
    timestamp: '12:00:10',
    description: 'Full table overwrite — all 2M rows replaced (CREATE OR REPLACE style)',
    recordCount: 2000000,
    delta: '±0',
    deltaColor: '#64748b',
    metadataFiles: [
      { file: '00001-2dc9637a', active: false, snapshotIds: ['683231059597613261'] },
      { file: '00002-14ee9634', active: true, snapshotIds: ['683231059597613261', '3524853346065267316'] },
    ],
    manifestList: 'snap-3524853346065267316-cf092e73',
    manifests: [
      { file: 'cf092e73-m1', type: 'added', records: 2000000, dataFiles: ALL_PARQUET.IBaqKMuC, reused: false },
      { file: 'cf092e73-m0', type: 'deleted', records: 2000000, dataFiles: ALL_PARQUET.gAaTscqC, reused: false },
    ],
    activeDataFiles: { IBaqKMuC: ALL_PARQUET.IBaqKMuC },
    orphanDataFiles: [{ family: 'gAaTscqC', files: ALL_PARQUET.gAaTscqC, reason: 'Replaced in Snap 2 overwrite' }],
    orphanManifestLists: ['snap-683231059597613261-543776f0'],
  },
  {
    num: 3,
    id: '3153525453017687988',
    operation: 'overwrite',
    timestamp: '12:01:09',
    description: 'DELETE ~30 rows — 3 files rewritten, 1 file survived unchanged',
    recordCount: 1999970,
    delta: '−30',
    deltaColor: '#ef5350',
    metadataFiles: [
      { file: '00001-2dc9637a', active: false, snapshotIds: ['683231059597613261'] },
      { file: '00002-14ee9634', active: false, snapshotIds: ['683231059597613261', '3524853346065267316'] },
      { file: '00003-d71a587c', active: true, snapshotIds: ['683231059597613261', '3524853346065267316', '3153525453017687988'] },
    ],
    manifestList: 'snap-3153525453017687988-a062f65b',
    manifests: [
      { file: 'a062f65b-m1', type: 'added', records: 1966050, dataFiles: ALL_PARQUET['3nh_u9eC'], reused: false },
      { file: 'a062f65b-m0', type: 'existing', records: 33920, dataFiles: ['snow_ZID6-CpHlgY_IBaqKMuCqxg_0_1_004.parquet'], reused: false, note: '3 deleted + 1 surviving' },
    ],
    activeDataFiles: {
      '3nh_u9eC': ALL_PARQUET['3nh_u9eC'],
      'IBaqKMuC (surviving)': ['snow_ZID6-CpHlgY_IBaqKMuCqxg_0_1_004.parquet'],
    },
    orphanDataFiles: [
      { family: 'gAaTscqC', files: ALL_PARQUET.gAaTscqC, reason: 'Replaced in Snap 2' },
      { family: 'IBaqKMuC (_002/_006/_008)', files: ['snow_ZID6-CpHlgY_IBaqKMuCqxg_0_1_002.parquet', 'snow_ZID6-CpHlgY_IBaqKMuCqxg_0_1_006.parquet', 'snow_ZID6-CpHlgY_IBaqKMuCqxg_0_1_008.parquet'], reason: 'Deleted rows rewritten in Snap 3' },
    ],
    orphanManifestLists: ['snap-683231059597613261-543776f0', 'snap-3524853346065267316-cf092e73'],
  },
  {
    num: 4,
    id: '6453267428948014672',
    operation: 'append',
    timestamp: '12:02:32',
    description: 'INSERT 1,500,000 rows — 3 new files added; prior manifests reused',
    recordCount: 3499970,
    delta: '+1,500,000',
    deltaColor: '#16a34a',
    metadataFiles: [
      { file: '00001-2dc9637a', active: false, snapshotIds: ['683231059597613261'] },
      { file: '00002-14ee9634', active: false, snapshotIds: ['683231059597613261', '3524853346065267316'] },
      { file: '00003-d71a587c', active: false, snapshotIds: ['683231059597613261', '3524853346065267316', '3153525453017687988'] },
      { file: '00004-825a4846', active: true, snapshotIds: ['683231059597613261', '3524853346065267316', '3153525453017687988', '6453267428948014672'] },
    ],
    manifestList: 'snap-6453267428948014672-4930b1b7',
    manifests: [
      { file: '4930b1b7-m0', type: 'added', records: 1500000, dataFiles: ALL_PARQUET.gETOXvSC, reused: false },
      { file: 'a062f65b-m1', type: 'existing', records: 1966050, dataFiles: ALL_PARQUET['3nh_u9eC'], reused: true },
      { file: 'a062f65b-m0', type: 'existing', records: 33920, dataFiles: ['snow_ZID6-CpHlgY_IBaqKMuCqxg_0_1_004.parquet'], reused: true },
    ],
    activeDataFiles: {
      gETOXvSC: ALL_PARQUET.gETOXvSC,
      '3nh_u9eC': ALL_PARQUET['3nh_u9eC'],
      'IBaqKMuC_004': ['snow_ZID6-CpHlgY_IBaqKMuCqxg_0_1_004.parquet'],
    },
    orphanDataFiles: [
      { family: 'gAaTscqC', files: ALL_PARQUET.gAaTscqC, reason: 'Replaced in Snap 2' },
      { family: 'IBaqKMuC (_002/_006/_008)', files: ['snow_ZID6-CpHlgY_IBaqKMuCqxg_0_1_002.parquet', 'snow_ZID6-CpHlgY_IBaqKMuCqxg_0_1_006.parquet', 'snow_ZID6-CpHlgY_IBaqKMuCqxg_0_1_008.parquet'], reason: 'Deleted in Snap 3' },
    ],
    orphanManifestLists: ['snap-683231059597613261-543776f0', 'snap-3524853346065267316-cf092e73', 'snap-3153525453017687988-a062f65b'],
  },
  {
    num: 5,
    id: '8792066272258428054',
    operation: 'overwrite',
    timestamp: '12:03:24',
    description: 'DELETE ~200 rows — all 7 active files replaced with 7 new files',
    recordCount: 3499770,
    delta: '−200',
    deltaColor: '#ef5350',
    metadataFiles: [
      { file: '00001-2dc9637a', active: false, snapshotIds: ['683231059597613261'] },
      { file: '00002-14ee9634', active: false, snapshotIds: ['683231059597613261', '3524853346065267316'] },
      { file: '00003-d71a587c', active: false, snapshotIds: ['683231059597613261', '3524853346065267316', '3153525453017687988'] },
      { file: '00004-825a4846', active: false, snapshotIds: ['...', '6453267428948014672'] },
      { file: '00005-b4b5befa', active: true, snapshotIds: ['...', '8792066272258428054'] },
    ],
    manifestList: 'snap-8792066272258428054-91dc7cc2',
    manifests: [
      { file: '91dc7cc2-m3', type: 'added', records: 3499770, dataFiles: ALL_PARQUET.B7ompAGD, reused: false },
      { file: '91dc7cc2-m1', type: 'deleted', records: 1500000, dataFiles: ALL_PARQUET.gETOXvSC, reused: false },
      { file: '91dc7cc2-m0', type: 'deleted', records: 1966050, dataFiles: ALL_PARQUET['3nh_u9eC'], reused: false },
      { file: '91dc7cc2-m2', type: 'deleted', records: 33920, dataFiles: ['snow_ZID6-CpHlgY_IBaqKMuCqxg_0_1_004.parquet'], reused: false },
    ],
    activeDataFiles: { B7ompAGD: ALL_PARQUET.B7ompAGD },
    orphanDataFiles: [
      { family: 'gAaTscqC', files: ALL_PARQUET.gAaTscqC, reason: 'Replaced in Snap 2' },
      { family: 'IBaqKMuC', files: ALL_PARQUET.IBaqKMuC, reason: 'Replaced in Snap 2/3' },
      { family: 'gETOXvSC', files: ALL_PARQUET.gETOXvSC, reason: 'Replaced in Snap 5' },
      { family: '3nh_u9eC', files: ALL_PARQUET['3nh_u9eC'], reason: 'Replaced in Snap 5' },
    ],
    orphanManifestLists: ['snap-683231059597613261-543776f0', 'snap-3524853346065267316-cf092e73', 'snap-3153525453017687988-a062f65b', 'snap-6453267428948014672-4930b1b7'],
  },
  {
    num: 6,
    id: '6464769320989197946',
    operation: 'overwrite',
    timestamp: '12:03:54',
    description: 'Compaction — 7 files rewritten into 7 new files, same record count',
    recordCount: 3499770,
    delta: '±0',
    deltaColor: '#64748b',
    metadataFiles: [
      { file: '00001-2dc9637a', active: false, snapshotIds: ['683231059597613261'] },
      { file: '00002-14ee9634', active: false, snapshotIds: ['683231059597613261', '3524853346065267316'] },
      { file: '00003-d71a587c', active: false, snapshotIds: ['...', '3153525453017687988'] },
      { file: '00004-825a4846', active: false, snapshotIds: ['...', '6453267428948014672'] },
      { file: '00005-b4b5befa', active: false, snapshotIds: ['...', '8792066272258428054'] },
      { file: '00006-a1090c96', active: true, snapshotIds: ['...', '6464769320989197946'] },
    ],
    manifestList: 'snap-6464769320989197946-53880c0c',
    manifests: [
      { file: '53880c0c-m1', type: 'added', records: 3499770, dataFiles: ALL_PARQUET.AAR0xhCD, reused: false },
      { file: '53880c0c-m0', type: 'deleted', records: 3499770, dataFiles: ALL_PARQUET.B7ompAGD, reused: false },
    ],
    activeDataFiles: { AAR0xhCD: ALL_PARQUET.AAR0xhCD },
    orphanDataFiles: [
      { family: 'gAaTscqC', files: ALL_PARQUET.gAaTscqC, reason: 'Replaced in Snap 2' },
      { family: 'IBaqKMuC', files: ALL_PARQUET.IBaqKMuC, reason: 'Replaced in Snap 2/3' },
      { family: 'gETOXvSC', files: ALL_PARQUET.gETOXvSC, reason: 'Replaced in Snap 5' },
      { family: '3nh_u9eC', files: ALL_PARQUET['3nh_u9eC'], reason: 'Replaced in Snap 5' },
      { family: 'B7ompAGD', files: ALL_PARQUET.B7ompAGD, reason: 'Replaced in Snap 6 compaction' },
    ],
    orphanManifestLists: ['snap-683231059597613261-543776f0', 'snap-3524853346065267316-cf092e73', 'snap-3153525453017687988-a062f65b', 'snap-6453267428948014672-4930b1b7', 'snap-8792066272258428054-91dc7cc2'],
  },
];

const OP_COLOR = { append: '#16a34a', overwrite: '#f97316' };
const OP_LABEL = { append: 'INSERT', overwrite: 'UPDATE / DELETE' };

function Tooltip({ text, children }) {
  const [show, setShow] = useState(false);
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div style={{
          position: 'absolute', bottom: '110%', left: '50%', transform: 'translateX(-50%)',
          background: '#1e293b', color: 'white', padding: '5px 10px', borderRadius: 6,
          fontSize: 11, whiteSpace: 'nowrap', zIndex: 100, pointerEvents: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}>
          {text}
          <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', borderTop: '5px solid #1e293b', borderLeft: '5px solid transparent', borderRight: '5px solid transparent' }} />
        </div>
      )}
    </span>
  );
}

function Arrow() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: 24, alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: 1.5, height: 14, background: '#29B5E8' }} />
        <div style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '7px solid #29B5E8' }} />
      </div>
    </div>
  );
}

function FileBox({ label, fullName, active, type, reused, note, small }) {
  const typeStyles = {
    added: { border: '2px solid #16a34a', background: '#f0fdf4' },
    deleted: { border: '2px solid #ef5350', background: '#fff5f5' },
    existing: { border: '2px solid #f97316', background: '#fff7ed' },
    active: { border: '2px solid #29B5E8', background: '#f0fbff' },
    orphan: { border: '1.5px dashed #cbd5e1', background: '#f8fafc', opacity: 0.7 },
    metadata: { border: '2px solid #29B5E8', background: '#f0fbff' },
    'metadata-inactive': { border: '1.5px solid #e2e8f0', background: '#f8fafc' },
  };
  const style = typeStyles[type] || typeStyles.active;
  return (
    <Tooltip text={fullName || label}>
      <div style={{
        ...style,
        borderRadius: 8, padding: small ? '5px 8px' : '8px 10px',
        fontSize: small ? 10 : 11, fontFamily: "'Monaco','Consolas',monospace",
        color: type === 'orphan' || type === 'metadata-inactive' ? '#94a3b8' : '#1e293b',
        textAlign: 'center', minWidth: small ? 80 : 100, maxWidth: 140,
        position: 'relative', lineHeight: 1.4,
      }}>
        {label}
        {reused && <div style={{ fontSize: 9, color: '#f97316', fontWeight: 700, marginTop: 2 }}>REUSED</div>}
        {note && <div style={{ fontSize: 9, color: '#64748b', marginTop: 2 }}>{note}</div>}
      </div>
    </Tooltip>
  );
}

function ManifestTypeBadge({ type }) {
  const styles = {
    added: { background: '#16a34a', color: 'white' },
    deleted: { background: '#ef5350', color: 'white' },
    existing: { background: '#f97316', color: 'white' },
  };
  const labels = { added: 'ADDED', deleted: 'DELETED', existing: 'EXISTING' };
  return (
    <span style={{ ...styles[type], fontSize: 9, padding: '1px 6px', borderRadius: 8, fontWeight: 700, display: 'block', marginTop: 3 }}>
      {labels[type]}
    </span>
  );
}

function DataFileStack({ files, family, orphan }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: orphan ? '#94a3b8' : '#0e7490', marginBottom: 2, fontFamily: 'monospace' }}>
        {family}
      </div>
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {files.map((f, i) => (
          <Tooltip key={f} text={f}>
            <div style={{
              border: orphan ? '1.5px dashed #cbd5e1' : '1.5px solid #29B5E8',
              background: orphan ? '#f8fafc' : '#f0fbff',
              borderRadius: 5, padding: '3px 7px',
              fontSize: 10, fontFamily: "'Monaco','Consolas',monospace",
              color: orphan ? '#94a3b8' : '#0e7490',
              opacity: orphan ? 0.65 : 1,
            }}>
              {short(f)}
            </div>
          </Tooltip>
        ))}
      </div>
      {orphan && (
        <div style={{ fontSize: 9, color: '#94a3b8', marginTop: 2, fontStyle: 'italic', textAlign: 'center', maxWidth: 110 }}>
          orphan
        </div>
      )}
    </div>
  );
}

function SnapshotDiagram({ snap }) {
  return (
    <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 14, padding: '28px 24px', overflowX: 'auto' }}>

      {/* Catalog */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 4 }}>
        <div style={{
          border: '2px solid #29B5E8', borderRadius: '50% / 12px', background: 'linear-gradient(180deg,#f0fbff,#e0f4fd)',
          padding: '10px 32px', textAlign: 'center', position: 'relative', minWidth: 200,
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#0e7490' }}>🗄 Snowflake Catalog</div>
          <div style={{ fontSize: 11, color: '#475569', marginTop: 4, fontFamily: 'monospace' }}>ORDERS_ICEBERG</div>
          <div style={{ fontSize: 10, color: '#64748b', marginTop: 4 }}>
            current → <span style={{ color: '#0e7490', fontWeight: 600 }}>{snap.metadataFiles.find(m => m.active)?.file}.metadata.json</span>
          </div>
        </div>
        <Arrow />
      </div>

      {/* Layer label */}
      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8', marginBottom: 8 }}>
        — metadata layer —
      </div>

      {/* Metadata files row */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
        {snap.metadataFiles.map(m => (
          <FileBox
            key={m.file}
            label={m.file + '.json'}
            fullName={m.file + '.metadata.json'}
            type={m.active ? 'metadata' : 'metadata-inactive'}
          />
        ))}
      </div>
      <Arrow />

      {/* Manifest List */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
        <div style={{ border: '2px solid #29B5E8', background: '#f0fbff', borderRadius: 8, padding: '8px 16px', textAlign: 'center' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>Manifest List</div>
          <Tooltip text={snap.manifestList + '.avro'}>
            <div style={{ fontSize: 11, fontFamily: "'Monaco','Consolas',monospace", color: '#0e7490' }}>
              {snap.manifestList.replace('snap-', 'snap-').split('-').slice(0, 3).join('-') + '…' + snap.manifestList.slice(-8)}
            </div>
          </Tooltip>
        </div>
      </div>
      <Arrow />

      {/* Manifests row */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginBottom: 4, flexWrap: 'wrap' }}>
        {snap.manifests.map(m => (
          <div key={m.file} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              border: m.type === 'added' ? '2px solid #16a34a' : m.type === 'deleted' ? '2px solid #ef5350' : '2px solid #f97316',
              background: m.type === 'added' ? '#f0fdf4' : m.type === 'deleted' ? '#fff5f5' : '#fff7ed',
              borderRadius: 8, padding: '7px 12px', textAlign: 'center', minWidth: 110,
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Manifest</div>
              <Tooltip text={m.file + '.avro'}>
                <div style={{ fontSize: 11, fontFamily: "'Monaco','Consolas',monospace", color: '#1e293b', marginTop: 2 }}>{m.file}</div>
              </Tooltip>
              <ManifestTypeBadge type={m.type} />
              {m.reused && <div style={{ fontSize: 9, color: '#f97316', fontWeight: 700, marginTop: 2 }}>↩ REUSED</div>}
              <div style={{ fontSize: 10, color: '#64748b', marginTop: 3 }}>{m.records.toLocaleString()} rows</div>
              {m.note && <div style={{ fontSize: 9, color: '#64748b', marginTop: 2, fontStyle: 'italic' }}>{m.note}</div>}
            </div>
          </div>
        ))}
      </div>
      <Arrow />

      {/* Layer label */}
      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8', marginBottom: 10 }}>
        — data layer —
      </div>

      {/* Active data files */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap', marginBottom: 20 }}>
        {Object.entries(snap.activeDataFiles).map(([family, files]) => (
          <DataFileStack key={family} family={family} files={files} orphan={false} />
        ))}
      </div>

      {/* Orphan section */}
      {(snap.orphanManifestLists.length > 0 || snap.orphanDataFiles.length > 0) && (
        <div style={{ borderTop: '1.5px dashed #e2e8f0', paddingTop: 14, marginTop: 4 }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#cbd5e1', marginBottom: 14, textAlign: 'center' }}>
            ⚠ orphan files in storage (not reachable from current snapshot)
          </div>

          {/* Orphan manifest lists */}
          {snap.orphanManifestLists.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600, textAlign: 'center', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Manifest Lists</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
                {snap.orphanManifestLists.map(ml => (
                  <Tooltip key={ml} text={ml + '.avro'}>
                    <div style={{ border: '1.5px dashed #cbd5e1', background: '#f8fafc', borderRadius: 8, padding: '6px 12px', textAlign: 'center', opacity: 0.7 }}>
                      <div style={{ fontSize: 9, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 2 }}>Manifest List</div>
                      <div style={{ fontSize: 10, fontFamily: "'Monaco','Consolas',monospace", color: '#94a3b8' }}>
                        {ml.replace('snap-', '').split('-').slice(0, 2).join('').slice(0, 10) + '…' + ml.slice(-8)}
                      </div>
                    </div>
                  </Tooltip>
                ))}
              </div>
            </div>
          )}

          {/* Orphan data files */}
          {snap.orphanDataFiles.length > 0 && (
            <div>
              <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600, textAlign: 'center', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Data Files</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
                {snap.orphanDataFiles.map(o => (
                  <div key={o.family} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <DataFileStack family={o.family} files={o.files} orphan={true} />
                    <div style={{ fontSize: 9, color: '#94a3b8', marginTop: 4, fontStyle: 'italic', textAlign: 'center', maxWidth: 120 }}>{o.reason}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function IcebergStorage() {
  const [snapIdx, setSnapIdx] = useState(0);
  const snap = SNAPSHOTS[snapIdx];

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>Iceberg Cloud Storage</h2>
      <p style={{ color: '#64748b', fontSize: 14, marginBottom: 28, maxWidth: 680 }}>
        Real metadata files from <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 4 }}>ORDERS_ICEBERG</code>. Use the slider to walk through each snapshot and see how the active metadata chain and orphan files change.
      </p>

      {/* Slider + header */}
      <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', whiteSpace: 'nowrap' }}>Snapshot</div>
          <input
            type="range" min={0} max={5} value={snapIdx}
            onChange={e => setSnapIdx(Number(e.target.value))}
            style={{ flex: 1, accentColor: '#29B5E8', cursor: 'pointer' }}
          />
          <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', whiteSpace: 'nowrap' }}>
            {snapIdx + 1} / 6
          </div>
        </div>

        {/* Snapshot markers */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
          {SNAPSHOTS.map((s, i) => (
            <button
              key={i}
              onClick={() => setSnapIdx(i)}
              style={{
                flex: 1, padding: '6px 4px', borderRadius: 8, cursor: 'pointer', fontSize: 11, fontWeight: 600,
                border: i === snapIdx ? `2px solid ${OP_COLOR[s.operation]}` : '1.5px solid #e2e8f0',
                background: i === snapIdx ? (s.operation === 'append' ? '#f0fdf4' : '#fff7ed') : '#f8fafc',
                color: i === snapIdx ? OP_COLOR[s.operation] : '#94a3b8',
              }}
            >
              S{s.num}
            </button>
          ))}
        </div>

        {/* Snapshot summary */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ background: OP_COLOR[snap.operation], color: 'white', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>
              {OP_LABEL[snap.operation]}
            </span>
            <span style={{ fontSize: 12, color: '#64748b' }}>{snap.timestamp}</span>
          </div>
          <div style={{ fontSize: 13, color: '#475569', flex: 1 }}>{snap.description}</div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: snap.deltaColor }}>{snap.delta}</div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>{snap.recordCount.toLocaleString()} total</div>
          </div>
        </div>
      </div>

      <SnapshotDiagram snap={snap} />

      {/* Legend */}
      <div style={{ marginTop: 16, display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 11, color: '#64748b' }}>
        {[
          { color: '#29B5E8', label: 'Active path' },
          { color: '#16a34a', label: 'Added files' },
          { color: '#ef5350', label: 'Deleted files' },
          { color: '#f97316', label: 'Existing / reused' },
          { color: '#cbd5e1', label: 'Orphan (in storage, not referenced)', dashed: true },
        ].map(item => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, border: `${item.dashed ? '1.5px dashed' : '2px solid'} ${item.color}`, background: 'white' }} />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
