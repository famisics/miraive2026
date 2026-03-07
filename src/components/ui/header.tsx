'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const Header = () => {
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY > 0);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 z-50 h-20 w-full bg-transparent text-xl">
      <div className="relative h-full w-full">
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-200 to-white transition-opacity duration-300 ease-in-out ${showHeader ? 'opacity-100' : 'opacity-0'}`}
        ></div>
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
          <Link href="/" className="h-full w-40 py-3">
            <Image
              src="/logo.webp"
              alt="logo"
              width={150}
              height={100}
              className="h-full object-contain"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
