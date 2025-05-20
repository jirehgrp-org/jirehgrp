// @/app/services/layout.tsx

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services',
};

export default function servicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
