import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DelegateX - Online MUN & Training',
  description: 'Next-generation platform for online MUN training and real-time committee simulations.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-950 text-slate-50">{children}</body>
    </html>
  );
}
