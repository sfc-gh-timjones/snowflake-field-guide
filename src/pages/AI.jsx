export default function AI({ onNavigate }) {
  const CARDS = [
    {
      id: 'si',
      title: 'Snowflake Intelligence',
      description: 'Governance, model access control, and configuration for Snowflake AI products.',
      color: '#7c3aed',
    },
    {
      id: 'mcp-server',
      title: 'MCP Server',
      description: 'Connect AI agents and clients to Snowflake data via the Model Context Protocol.',
      color: '#0891b2',
    },
  ];

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>AI</h2>
      <p style={{ color: '#64748b', fontSize: 15, marginBottom: 28, maxWidth: 680 }}>
        Guides for Snowflake AI products, governance, and integration.
      </p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {CARDS.map(card => (
          <button
            key={card.id}
            onClick={() => onNavigate(card.id)}
            style={{
              width: 220,
              padding: '20px 16px',
              background: 'white',
              border: `1.5px solid ${card.color}50`,
              borderRadius: 12,
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'box-shadow 0.15s, border-color 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = `0 4px 16px ${card.color}25`;
              e.currentTarget.style.borderColor = card.color;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = `${card.color}50`;
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>
              {card.title}
            </div>
            <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>
              {card.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
