import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ceylon Hiking Trails - Admin Control Portal',
  description: 'Standalone administrative control panel for managing Sri Lankan trails, condition reports, user reviews, and local guides.',
};

export default function AdminRootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body className="antialiased bg-slate-950 text-slate-100 flex flex-col min-h-screen" suppressHydrationWarning>
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
};
