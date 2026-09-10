import type { Metadata } from 'next';
import './globals.css';
import { TrailsProvider } from '../context/TrailsContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: 'Ceylon Hiking Trails - Discover the Trails. Explore Sri Lanka.',
  description: 'The premier digital platform for discovering, planning, navigating, and sharing hiking trails across Sri Lanka. Explore Ella, Knuckles, Horton Plains, Sri Pada, and beyond.',
  keywords: 'Sri Lanka hiking, Ella Rock, Knuckles Range, Horton Plains, World End, Sri Pada, Pekoe Trail, hiking Sri Lanka, trek Sri Lanka, mountain trails',
  openGraph: {
    title: 'Ceylon Hiking Trails - Discover the Trails. Explore Sri Lanka.',
    description: 'Explore Sri Lanka’s best mountain, cloud forest, and waterfall hiking routes.',
    url: 'https://ceylonhikingtrails.com',
    siteName: 'Ceylon Hiking Trails',
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
          href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#F7F2EE] dark:bg-[#121110] text-[#18181B] dark:text-[#F7F2EE] flex flex-col min-h-screen font-sans" suppressHydrationWarning>
        <TrailsProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </TrailsProvider>
      </body>
    </html>
  );
};
