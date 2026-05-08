const COMPETITORS = [
  {
    id: 'fabric',
    title: 'Microsoft Fabric',
    description: 'Unified analytics platform built on Azure with OneLake and Power BI.',
    color: '#0078D4',
    link: 'https://www.microsoft.com/en-us/microsoft-fabric',
  },
];

export default function Competition({ onNavigate }) {
  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>Competition</h2>
      <p style={{ color: '#64748b', fontSize: 14, marginBottom: 28 }}>
        How Snowflake compares against competing platforms.
      </p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {COMPETITORS.map(item => (
          <div
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              width: 260,
              padding: '20px 16px',
              background: 'white',
              border: `1.5px solid ${item.color}50`,
              borderRadius: 12,
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'box-shadow 0.15s, border-color 0.15s',
              position: 'relative',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = `0 4px 16px ${item.color}25`;
              e.currentTarget.style.borderColor = item.color;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = `${item.color}50`;
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>
              <a href={item.link} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ color: '#29B5E8', textDecoration: 'none', fontWeight: 700, display: 'inline-flex', alignItems: 'center' }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
                {item.title} <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
              </a>
            </div>
            <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
