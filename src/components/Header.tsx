'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="custom-header">
      <Link href="/">
        <img src="/logo.png" alt="Logo" className="logo cursor-pointer" />
      </Link>
      <h1 className="site-title">
        Onde a arte ganha vida, com as mãos que encantam.
      </h1>
    </header>
  );
}
