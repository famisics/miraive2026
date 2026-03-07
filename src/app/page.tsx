import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8">
      <Image src="/logo.webp" alt="miraive2026" width={300} height={200} className="object-contain" />
      <p className="font-overpass text-4xl">Coming soon...</p>
    </main>
  );
}
