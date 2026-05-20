import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:  'Admin Dashboard | Milano Pizzeria',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {children}
    </div>
  );
}
