import type { Metadata } from 'next';
import SchoolsPageClient from '@/components/SchoolsPageClient';

export const metadata: Metadata = {
  title: 'Schools Directory | SchoolHub Pro',
  description: 'Browse and explore educational institutions in our comprehensive professional directory. Discover schools, connect with communities, and access detailed institutional information.',
  keywords: 'schools directory, educational institutions, school search, professional directory, education, academic institutions',
  openGraph: {
    title: 'Professional Schools Directory - SchoolHub Pro',
    description: 'Browse and explore educational institutions in our comprehensive professional directory.',
    type: 'website',
  },
};

export default function SchoolsPage() {
  return <SchoolsPageClient />;
}