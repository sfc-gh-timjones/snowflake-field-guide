export default function Breadcrumb({ items, onNavigate }) {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, padding: '10px 0', color: '#64748b' }}>
      {items.map((item, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {i > 0 && <span style={{ color: '#cbd5e1' }}>›</span>}
          {i < items.length - 1 ? (
            <button
              onClick={() => onNavigate(item.page)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', fontSize: 13, padding: 0 }}
              onMouseEnter={e => e.target.style.color = '#29B5E8'}
              onMouseLeave={e => e.target.style.color = '#64748b'}
            >
              {item.label}
            </button>
          ) : (
            <span style={{ color: '#29B5E8', fontWeight: 600 }}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
