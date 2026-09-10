import type { Metadata } from 'next';
import './globals.css';
import { TrailsProvider } from '../context/TrailsContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: "WeHike | Discover Sri Lanka's Best Hiking Adventures",
  description: "Discover breathtaking hiking trails, guided adventures and unforgettable outdoor experiences across Sri Lanka.",
  keywords: "Sri Lanka hiking, WeHike, Ella Rock, Knuckles Range, Horton Plains, World End, Sri Pada, Pekoe Trail, hiking Sri Lanka, trek Sri Lanka, mountain trails",
  openGraph: {
    title: "WeHike | Discover Sri Lanka's Best Hiking Adventures",
    description: "Discover breathtaking hiking trails, guided adventures and unforgettable outdoor experiences across Sri Lanka.",
    url: 'https://ceylonhikingtrails.com',
    siteName: 'WeHike Sri Lanka',
    locale: 'en_US',
    type: 'website'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#FAF5F2] text-[#252525] flex flex-col min-h-screen font-sans" suppressHydrationWarning>
        <TrailsProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </TrailsProvider>
      </body>
    </html>
  );
};
