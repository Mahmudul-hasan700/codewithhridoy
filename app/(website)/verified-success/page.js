"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const VerifiedSuccess = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect the user to the desired page after a short delay
    const timer = setTimeout(() => {
      router.push('/auth/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Email Verified Successfully!</h1>
      <p className="text-lg">You will be redirected to the login page shortly...</p>
    </div>
  );
};

export default VerifiedSuccess;