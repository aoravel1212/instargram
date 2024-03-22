import TopBar from '@/components/TopBar';
import './globals.css';
import Navbar from '@/components/Navbar';
import AuthContext from '@/context/AuthContext';
import SWRConfigContext from '@/context/SWRConfigContext';
import { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import Footer from '@/components/Footer';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Instargram',
    template: 'Instargram | %s',
  },
  description: 'Instargram Photos',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className={openSans.className}>
      <body className="w-full overflow-auto">
        <AuthContext>
          {session && (
            <header>
              <div className="z-10 fixed top-0 w-full h-[60px] bg-white border-b md:hidden">
                <TopBar />
              </div>
              <div className="z-10 fixed bottom-0 md:left-0 h-12 md:h-full w-full md:w-16 lg:w-48 xl:w-64 border-t md:border-t-0 md:border-r bg-white">
                <Navbar />
              </div>
            </header>
          )}
          <div className={session ? `md:ml-16 lg:ml-48 xl:ml-64` : ''}>
            <main
              className={`flex items-center justify-center w-full min-h-[calc(100vh-52px)] max-w-screen-xl mx-auto ${
                session && 'mt-[60px]'
              } md:mt-0`}
            >
              <SWRConfigContext>{children}</SWRConfigContext>
            </main>
            <Footer />
          </div>
        </AuthContext>
        <div id="portal" />
      </body>
    </html>
  );
}
