import Link from "next/link";

export default function Header() {
    return (
        <header className="header">

            <div className="header-left">

                <div className="logo">
                    SESI
                </div>

                <div className="school-info">
                    <strong>Sistema Escolar</strong>
                    <span>SESI 323 • MIRANDÓPOLIS</span>
                </div>

            </div>

            <nav className="nav">

                <Link href="/">
                    Início
                </Link>

                <Link href="/cadastro">
                    Cad. Aluno
                </Link>

                <Link href="/cadastronotas">
                    Cad. Notas
                </Link>

                <Link href="/listaluno">
                    Alunos
                </Link>

                <Link href="/listnotas">
                    Notas
                </Link>

            </nav>

        </header>
    );
}