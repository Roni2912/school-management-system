import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: 'SchoolHub Pro | Professional School Management Platform',
  description: 'Enterprise-grade school management system for educational institutions. Streamline administration, manage directories, and enhance educational operations with professional tools.',
  keywords: 'school management, education software, educational institutions, professional, enterprise, school administration, directory management, educational platform',
  openGraph: {
    title: 'SchoolHub Pro - Professional School Management',
    description: 'Enterprise-grade school management system for educational institutions worldwide.',
    type: 'website',
  },
};

export default function Home() {
  return <HomePageClient />;
}
