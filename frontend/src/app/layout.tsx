import { Providers } from '@/providers/Providers';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'DestecPlanner | Premium Booking Marketplace',
  description: 'Manage your business and discover services with ease.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-200 antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
