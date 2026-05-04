const TOOLS = [
  {
    id: 'adf',
    title: 'Azure Data Factory',
    description: 'Cloud ETL service for data integration and transformation pipelines.',
    color: '#0078D4',
    link: 'https://azure.microsoft.com/en-us/products/data-factory',
    connectorsLink: 'https://learn.microsoft.com/en-us/azure/data-factory/connector-overview#supported-data-stores',
  },
];

export default function IntegrationTools({ onNavigate }) {
  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>Integration Tools</h2>
      <p style={{ color: '#64748b', fontSize: 14, marginBottom: 28 }}>
        Data pipeline and ETL tools that connect to Snowflake.
      </p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {TOOLS.map(tool => (
          <div
            key={tool.id}
            onClick={() => onNavigate(tool.id)}
            style={{
              width: 260,
              padding: '20px 16px',
              background: 'white',
              border: `1.5px solid ${tool.color}50`,
              borderRadius: 12,
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'box-shadow 0.15s, border-color 0.15s',
              position: 'relative',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = `0 4px 16px ${tool.color}25`;
              e.currentTarget.style.borderColor = tool.color;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = `${tool.color}50`;
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>
              <a href={tool.link} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ color: '#29B5E8', textDecoration: 'none', fontWeight: 700, display: 'inline-flex', alignItems: 'center' }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
                {tool.title} <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
              </a>
            </div>
            <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5, marginBottom: 28 }}>
              {tool.description}
            </div>
            {tool.connectorsLink && (
              <a
                href={tool.connectorsLink}
                target="_blank" rel="noreferrer"
                onClick={e => e.stopPropagation()}
                style={{ position: 'absolute', bottom: 12, right: 12, fontSize: 12, color: '#29B5E8', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
              >
                Connectors <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
