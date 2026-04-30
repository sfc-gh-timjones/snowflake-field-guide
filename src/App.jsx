import { useState } from 'react';
import Breadcrumb from './components/Breadcrumb';
import Home from './pages/Home';
import IcebergDetail from './pages/IcebergDetail';

const PAGES = {
  home: { label: 'Home', component: Home },
  iceberg: { label: 'Iceberg Tables', component: IcebergDetail },
};

const BREADCRUMBS = {
  home: [{ label: 'Home', page: 'home' }],
  iceberg: [{ label: 'Home', page: 'home' }, { label: 'Iceberg Tables', page: 'iceberg' }],
};

export default function App() {
  const [page, setPage] = useState('home');
  const PageComponent = PAGES[page].component;

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <header style={{
        background: 'white',
        borderBottom: '1px solid #e2e8f0',
        padding: '0 32px',
        display: 'flex',
        alignItems: 'center',
        height: 52,
        gap: 10,
      }}>
        <svg width="22" height="22" viewBox="0 0 36 36" fill="none">
          <path d="M18 2L18 34M18 2L12 8M18 2L24 8M18 34L12 28M18 34L24 28" stroke="#29B5E8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4.14 10L31.86 26M4.14 10L4.14 18M4.14 10L11.07 6M31.86 26L31.86 18M31.86 26L24.93 30" stroke="#29B5E8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M31.86 10L4.14 26M31.86 10L31.86 18M31.86 10L24.93 6M4.14 26L4.14 18M4.14 26L11.07 30" stroke="#29B5E8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{ fontWeight: 700, fontSize: 15, color: '#1e293b' }}>Snowflake Field Guide</span>
      </header>

      <main style={{ padding: '16px 40px 48px' }}>
        <Breadcrumb items={BREADCRUMBS[page]} onNavigate={setPage} />
        <PageComponent onNavigate={setPage} />
      </main>
    </div>
  );
}
