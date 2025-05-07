import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="nav-link">Artistas</Link>
      <Link href="/todos-produtos" className="nav-link">Produtos</Link>
      <Link href="/todas-categorias" className="nav-link">Categorias</Link>
      <Link href="/todas-categorias" className="nav-link">Política de envio e troca</Link>
      <Link href="/todas-categorias" className="nav-link">Login/Cadastro</Link>
    </nav>
  );
}

