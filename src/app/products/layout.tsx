// @/app/products/layout.tsx

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products',
};

export default function productsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
