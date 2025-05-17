import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="nav-link">Artistas</Link>
      <Link href="/todos-produtos" className="nav-link">Produtos</Link>
      <Link href="/todas-categorias" className="nav-link">Categorias</Link>
      <Link href="/quero-vender" className="nav-link">Quero Vender</Link>
      <Link href="/quero-comprar" className="nav-link">Quero Comprar</Link>
      <Link href="/sobre-nos" className="nav-link">Sobre nós</Link>
      <Link href="/register" className="nav-link">Login/Cadastro</Link>
    </nav>
  );
}

