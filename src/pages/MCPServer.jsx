import { useState } from 'react';

function LinkIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }}>
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
    </svg>
  );
}

function PopupIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }}>
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M3 9h18"/>
      <path d="M9 21V9"/>
    </svg>
  );
}

function NxMModal({ onClose }) {
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: 24 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'white', borderRadius: 14, overflow: 'hidden', width: '90vw', maxWidth: 720, boxShadow: '0 24px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>N×M vs N+M — Why MCP reduces integration complexity</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: '#64748b', lineHeight: 1, padding: '0 4px' }}>×</button>
        </div>
        <div style={{ padding: '20px 24px' }}>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>

            {/* N x M */}
            <div style={{ flex: 1, minWidth: 260 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#ef4444', marginBottom: 10, textAlign: 'center' }}>Without MCP — N×M integrations</div>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 8 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {['Agent A', 'Agent B', 'Agent C'].map(a => (
                    <div key={a} style={{ padding: '6px 14px', background: '#fef2f2', border: '1.5px solid #fca5a5', borderRadius: 7, fontSize: 12, fontWeight: 600, color: '#dc2626', textAlign: 'center' }}>{a}</div>
                  ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4 }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{ display: 'flex', gap: 4 }}>
                      {[0,1,2].map(j => (
                        <svg key={j} width="28" height="14" viewBox="0 0 28 14" fill="none">
                          <line x1="0" y1="7" x2="22" y2="7" stroke="#cbd5e1" strokeWidth="1.5"/>
                          <path d="M18 3l6 4-6 4" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      ))}
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {['Snowflake', 'DB 2', 'DB 3'].map(s => (
                    <div key={s} style={{ padding: '6px 14px', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 7, fontSize: 12, fontWeight: 600, color: '#475569', textAlign: 'center' }}>{s}</div>
                  ))}
                </div>
              </div>
              <div style={{ fontSize: 12, color: '#64748b', textAlign: 'center', lineHeight: 1.5 }}>
                3 agents × 3 data sources = <span style={{ fontWeight: 700, color: '#dc2626' }}>9 custom integrations</span>.<br/>Every new agent or source adds more.
              </div>
            </div>

            <div style={{ width: 1, background: '#e2e8f0', flexShrink: 0 }} />

            {/* N + M */}
            <div style={{ flex: 1, minWidth: 260 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#16a34a', marginBottom: 10, textAlign: 'center' }}>With MCP — N+M integrations</div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {['Agent A', 'Agent B', 'Agent C'].map(a => (
                    <div key={a} style={{ padding: '6px 14px', background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: 7, fontSize: 12, fontWeight: 600, color: '#16a34a', textAlign: 'center' }}>{a}</div>
                  ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14 }}>
                  {[0,1,2].map(i => (
                    <svg key={i} width="28" height="14" viewBox="0 0 28 14" fill="none">
                      <line x1="0" y1="7" x2="22" y2="7" stroke="#29B5E8" strokeWidth="1.5"/>
                      <path d="M18 3l6 4-6 4" fill="none" stroke="#29B5E8" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  ))}
                </div>
                <div style={{ padding: '18px 14px', background: '#f0fbff', border: '2px solid #29B5E8', borderRadius: 10, fontSize: 12, fontWeight: 700, color: '#0e7490', textAlign: 'center', minWidth: 70 }}>MCP<br/>Server</div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14 }}>
                  {[0,1,2].map(i => (
                    <svg key={i} width="28" height="14" viewBox="0 0 28 14" fill="none">
                      <line x1="0" y1="7" x2="22" y2="7" stroke="#29B5E8" strokeWidth="1.5"/>
                      <path d="M18 3l6 4-6 4" fill="none" stroke="#29B5E8" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {['Snowflake', 'DB 2', 'DB 3'].map(s => (
                    <div key={s} style={{ padding: '6px 14px', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 7, fontSize: 12, fontWeight: 600, color: '#475569', textAlign: 'center' }}>{s}</div>
                  ))}
                </div>
              </div>
              <div style={{ fontSize: 12, color: '#64748b', textAlign: 'center', lineHeight: 1.5 }}>
                3 agents + 3 data sources = <span style={{ fontWeight: 700, color: '#16a34a' }}>6 integrations</span>.<br/>Add a new agent: 1 connection, not 3.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const TOOL_TYPES = [
  { type: 'CORTEX_SEARCH_SERVICE_QUERY', label: 'Cortex Search Service tool' },
  { type: 'CORTEX_ANALYST_MESSAGE', label: 'Cortex Analyst tool' },
  { type: 'SYSTEM_EXECUTE_SQL', label: 'SQL execution' },
  { type: 'CORTEX_AGENT_RUN', label: 'Cortex Agent tool' },
  { type: 'GENERIC', label: 'Tool for UDFs and stored procedures' },
];

const DECISION_ROWS = [
  { scenario: 'Your app knows exactly what query to run', use: 'REST API' },
  { scenario: 'An AI agent needs to figure out what to call', use: 'MCP Server' },
  { scenario: 'One integration, one consumer', use: 'REST API' },
  { scenario: 'Multiple agents or copilots need access to the same data', use: 'MCP Server' },
  { scenario: 'LLM needs to choose between structured + unstructured data tools', use: 'MCP Server' },
  { scenario: 'Programmatic pipeline with no AI reasoning', use: 'REST API' },
];

export default function MCPServer() {
  const [showNxM, setShowNxM] = useState(false);

  return (
    <div style={{ maxWidth: 1000 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>MCP Server</h2>
      <p style={{ color: '#64748b', fontSize: 15, marginBottom: 8, maxWidth: 780 }}>
        The Model Context Protocol (MCP) lets AI agents and clients securely access Snowflake data and tools without custom integrations.
      </p>
      <a href="https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents-mcp" target="_blank" rel="noreferrer" style={{ fontSize: 13, fontWeight: 600, color: '#29B5E8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', marginBottom: 28 }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
        Docs: Snowflake-managed MCP Server<LinkIcon size={13} />
      </a>

      {/* MCP Clients (left) → arrow → Server (right) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 32, flexWrap: 'wrap' }}>

        {/* MCP Clients box */}
        <div style={{ flex: 1, minWidth: 280, border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', background: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#1e293b' }}>MCP Clients</div>
            <a href="https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents-mcp#connect-from-common-mcp-clients" target="_blank" rel="noreferrer" style={{ fontSize: 12, fontWeight: 600, color: '#29B5E8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
              Docs: Connect from common MCP clients<LinkIcon size={12} />
            </a>
          </div>

          <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, margin: '0 0 10px' }}>
            Connect from any MCP-compatible client by pointing it at your MCP server URL:
          </p>
          <div style={{ background: '#1e293b', color: '#e2e8f0', padding: '10px 14px', borderRadius: 8, fontSize: 11, fontFamily: 'monospace', lineHeight: 1.6, marginBottom: 14, wordBreak: 'break-all' }}>
            {'https://<account_url>/api/v2/databases/<database>/schemas/<schema>/mcp-servers/<name>'}
          </div>

          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#94a3b8', marginBottom: 6 }}>Common clients</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
            {['Claude.ai / Claude Desktop', 'ChatGPT', 'Cursor', 'Other MCP-compatible clients'].map(name => (
              <div key={name} style={{ padding: '5px 11px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 7, fontSize: 12, color: '#334155', fontWeight: 500 }}>
                {name}
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#94a3b8', marginBottom: 6 }}>What is an MCP client?</div>
            <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.6, marginBottom: 8 }}>
              An MCP client is any code that speaks the MCP protocol — connects to a server, discovers tools, and invokes them. That could be Claude Desktop, a custom Python script, or anything else. <span style={{ fontWeight: 600 }}>No LLM required.</span>
            </div>
            <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.6, padding: '8px 12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 7 }}>
              <span style={{ fontWeight: 700, color: '#1e293b' }}>Where MCP's value inflects:</span> When the caller has an LLM reasoning loop. The agent can discover tools at runtime instead of hardcoding endpoints, compose multiple tools in sequence, and automatically pick up new tools without code changes. Without LLM reasoning, MCP is just another API protocol — you lose the dynamic discovery and composition that makes the abstraction worthwhile.
            </div>
          </div>
        </div>

        {/* Arrow — client invokes server, so arrow points right */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 16px', flexShrink: 0 }}>
          <div style={{ fontSize: 10, color: '#64748b', fontWeight: 600, marginBottom: 6, whiteSpace: 'nowrap' }}>invokes</div>
          <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
            <line x1="0" y1="10" x2="48" y2="10" stroke="#29B5E8" strokeWidth="2"/>
            <path d="M44 5l8 5-8 5" fill="none" stroke="#29B5E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Snowflake-managed MCP Server box */}
        <div style={{ flex: 1, minWidth: 320, border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', background: 'white' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>Snowflake-managed MCP Server</div>
          <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, margin: '0 0 16px' }}>
            The Snowflake-managed MCP server lets AI agents securely retrieve data from Snowflake accounts without needing to deploy separate infrastructure.
          </p>

          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#94a3b8', marginBottom: 8 }}>Supported tool types</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
            {TOOL_TYPES.map(t => (
              <div key={t.type} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                <code style={{ background: '#f1f5f9', padding: '2px 7px', borderRadius: 4, fontSize: 11, fontWeight: 700, color: '#0e7490', flexShrink: 0 }}>{t.type}</code>
                <span style={{ fontSize: 12, color: '#64748b' }}>{t.label}</span>
              </div>
            ))}
          </div>

          <div style={{ padding: '10px 14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 12, color: '#475569', lineHeight: 1.5, marginBottom: 14 }}>
            <span style={{ fontWeight: 700, color: '#1e293b' }}>Note:</span> Access to the MCP Server does not give access to the tools. Permission needs to be granted for each tool separately.
          </div>

          <a href="https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents-mcp#create-an-mcp-server-object" target="_blank" rel="noreferrer" style={{ fontSize: 13, fontWeight: 600, color: '#29B5E8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
            Docs: Create an MCP Server Object<LinkIcon size={13} />
          </a>
        </div>
      </div>

      {/* MCP vs REST Decision Guide */}
      <div style={{ border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', background: 'white' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>MCP vs REST API — When to use which</div>
        <div style={{ fontSize: 13, color: '#64748b', marginBottom: 16, lineHeight: 1.5 }}>
          Think of REST APIs as <span style={{ fontWeight: 600, color: '#475569' }}>"I know what I want to do"</span> and MCP as <span style={{ fontWeight: 600, color: '#475569' }}>"Let the agent figure out what to do."</span>
        </div>

        <div style={{ display: 'flex', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
          {[
            {
              title: 'Direct REST APIs',
              sub: 'SQL API, Cortex Agents API',
              points: [
                'Deterministic applications with known logic flows',
                'You write explicit code — known endpoints',
                'Maximum control over each request and response',
                'Consumer is a traditional app or service, not an AI agent',
              ],
              eg: 'Scheduled ETL job, backend service querying on behalf of users, custom app calling a specific Cortex Agents workflow',
            },
            {
              title: 'Snowflake MCP Server',
              sub: 'Agent-native access',
              points: [
                'Consumer is an AI agent that needs to dynamically discover and invoke tools',
                <span key="nm">N+M vs N×M: one server connects to any MCP-compatible agent without new development <button onClick={() => setShowNxM(true)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#29B5E8', fontWeight: 600, fontSize: 11, display: 'inline-flex', alignItems: 'center' }}>explain this<PopupIcon size={11} /></button></span>,
                'Tool discovery at runtime — agents decide which tool to invoke based on the request',
                'Governance inherited from Snowflake RBAC, masking policies, and OAuth — no extra middleware',
              ],
              eg: 'Claude Desktop browsing your Snowflake data, multi-agent pipelines, copilots that need both Cortex Analyst and Cortex Search',
            },
          ].map(col => (
            <div key={col.title} style={{ flex: 1, minWidth: 260, border: '1px solid #f1f5f9', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ background: '#f8fafc', padding: '10px 16px', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>{col.title}</div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>{col.sub}</div>
              </div>
              <div style={{ padding: '14px 16px' }}>
                <ul style={{ paddingLeft: 0, listStyle: 'none', margin: '0 0 10px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {col.points.map((p, i) => (
                    <li key={i} style={{ display: 'flex', gap: 8, fontSize: 12, color: '#475569', lineHeight: 1.5 }}>
                      <span style={{ color: '#29B5E8', fontWeight: 700, flexShrink: 0 }}>•</span><span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div style={{ fontSize: 11, color: '#94a3b8', lineHeight: 1.5, fontStyle: 'italic' }}>e.g. {col.eg}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#94a3b8', marginBottom: 8 }}>Quick reference</div>
        <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '8px 16px' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Scenario</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Use</span>
          </div>
          {DECISION_ROWS.map((row, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto', padding: '10px 16px', borderBottom: i < DECISION_ROWS.length - 1 ? '1px solid #f1f5f9' : 'none', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: '#475569', lineHeight: 1.4, paddingRight: 16 }}>{row.scenario}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: row.use === 'MCP Server' ? '#0e7490' : '#475569', background: row.use === 'MCP Server' ? '#f0fbff' : '#f8fafc', padding: '3px 10px', borderRadius: 5, whiteSpace: 'nowrap' }}>{row.use}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 14, fontSize: 13, color: '#475569', lineHeight: 1.6 }}>
          <span style={{ fontWeight: 600, color: '#1e293b' }}>Also composable:</span> A Cortex Agent can itself be a tool inside an MCP server — so external agents can invoke your Snowflake agent as a sub-agent through the standard protocol.
        </div>
      </div>

      {showNxM && <NxMModal onClose={() => setShowNxM(false)} />}
    </div>
  );
}
