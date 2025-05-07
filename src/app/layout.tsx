import './globals.css'; 
import { Inter } from 'next/font/google'; 
import { AuthProvider } from './context/AuthContext'; 

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Maos Encantadas',
  description: 'Onde a arte ganha vida, com as mãos que encantam.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head />
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
