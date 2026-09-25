import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Amazon Holiday Store | Browse, Purchase & Review Holiday Goods',
  description: 'Shop Amazon holiday deals, decorations, gifts, and goods for New Year, Presidents Day, Memorial Day, Juneteenth, 4th of July, Labor Day, Columbus Day, Veterans Day, Halloween, Thanksgiving, and Christmas. Read and write customer reviews.',
  openGraph: {
    title: 'Amazon Holiday Store | Browse, Purchase & Review Holiday Goods',
    description: 'Shop Amazon holiday deals, decorations, gifts, and goods for all major US holidays. Read and write customer reviews.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amazon Holiday Store | Browse, Purchase & Review Holiday Goods',
    description: 'Shop Amazon holiday deals, decorations, gifts, and goods for all major US holidays. Read and write customer reviews.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
