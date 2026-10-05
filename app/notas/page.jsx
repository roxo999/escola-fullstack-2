'use client';

import { useState, useEffect } from "react";
import Header from "../components/header";
import { getNotas } from "../utils/storage";

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
        max-width: 1100px;
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

    /* Stats grid */
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
        margin-bottom: 28px;
    }

    .stat-card {
        background: #180204;
        border: 1px solid rgba(220, 38, 38, 0.2);
        border-radius: 12px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .stat-label {
        color: #a1a1aa;
        font-size: 12px;
        font-weight: 600;
        margin-bottom: 6px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .stat-value {
        color: #ffffff;
        font-size: 28px;
        font-weight: 700;
    }

    .destaque-cor {
        color: #fca5a8;
    }

    .verde-cor {
        color: #4ade80;
    }

    /* Filtros */
    .filtros-container {
        margin-bottom: 24px;
        display: flex;
        justify-content: flex-end;
    }

    .search-box {
        position: relative;
        width: 100%;
        max-width: 340px;
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
    }

    .search-box input:focus {
        border-color: #dc2626;
    }

    /* Tabela */
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
        text-align: center;
        background: #7d1c22;
        color: #ffffff;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 1px;
        text-transform: uppercase;
        border-bottom: 1px solid rgba(220, 38, 38, 0.3);
        white-space: nowrap;
    }

    th:first-child {
        text-align: left;
        padding-left: 20px;
    }

    td {
        padding: 16px;
        color: #dddddd;
        border-bottom: 1px solid #461015;
        text-align: center;
        font-size: 14px;
    }

    td:first-child {
        text-align: left;
        padding-left: 20px;
    }

    tbody tr:hover {
        background-color: rgba(125, 28, 34, 0.2);
    }

    .aluno-info {
        display: flex;
        flex-direction: column;
        gap: 3px;
    }

    .aluno-nome {
        color: #ffffff;
        font-weight: 600;
        font-size: 15px;
    }

    .aluno-serie {
        color: #a1a1aa;
        font-size: 12px;
    }

    .nota-badge {
        display: inline-block;
        padding: 4px 10px;
        border-radius: 6px;
        font-weight: 600;
        font-size: 13px;
    }

    .nota-badge.excelente {
        background: rgba(34, 197, 94, 0.15);
        color: #4ade80;
    }

    .nota-badge.bom {
        background: rgba(59, 130, 246, 0.15);
        color: #60a5fa;
    }

    .nota-badge.regular {
        background: rgba(245, 158, 11, 0.15);
        color: #fbbf24;
    }

    .nota-badge.baixo {
        background: rgba(239, 68, 68, 0.15);
        color: #f87171;
    }

    .media-destaque {
        display: inline-block;
        padding: 5px 12px;
        background: #991b1b;
        color: #ffffff;
        font-weight: 700;
        font-size: 15px;
        border-radius: 8px;
    }

    .status-pill {
        display: inline-block;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
    }

    .status-pill.aprovado {
        background: rgba(34, 197, 94, 0.15);
        color: #4ade80;
    }

    .status-pill.destaque {
        background: rgba(245, 158, 11, 0.2);
        color: #fcd34d;
    }

    .sem-resultados {
        padding: 35px !important;
        color: #a1a1aa !important;
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

export default function Notas() {
    const [busca, setBusca] = useState("");
    const [alunosNotas, setAlunosNotas] = useState([]);

    useEffect(() => {
        setAlunosNotas(getNotas());
    }, []);

    const calcularMedia = (aluno) => {
        const soma = (parseFloat(aluno.trabalho1) || 0) + 
                     (parseFloat(aluno.trabalho2) || 0) + 
                     (parseFloat(aluno.nota1) || 0) + 
                     (parseFloat(aluno.nota2) || 0) + 
                     (parseFloat(aluno.nota3) || 0);
        return (soma / 5).toFixed(1);
    };

    const formatarNota = (valor) => {
        const num = typeof valor === 'number' ? valor : parseFloat(valor) || 0;
        return num.toFixed(1).replace('.', ',');
    };

    const getBadgeClass = (nota) => {
        const val = typeof nota === 'number' ? nota : parseFloat(nota) || 0;
        if (val >= 9.0) return "nota-badge excelente";
        if (val >= 7.0) return "nota-badge bom";
        if (val >= 6.0) return "nota-badge regular";
        return "nota-badge baixo";
    };

    const alunosFiltrados = alunosNotas.filter(aluno => 
        aluno.nome.toLowerCase().includes(busca.toLowerCase()) ||
        (aluno.serie && aluno.serie.toLowerCase().includes(busca.toLowerCase()))
    );

    const totalAlunos = alunosNotas.length;
    const mediaGeralTurma = totalAlunos > 0 ? (
        alunosNotas.reduce((acc, a) => acc + parseFloat(calcularMedia(a)), 0) / totalAlunos
    ).toFixed(1).replace('.', ',') : "0,0";

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
                            Notas dos <span>Alunos</span>
                        </h1>

                        <p className="home-description">
                            Painel de desempenho acadêmico das avaliações e trabalhos.
                        </p>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-card">
                            <span className="stat-label">Total de Alunos</span>
                            <span className="stat-value">{totalAlunos}</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-label">Média da Turma</span>
                            <span className="stat-value destaque-cor">{mediaGeralTurma}</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-label">Taxa de Aprovação</span>
                            <span className="stat-value verde-cor">100%</span>
                        </div>
                    </div>

                    <div className="filtros-container">
                        <div className="search-box">
                            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <input 
                                type="text" 
                                placeholder="Buscar por aluno ou turma..." 
                                value={busca}
                                onChange={(e) => setBusca(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="tabela-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>ALUNO</th>
                                    <th>TRABALHO 1</th>
                                    <th>TRABALHO 2</th>
                                    <th>NOTA 1</th>
                                    <th>NOTA 2</th>
                                    <th>NOTA 3</th>
                                    <th>MÉDIA</th>
                                    <th>SITUAÇÃO</th>
                                </tr>
                            </thead>

                            <tbody>
                                {alunosFiltrados.length > 0 ? (
                                    alunosFiltrados.map((aluno, idx) => {
                                        const mediaNum = parseFloat(calcularMedia(aluno));
                                        return (
                                            <tr key={aluno.id || idx}>
                                                <td>
                                                    <div className="aluno-info">
                                                        <span className="aluno-nome">{aluno.nome}</span>
                                                        <span className="aluno-serie">{aluno.serie}</span>
                                                    </div>
                                                </td>
                                                <td><span className={getBadgeClass(aluno.trabalho1)}>{formatarNota(aluno.trabalho1)}</span></td>
                                                <td><span className={getBadgeClass(aluno.trabalho2)}>{formatarNota(aluno.trabalho2)}</span></td>
                                                <td><span className={getBadgeClass(aluno.nota1)}>{formatarNota(aluno.nota1)}</span></td>
                                                <td><span className={getBadgeClass(aluno.nota2)}>{formatarNota(aluno.nota2)}</span></td>
                                                <td><span className={getBadgeClass(aluno.nota3)}>{formatarNota(aluno.nota3)}</span></td>
                                                <td>
                                                    <span className="media-destaque">
                                                        {formatarNota(mediaNum)}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className={`status-pill ${aluno.situacao === 'Destaque' ? 'destaque' : 'aprovado'}`}>
                                                        {aluno.situacao || 'Aprovado'}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="sem-resultados">
                                            Nenhum aluno encontrado para "{busca}".
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