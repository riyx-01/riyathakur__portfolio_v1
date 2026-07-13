import './globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Credentials | RIYA THAKUR',
  description: 'Cyber-Editorial Portfolio Credentials Section',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="bg-[#0a0510] text-white antialiased font-sans selection:bg-[#ff2020] selection:text-[#0a0510]">
        {children}
      </body>
    </html>
  );
}
