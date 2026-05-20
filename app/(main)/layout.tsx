import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import CartHydration from '@/components/CartHydration';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CartHydration />
      <Navbar />
      <main style={{ paddingTop: 72 }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
