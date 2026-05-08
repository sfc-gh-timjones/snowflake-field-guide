import { useState, useRef, useEffect } from 'react';
import { FILE_CONTENTS } from '../data/fileContents.js';
import { PUFFIN_CONTENTS } from '../data/puffinContents.js';
import { PARQUET_CONTENTS } from '../data/parquetContents.js';

const short = full => {
  const m = full.match(/_([\w\-]{8,10})(?:qxg|Fqxg)_0_\d_(\d+)\.(parquet|puffin)/);
  if (m) return `${m[1]}_${m[2]}.${m[3]}`;
  return full.split('/').pop();
};

const ALL = {
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

const FAMILY_LOOKUP = {};
Object.entries(ALL).forEach(([family, files]) => {
  if (files.length > 0) FAMILY_LOOKUP[files[0]] = family;
});
const getFamily = (files) => files && files.length > 0 ? FAMILY_LOOKUP[files[0]] : null;

const SNAPSHOTS = [
  {
    num: 0, id: null, operation: 'create', timestamp: 'CREATE TABLE',
    description: 'Empty table created — metadata file written, no snapshots yet, no data files.',
    recordCount: 0, delta: '0 rows', deltaColor: '#64748b',
    metadataFiles: [{ file: '00000-26833116', active: true }],
    manifestList: null, manifests: [], activeParquet: {}, activePuffin: {},
    orphanManifestLists: [], orphanManifestFiles: [], orphanParquet: [], orphanPuffin: [],
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
    activeParquet: { 'X-rqSgaF': ALL['X-rqSgaF'] }, activePuffin: {},
    orphanManifestLists: [], orphanManifestFiles: [], orphanParquet: [], orphanPuffin: [],
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
    orphanManifestFiles: [], orphanParquet: [], orphanPuffin: [],
  },
  {
    num: 3, id: '2262732046837108839', operation: 'delete', timestamp: '12:41:15',
    description: 'DELETE 80 rows — V3: zero data file rewrites. New puffin file marks row positions as deleted.',
    recordCount: 2000060, delta: '−80', deltaColor: '#ef5350',
    metadataFiles: [
      { file: '00001-53b570e8', active: false },
      { file: '00002-7023a79a', active: false },
      { file: '00003-ae4702eb', active: true },
    ],
    manifestList: 'snap-2262732046837108839-a6133c18',
    manifests: [
      { file: 'c1267686-m0', contentType: 0, type: 'existing', rows: 60, files: ALL.AgAjQxSF, reused: true },
      { file: 'abc519c1-m0', contentType: 0, type: 'existing', rows: 2000000, files: ALL['X-rqSgaF'], reused: true },
      { file: 'a6133c18-m1', contentType: 1, type: 'added', rows: 140, files: ALL.QmqdMRWF, reused: false, note: '4 puffin files (DELETE 80 rows)' },
      { file: 'a6133c18-m0', contentType: 1, type: 'deleted', rows: 60, files: ALL.BAAjQxSF, reused: false, note: 'REMOVES entry: S2 puffins declared removed in S3 manifest list' },
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
    recordCount: 3200060, delta: '−300', deltaColor: '#ef5350',
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
      { file: '1855a186-m1', contentType: 1, type: 'added', rows: 440, files: ALL.whCeZSOF, reused: false, note: '6 puffin files (DELETE 300 rows)' },
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
    description: 'UPDATE 150,000 rows — large update rewrites affected Parquet files + new puffin vectors. AgAjQxSF files now orphaned.',
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

const META_NUM = {
  '00000-26833116': 1, '00001-53b570e8': 2, '00002-7023a79a': 3,
  '00003-ae4702eb': 4, '00004-aee50960': 5, '00005-0015cd9d': 6, '00006-edf55cf2': 7,
};
const ML_NUM = {
  'snap-4266675115824445705-abc519c1': 1,
  'snap-7307837349431736038-c1267686': 2,
  'snap-2262732046837108839-a6133c18': 3,
  'snap-2111496596829886963-1e8a5be1': 4,
  'snap-8999721586070847566-1855a186': 5,
  'snap-187341245160280515-060cb698': 6,
};
const MF_NUM = {
  'abc519c1-m0': 1,
  'c1267686-m0': 2, 'c1267686-m1': 3,
  'a6133c18-m1': 4, 'a6133c18-m0': 5,
  '1e8a5be1-m0': 6,
  '1855a186-m1': 7, '1855a186-m0': 8,
  '060cb698-m2': 9, '060cb698-m0': 10, '060cb698-m3': 11, '060cb698-m1': 12,
};

const OP_COLOR = { create: '#64748b', append: '#16a34a', overwrite: '#7C3AED', delete: '#ef5350' };
const OP_LABEL = { create: 'CREATE TABLE', append: 'INSERT', overwrite: 'UPDATE', delete: 'DELETE' };

const FULL_FILENAME = {
  '00000-26833116': '00000-26833116-a13f-425a-b5c4-8ac248e1140e.metadata.json',
  '00001-53b570e8': '00001-53b570e8-4661-41a2-bd53-88c5f6e40f6d.metadata.json',
  '00002-7023a79a': '00002-7023a79a-e9af-43c8-99ca-0284103ec570.metadata.json',
  '00003-ae4702eb': '00003-ae4702eb-fc2d-42d3-b852-a500b850081f.metadata.json',
  '00004-aee50960': '00004-aee50960-d70c-4a88-845c-b53bce35d20d.metadata.json',
  '00005-0015cd9d': '00005-0015cd9d-22ca-4366-9678-dce25b9a6d41.metadata.json',
  '00006-edf55cf2': '00006-edf55cf2-5826-4bbc-8c1c-62ddedbde0f3.metadata.json',
  'snap-4266675115824445705-abc519c1': 'snap-4266675115824445705-1-abc519c1-ae05-453d-ad04-42f411166b5d.avro',
  'snap-7307837349431736038-c1267686': 'snap-7307837349431736038-1-c1267686-6d77-4cea-b051-476398fc8362.avro',
  'snap-2262732046837108839-a6133c18': 'snap-2262732046837108839-1-a6133c18-0f37-4b70-8aaf-0af0bf06ab8a.avro',
  'snap-2111496596829886963-1e8a5be1': 'snap-2111496596829886963-1-1e8a5be1-f26d-4118-a102-1bc0b281841d.avro',
  'snap-8999721586070847566-1855a186': 'snap-8999721586070847566-1-1855a186-ce01-47c4-8b5e-61ddbb91bcaf.avro',
  'snap-187341245160280515-060cb698': 'snap-187341245160280515-1-060cb698-b4ad-4c2e-9df1-f49b2ec047dd.avro',
  'abc519c1-m0': 'abc519c1-ae05-453d-ad04-42f411166b5d-m0.avro',
  'c1267686-m0': 'c1267686-6d77-4cea-b051-476398fc8362-m0.avro',
  'c1267686-m1': 'c1267686-6d77-4cea-b051-476398fc8362-m1.avro',
  'a6133c18-m0': 'a6133c18-0f37-4b70-8aaf-0af0bf06ab8a-m0.avro',
  'a6133c18-m1': 'a6133c18-0f37-4b70-8aaf-0af0bf06ab8a-m1.avro',
  '1e8a5be1-m0': '1e8a5be1-f26d-4118-a102-1bc0b281841d-m0.avro',
  '1855a186-m0': '1855a186-ce01-47c4-8b5e-61ddbb91bcaf-m0.avro',
  '1855a186-m1': '1855a186-ce01-47c4-8b5e-61ddbb91bcaf-m1.avro',
  '060cb698-m0': '060cb698-b4ad-4c2e-9df1-f49b2ec047dd-m0.avro',
  '060cb698-m1': '060cb698-b4ad-4c2e-9df1-f49b2ec047dd-m1.avro',
  '060cb698-m2': '060cb698-b4ad-4c2e-9df1-f49b2ec047dd-m2.avro',
  '060cb698-m3': '060cb698-b4ad-4c2e-9df1-f49b2ec047dd-m3.avro',
};
const fullName = key => FULL_FILENAME[key] || key;

function PopupIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }}>
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M3 9h18"/>
      <path d="M9 21V9"/>
    </svg>
  );
}

const PROCEDURES = {
  INSERT: `CREATE OR REPLACE PROCEDURE ETL_TESTING.ICEBERG_DEMO.INSERT_ORDERS_ICEBERG(NUM_RECORDS INT)
RETURNS VARCHAR LANGUAGE SQL AS
BEGIN
    INSERT INTO ETL_TESTING.ICEBERG_DEMO.ORDERS_ICEBERG
    SELECT
        (SELECT COALESCE(MAX(ORDER_ID), 0) FROM ETL_TESTING.ICEBERG_DEMO.ORDERS_ICEBERG)
            + ROW_NUMBER() OVER (ORDER BY SEQ8()) AS ORDER_ID,
        UNIFORM(1001, 9999, RANDOM()) AS CUSTOMER_ID,
        RANDSTR(10, RANDOM()) AS CUSTOMER_NAME,
        RANDSTR(8, RANDOM()) || '@test.com' AS CUSTOMER_EMAIL,
        UNIFORM(101, 500, RANDOM()) AS PRODUCT_ID,
        ARRAY_CONSTRUCT('Laptop','Monitor','Keyboard','Mouse','Headset',
            'Webcam','Desk Chair','Standing Desk','USB Hub','External SSD')
            [UNIFORM(0,9,RANDOM())]::VARCHAR AS PRODUCT_NAME,
        UNIFORM(1, 20, RANDOM()) AS QUANTITY,
        ROUND(UNIFORM(10, 2500, RANDOM())::FLOAT, 2) AS UNIT_PRICE,
        ROUND(UNIFORM(1,20,RANDOM()) * UNIFORM(10,2500,RANDOM())::FLOAT, 2) AS ORDER_TOTAL,
        ARRAY_CONSTRUCT('PENDING','SHIPPED','DELIVERED','PROCESSING','CANCELLED')
            [UNIFORM(0,4,RANDOM())]::VARCHAR AS ORDER_STATUS,
        DATEADD('minute', -UNIFORM(0,43200,RANDOM()), CURRENT_TIMESTAMP()) AS ORDER_DATE,
        NULL::TIMESTAMP_NTZ AS SHIP_DATE,
        ARRAY_CONSTRUCT('NORTHEAST','SOUTHEAST','MIDWEST','WEST','SOUTHWEST')
            [UNIFORM(0,4,RANDOM())]::VARCHAR AS REGION
    FROM TABLE(GENERATOR(ROWCOUNT => :NUM_RECORDS));
    RETURN 'Successfully inserted ' || :NUM_RECORDS || ' records.';
END;`,
  UPDATE: `CREATE OR REPLACE PROCEDURE ETL_TESTING.ICEBERG_DEMO.UPDATE_ORDERS_ICEBERG(NUM_RECORDS INT)
RETURNS VARCHAR LANGUAGE SQL AS
BEGIN
    UPDATE ETL_TESTING.ICEBERG_DEMO.ORDERS_ICEBERG
    SET QUANTITY = UNIFORM(1, 20, RANDOM()),
        UNIT_PRICE = ROUND(UNIFORM(10, 2500, RANDOM())::FLOAT, 2),
        ORDER_TOTAL = ROUND(UNIFORM(1,20,RANDOM()) * UNIFORM(10,2500,RANDOM())::FLOAT, 2),
        ORDER_STATUS = ARRAY_CONSTRUCT('SHIPPED','DELIVERED','RETURNED','CANCELLED')
            [UNIFORM(0,3,RANDOM())]::VARCHAR,
        SHIP_DATE = DATEADD('day', UNIFORM(1,14,RANDOM()), ORDER_DATE)
    WHERE ORDER_ID IN (
        SELECT ORDER_ID FROM ETL_TESTING.ICEBERG_DEMO.ORDERS_ICEBERG
        ORDER BY RANDOM() LIMIT :NUM_RECORDS);
    RETURN 'Successfully updated ' || :NUM_RECORDS || ' records.';
END;`,
  DELETE: `CREATE OR REPLACE PROCEDURE ETL_TESTING.ICEBERG_DEMO.DELETE_ORDERS_ICEBERG(NUM_RECORDS INT)
RETURNS VARCHAR LANGUAGE SQL AS
BEGIN
    DELETE FROM ETL_TESTING.ICEBERG_DEMO.ORDERS_ICEBERG
    WHERE ORDER_ID IN (
        SELECT ORDER_ID FROM ETL_TESTING.ICEBERG_DEMO.ORDERS_ICEBERG
        ORDER BY RANDOM() LIMIT :NUM_RECORDS);
    RETURN 'Successfully deleted ' || :NUM_RECORDS || ' records.';
END;`,
};

const SNAPSHOT_SQL = {
  0: { sql: `CREATE OR REPLACE ICEBERG TABLE ETL_TESTING.ICEBERG_DEMO.ORDERS_ICEBERG (
    ORDER_ID NUMBER(38,0) NOT NULL,  CUSTOMER_ID NUMBER(38,0),
    CUSTOMER_NAME VARCHAR,  CUSTOMER_EMAIL VARCHAR,
    PRODUCT_ID NUMBER(38,0),  PRODUCT_NAME VARCHAR,
    QUANTITY NUMBER(38,0),  UNIT_PRICE FLOAT,
    ORDER_TOTAL FLOAT,  ORDER_STATUS VARCHAR,
    ORDER_DATE TIMESTAMP_NTZ,  SHIP_DATE TIMESTAMP_NTZ,  REGION VARCHAR
)
    CATALOG = 'SNOWFLAKE'
    EXTERNAL_VOLUME = 'S3SNOWFLAKEICEBERG'
    BASE_LOCATION = 'iceberg_demo/iceberg_testing/'
    ICEBERG_VERSION = 3;`, procedure: null, logicalRows: 0, queryId: '01c4151f-0208-bdf5-0067-4e870aa1eb22', queryId2: null },
  1: { sql: 'CALL ETL_TESTING.ICEBERG_DEMO.INSERT_ORDERS_ICEBERG(2000000);', procedure: 'INSERT', logicalRows: 2000000, queryId: '01c41520-0208-bece-0067-4e870aa2c542', queryId2: '01c41520-0208-bece-0067-4e870aa2c546' },
  2: { sql: 'CALL ETL_TESTING.ICEBERG_DEMO.UPDATE_ORDERS_ICEBERG(60);', procedure: 'UPDATE', logicalRows: 2000000, queryId: '01c41520-0208-bee9-0067-4e870aa360ca', queryId2: '01c41520-0208-bee9-0067-4e870aa360d2' },
  3: { sql: 'CALL ETL_TESTING.ICEBERG_DEMO.DELETE_ORDERS_ICEBERG(80);', procedure: 'DELETE', logicalRows: 1999920, queryId: '01c41521-0208-becf-0067-4e870aa3216e', queryId2: '01c41521-0208-becf-0067-4e870aa32172' },
  4: { sql: 'CALL ETL_TESTING.ICEBERG_DEMO.INSERT_ORDERS_ICEBERG(1200000);', procedure: 'INSERT', logicalRows: 3199920, queryId: '01c41521-0208-bdf5-0067-4e870aa1eb66', queryId2: '01c41521-0208-bdf5-0067-4e870aa1eb6a' },
  5: { sql: 'CALL ETL_TESTING.ICEBERG_DEMO.DELETE_ORDERS_ICEBERG(300);', procedure: 'DELETE', logicalRows: 3199620, queryId: '01c41522-0208-bdf6-0067-4e870aa1fbb6', queryId2: '01c41522-0208-bdf6-0067-4e870aa1fbba' },
  6: { sql: 'CALL ETL_TESTING.ICEBERG_DEMO.UPDATE_ORDERS_ICEBERG(150000);', procedure: 'UPDATE', logicalRows: 3199620, queryId: '01c41522-0208-bdf6-0067-4e870aa1fbce', queryId2: '01c41522-0208-bdf6-0067-4e870aa1fbd2',
    explainer: {
      title: 'Why 150,054 instead of 150,000?',
      queryId: '01c41522-0208-bdf6-0067-4e870aa1fbd2',
      body: `Snowflake reports 150,000 rows updated — but Iceberg wrote 150,054 rows to the new wxCeZSOF Parquet files. Why the extra 54?

In S2, we updated 60 rows. Those 60 lived in their own Parquet files (AgAjQxSF). In S6, our UPDATE of 150,000 rows happened to overlap with 6 of those 60 — meaning 6 ORDER_IDs (primary key) were updated in both S2 and S6.

Because 6 of the AgAjQxSF rows were invalidated, Iceberg had to retire that entire manifest entry. But the remaining 54 rows in AgAjQxSF were still valid — they needed to be carried forward. Snowflake rewrote all 60 AgAjQxSF rows into the new wxCeZSOF files:
  • 6 rows with NEW updated values (part of the 150,000 actual changes)
  • 54 rows with SAME values as before (carried forward, no actual change)

So the new Parquet files contain: 149,994 (from original files) + 60 (from AgAjQxSF) = 150,054.

The puffin delete vector (Manifest File 11) shows 150,434 masked positions because it must mark ALL old row positions to skip:
  • 150,000 original positions for the S6 update
  • 54 original positions for the S2 updates carried forward
  • 80 positions from the S3 delete
  • 300 positions from the S5 delete
  • 54 + 80 + 300 + 150,000 = 150,434

Bottom line: EXCEPT shows 150,000 (actual value changes). Parquet has 150,054 (includes 54 unchanged rows absorbed from retired AgAjQxSF files).`
    }
  },
};


function jsonContainsSearch(value, term) {
  if (!term) return false;
  if (value === null || value === undefined) return false;
  if (typeof value !== 'object') return String(value).toLowerCase().includes(term);
  if (Array.isArray(value)) return value.some(v => jsonContainsSearch(v, term));
  return Object.entries(value).some(([k, v]) => k.toLowerCase().includes(term) || jsonContainsSearch(v, term));
}

function HighlightText({ text, term }) {
  if (!term || !text.toLowerCase().includes(term)) return <>{text}</>;
  const parts = [];
  let remaining = text;
  while (remaining.length > 0) {
    const idx = remaining.toLowerCase().indexOf(term);
    if (idx === -1) { parts.push(remaining); break; }
    if (idx > 0) parts.push(remaining.slice(0, idx));
    parts.push(<mark key={parts.length} style={{ background: '#fde047', borderRadius: 2, padding: '0 1px' }}>{remaining.slice(idx, idx + term.length)}</mark>);
    remaining = remaining.slice(idx + term.length);
  }
  return <>{parts}</>;
}

function JsonNode({ label, value, depth = 0, search = '', defaultOpen = 2 }) {
  const term = search.toLowerCase();
  const hasMatch = term && jsonContainsSearch(value, term);
  const labelMatch = term && label && label.toLowerCase().includes(term);
  const forceOpen = hasMatch || labelMatch;
  const [open, setOpen] = useState(depth < defaultOpen);
  const prevForce = useRef(forceOpen);
  useEffect(() => {
    if (forceOpen && !prevForce.current) setOpen(true);
    prevForce.current = forceOpen;
  }, [forceOpen]);

  const isObj = value !== null && typeof value === 'object' && !Array.isArray(value);
  const isArr = Array.isArray(value);
  const isComplex = isObj || isArr;
  const indent = depth * 16;

  if (!isComplex) {
    const strVal = String(value);
    const valMatch = term && strVal.toLowerCase().includes(term);
    const display = typeof value === 'string'
      ? <span style={{ color: '#16a34a' }}>"<HighlightText text={value} term={term} />"</span>
      : <span style={{ color: typeof value === 'number' ? '#2563eb' : '#dc2626' }}><HighlightText text={strVal} term={term} /></span>;
    return (
      <div style={{ paddingLeft: indent, fontSize: 12, lineHeight: 1.7, fontFamily: 'Monaco,Consolas,monospace', background: (valMatch || labelMatch) ? '#fefce8' : 'transparent', borderRadius: 3 }}>
        {label && <span style={{ color: '#7c3aed', fontWeight: 600 }}><HighlightText text={label} term={term} />: </span>}{display}
      </div>
    );
  }

  const keys = isArr ? value.map((_, i) => i) : Object.keys(value);
  const preview = isArr ? `[${value.length}]` : `{${keys.length}}`;
  const isOpen = open || forceOpen;

  return (
    <div style={{ paddingLeft: indent }}>
      <div onClick={() => setOpen(o => !o)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, lineHeight: 1.7, fontFamily: 'Monaco,Consolas,monospace', userSelect: 'none', background: labelMatch ? '#fefce8' : 'transparent', borderRadius: 3 }}>
        <span style={{ color: '#29B5E8', fontSize: 20, width: 20, display: 'inline-block', textAlign: 'center' }}>{isOpen ? '▾' : '▸'}</span>
        {label && <span style={{ color: '#7c3aed', fontWeight: 600 }}><HighlightText text={label} term={term} />: </span>}
        <span style={{ color: '#475569' }}>{isOpen ? (isArr ? '[' : '{') : <span>{isArr ? '[' : '{'}<span style={{ color: '#94a3b8', fontSize: 11 }}> {preview} </span>{isArr ? ']' : '}'}</span>}</span>}
      </div>
      {isOpen && (
        <>
          {keys.map(k => (
            <JsonNode key={k} label={isArr ? `[${k}]` : k} value={value[k]} depth={depth + 1} search={search} defaultOpen={defaultOpen} />
          ))}
          <div style={{ paddingLeft: 0, fontSize: 12, fontFamily: 'Monaco,Consolas,monospace', color: '#475569' }}>{isArr ? ']' : '}'}</div>
        </>
      )}
    </div>
  );
}

function SqlModal({ snap, onClose }) {
  const [showProc, setShowProc] = useState(false);
  const info = SNAPSHOT_SQL[snap.num];
  const procText = info?.procedure ? PROCEDURES[info.procedure] : null;
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}>
      <div style={{ background: 'white', borderRadius: 14, width: '80vw', maxWidth: 860, maxHeight: '85vh', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
        onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1.5px solid #e2e8f0' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>S{snap.num} — {snap.description.split('—')[0].trim()}</div>
            {info?.queryId
              ? <>
                  <div style={{ fontSize: 11, color: '#64748b', fontFamily: 'monospace', marginTop: 2 }}>CALL Query ID: {info.queryId}</div>
                  {info.queryId2 && <div style={{ fontSize: 11, color: '#64748b', fontFamily: 'monospace', marginTop: 1 }}>DML Query ID: {info.queryId2}</div>}
                </>
              : <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2, fontStyle: 'italic' }}>Query ID: TBD</div>}
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#64748b', lineHeight: 1, padding: '4px 8px' }}>✕</button>
        </div>
        <div style={{ overflow: 'auto', padding: '20px', flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>SQL Executed</div>
          <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: 10, padding: '14px 18px', fontSize: 12, fontFamily: 'Monaco,Consolas,monospace', overflowX: 'auto', margin: 0, lineHeight: 1.6 }}>{info?.sql}</pre>
          {procText && (
            <div style={{ marginTop: 20 }}>
              <button onClick={() => setShowProc(p => !p)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: '1.5px solid #e2e8f0', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontSize: 12, fontWeight: 600, color: '#475569' }}>
                <span style={{ color: '#29B5E8', fontSize: 14 }}>{showProc ? '▾' : '▸'}</span>
                Stored Procedure Definition
              </button>
              {showProc && (
                <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: 10, padding: '14px 18px', fontSize: 12, fontFamily: 'Monaco,Consolas,monospace', overflowX: 'auto', margin: '10px 0 0', lineHeight: 1.6 }}>{procText}</pre>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MetadataFileHelper() {
  return (
    <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.8 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>How to Read This</div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: 2 }}>What is this file?</div>
        <div>The <strong>table metadata file</strong> (JSON) — the root of the entire Iceberg table. A new one is written on every commit. The catalog always points to the current one.</div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>Key fields:</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>format-version</code> — Iceberg spec version (3 = V3 with delete vectors)</div>
          <div><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>current-snapshot-id</code> — which snapshot is "active" right now</div>
          <div><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>snapshots</code> — array of all snapshot entries within retention window</div>
          <div><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>snapshot-log</code> — ordered history of which snapshot was current and when</div>
          <div><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>schemas</code> — table schema definitions (column names, types, IDs)</div>
          <div><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>location</code> — root S3/ADLS path where all table data lives</div>
          <div><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>properties</code> — table-level config (write format, compression, Snowflake-specific settings)</div>
        </div>
      </div>
      <div style={{ background: '#fffbeb', border: '1px solid #f59e0b30', borderRadius: 6, padding: '10px 12px', fontSize: 11, color: '#64748b', lineHeight: 1.6 }}>
        <strong>Why it matters:</strong> This is the entry point for reading the table. The catalog resolves the current metadata file, which points to the current snapshot, which points to the manifest list, and so on down the chain.
      </div>
    </div>
  );
}

function ManifestListHelper() {
  return (
    <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.8 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#0e7490', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>How to Read This</div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: 2 }}>What is this file?</div>
        <div>A <strong>manifest list</strong> (Avro) — the "table of contents" for a snapshot. It lists which manifest files belong to this snapshot and their summary statistics.</div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>Key fields:</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>manifest_path</code> — S3 path to each manifest file in this snapshot</div>
          <div><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>manifest_length</code> — size in bytes of that manifest file</div>
          <div><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>added_snapshot_id</code> — which snapshot originally created this manifest</div>
          <div><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>content</code> — 0 = data manifest, 1 = delete manifest</div>
          <div><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>added_data_files_count</code> — how many data files this manifest tracks</div>
          <div><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>existing_data_files_count</code> — reused files carried from prior snapshot</div>
          <div><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>partitions</code> — partition range summaries (min/max per partition field)</div>
        </div>
      </div>
      <div style={{ background: '#f0fbff', border: '1px solid #29B5E830', borderRadius: 6, padding: '10px 12px', fontSize: 11, color: '#64748b', lineHeight: 1.6 }}>
        <strong>Why it matters:</strong> When Snowflake reads your table, it starts here — scanning the manifest list to determine which manifest files (and therefore which data/puffin files) are relevant for the query.
      </div>
    </div>
  );
}

function ManifestFileHelper() {
  return (
    <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.8 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#0e7490', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>How to Read This</div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: 2 }}>What is this file?</div>
        <div>A <strong>manifest file</strong> (Avro) — tracks individual data files or delete files. Each entry describes one Parquet or Puffin file with its statistics.</div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>Key fields:</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>data_file.file_path</code> — S3 path to the actual Parquet/Puffin file</div>
          <div><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>data_file.file_format</code> — PARQUET or PUFFIN</div>
          <div><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>data_file.record_count</code> — number of rows in this file</div>
          <div><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>data_file.file_size_in_bytes</code> — physical file size</div>
          <div><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>data_file.column_sizes</code> — bytes per column (for pruning decisions)</div>
          <div><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>data_file.lower_bounds / upper_bounds</code> — min/max per column (enables partition pruning)</div>
          <div><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>data_file.referenced_data_file</code> — (puffin only) which Parquet file this delete vector applies to</div>
          <div><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>status</code> — 1 = added in this snapshot, 2 = deleted/removed</div>
          <div><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>snapshot_id</code> — the snapshot that added this entry</div>
          <div><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>sequence_number</code> — ordering for merge-on-read conflict resolution</div>
        </div>
      </div>
      <div style={{ background: '#f0fbff', border: '1px solid #29B5E830', borderRadius: 6, padding: '10px 12px', fontSize: 11, color: '#64748b', lineHeight: 1.6 }}>
        <strong>Why it matters:</strong> This is where Snowflake decides which files to actually read. The lower/upper bounds enable skipping entire files that can't match your WHERE clause (partition pruning). The column_sizes help estimate scan cost.
      </div>
    </div>
  );
}

function ParquetFileHelper({ data }) {
  if (!data) return null;
  return (
    <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.8 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#29B5E8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>How to Read This</div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: 2 }}>What is this file?</div>
        <div>A <strong>Parquet data file</strong> — contains the actual row data in compressed columnar format. This is what Snowflake physically scans at query time.</div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>File stats:</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div><strong>{data.num_rows}</strong> rows × <strong>{data.num_columns}</strong> columns</div>
          <div><strong>{(data.file_size_bytes / 1024).toFixed(1)} KB</strong> on disk (compressed)</div>
          <div><strong>{data.row_groups}</strong> row group{data.row_groups > 1 ? 's' : ''}</div>
        </div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>Columns:</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {data.schema?.map(col => (
            <span key={col.name} style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 4, padding: '2px 6px', fontSize: 10, fontFamily: 'Monaco,Consolas,monospace' }}>{col.name}</span>
          ))}
        </div>
      </div>
      <div style={{ background: '#f0fbff', border: '1px solid #29B5E830', borderRadius: 6, padding: '10px 12px', fontSize: 11, color: '#64748b', lineHeight: 1.6 }}>
        <strong>Context:</strong> These are the 60 rows written by the UPDATE in S2. Since Iceberg V3 uses merge-on-read, the updated rows are written as new data files (not overwriting the original). The old row positions are marked deleted via puffin files.
      </div>
    </div>
  );
}

function PuffinHelper({ data }) {
  const blob = data?.blobs?.[0];
  if (!blob) return null;
  const refFile = blob['referenced-data-file'] || '';
  const shortRef = refFile.split('/').pop();
  return (
    <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.8 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>How to Read This</div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: 2 }}>What is this file?</div>
        <div>A <strong>Puffin file</strong> containing a <strong>deletion vector</strong> — a compact bitmap that tells Snowflake which row positions to skip when reading a specific Parquet data file.</div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: 2 }}>What does it do?</div>
        <div>Instead of rewriting the entire Parquet file to remove {blob.cardinality} row{blob.cardinality !== 1 ? 's' : ''}, Snowflake writes this tiny file ({data['file-size-bytes']} bytes) that says:</div>
        <div style={{ background: '#faf5ff', border: '1px solid #7C3AED30', borderRadius: 6, padding: '8px 12px', marginTop: 6, fontFamily: 'Monaco,Consolas,monospace', fontSize: 11 }}>
          "When reading <strong>{shortRef}</strong>, skip <strong>{blob.cardinality}</strong> specific row positions"
        </div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>Field-by-field:</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>type</code> — always "deletion-vector-v1" for Iceberg V3 deletes</div>
          <div><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>referenced-data-file</code> — the Parquet file these deletes apply to</div>
          <div><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>cardinality</code> — number of rows marked as deleted</div>
          <div><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>fields: [2147483645]</code> — special ID meaning "all columns" (full row delete)</div>
          <div><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>offset / length</code> — where the roaring bitmap blob lives in this file</div>
          <div><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>snapshot-id: -1</code> — sentinel value; actual snapshot context comes from the manifest</div>
        </div>
      </div>
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 6, padding: '10px 12px', fontSize: 11, color: '#64748b', lineHeight: 1.6 }}>
        <strong>Why this matters:</strong> This is the Iceberg V3 "merge-on-read" optimization. The {blob.cardinality} deleted rows still physically exist in the Parquet file, but are filtered out at query time using this bitmap. No expensive rewrite needed.
      </div>
    </div>
  );
}

function JsonModal({ fileKey, label, onClose }) {
  const data = FILE_CONTENTS[fileKey] || PUFFIN_CONTENTS[fileKey] || PARQUET_CONTENTS[fileKey];
  const isPuffin = !!PUFFIN_CONTENTS[fileKey];
  const isParquetFile = !!PARQUET_CONTENTS[fileKey];
  const isManifestList = fileKey.startsWith('snap-');
  const isManifestFile = !isPuffin && !isManifestList && /-m\d+$/.test(fileKey);
  const isMetadata = /^\d{5}-/.test(fileKey);
  const hasHelper = isPuffin || isManifestList || isManifestFile || isMetadata || isParquetFile;
  const [search, setSearch] = useState('');
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}>
      <div style={{ background: 'white', borderRadius: 14, width: hasHelper ? '90vw' : '80vw', maxWidth: hasHelper ? 1100 : 900, maxHeight: '85vh', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
        onClick={e => e.stopPropagation()}>
        <div style={{ padding: '14px 20px', borderBottom: '1.5px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>{label}</div>
              <div style={{ fontSize: 11, color: '#64748b', fontFamily: 'monospace', marginTop: 2 }}>{fullName(fileKey)}</div>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#64748b', lineHeight: 1, padding: '4px 8px' }}>✕</button>
          </div>
          {isPuffin && <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 6, fontStyle: 'italic' }}>*Note: Puffin file parsed from binary PFA1 format — footer metadata extracted, blob contents (roaring bitmap) are not human-readable.</div>}
          <div style={{ marginTop: 10 }}>
            <input
              type="text"
              placeholder="Search JSON (keys & values)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '7px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 12, fontFamily: 'Monaco,Consolas,monospace', outline: 'none', background: '#f8fafc' }}
              onFocus={e => e.currentTarget.style.borderColor = '#29B5E8'}
              onBlur={e => e.currentTarget.style.borderColor = '#e2e8f0'}
              autoFocus
            />
          </div>
        </div>
        <div style={{ overflow: 'auto', padding: '16px 20px', flex: 1, display: hasHelper ? 'flex' : 'block', gap: hasHelper ? 20 : 0 }}>
          <div style={{ flex: hasHelper ? 1 : undefined, minWidth: 0 }}>
            {data ? <JsonNode value={data} depth={0} search={search} defaultOpen={isPuffin ? 99 : 2} /> : <div style={{ color: '#94a3b8', fontStyle: 'italic' }}>No data available for this file yet.</div>}
          </div>
          {hasHelper && (
            <div style={{ width: 320, flexShrink: 0, borderLeft: '1.5px solid #e2e8f0', paddingLeft: 20 }}>
              {isPuffin && <PuffinHelper data={data} />}
              {isManifestList && <ManifestListHelper />}
              {isManifestFile && <ManifestFileHelper />}
              {isMetadata && <MetadataFileHelper />}
              {isParquetFile && <ParquetFileHelper data={data} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

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

function FileStack({ files, family, orphan, puffin, onFileClick }) {
  const activeColor = puffin ? '#7C3AED' : '#29B5E8';
  const activeBg = puffin ? '#faf5ff' : '#f0fbff';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: orphan ? '#475569' : (puffin ? '#7C3AED' : '#0e7490'), marginBottom: 2, fontFamily: 'monospace' }}>
        {family}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {files.map(f => {
          const hasPuffinData = puffin && PUFFIN_CONTENTS[f];
          const hasParquetData = !puffin && PARQUET_CONTENTS[f];
          const isClickable = hasPuffinData || hasParquetData;
          return (
            <Tooltip key={f} text={f}>
              <div
                onClick={isClickable ? () => onFileClick && onFileClick({ key: f, label: puffin ? 'Puffin Delete Vector' : 'Parquet Data File' }) : undefined}
                style={{
                  border: orphan ? '1.5px dashed #94a3b8' : `1.5px solid ${activeColor}`,
                  background: orphan ? '#f1f5f9' : activeBg,
                  borderRadius: 5, padding: '3px 7px',
                  fontSize: 10, fontFamily: "'Monaco','Consolas',monospace",
                  color: orphan ? '#475569' : (puffin ? '#7C3AED' : '#0e7490'),
                  opacity: orphan ? 0.85 : 1,
                  cursor: isClickable ? 'pointer' : 'default',
                }}>
                {short(f)}
              </div>
            </Tooltip>
          );
        })}
      </div>
      {orphan && <div style={{ fontSize: 9, color: '#475569', marginTop: 2, fontStyle: 'italic' }}>orphan</div>}
    </div>
  );
}

function ManifestBadge({ type, contentType, orphan }) {
  const colors = { added: '#16a34a', deleted: '#ef5350', existing: '#1e3a5f' };
  const labels = { added: 'ADDED', deleted: 'REMOVES', existing: 'REUSED' };
  return (
    <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginTop: 3, flexWrap: 'wrap' }}>
      <span style={{ background: colors[type], color: 'white', fontSize: 9, padding: '1px 6px', borderRadius: 8, fontWeight: 700 }}>{labels[type]}</span>
      {orphan && (
        <span style={{ background: '#0e7490', color: 'white', fontSize: 9, padding: '1px 6px', borderRadius: 8, fontWeight: 700 }}>
          {contentType === 1 ? 'DELETE VEC' : 'DATA'}
        </span>
      )}
    </div>
  );
}

function RowLabel({ children }) {
  return (
    <div style={{
      fontSize: 9, fontWeight: 700, textTransform: 'uppercase',
      letterSpacing: '0.1em', color: '#475569',
      background: '#f8fafc', border: '1px solid #e2e8f0',
      borderRadius: 6, padding: '4px 8px', whiteSpace: 'nowrap',
      alignSelf: 'center', flexShrink: 0, marginRight: 10,
    }}>
      {children}
    </div>
  );
}

function bezier(x1, y1, x2, y2, direct = false) {
  const dy = y2 - y1;
  const dx = x2 - x1;
  const cp = Math.abs(dy) * 0.45;
  if (!direct && dx < -100) {
    const swing = Math.abs(dx) * 0.55;
    return `M ${x1} ${y1} C ${x1 + swing} ${y1 + cp}, ${x2 + swing} ${y2 - cp}, ${x2} ${y2}`;
  }
  if (!direct && dx > 100) {
    const swing = Math.abs(dx) * 0.55;
    return `M ${x1} ${y1} C ${x1 - swing} ${y1 + cp}, ${x2 - swing} ${y2 - cp}, ${x2} ${y2}`;
  }
  return `M ${x1} ${y1} C ${x1} ${y1 + cp}, ${x2} ${y2 - cp}, ${x2} ${y2}`;
}

function SnapshotDiagram({ snap, onFileClick }) {
  const containerRef = useRef(null);
  const refs = useRef({});
  const [lines, setLines] = useState([]);
  const [svgH, setSvgH] = useState(0);

  const openFile = (key, label) => onFileClick && (FILE_CONTENTS[key] || PUFFIN_CONTENTS[key] || PARQUET_CONTENTS[key]) && onFileClick({ key, label });
  const clickStyle = (key) => (FILE_CONTENTS[key] || PUFFIN_CONTENTS[key] || PARQUET_CONTENTS[key]) ? { cursor: 'pointer', transition: 'box-shadow 0.15s' } : {};

  const addedManifests = snap.manifests.filter(m => m.type === 'added');
  const reusedManifests = snap.manifests.filter(m => m.type === 'existing');
  const removedManifests = snap.manifests.filter(m => m.type === 'deleted');
  const activeManifests = [...addedManifests, ...reusedManifests];

  const setRef = (key) => (el) => { refs.current[key] = el; };

  useEffect(() => {
    const compute = () => {
      const container = containerRef.current;
      if (!container) return;
      const cr = container.getBoundingClientRect();
      setSvgH(cr.height);

      const pos = (key) => {
        const el = refs.current[key];
        if (!el) return null;
        const br = el.getBoundingClientRect();
        return {
          top: br.top - cr.top,
          bottom: br.bottom - cr.top,
          cx: (br.left + br.right) / 2 - cr.left,
        };
      };

      const newLines = [];
      const push = (k1, k2, direct = false) => {
        const p1 = pos(k1), p2 = pos(k2);
        if (!p1 || !p2) return;
        newLines.push({ x1: p1.cx, y1: p1.bottom, x2: p2.cx, y2: p2.top, direct });
      };

      push('catalog', 'activeMeta', true);
      if (snap.manifestList) {
        push('activeMeta', 'manifestList', true);
        const mlPos = pos('manifestList');
        activeManifests.forEach(m => {
          const mfPos = pos(`mf-${m.file}`);
          if (mlPos && mfPos) {
            const startX = Math.max(mlPos.cx - 70, Math.min(mlPos.cx + 70, mfPos.cx));
            newLines.push({ x1: startX, y1: mlPos.bottom, x2: mfPos.cx, y2: mfPos.top, direct: true });
          }
          const family = getFamily(m.files);
          if (family) push(`mf-${m.file}`, `stack-${family}`, true);
        });
      }
      setLines(newLines);
    };

    const raf = requestAnimationFrame(compute);
    window.addEventListener('resize', compute);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', compute); };
  }, [snap]);

  return (
    <div ref={containerRef} style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 14, padding: '28px 24px', position: 'relative' }}>

      {/* SVG overlay */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: svgH || '100%', pointerEvents: 'none', overflow: 'visible', zIndex: 0 }}>
        {lines.map((l, i) => (
          <path key={i} d={bezier(l.x1, l.y1, l.x2, l.y2, l.direct)}
            fill="none" stroke="#29B5E8" strokeWidth="1.5" strokeOpacity="0.5" />
        ))}
      </svg>

      {/* All content sits above SVG */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', gap: 0, alignItems: 'flex-start' }}>

          {/* LEFT: Active content */}
          <div style={{ flex: 1 }}>
            {/* Catalog */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
              <div ref={setRef('catalog')} style={{ border: '2px solid #29B5E8', borderRadius: '50% / 12px', background: 'linear-gradient(180deg,#f0fbff,#e0f4fd)', padding: '10px 32px', textAlign: 'center', minWidth: 200 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#0e7490' }}>🗄 Snowflake Catalog</div>
                <div style={{ fontSize: 11, color: '#475569', marginTop: 4, fontFamily: 'monospace' }}>ORDERS_ICEBERG (V3)</div>
                <div style={{ fontSize: 10, color: '#64748b', marginTop: 4 }}>
                  current → <span style={{ color: '#0e7490', fontWeight: 600 }}>{snap.metadataFiles.find(m => m.active)?.file}.metadata.json</span>
                </div>
              </div>
            </div>

            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569', marginBottom: 10 }}>— metadata layer —</div>

            {/* Active metadata file */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
              {snap.metadataFiles.filter(m => m.active).map(m => (
                <Tooltip key={m.file} text={m.file + '.metadata.json'}>
                  <div ref={setRef('activeMeta')} onClick={() => openFile(m.file, `Metadata File ${META_NUM[m.file]}`)} style={{ border: '2px solid #29B5E8', background: '#f0fbff', borderRadius: 8, padding: '7px 10px', textAlign: 'center', fontSize: 11, fontFamily: "'Monaco','Consolas',monospace", color: '#0e7490', ...clickStyle(m.file) }}>
                    <div style={{ fontSize: 9, fontWeight: 700, color: '#29B5E8', textTransform: 'uppercase', marginBottom: 3 }}>Metadata File {META_NUM[m.file]}</div>
                    <Tooltip text={fullName(m.file)}>{m.file}.json</Tooltip>
                  </div>
                </Tooltip>
              ))}
            </div>

            {snap.manifestList ? (
              <>
                {/* Manifest list */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                  <div ref={setRef('manifestList')} onClick={() => openFile(snap.manifestList, `Manifest List ${ML_NUM[snap.manifestList]}`)} style={{ border: '2px solid #29B5E8', background: '#f0fbff', borderRadius: 8, padding: '8px 16px', textAlign: 'center', ...clickStyle(snap.manifestList) }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>Manifest List {ML_NUM[snap.manifestList]}</div>
                    <Tooltip text={fullName(snap.manifestList)}>
                      <div style={{ fontSize: 11, fontFamily: "'Monaco','Consolas',monospace", color: '#0e7490' }}>
                        snap-{snap.manifestList.split('-')[1].slice(0,4)}…{snap.manifestList.split('-').pop()}
                      </div>
                    </Tooltip>
                    <div style={{ fontSize: 9, color: '#64748b', marginTop: 5, lineHeight: 1.5 }}>
                      {addedManifests.length > 0 && <span style={{ color: '#16a34a', fontWeight: 600 }}>{addedManifests.length} new</span>}
                      {addedManifests.length > 0 && reusedManifests.length > 0 && ' + '}
                      {reusedManifests.length > 0 && <span style={{ color: '#f97316', fontWeight: 600 }}>{reusedManifests.length} reused</span>}
                      {' manifest files'}
                    </div>
                  </div>
                </div>

                {/* Manifest file columns + data stacks */}
                {/* Manifest file boxes row */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 0 }}>
                  {[...reusedManifests, ...addedManifests].sort((a, b) => (MF_NUM[a.file] || 99) - (MF_NUM[b.file] || 99)).map((m, i) => (
                    <div key={i} ref={setRef(`mf-${m.file}`)} onClick={() => openFile(m.file, `Manifest File ${MF_NUM[m.file]}`)} style={{
                      border: `2px solid #29B5E8`, background: '#f0fbff',
                      borderRadius: 8, padding: '7px 10px', textAlign: 'center', minWidth: 110, ...clickStyle(m.file),
                    }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Manifest File {MF_NUM[m.file]}</div>
                      <Tooltip text={fullName(m.file)}><div style={{ fontSize: 11, fontFamily: "'Monaco','Consolas',monospace", color: '#1e293b', marginTop: 2 }}>{m.file}</div></Tooltip>
                      <ManifestBadge type={m.type} contentType={m.contentType} />
                      <div style={{ fontSize: 10, color: '#64748b', marginTop: 3 }}>{m.rows.toLocaleString()} rows</div>
                      {m.note && <div style={{ fontSize: 9, color: '#64748b', marginTop: 2, fontStyle: 'italic' }}>{m.note}</div>}
                    </div>
                  ))}
                </div>

                {/* Data layer separator */}
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569', margin: '16px 0 10px' }}>— data layer —</div>

                {/* Data stacks row */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 10 }}>
                  {[...reusedManifests, ...addedManifests].sort((a, b) => (MF_NUM[a.file] || 99) - (MF_NUM[b.file] || 99)).map((m, i) => {
                    const family = getFamily(m.files);
                    const isParquet = m.contentType === 0;
                    const stackFiles = family ? (isParquet ? snap.activeParquet[family] : snap.activePuffin[family]) : null;
                    return family && stackFiles ? (
                      <div key={i} ref={setRef(`stack-${family}`)} style={{
                        border: `1.5px solid ${isParquet ? '#29B5E8' : '#7C3AED'}`,
                        borderRadius: 10, padding: '10px 12px',
                        background: isParquet ? '#f0fbff' : '#faf5ff',
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                      }}>
                        <FileStack family={family} files={stackFiles} orphan={false} puffin={!isParquet} onFileClick={onFileClick} />
                      </div>
                    ) : <div key={i} />;
                  })}
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '16px', color: '#475569', fontSize: 13, fontStyle: 'italic', border: '1.5px dashed #e2e8f0', borderRadius: 8, marginBottom: 20 }}>
                No snapshots yet — table is empty
              </div>
            )}
          </div>

          {/* RIGHT: Orphan column */}
          {(snap.metadataFiles.filter(m => !m.active).length > 0 ||
            snap.orphanManifestLists.length > 0 ||
            removedManifests.length > 0 ||
            (snap.orphanManifestFiles && snap.orphanManifestFiles.length > 0) ||
            snap.orphanParquet.length > 0 ||
            snap.orphanPuffin.length > 0) && (
            <div style={{ borderLeft: '1.5px dashed #e2e8f0', paddingLeft: 16, width: 505, flexShrink: 0 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>— orphaned —</div>

              {/* Orphan metadata files */}
              {snap.metadataFiles.filter(m => !m.active).length > 0 && (
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', marginBottom: 6 }}>Metadata Files</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {snap.metadataFiles.filter(m => !m.active).map(m => (
                      <Tooltip key={m.file} text={m.file + '.metadata.json'}>
                        <div style={{ border: '1.5px dashed #cbd5e1', background: '#f8fafc', borderRadius: 7, padding: '5px 10px', textAlign: 'center', opacity: 0.7 }}>
                          <div style={{ fontSize: 9, fontWeight: 600, color: '#475569', textTransform: 'uppercase', marginBottom: 1 }}>Metadata File {META_NUM[m.file]}</div>
                          <div style={{ fontSize: 11, fontFamily: "'Monaco','Consolas',monospace", color: '#475569' }}>{m.file}.json</div>
                        </div>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              )}

              {/* Orphan manifest lists */}
              {snap.orphanManifestLists.length > 0 && (
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', marginBottom: 6 }}>Manifest Lists</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {snap.orphanManifestLists.map(ml => (
                      <Tooltip key={ml} text={ml + '.avro'}>
                        <div style={{ border: '1.5px dashed #cbd5e1', background: '#f8fafc', borderRadius: 7, padding: '5px 10px', opacity: 0.7 }}>
                          <div style={{ fontSize: 9, fontWeight: 600, color: '#475569', textTransform: 'uppercase', marginBottom: 1 }}>Manifest List {ML_NUM[ml]}</div>
                          <div style={{ fontSize: 11, fontFamily: "'Monaco','Consolas',monospace", color: '#475569' }}>snap-{ml.split('-')[1].slice(0,4)}…{ml.split('-').pop()}</div>
                        </div>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              )}

              {/* Orphan manifest files */}
              {(removedManifests.length > 0 || (snap.orphanManifestFiles && snap.orphanManifestFiles.length > 0)) && (
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', marginBottom: 6 }}>Manifest Files</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {removedManifests.map((m, i) => (
                      <div key={i} onClick={() => openFile(m.file, `Manifest File ${MF_NUM[m.file]}`)} style={{ border: '1.5px dashed #fca5a5', background: '#fff5f5', borderRadius: 7, padding: '5px 10px', textAlign: 'center', opacity: 0.75, ...clickStyle(m.file) }}>
                        <div style={{ fontSize: 9, fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Manifest File {MF_NUM[m.file]}</div>
                        <Tooltip text={fullName(m.file)}><div style={{ fontSize: 11, fontFamily: "'Monaco','Consolas',monospace", color: '#475569', marginTop: 1 }}>{m.file}</div></Tooltip>
                        <ManifestBadge type={m.type} contentType={m.contentType} orphan={true} />
                        {m.note && <div style={{ fontSize: 9, color: '#94a3b8', marginTop: 2, fontStyle: 'italic' }}>{m.note}</div>}
                      </div>
                    ))}
                    {snap.orphanManifestFiles && snap.orphanManifestFiles.map((m, i) => (
                      <div key={"omf"+i} style={{ border: '1.5px dashed #cbd5e1', background: '#f8fafc', borderRadius: 7, padding: '5px 10px', textAlign: 'center', opacity: 0.7 }}>
                        <div style={{ fontSize: 9, fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Manifest File {MF_NUM[m.file]}</div>
                        <div style={{ fontSize: 11, fontFamily: "'Monaco','Consolas',monospace", color: '#475569', marginTop: 1 }}>{m.file}</div>
                        <span style={{ background: '#0e7490', color: 'white', fontSize: 9, padding: '1px 6px', borderRadius: 8, fontWeight: 700, display: 'inline-block', marginTop: 3 }}>
                          {m.contentType === 1 ? 'DELETE VEC' : 'DATA'}
                        </span>
                        <div style={{ fontSize: 9, color: '#94a3b8', marginTop: 2, fontStyle: 'italic' }}>{m.reason}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Orphan data stacks */}
              {(snap.orphanParquet.length > 0 || snap.orphanPuffin.length > 0) && (
                <div>
                  <div style={{ fontSize: 9, fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', marginBottom: 6 }}>Data Files</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {snap.orphanParquet.map(o => (
                      <div key={o.family} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <FileStack family={o.family} files={o.files} orphan={true} puffin={false} onFileClick={onFileClick} />
                        <div style={{ fontSize: 9, color: '#94a3b8', marginTop: 3, fontStyle: 'italic', maxWidth: 120, textAlign: 'center' }}>{o.reason}</div>
                      </div>
                    ))}
                    {snap.orphanPuffin.map(o => (
                      <div key={o.family} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <FileStack family={o.family} files={o.files} orphan={true} puffin={true} onFileClick={onFileClick} />
                        <div style={{ fontSize: 9, color: '#94a3b8', marginTop: 3, fontStyle: 'italic', maxWidth: 120, textAlign: 'center' }}>{o.reason}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

const MOR_DATA = {
  0: null,
  1: { type: 'direct', note: 'Direct read — no delete vectors', files: [{ family: 'X-rqSgaF', count: 4, rows: '2,000,000' }], puffins: null, result: '2,000,000' },
  2: { type: 'mor', note: 'UPDATE 60 → merge-on-read applies delete vectors during scan', files: [{ family: 'X-rqSgaF', count: 4, rows: '2,000,000' }, { family: 'AgAjQxSF (new)', count: 3, rows: '60' }], puffins: { family: 'BAAjQxSF', count: 4, deletes: 60, breakdown: '60 updates in S2', targets: 'X-rqSgaF files' }, result: '2,000,000' },
  3: { type: 'mor', note: 'DELETE 80 → new puffins replace S2 puffins, now masking 140 positions', files: [{ family: 'X-rqSgaF', count: 4, rows: '2,000,000' }, { family: 'AgAjQxSF', count: 3, rows: '60' }], puffins: { family: 'QmqdMRWF', count: 4, deletes: 140, breakdown: '60 updates from S2 + 80 deletes in S3', targets: 'X-rqSgaF files' }, result: '1,999,920' },
  4: { type: 'mor', note: 'INSERT 1.2M → new data files added, same puffins still active', files: [{ family: 'X-rqSgaF', count: 4, rows: '2,000,000' }, { family: 'AgAjQxSF', count: 3, rows: '60' }, { family: 'gNyIOyKF', count: 2, rows: '1,200,000' }], puffins: { family: 'QmqdMRWF', count: 4, deletes: 140, breakdown: '60 updates from S2 + 80 deletes from S3', targets: 'X-rqSgaF files' }, result: '3,199,920' },
  5: { type: 'mor', note: 'DELETE 300 → new puffins replace S3 puffins, now masking 440 positions', files: [{ family: 'X-rqSgaF', count: 4, rows: '2,000,000' }, { family: 'AgAjQxSF', count: 3, rows: '60' }, { family: 'gNyIOyKF', count: 2, rows: '1,200,000' }], puffins: { family: 'whCeZSOF', count: 6, deletes: 440, breakdown: '60 updates from S2 + 80 deletes from S3 + 300 deletes in S5', targets: 'X-rqSgaF + gNyIOyKF files' }, result: '3,199,620' },
  6: { type: 'mor', note: 'UPDATE 150K → large rewrite of affected rows + new puffin vectors', files: [{ family: 'X-rqSgaF', count: 4, rows: '2,000,000' }, { family: 'gNyIOyKF', count: 2, rows: '1,200,000' }, { family: 'wxCeZSOF (rewritten)', count: 5, rows: '150,054' }], puffins: { family: 'xRCeZSOF', count: 6, deletes: '150,434', breakdown: '54 updates from S2 + 80 deletes from S3 + 300 deletes from S5 + 150,000 updates in S6. Note: 6 records overlap between S2 update and S6 update', targets: 'X-rqSgaF + gNyIOyKF files' }, result: '3,199,620' },
};

function MergeOnReadVisual({ snapNum }) {
  const d = MOR_DATA[snapNum];
  if (!d) return null;

  return (
    <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginTop: 16 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Merge-on-Read: What Happens at Query Time (S{snapNum})</div>
      <div style={{ fontSize: 12, color: '#475569', marginBottom: 16, fontStyle: 'italic' }}>{d.note}</div>

      <div style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
        <div style={{ flex: 1, border: '2px solid #16a34a', borderRadius: 10, padding: '14px 16px', background: '#f0fdf4' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', marginBottom: 10 }}>① Scan Data Files</div>
          {d.files.map(f => (
            <div key={f.family} style={{ fontSize: 11, color: '#475569', marginBottom: 4, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'Monaco,Consolas,monospace', fontWeight: 600, color: '#0e7490' }}>{f.family}</span>
              <span>{f.count} files · {f.rows} rows</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', padding: '0 8px' }}>
          <span style={{ fontSize: 18, color: '#94a3b8' }}>→</span>
        </div>

        {d.puffins ? (
          <div style={{ flex: 1, border: '2px solid #7C3AED', borderRadius: 10, padding: '14px 16px', background: '#faf5ff' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#7C3AED', textTransform: 'uppercase', marginBottom: 10 }}>② Apply Delete Vectors</div>
            <div style={{ fontSize: 11, color: '#475569', marginBottom: 4 }}>
              <span style={{ fontFamily: 'Monaco,Consolas,monospace', fontWeight: 600, color: '#7C3AED' }}>{d.puffins.family}</span>
            </div>
            <div style={{ fontSize: 11, color: '#475569', marginBottom: 4 }}>{d.puffins.count} puffin files</div>
            <div style={{ fontSize: 11, color: '#475569', marginBottom: 4 }}>Masks <strong>{d.puffins.deletes}</strong> row positions{d.puffins.breakdown && <span style={{ color: '#64748b' }}> ({d.puffins.breakdown})</span>}</div>
            <div style={{ fontSize: 10, color: '#64748b', fontStyle: 'italic' }}>targets: {d.puffins.targets}</div>
          </div>
        ) : (
          <div style={{ flex: 1, border: '2px dashed #e2e8f0', borderRadius: 10, padding: '14px 16px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: 11, color: '#94a3b8', fontStyle: 'italic' }}>No delete vectors — direct read</div>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', padding: '0 8px' }}>
          <span style={{ fontSize: 18, color: '#94a3b8' }}>→</span>
        </div>

        <div style={{ width: 160, flexShrink: 0, border: '2px solid #29B5E8', borderRadius: 10, padding: '14px 16px', background: '#f0fbff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#29B5E8', textTransform: 'uppercase', marginBottom: 6 }}>③ Logical Result</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#0e7490' }}>{d.result}</div>
          <div style={{ fontSize: 10, color: '#64748b' }}>rows returned</div>
        </div>
      </div>
    </div>
  );
}

export default function IcebergStorage() {
  const [snapIdx, setSnapIdx] = useState(0);
  const [modal, setModal] = useState(null);
  const [sqlModal, setSqlModal] = useState(false);
  const [explainerModal, setExplainerModal] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showMorRef, setShowMorRef] = useState(false);
  const intervalRef = useRef(null);
  const snap = SNAPSHOTS[snapIdx];

  const startPlay = () => {
    setSnapIdx(0);
    setPlaying(true);
    let i = 0;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      i += 1;
      if (i >= SNAPSHOTS.length) {
        clearInterval(intervalRef.current);
        setPlaying(false);
      } else {
        setSnapIdx(i);
      }
    }, 1000);
  };

  const stopPlay = () => {
    clearInterval(intervalRef.current);
    setPlaying(false);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>Iceberg Cloud Storage</h2>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ background: '#faf5ff', border: '1.5px solid #d8b4fe', borderRadius: 8, padding: '8px 14px', fontSize: 13, color: '#7C3AED' }}>
          <strong>Format Version 3</strong> — introduces <strong>Puffin delete vectors</strong> (merge-on-read). DELETE/UPDATE no longer rewrites entire Parquet files.
        </div>
      </div>

      <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <button onClick={playing ? stopPlay : startPlay} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: playing ? '#ef5350' : '#29B5E8',
            color: 'white', border: 'none', borderRadius: 8,
            padding: '7px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}>
            {playing ? '⏹ Stop' : '▶ Play'}
          </button>
          {playing && (
            <div style={{ flex: 1, height: 4, background: '#e2e8f0', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{
                height: '100%', background: '#29B5E8', borderRadius: 2,
                width: `${((snapIdx + 1) / SNAPSHOTS.length) * 100}%`,
                transition: 'width 0.8s ease',
              }} />
            </div>
          )}
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
            <button onClick={() => setSqlModal(true)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#29B5E8', fontWeight: 600, fontSize: 11, display: 'inline-flex', alignItems: 'center' }}>
              SQL <PopupIcon size={12} />
            </button>
          </div>
          <div style={{ fontSize: 13, color: '#475569', flex: 1 }}>{snap.description}</div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: snap.deltaColor }}>{snap.delta}</div>
            <div style={{ fontSize: 11, color: '#475569' }}>{snap.recordCount.toLocaleString()} rows in files</div>
            <div style={{ fontSize: 11, color: '#64748b', marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}>
              table rows after: <strong>{(SNAPSHOT_SQL[snap.num]?.logicalRows ?? 0).toLocaleString()}</strong>
              {SNAPSHOT_SQL[snap.num]?.explainer && (
                <button onClick={() => setExplainerModal(true)} title={SNAPSHOT_SQL[snap.num].explainer.title} style={{ background: '#fef9c3', border: '1px solid #fbbf24', borderRadius: 6, padding: '1px 6px', fontSize: 10, fontWeight: 700, color: '#92400e', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                  ⚠ {SNAPSHOT_SQL[snap.num].explainer.title}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <SnapshotDiagram snap={snap} onFileClick={setModal} />

      <MergeOnReadVisual snapNum={snap.num} />

      <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '14px 20px', marginTop: 16 }}>
        <div onClick={() => setShowMorRef(v => !v)} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', userSelect: 'none' }}>
          <span style={{ color: '#29B5E8', fontSize: 14 }}>{showMorRef ? '▾' : '▸'}</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Merge-on-Read with Position Deletes (Visual Reference)</span>
        </div>
        {showMorRef && (
          <div style={{ marginTop: 12 }}>
            <a href="https://jack-vanlightly.com/analyses/2024/7/30/understanding-apache-icebergs-consistency-model-part1" target="_blank" rel="noreferrer" style={{ fontSize: 11, color: '#29B5E8', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', marginBottom: 10 }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
              Source: Jack Vanlightly <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
            </a>
            <img src={`${import.meta.env.BASE_URL}MergeOnReadPositionDeletesSmall.webp`} alt="Merge-on-Read with Position Deletes" style={{ maxWidth: 600, width: '100%', borderRadius: 8, display: 'block' }} />
          </div>
        )}
      </div>

      {modal && <JsonModal fileKey={modal.key} label={modal.label} onClose={() => setModal(null)} />}
      {sqlModal && <SqlModal snap={snap} onClose={() => setSqlModal(false)} />}
      {explainerModal && SNAPSHOT_SQL[snap.num]?.explainer && (() => {
        const ex = SNAPSHOT_SQL[snap.num].explainer;
        return (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => setExplainerModal(false)}>
            <div style={{ background: 'white', borderRadius: 14, width: '80vw', maxWidth: 720, maxHeight: '85vh', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
              onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1.5px solid #fef08a', background: '#fefce8', borderRadius: '14px 14px 0 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 18 }}>⚠</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#92400e' }}>{ex.title}</div>
                    <div style={{ fontSize: 11, color: '#b45309', fontFamily: 'monospace', marginTop: 1 }}>Query ID: {ex.queryId}</div>
                  </div>
                </div>
                <button onClick={() => setExplainerModal(false)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#92400e', lineHeight: 1, padding: '4px 8px' }}>✕</button>
              </div>
              <div style={{ overflow: 'auto', padding: '20px', flex: 1 }}>
                <pre style={{ fontFamily: 'inherit', fontSize: 13, color: '#1e293b', lineHeight: 1.75, margin: 0, whiteSpace: 'pre-wrap' }}>{ex.body}</pre>
              </div>
            </div>
          </div>
        );
      })()}

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
