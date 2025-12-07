import { Navbar } from '@/components/Navbar';

export default function VendorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
