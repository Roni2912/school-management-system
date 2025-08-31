import type { Metadata } from 'next';
import SchoolsPageClient from '@/components/SchoolsPageClient';

export const metadata: Metadata = {
  title: 'Schools Directory | School Management System',
  description: 'Browse and explore educational institutions in our comprehensive schools directory. Find schools by location, contact information, and more.',
  keywords: 'schools, education, directory, institutions, learning, academic',
  openGraph: {
    title: 'Schools Directory',
    description: 'Browse and explore educational institutions in our comprehensive schools directory.',
    type: 'website',
  },
};

export default function SchoolsPage() {
  return <SchoolsPageClient />;
}