import './globals.css';
import Navbar from '@/components/Navbar';
import AuthContext from '@/context/AuthContext';
import SWRConfigContext from '@/context/SWRConfigContext';
import { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Instantgram',
    template: 'Instantgram | %s',
  },
  description: 'Instantgram Phots',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={openSans.className}>
      <body className="w-full bg-neutral-50 overflow-auto">
        <AuthContext>
          <header className="fixed z-10 bottom-0 md:left-0 h-12 md:h-full w-full md:w-16 lg:w-48 xl:w-64 border-t md:border-t-0 md:border-r bg-white">
            <Navbar />
          </header>
          <main className="w-full flex justify-center max-w-screen-xl mx-auto">
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthContext>
        <div id="portal" />
      </body>
    </html>
  );
}
