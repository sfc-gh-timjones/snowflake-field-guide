import { useState } from 'react';

export default function Tooltip({ term, definition }) {
  const [visible, setVisible] = useState(false);

  return (
    <span style={{ position: 'relative', display: 'inline' }}>
      <span
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        style={{
          borderBottom: '1.5px dashed #29B5E8',
          color: '#0e7490',
          fontWeight: 600,
          cursor: 'help',
        }}
      >
        {term}
      </span>
      {visible && (
        <span style={{
          position: 'absolute',
          bottom: '125%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#1e293b',
          color: '#f1f5f9',
          fontSize: 12,
          lineHeight: 1.5,
          padding: '8px 12px',
          borderRadius: 8,
          width: 240,
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          zIndex: 100,
          pointerEvents: 'none',
          whiteSpace: 'normal',
        }}>
          {definition}
          <span style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            borderWidth: '5px',
            borderStyle: 'solid',
            borderColor: '#1e293b transparent transparent transparent',
          }} />
        </span>
      )}
    </span>
  );
}
