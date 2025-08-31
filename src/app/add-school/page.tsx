import type { Metadata } from 'next';
import AddSchoolPageClient from './AddSchoolPageClient';

export const metadata: Metadata = {
  title: 'Add New School | SchoolHub Pro',
  description: 'Register a new educational institution in our professional directory. Complete the comprehensive form with school details, contact information, and media uploads.',
  keywords: 'add school, register school, school registration, educational institution, professional directory, school management',
  openGraph: {
    title: 'Add New School - SchoolHub Pro',
    description: 'Register a new educational institution in our professional directory.',
    type: 'website',
  },
};

export default function AddSchoolPage() {
  return <AddSchoolPageClient />;
}