// app/search/page.jsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/components/common/LoadingScreen';

export default function SearchPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to the homepage immediately
        router.replace('/');
    }, [router]);

    // Show a loading screen while redirecting
    return <LoadingScreen />;
}