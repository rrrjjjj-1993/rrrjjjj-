import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RYAN SZETO — Creative Planner / Director',
  description: 'Creative planning, moving images and new perspectives. The portfolio of Ryan Szeto.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

