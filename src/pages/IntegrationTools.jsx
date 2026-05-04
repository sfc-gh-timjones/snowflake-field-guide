const TOOLS = [
  {
    id: 'adf',
    title: 'Azure Data Factory',
    description: 'Cloud ETL service for data integration and transformation pipelines.',
    color: '#0078D4',
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
          <button
            key={tool.id}
            onClick={() => onNavigate(tool.id)}
            style={{
              width: 220,
              padding: '20px 16px',
              background: 'white',
              border: `1.5px solid ${tool.color}50`,
              borderRadius: 12,
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'box-shadow 0.15s, border-color 0.15s',
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
            <div style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>
              {tool.title}
            </div>
            <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>
              {tool.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
