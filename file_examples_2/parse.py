import json, fastavro, os, datetime

DIR = '/Users/timjones/projects/coco/snowflake-field-guide/file_examples_2'

with open(f'{DIR}/00006-edf55cf2-5826-4bbc-8c1c-62ddedbde0f3.metadata.json') as f:
    meta = json.load(f)

print('FORMAT VERSION:', meta['format-version'])
print()
print('SNAPSHOT CHAIN:')
for s in meta['snapshots']:
    ts = datetime.datetime.fromtimestamp(s['timestamp-ms']/1000)
    summ = s.get('summary', {})
    print('snap', s['snapshot-id'], '|', ts, '| op=', summ.get('operation'),
          '| added=', summ.get('added-records','0'),
          '| deleted=', summ.get('deleted-records','0'),
          '| total=', summ.get('total-records','?'))

print()
print('MANIFEST LISTS:')
for f in sorted(os.listdir(DIR)):
    if not f.startswith('snap-'):
        continue
    print('---', f)
    with open(f'{DIR}/{f}', 'rb') as fh:
        reader = fastavro.reader(fh)
        for entry in reader:
            print('  manifest=', entry['manifest_path'].split('/')[-1],
                  '| content=', entry.get('content', 0),
                  '| added=', entry.get('added_rows_count','?'),
                  '| deleted=', entry.get('deleted_rows_count','?'),
                  '| existing=', entry.get('existing_rows_count','?'))

print()
print('MANIFEST FILES:')
for f in sorted(os.listdir(DIR)):
    if not (f.endswith('.avro') and not f.startswith('snap-')):
        continue
    print('---', f)
    with open(f'{DIR}/{f}', 'rb') as fh:
        reader = fastavro.reader(fh)
        for r in reader:
            fp = r['data_file']['file_path'].split('/')[-1]
            status = r['status']
            rc = r['data_file']['record_count']
            content = r['data_file'].get('content', 0)
            snap = r.get('snapshot_id')
            print('  status=', status, '| content=', content, '| file=', fp, '| records=', rc, '| snap=', snap)
