import type { Metadata } from 'next';
import NavBar from '@/components/nav-bar';
import { appNav } from '@/config/app-nav';

export const metadata: Metadata = {
  title: 'GameFlix',
  description: "Today's recommendations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <NavBar items={appNav} />
        {children}
      </body>
    </html>
  );
}
