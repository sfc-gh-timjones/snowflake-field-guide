function LinkIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }}>
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
    </svg>
  );
}

const TOOL_TYPES = [
  { type: 'CORTEX_SEARCH_SERVICE_QUERY', label: 'Cortex Search Service tool' },
  { type: 'CORTEX_ANALYST_MESSAGE', label: 'Cortex Analyst tool' },
  { type: 'SYSTEM_EXECUTE_SQL', label: 'SQL execution' },
  { type: 'CORTEX_AGENT_RUN', label: 'Cortex Agent tool' },
  { type: 'GENERIC', label: 'Tool for UDFs and stored procedures' },
];

const MCP_CLIENTS = [
  { name: 'Claude.ai / Claude Desktop', href: 'https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents-mcp#connect-from-common-mcp-clients' },
  { name: 'ChatGPT', href: 'https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents-mcp#connect-from-common-mcp-clients' },
  { name: 'Cursor', href: 'https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents-mcp#connect-from-common-mcp-clients' },
  { name: 'Other MCP-compatible clients', href: 'https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents-mcp#connect-from-common-mcp-clients' },
];

export default function MCPServer() {
  return (
    <div style={{ maxWidth: 900 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>MCP Server</h2>
      <p style={{ color: '#64748b', fontSize: 15, marginBottom: 32, maxWidth: 780 }}>
        The Model Context Protocol (MCP) lets AI agents and clients securely access Snowflake data and tools without custom integrations.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Snowflake-managed MCP Server */}
        <div style={{ border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', background: 'white' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>Snowflake-managed MCP Server</div>
          <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, margin: '0 0 16px' }}>
            The Snowflake-managed MCP server lets AI agents securely retrieve data from Snowflake accounts without needing to deploy separate infrastructure.
          </p>

          <div style={{ fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 8 }}>Supported tool types</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
            {TOOL_TYPES.map(t => (
              <div key={t.type} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                <code style={{ background: '#f1f5f9', padding: '2px 7px', borderRadius: 4, fontSize: 11, fontWeight: 700, color: '#0e7490', flexShrink: 0 }}>{t.type}</code>
                <span style={{ fontSize: 12, color: '#64748b' }}>{t.label}</span>
              </div>
            ))}
          </div>

          <div style={{ padding: '10px 14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 12, color: '#475569', lineHeight: 1.5, marginBottom: 16 }}>
            <span style={{ fontWeight: 700, color: '#1e293b' }}>Note:</span> Access to the MCP Server does not give access to the tools. Permission needs to be granted for each tool separately.
          </div>

          <a href="https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents-mcp#create-an-mcp-server-object" target="_blank" rel="noreferrer" style={{ fontSize: 13, fontWeight: 600, color: '#29B5E8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
            Create an MCP Server Object<LinkIcon size={13} />
          </a>
        </div>

        {/* MCP Clients */}
        <div style={{ border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', background: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#1e293b' }}>MCP Clients</div>
            <a href="https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents-mcp#connect-from-common-mcp-clients" target="_blank" rel="noreferrer" style={{ fontSize: 12, fontWeight: 600, color: '#29B5E8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
              Connect from common MCP clients<LinkIcon size={12} />
            </a>
          </div>

          <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, margin: '0 0 14px' }}>
            Connect from any MCP-compatible client by pointing it at your MCP server URL:
          </p>
          <div style={{ background: '#1e293b', color: '#e2e8f0', padding: '10px 16px', borderRadius: 8, fontSize: 12, fontFamily: 'monospace', lineHeight: 1.6, marginBottom: 20, wordBreak: 'break-all' }}>
            https://&lt;account_url&gt;/api/v2/databases/&lt;database&gt;/schemas/&lt;schema&gt;/mcp-servers/&lt;name&gt;
          </div>

          <div style={{ fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 10 }}>Commonly used clients</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {MCP_CLIENTS.map(client => (
              <div key={client.name} style={{ padding: '8px 14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 13, color: '#334155', fontWeight: 500 }}>
                {client.name}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
