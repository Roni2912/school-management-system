import type { Metadata } from 'next';
import AddSchoolPageClient from './AddSchoolPageClient';

export const metadata: Metadata = {
  title: 'Add School | School Management System',
  description: 'Add a new educational institution to our comprehensive schools directory. Fill out the form with school details, contact information, and upload an image.',
  keywords: 'add school, register school, education, institution, school management',
  openGraph: {
    title: 'Add New School',
    description: 'Add a new educational institution to our comprehensive schools directory.',
    type: 'website',
  },
};

export default function AddSchoolPage() {
  return <AddSchoolPageClient />;
}