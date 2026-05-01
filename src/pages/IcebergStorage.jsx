import { useState } from 'react';

const short = full => {
  const m = full.match(/_([\w\-]{8,10})(?:qxg|Fqxg)_0_\d_(\d+)\.(parquet|puffin)/);
  if (m) return `${m[1]}_${m[2]}.${m[3]}`;
  return full.split('/').pop();
};

const ALL = {
  // Parquet (data files)
  'X-rqSgaF': [
    'snow_ZID6-CpHlgY_X-rqSgaFqxg_0_1_002.parquet',
    'snow_ZID6-CpHlgY_X-rqSgaFqxg_0_1_004.parquet',
    'snow_ZID6-CpHlgY_X-rqSgaFqxg_0_1_006.parquet',
    'snow_ZID6-CpHlgY_X-rqSgaFqxg_0_1_008.parquet',
  ],
  AgAjQxSF: [
    'snow_ZID6-CpHlgY_AgAjQxSFqxg_0_1_004.parquet',
    'snow_ZID6-CpHlgY_AgAjQxSFqxg_0_1_005.parquet',
    'snow_ZID6-CpHlgY_AgAjQxSFqxg_0_1_006.parquet',
  ],
  gNyIOyKF: [
    'snow_ZID6-CpHlgY_gNyIOyKFqxg_0_2_002.parquet',
    'snow_ZID6-CpHlgY_gNyIOyKFqxg_0_2_004.parquet',
  ],
  wxCeZSOF: [
    'snow_ZID6-CpHlgY_wxCeZSOFqxg_0_1_002.parquet',
    'snow_ZID6-CpHlgY_wxCeZSOFqxg_0_1_004.parquet',
    'snow_ZID6-CpHlgY_wxCeZSOFqxg_0_1_007.parquet',
    'snow_ZID6-CpHlgY_wxCeZSOFqxg_0_1_008.parquet',
    'snow_ZID6-CpHlgY_wxCeZSOFqxg_0_1_010.parquet',
  ],
  // Puffin (delete vectors)
  BAAjQxSF: [
    'snow_ZID6-CpHlgY_BAAjQxSFqxg_0_1_009.puffin',
    'snow_ZID6-CpHlgY_BAAjQxSFqxg_0_1_012.puffin',
    'snow_ZID6-CpHlgY_BAAjQxSFqxg_0_1_015.puffin',
    'snow_ZID6-CpHlgY_BAAjQxSFqxg_0_1_018.puffin',
  ],
  QmqdMRWF: [
    'snow_ZID6-CpHlgY_QmqdMRWFqxg_0_1_003.puffin',
    'snow_ZID6-CpHlgY_QmqdMRWFqxg_0_1_006.puffin',
    'snow_ZID6-CpHlgY_QmqdMRWFqxg_0_1_009.puffin',
    'snow_ZID6-CpHlgY_QmqdMRWFqxg_0_1_012.puffin',
  ],
  whCeZSOF: [
    'snow_ZID6-CpHlgY_whCeZSOFqxg_0_1_003.puffin',
    'snow_ZID6-CpHlgY_whCeZSOFqxg_0_1_006.puffin',
    'snow_ZID6-CpHlgY_whCeZSOFqxg_0_1_009.puffin',
    'snow_ZID6-CpHlgY_whCeZSOFqxg_0_1_012.puffin',
    'snow_ZID6-CpHlgY_whCeZSOFqxg_0_1_015.puffin',
    'snow_ZID6-CpHlgY_whCeZSOFqxg_0_1_018.puffin',
  ],
  xRCeZSOF: [
    'snow_ZID6-CpHlgY_xRCeZSOFqxg_0_1_013.puffin',
    'snow_ZID6-CpHlgY_xRCeZSOFqxg_0_1_016.puffin',
    'snow_ZID6-CpHlgY_xRCeZSOFqxg_0_1_019.puffin',
    'snow_ZID6-CpHlgY_xRCeZSOFqxg_0_1_022.puffin',
    'snow_ZID6-CpHlgY_xRCeZSOFqxg_0_1_025.puffin',
    'snow_ZID6-CpHlgY_xRCeZSOFqxg_0_1_028.puffin',
  ],
};

const SNAPSHOTS = [
  {
    num: 0, id: null, operation: 'create', timestamp: 'CREATE TABLE',
    description: 'Empty table created — metadata file written, no snapshots yet, no data files.',
    recordCount: 0, delta: '0 rows', deltaColor: '#64748b',
    metadataFiles: [
      { file: '00000-26833116', active: true },
    ],
    manifestList: null,
    manifests: [],
    activeParquet: {},
    activePuffin: {},
    orphanManifestLists: [],
    orphanManifestFiles: [],
    orphanParquet: [],
    orphanPuffin: [],
  },
  {
    num: 1, id: '4266675115824445705', operation: 'append', timestamp: '12:40:11',
    description: 'INSERT 2,000,000 rows — 4 Parquet files written',
    recordCount: 2000000, delta: '+2,000,000', deltaColor: '#16a34a',
    metadataFiles: [
      { file: '00000-26833116', active: false },
      { file: '00001-53b570e8', active: true },
    ],
    manifestList: 'snap-4266675115824445705-abc519c1',
    manifests: [
      { file: 'abc519c1-m0', contentType: 0, type: 'added', rows: 2000000, files: ALL['X-rqSgaF'], reused: false },
    ],
    activeParquet: { 'X-rqSgaF': ALL['X-rqSgaF'] },
    activePuffin: {},
    orphanManifestLists: [],
    orphanManifestFiles: [],
    orphanParquet: [],
    orphanPuffin: [],
  },
  {
    num: 2, id: '7307837349431736038', operation: 'overwrite', timestamp: '12:40:45',
    description: 'UPDATE 60 rows — V3 merge-on-read: tiny new files + puffin delete vectors. No full rewrite!',
    recordCount: 2000060, delta: 'UPDATE 60', deltaColor: '#7C3AED',
    metadataFiles: [
      { file: '00001-53b570e8', active: false },
      { file: '00002-7023a79a', active: true },
    ],
    manifestList: 'snap-7307837349431736038-c1267686',
    manifests: [
      { file: 'c1267686-m0', contentType: 0, type: 'added', rows: 60, files: ALL.AgAjQxSF, reused: false, note: '3 new row files (updated versions)' },
      { file: 'abc519c1-m0', contentType: 0, type: 'existing', rows: 2000000, files: ALL['X-rqSgaF'], reused: true },
      { file: 'c1267686-m1', contentType: 1, type: 'added', rows: 60, files: ALL.BAAjQxSF, reused: false, note: '4 puffin files (marks old positions deleted)' },
    ],
    activeParquet: { 'X-rqSgaF': ALL['X-rqSgaF'], AgAjQxSF: ALL.AgAjQxSF },
    activePuffin: { BAAjQxSF: ALL.BAAjQxSF },
    orphanManifestLists: ['snap-4266675115824445705-abc519c1'],
    orphanManifestFiles: [],
    orphanParquet: [],
    orphanPuffin: [],
  },
  {
    num: 3, id: '2262732046837108839', operation: 'delete', timestamp: '12:41:15',
    description: 'DELETE 80 rows — V3: zero data file rewrites. New puffin file marks row positions as deleted.',
    recordCount: 2000060, delta: '−30', deltaColor: '#ef5350',
    metadataFiles: [
      { file: '00001-53b570e8', active: false },
      { file: '00002-7023a79a', active: false },
      { file: '00003-ae4702eb', active: true },
    ],
    manifestList: 'snap-2262732046837108839-a6133c18',
    manifests: [
      { file: 'c1267686-m0', contentType: 0, type: 'existing', rows: 60, files: ALL.AgAjQxSF, reused: true },
      { file: 'abc519c1-m0', contentType: 0, type: 'existing', rows: 2000000, files: ALL['X-rqSgaF'], reused: true },
      { file: 'a6133c18-m1', contentType: 1, type: 'added', rows: 140, files: ALL.QmqdMRWF, reused: false, note: '4 puffin files (DELETE 30 rows)' },
      { file: 'a6133c18-m0', contentType: 1, type: 'deleted', rows: 60, files: ALL.BAAjQxSF, reused: false, note: 'Snap 2 puffins superseded' },
    ],
    activeParquet: { 'X-rqSgaF': ALL['X-rqSgaF'], AgAjQxSF: ALL.AgAjQxSF },
    activePuffin: { QmqdMRWF: ALL.QmqdMRWF },
    orphanManifestLists: ['snap-4266675115824445705-abc519c1', 'snap-7307837349431736038-c1267686'],
    orphanManifestFiles: [
      { file: 'c1267686-m1', contentType: 1, reason: 'BAAjQxSF puffins from S2 replaced by QmqdMRWF' },
    ],
    orphanParquet: [],
    orphanPuffin: [{ family: 'BAAjQxSF', files: ALL.BAAjQxSF, reason: 'Snap 2 puffins superseded by QmqdMRWF' }],
  },
  {
    num: 4, id: '2111496596829886963', operation: 'append', timestamp: '12:41:45',
    description: 'INSERT 1,200,000 rows — 2 new Parquet files. All prior manifests reused.',
    recordCount: 3200060, delta: '+1,200,000', deltaColor: '#16a34a',
    metadataFiles: [
      { file: '00001-53b570e8', active: false },
      { file: '00002-7023a79a', active: false },
      { file: '00003-ae4702eb', active: false },
      { file: '00004-aee50960', active: true },
    ],
    manifestList: 'snap-2111496596829886963-1e8a5be1',
    manifests: [
      { file: '1e8a5be1-m0', contentType: 0, type: 'added', rows: 1200000, files: ALL.gNyIOyKF, reused: false },
      { file: 'c1267686-m0', contentType: 0, type: 'existing', rows: 60, files: ALL.AgAjQxSF, reused: true },
      { file: 'abc519c1-m0', contentType: 0, type: 'existing', rows: 2000000, files: ALL['X-rqSgaF'], reused: true },
      { file: 'a6133c18-m1', contentType: 1, type: 'existing', rows: 140, files: ALL.QmqdMRWF, reused: true },
    ],
    activeParquet: { 'X-rqSgaF': ALL['X-rqSgaF'], AgAjQxSF: ALL.AgAjQxSF, gNyIOyKF: ALL.gNyIOyKF },
    activePuffin: { QmqdMRWF: ALL.QmqdMRWF },
    orphanManifestLists: ['snap-4266675115824445705-abc519c1', 'snap-7307837349431736038-c1267686', 'snap-2262732046837108839-a6133c18'],
    orphanManifestFiles: [
      { file: 'c1267686-m1', contentType: 1, reason: 'Orphaned in S3' },
      { file: 'a6133c18-m0', contentType: 1, reason: 'REMOVES manifest from S3 not carried into S4' },
    ],
    orphanParquet: [],
    orphanPuffin: [{ family: 'BAAjQxSF', files: ALL.BAAjQxSF, reason: 'Superseded in Snap 3' }],
  },
  {
    num: 5, id: '8999721586070847566', operation: 'delete', timestamp: '12:42:09',
    description: 'DELETE 300 rows — V3: again zero data rewrites. New puffin replaces old puffin.',
    recordCount: 3200060, delta: '−200', deltaColor: '#ef5350',
    metadataFiles: [
      { file: '00001-53b570e8', active: false },
      { file: '00002-7023a79a', active: false },
      { file: '00003-ae4702eb', active: false },
      { file: '00004-aee50960', active: false },
      { file: '00005-0015cd9d', active: true },
    ],
    manifestList: 'snap-8999721586070847566-1855a186',
    manifests: [
      { file: '1e8a5be1-m0', contentType: 0, type: 'existing', rows: 1200000, files: ALL.gNyIOyKF, reused: true },
      { file: 'c1267686-m0', contentType: 0, type: 'existing', rows: 60, files: ALL.AgAjQxSF, reused: true },
      { file: 'abc519c1-m0', contentType: 0, type: 'existing', rows: 2000000, files: ALL['X-rqSgaF'], reused: true },
      { file: '1855a186-m1', contentType: 1, type: 'added', rows: 440, files: ALL.whCeZSOF, reused: false, note: '6 puffin files (DELETE 200 rows)' },
      { file: '1855a186-m0', contentType: 1, type: 'deleted', rows: 140, files: ALL.QmqdMRWF, reused: false, note: 'Snap 3 puffins superseded' },
    ],
    activeParquet: { 'X-rqSgaF': ALL['X-rqSgaF'], AgAjQxSF: ALL.AgAjQxSF, gNyIOyKF: ALL.gNyIOyKF },
    activePuffin: { whCeZSOF: ALL.whCeZSOF },
    orphanManifestLists: ['snap-4266675115824445705-abc519c1', 'snap-7307837349431736038-c1267686', 'snap-2262732046837108839-a6133c18', 'snap-2111496596829886963-1e8a5be1'],
    orphanManifestFiles: [
      { file: 'c1267686-m1', contentType: 1, reason: 'Orphaned in S3' },
      { file: 'a6133c18-m0', contentType: 1, reason: 'Orphaned in S4' },
      { file: 'a6133c18-m1', contentType: 1, reason: 'QmqdMRWF puffins from S3, replaced by whCeZSOF in S5' },
    ],
    orphanParquet: [],
    orphanPuffin: [
      { family: 'BAAjQxSF', files: ALL.BAAjQxSF, reason: 'Superseded in Snap 3' },
      { family: 'QmqdMRWF', files: ALL.QmqdMRWF, reason: 'Superseded in Snap 5' },
    ],
  },
  {
    num: 6, id: '187341245160280515', operation: 'overwrite', timestamp: '12:42:55',
    description: 'UPDATE 150,054 rows — large update rewrites affected Parquet files + new puffin vectors. AgAjQxSF files now orphaned.',
    recordCount: 3350054, delta: 'UPDATE 150K', deltaColor: '#7C3AED',
    metadataFiles: [
      { file: '00001-53b570e8', active: false },
      { file: '00002-7023a79a', active: false },
      { file: '00003-ae4702eb', active: false },
      { file: '00004-aee50960', active: false },
      { file: '00005-0015cd9d', active: false },
      { file: '00006-edf55cf2', active: true },
    ],
    manifestList: 'snap-187341245160280515-060cb698',
    manifests: [
      { file: '060cb698-m2', contentType: 0, type: 'added', rows: 150054, files: ALL.wxCeZSOF, reused: false, note: '5 new Parquet files (rewritten rows)' },
      { file: '1e8a5be1-m0', contentType: 0, type: 'existing', rows: 1200000, files: ALL.gNyIOyKF, reused: true },
      { file: '060cb698-m0', contentType: 0, type: 'deleted', rows: 60, files: ALL.AgAjQxSF, reused: false, note: 'Snap 2 data files replaced' },
      { file: 'abc519c1-m0', contentType: 0, type: 'existing', rows: 2000000, files: ALL['X-rqSgaF'], reused: true },
      { file: '060cb698-m3', contentType: 1, type: 'added', rows: 150434, files: ALL.xRCeZSOF, reused: false, note: '6 new puffin delete vectors' },
      { file: '060cb698-m1', contentType: 1, type: 'deleted', rows: 440, files: ALL.whCeZSOF, reused: false, note: 'Snap 5 puffins superseded' },
    ],
    activeParquet: { 'X-rqSgaF': ALL['X-rqSgaF'], gNyIOyKF: ALL.gNyIOyKF, wxCeZSOF: ALL.wxCeZSOF },
    activePuffin: { xRCeZSOF: ALL.xRCeZSOF },
    orphanManifestLists: ['snap-4266675115824445705-abc519c1', 'snap-7307837349431736038-c1267686', 'snap-2262732046837108839-a6133c18', 'snap-2111496596829886963-1e8a5be1', 'snap-8999721586070847566-1855a186'],
    orphanManifestFiles: [
      { file: 'c1267686-m1', contentType: 1, reason: 'Orphaned in S3' },
      { file: 'a6133c18-m0', contentType: 1, reason: 'Orphaned in S4' },
      { file: 'a6133c18-m1', contentType: 1, reason: 'Orphaned in S5' },
      { file: 'c1267686-m0', contentType: 0, reason: 'AgAjQxSF replaced by wxCeZSOF in S6' },
      { file: '1855a186-m1', contentType: 1, reason: 'whCeZSOF puffins superseded in S6' },
      { file: '1855a186-m0', contentType: 1, reason: 'REMOVES manifest from S5 not carried into S6' },
    ],
    orphanParquet: [{ family: 'AgAjQxSF', files: ALL.AgAjQxSF, reason: 'Snap 2 UPDATE rows replaced in Snap 6' }],
    orphanPuffin: [
      { family: 'BAAjQxSF', files: ALL.BAAjQxSF, reason: 'Superseded in Snap 3' },
      { family: 'QmqdMRWF', files: ALL.QmqdMRWF, reason: 'Superseded in Snap 5' },
      { family: 'whCeZSOF', files: ALL.whCeZSOF, reason: 'Superseded in Snap 6' },
    ],
  },
];

const OP_COLOR = { create: '#64748b', append: '#16a34a', overwrite: '#7C3AED', delete: '#ef5350' };
const OP_LABEL = { create: 'CREATE TABLE', append: 'INSERT', overwrite: 'UPDATE', delete: 'DELETE' };

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
          {/* Orphan manifest files */}
        {snap.orphanManifestFiles && snap.orphanManifestFiles.length > 0 && (
          <div style={{ borderLeft: '1.5px dashed #e2e8f0', paddingLeft: 16 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', marginBottom: 4 }}>Orphan Manifest Files</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {snap.orphanManifestFiles.map((m, i) => (
                <div key={i} style={{ border: '1.5px dashed #cbd5e1', background: '#f8fafc', borderRadius: 8, padding: '7px 10px', textAlign: 'center', minWidth: 110, opacity: 0.7 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Manifest File</div>
                  <div style={{ fontSize: 11, fontFamily: "'Monaco','Consolas',monospace", color: '#94a3b8', marginTop: 2 }}>{m.file}</div>
                  <span style={{ background: m.contentType === 1 ? '#7C3AED' : '#0e7490', color: 'white', fontSize: 9, padding: '1px 6px', borderRadius: 8, fontWeight: 700, display: 'inline-block', marginTop: 3 }}>
                    {m.contentType === 1 ? '🔴 DELETE VEC' : '📦 DATA'}
                  </span>
                  <div style={{ fontSize: 9, color: '#94a3b8', marginTop: 3, fontStyle: 'italic' }}>{m.reason}</div>
                </div>
              ))}
            </div>
          </div>
        )}
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

function FileStack({ files, family, orphan, puffin }) {
  const activeColor = puffin ? '#7C3AED' : '#29B5E8';
  const activeBg = puffin ? '#faf5ff' : '#f0fbff';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: orphan ? '#94a3b8' : (puffin ? '#7C3AED' : '#0e7490'), marginBottom: 2, fontFamily: 'monospace' }}>
        {family}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {files.map(f => (
          <Tooltip key={f} text={f}>
            <div style={{
              border: orphan ? '1.5px dashed #cbd5e1' : `1.5px solid ${activeColor}`,
              background: orphan ? '#f8fafc' : activeBg,
              borderRadius: 5, padding: '3px 7px',
              fontSize: 10, fontFamily: "'Monaco','Consolas',monospace",
              color: orphan ? '#94a3b8' : (puffin ? '#7C3AED' : '#0e7490'),
              opacity: orphan ? 0.65 : 1,
            }}>
              {short(f)}
            </div>
          </Tooltip>
        ))}
      </div>
      {orphan && <div style={{ fontSize: 9, color: '#94a3b8', marginTop: 2, fontStyle: 'italic' }}>orphan</div>}
    </div>
  );
}

function ManifestBadge({ type, contentType }) {
  const colors = {
    added: '#16a34a', deleted: '#ef5350', existing: '#f97316',
  };
  const labels = { added: 'ADDED', deleted: 'REMOVES', existing: 'REUSED' };
  return (
    <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginTop: 3, flexWrap: 'wrap' }}>
      <span style={{ background: colors[type], color: 'white', fontSize: 9, padding: '1px 6px', borderRadius: 8, fontWeight: 700 }}>
        {labels[type]}
      </span>
      <span style={{ background: contentType === 1 ? '#7C3AED' : '#0e7490', color: 'white', fontSize: 9, padding: '1px 6px', borderRadius: 8, fontWeight: 700 }}>
        {contentType === 1 ? '🔴 DELETE VEC' : '📦 DATA'}
      </span>
    </div>
  );
}

function RowLabel({ children, color }) {
  return (
    <div style={{
      writingMode: 'horizontal-tb',
      fontSize: 9, fontWeight: 700, textTransform: 'uppercase',
      letterSpacing: '0.1em', color: color || '#94a3b8',
      background: '#f8fafc', border: '1px solid #e2e8f0',
      borderRadius: 6, padding: '4px 8px', whiteSpace: 'nowrap',
      alignSelf: 'center', flexShrink: 0, marginRight: 10,
    }}>
      {children}
    </div>
  );
}

function SnapshotDiagram({ snap }) {
  const addedManifests = snap.manifests.filter(m => m.type === 'added');
  const reusedManifests = snap.manifests.filter(m => m.type === 'existing');
  const removedManifests = snap.manifests.filter(m => m.type === 'deleted');
  return (
    <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 14, padding: '28px 24px', overflowX: 'auto' }}>

      {/* Catalog */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 4 }}>
        <div style={{ border: '2px solid #29B5E8', borderRadius: '50% / 12px', background: 'linear-gradient(180deg,#f0fbff,#e0f4fd)', padding: '10px 32px', textAlign: 'center', minWidth: 200 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#0e7490' }}>🗄 Snowflake Catalog</div>
          <div style={{ fontSize: 11, color: '#475569', marginTop: 4, fontFamily: 'monospace' }}>ORDERS_ICEBERG (V3)</div>
          <div style={{ fontSize: 10, color: '#64748b', marginTop: 4 }}>
            current → <span style={{ color: '#0e7490', fontWeight: 600 }}>{snap.metadataFiles.find(m => m.active)?.file}.metadata.json</span>
          </div>
        </div>
        <Arrow />
      </div>

      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8', marginBottom: 8 }}>— metadata layer —</div>

      {/* Metadata files — active left, orphans right */}
      <div style={{ display: 'flex', gap: 0, alignItems: 'center', marginBottom: 4 }}>
        <RowLabel>📄 Metadata File</RowLabel>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          {snap.metadataFiles.filter(m => m.active).map(m => (
            <Tooltip key={m.file} text={m.file + '.metadata.json'}>
              <div style={{ border: '2px solid #29B5E8', background: '#f0fbff', borderRadius: 8, padding: '7px 10px', textAlign: 'center', fontSize: 11, fontFamily: "'Monaco','Consolas',monospace", color: '#0e7490' }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: '#29B5E8', textTransform: 'uppercase', marginBottom: 3 }}>Metadata File</div>
                {m.file}.json
              </div>
            </Tooltip>
          ))}
        </div>
        {snap.metadataFiles.filter(m => !m.active).length > 0 && (
          <div style={{ borderLeft: '1.5px dashed #e2e8f0', paddingLeft: 16 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', marginBottom: 4 }}>Orphan Metadata Files</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {snap.metadataFiles.filter(m => !m.active).map(m => (
                <Tooltip key={m.file} text={m.file + '.metadata.json'}>
                  <div style={{ border: '1.5px dashed #cbd5e1', background: '#f8fafc', borderRadius: 7, padding: '5px 10px', textAlign: 'center', opacity: 0.7 }}>
                    <div style={{ fontSize: 9, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 1 }}>Metadata File</div>
                    <div style={{ fontSize: 10, fontFamily: "'Monaco','Consolas',monospace", color: '#94a3b8' }}>{m.file}.json</div>
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>
        )}
      </div>
      <Arrow />

      {/* Manifest list row + orphan manifest lists */}
      {snap.manifestList ? (
        <>
        <div style={{ display: 'flex', gap: 0, alignItems: 'center', marginBottom: 4 }}>
        <RowLabel>📋 Manifest List</RowLabel>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{ border: '2px solid #29B5E8', background: '#f0fbff', borderRadius: 8, padding: '8px 16px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginBottom: 3 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Manifest List</div>
              <span style={{ background: '#16a34a', color: 'white', fontSize: 9, padding: '1px 6px', borderRadius: 8, fontWeight: 700 }}>NEW</span>
            </div>
            <Tooltip text={snap.manifestList + '.avro'}>
              <div style={{ fontSize: 11, fontFamily: "'Monaco','Consolas',monospace", color: '#0e7490' }}>
                snap-{snap.id.slice(0, 6)}…{snap.manifestList.slice(-8)}
              </div>
            </Tooltip>
            <div style={{ fontSize: 9, color: '#64748b', marginTop: 5, lineHeight: 1.5 }}>
              {addedManifests.length > 0 && (
                <span style={{ color: '#16a34a', fontWeight: 600 }}>{addedManifests.length} new</span>
              )}
              {addedManifests.length > 0 && reusedManifests.length > 0 && ' + '}
              {reusedManifests.length > 0 && (
                <span style={{ color: '#f97316', fontWeight: 600 }}>{reusedManifests.length} reused</span>
              )}
              {' manifest files'}
            </div>
          </div>
        </div>
        {snap.orphanManifestLists.length > 0 && (
          <div style={{ borderLeft: '1.5px dashed #e2e8f0', paddingLeft: 16 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', marginBottom: 4 }}>Orphan Manifest Lists</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {snap.orphanManifestLists.map(ml => (
                <Tooltip key={ml} text={ml + '.avro'}>
                  <div style={{ border: '1.5px dashed #cbd5e1', background: '#f8fafc', borderRadius: 7, padding: '5px 10px', opacity: 0.7 }}>
                    <div style={{ fontSize: 9, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 1 }}>Manifest List</div>
                    <div style={{ fontSize: 10, fontFamily: "'Monaco','Consolas',monospace", color: '#94a3b8' }}>snap-{ml.replace('snap-', '').slice(0, 6)}…{ml.slice(-8)}</div>
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>
        )}
      </div>
      <Arrow />
      <div style={{ display: 'flex', gap: 0, alignItems: 'flex-start', marginBottom: 4 }}>
        <RowLabel>📁 Manifest Files</RowLabel>
        {/* Added */}
        {addedManifests.length > 0 && (
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
            {addedManifests.map((m, i) => (
              <div key={i} style={{ border: '2px solid #16a34a', background: '#f0fdf4', borderRadius: 8, padding: '7px 10px', textAlign: 'center', minWidth: 110 }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Manifest File</div>
                <Tooltip text={m.file + '.avro'}><div style={{ fontSize: 11, fontFamily: "'Monaco','Consolas',monospace", color: '#1e293b', marginTop: 2 }}>{m.file}</div></Tooltip>
                <ManifestBadge type={m.type} contentType={m.contentType} />
                <div style={{ fontSize: 10, color: '#64748b', marginTop: 3 }}>{m.rows.toLocaleString()} rows</div>
                {m.note && <div style={{ fontSize: 9, color: '#64748b', marginTop: 2, fontStyle: 'italic' }}>{m.note}</div>}
              </div>
            ))}
          </div>
        )}
        {/* Reused/existing */}
        {reusedManifests.length > 0 && (
          <div style={{ borderLeft: addedManifests.length > 0 ? '1.5px dashed #e2e8f0' : 'none', paddingLeft: addedManifests.length > 0 ? 16 : 0 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#f97316', textTransform: 'uppercase', marginBottom: 4 }}>Reused</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {reusedManifests.map((m, i) => (
                <div key={i} style={{ border: '2px solid #f97316', background: '#fff7ed', borderRadius: 8, padding: '7px 10px', textAlign: 'center', minWidth: 110 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Manifest File</div>
                  <Tooltip text={m.file + '.avro'}><div style={{ fontSize: 11, fontFamily: "'Monaco','Consolas',monospace", color: '#1e293b', marginTop: 2 }}>{m.file}</div></Tooltip>
                  <ManifestBadge type={m.type} contentType={m.contentType} />
                  <div style={{ fontSize: 10, color: '#64748b', marginTop: 3 }}>{m.rows.toLocaleString()} rows</div>
                  {m.note && <div style={{ fontSize: 9, color: '#64748b', marginTop: 2, fontStyle: 'italic' }}>{m.note}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Orphan/removes */}
        {removedManifests.length > 0 && (
          <div style={{ borderLeft: '1.5px dashed #e2e8f0', paddingLeft: 16 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', marginBottom: 4 }}>Orphan Manifests</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {removedManifests.map((m, i) => (
                <div key={i} style={{ border: '1.5px dashed #fca5a5', background: '#fff5f5', borderRadius: 8, padding: '7px 10px', textAlign: 'center', minWidth: 110, opacity: 0.75 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Manifest File</div>
                  <Tooltip text={m.file + '.avro'}><div style={{ fontSize: 11, fontFamily: "'Monaco','Consolas',monospace", color: '#94a3b8', marginTop: 2 }}>{m.file}</div></Tooltip>
                  <ManifestBadge type={m.type} contentType={m.contentType} />
                  <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 3 }}>{m.rows.toLocaleString()} rows</div>
                  {m.note && <div style={{ fontSize: 9, color: '#94a3b8', marginTop: 2, fontStyle: 'italic' }}>{m.note}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Arrow />
      </>
      ) : (
        <div style={{ textAlign: 'center', padding: '16px', color: '#94a3b8', fontSize: 13, fontStyle: 'italic', border: '1.5px dashed #e2e8f0', borderRadius: 8, marginBottom: 16 }}>
          No snapshots yet — table is empty
        </div>
      )}

      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8', marginBottom: 10 }}>— data layer —</div>

      {/* Active Parquet + orphan Parquet */}
      <div style={{ display: 'flex', gap: 0, alignItems: 'flex-start', marginBottom: 16 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, color: '#0e7490', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8, textAlign: 'center' }}>📦 Parquet Data Files</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            {Object.entries(snap.activeParquet).map(([family, files]) => (
              <FileStack key={family} family={family} files={files} orphan={false} puffin={false} />
            ))}
          </div>
        </div>
        {snap.orphanParquet.length > 0 && (
          <div style={{ borderLeft: '1.5px dashed #e2e8f0', paddingLeft: 16 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', marginBottom: 8 }}>Orphan Parquet</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              {snap.orphanParquet.map(o => (
                <div key={o.family} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <FileStack family={o.family} files={o.files} orphan={true} puffin={false} />
                  <div style={{ fontSize: 9, color: '#94a3b8', marginTop: 4, fontStyle: 'italic', maxWidth: 110, textAlign: 'center' }}>{o.reason}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Active Puffin + orphan Puffin */}
      {(Object.keys(snap.activePuffin).length > 0 || snap.orphanPuffin.length > 0) && (
        <div style={{ display: 'flex', gap: 0, alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: '#7C3AED', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8, textAlign: 'center' }}>🔴 Puffin Delete Vectors (V3)</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              {Object.keys(snap.activePuffin).length > 0
                ? Object.entries(snap.activePuffin).map(([family, files]) => (
                    <FileStack key={family} family={family} files={files} orphan={false} puffin={true} />
                  ))
                : <div style={{ fontSize: 12, color: '#94a3b8', fontStyle: 'italic' }}>none (clean snapshot)</div>
              }
            </div>
          </div>
          {snap.orphanPuffin.length > 0 && (
            <div style={{ borderLeft: '1.5px dashed #e2e8f0', paddingLeft: 16 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', marginBottom: 8 }}>Orphan Puffin</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                {snap.orphanPuffin.map(o => (
                  <div key={o.family} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <FileStack family={o.family} files={o.files} orphan={true} puffin={true} />
                    <div style={{ fontSize: 9, color: '#94a3b8', marginTop: 4, fontStyle: 'italic', maxWidth: 110, textAlign: 'center' }}>{o.reason}</div>
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
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ background: '#faf5ff', border: '1.5px solid #d8b4fe', borderRadius: 8, padding: '8px 14px', fontSize: 13, color: '#7C3AED' }}>
          <strong>Format Version 3</strong> — introduces <strong>Puffin delete vectors</strong> (merge-on-read). DELETE/UPDATE no longer rewrites entire Parquet files.
        </div>
      </div>

      {/* Slider */}
      <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', whiteSpace: 'nowrap' }}>Snapshot</div>
          <input type="range" min={0} max={6} value={snapIdx} onChange={e => setSnapIdx(Number(e.target.value))} style={{ flex: 1, accentColor: '#29B5E8', cursor: 'pointer' }} />
          <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', whiteSpace: 'nowrap' }}>{snapIdx + 1} / 7</div>
        </div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
          {SNAPSHOTS.map((s, i) => (
            <button key={i} onClick={() => setSnapIdx(i)} style={{
              flex: 1, padding: '6px 4px', borderRadius: 8, cursor: 'pointer', fontSize: 11, fontWeight: 600,
              border: i === snapIdx ? `2px solid ${OP_COLOR[s.operation]}` : '1.5px solid #e2e8f0',
              background: i === snapIdx ? `${OP_COLOR[s.operation]}15` : '#f8fafc',
              color: i === snapIdx ? OP_COLOR[s.operation] : '#94a3b8',
            }}>S{s.num}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ background: OP_COLOR[snap.operation], color: 'white', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{OP_LABEL[snap.operation]}</span>
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

      <div style={{ marginTop: 16, display: 'flex', gap: 14, flexWrap: 'wrap', fontSize: 11, color: '#64748b' }}>
        {[
          { color: '#29B5E8', label: 'Active path' },
          { color: '#16a34a', label: 'Added' },
          { color: '#ef5350', label: 'Removes / deactivates' },
          { color: '#f97316', label: 'Reused from prior snapshot' },
          { color: '#7C3AED', label: 'Puffin delete vectors (V3)' },
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
