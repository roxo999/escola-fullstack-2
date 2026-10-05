'use client';

import { useState, useEffect } from "react";
import Header from "../components/header";
import { getAlunos } from "../utils/storage";

const styles = `
    .home {
        min-height: calc(100vh - 80px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 50px 20px;
        background: radial-gradient(
            circle at top right,
            #4a0b0b 0%,
            #250709 35%,
            #0d0203 100%
        );
        box-sizing: border-box;
    }

    .home-card {
        width: 100%;
        max-width: 950px;
        padding: 60px 45px;
        background: linear-gradient(145deg, #2d090c, #160405);
        border: 1px solid rgba(220, 38, 38, 0.25);
        border-radius: 20px;
        box-shadow: 0 25px 70px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.03);
        box-sizing: border-box;
    }

    .school-tag {
        display: inline-block;
        margin-bottom: 25px;
        padding: 8px 18px;
        border: 1px solid rgba(220, 38, 38, 0.3);
        border-radius: 30px;
        background: rgba(127, 29, 29, 0.2);
        color: #fca5a8;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 1.5px;
        text-align: center;
    }

    .header-center {
        text-align: center;
        margin-bottom: 30px;
    }

    .home-title {
        margin: 0;
        color: #ffffff;
        font-size: clamp(32px, 5vw, 44px);
        font-weight: 700;
        line-height: 1.15;
        text-align: center;
    }

    .home-title span {
        color: #dc2626;
    }

    .home-description {
        max-width: 650px;
        margin: 15px auto 0;
        color: #a1a1aa;
        font-size: 16px;
        line-height: 1.6;
        text-align: center;
    }

    .filtros-container {
        margin-bottom: 24px;
        display: flex;
        justify-content: flex-end;
    }

    .search-box {
        position: relative;
        width: 100%;
        max-width: 360px;
    }

    .search-icon {
        position: absolute;
        left: 14px;
        top: 50%;
        transform: translateY(-50%);
        color: #9ca3af;
    }

    .search-box input {
        width: 100%;
        padding: 12px 16px 12px 42px;
        background: #180204;
        border: 1px solid rgba(220, 38, 38, 0.3);
        border-radius: 10px;
        color: #ffffff;
        font-size: 14px;
        outline: none;
        transition: border-color 0.25s ease;
    }

    .search-box input:focus {
        border-color: #dc2626;
        box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.2);
    }

    .tabela-container {
        overflow-x: auto;
        border-radius: 12px;
        border: 1px solid rgba(220, 38, 38, 0.25);
    }

    table {
        width: 100%;
        border-collapse: collapse;
        background: #180204;
    }

    th {
        padding: 16px;
        text-align: left;
        background: #7d1c22;
        color: #ffffff;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 1px;
        text-transform: uppercase;
        border-bottom: 1px solid rgba(220, 38, 38, 0.3);
    }

    td {
        padding: 16px;
        color: #dddddd;
        border-bottom: 1px solid #461015;
        font-size: 14px;
    }

    tbody tr:hover {
        background-color: rgba(125, 28, 34, 0.2);
    }

    .id-col {
        color: #a1a1aa;
        font-weight: 600;
        width: 40px;
    }

    .aluno-flex {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .avatar-mini {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: #991b1b;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 14px;
    }

    .aluno-nome {
        color: #ffffff;
        font-weight: 600;
    }

    .serie-badge {
        background: rgba(127, 29, 29, 0.2);
        color: #fca5a8;
        padding: 4px 10px;
        border-radius: 6px;
        font-weight: 600;
        font-size: 13px;
        border: 1px solid rgba(220, 38, 38, 0.25);
    }

    .ra-code {
        font-family: monospace;
        background: rgba(255, 255, 255, 0.03);
        padding: 4px 8px;
        border-radius: 6px;
        color: #d4d4d8;
        border: 1px solid rgba(255, 255, 255, 0.05);
    }

    .sem-resultados {
        padding: 40px !important;
        text-align: center;
        color: #a1a1aa !important;
    }

    .acoes-flex {
        display: flex;
        gap: 8px;
        align-items: center;
    }

    .btn-action {
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        border: 1px solid transparent;
        transition: all 0.2s ease;
    }

    .btn-editar {
        background: rgba(59, 130, 246, 0.15);
        color: #60a5fa;
        border-color: rgba(59, 130, 246, 0.3);
    }

    .btn-editar:hover {
        background: rgba(59, 130, 246, 0.3);
        color: #93c5fd;
    }

    .btn-excluir {
        background: rgba(239, 68, 68, 0.15);
        color: #f87171;
        border-color: rgba(239, 68, 68, 0.3);
    }

    .btn-excluir:hover {
        background: rgba(239, 68, 68, 0.3);
        color: #fca5a5;
    }

    @media (max-width: 600px) {
        .home {
            padding: 30px 15px;
        }

        .home-card {
            padding: 45px 20px;
        }
    }
`;

export default function Alunos() {
    const [alunos, setAlunos] = useState([]);
    const [busca, setBusca] = useState("");

    useEffect(() => {
        setAlunos(getAlunos());
    }, []);

    // A pesquisa só é iniciada a partir do 3º caractere
    const termo = busca.trim().toLowerCase();
    const alunosFiltrados = termo.length >= 3
        ? alunos.filter(a =>
            a.nome.toLowerCase().includes(termo) ||
            (a.serie && a.serie.toLowerCase().includes(termo)) ||
            (a.ra && a.ra.toString().includes(termo))
          )
        : alunos;

    return (
        <>
            <style>{styles}</style>

            <Header />

            <main className="home">
                <section className="home-card">

                    <div className="header-center">
                        <div className="school-tag">
                            SESI 323 • MIRANDÓPOLIS
                        </div>

                        <h1 className="home-title">
                            Lista de <span>Alunos</span>
                        </h1>

                        <p className="home-description">
                            Consulte os alunos matriculados no sistema escolar.
                        </p>
                    </div>

                    <div className="filtros-container">
                        <div className="search-box">
                            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <input 
                                type="text" 
                                placeholder="Buscar aluno (mínimo 3 caracteres)..." 
                                value={busca}
                                onChange={(e) => setBusca(e.target.value)}
                            />
                        </div>
                    </div>

                    {busca.trim().length > 0 && busca.trim().length < 3 && (
                        <p style={{ color: '#fca5a8', fontSize: '13px', marginTop: '-16px', marginBottom: '16px', textAlign: 'right' }}>
                            Digite pelo menos 3 caracteres para pesquisar.
                        </p>
                    )}

                    <div className="tabela-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ALUNO</th>
                                    <th>IDADE</th>
                                    <th>SÉRIE / TURMA</th>
                                    <th>RA</th>
                                    <th>AÇÕES</th>
                                </tr>
                            </thead>

                            <tbody>
                                {alunosFiltrados.length > 0 ? (
                                    alunosFiltrados.map((aluno, index) => (
                                        <tr key={aluno.id || index}>
                                            <td className="id-col">{index + 1}</td>
                                            <td>
                                                <div className="aluno-flex">
                                                    <div className="avatar-mini">
                                                        {aluno.nome ? aluno.nome.charAt(0) : 'A'}
                                                    </div>
                                                    <span className="aluno-nome">{aluno.nome}</span>
                                                </div>
                                            </td>
                                            <td>{aluno.idade} anos</td>
                                            <td><span className="serie-badge">{aluno.serie || '3º Ano'}</span></td>
                                            <td><span className="ra-code">{aluno.ra}</span></td>
                                            <td>
                                                <div className="acoes-flex">
                                                    <button type="button" className="btn-action btn-editar">Editar</button>
                                                    <button type="button" className="btn-action btn-excluir">Excluir</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="sem-resultados">
                                            {termo.length >= 3
                                                ? `Nenhum aluno encontrado para "${busca}".`
                                                : 'Nenhum aluno cadastrado.'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </section>
            </main>
        </>
    );
}