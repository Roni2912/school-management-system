import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: 'School Management System | Modern Educational Directory',
  description: 'A modern platform to manage and discover educational institutions with ease. Add schools, browse directories, and connect with educational communities.',
  keywords: 'school management, education, directory, institutions, learning, academic, school registration',
  openGraph: {
    title: 'School Management System',
    description: 'A modern platform to manage and discover educational institutions with ease.',
    type: 'website',
  },
};

export default function Home() {
  return <HomePageClient />;
}
