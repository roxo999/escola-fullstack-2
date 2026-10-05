'use client';

import { useState, useEffect } from "react";
import Header from "../components/header";
import { getAlunos, getNotas } from "../utils/storage";

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
        max-width: 900px;
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

    .seletor-container {
        margin-bottom: 28px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }

    .seletor-label {
        color: #ffffff;
        font-size: 14px;
        font-weight: 600;
    }

    .seletor {
        width: 100%;
        max-width: 450px;
        padding: 14px 18px;
        background: #180204;
        border: 1px solid #6f1a20;
        border-radius: 10px;
        color: #ffffff;
        font-size: 15px;
        font-weight: 600;
        outline: none;
        cursor: pointer;
    }

    .seletor option {
        background: #180204;
        color: #ffffff;
    }

    .boletim-card {
        background: #180204;
        border: 1px solid rgba(220, 38, 38, 0.25);
        border-radius: 16px;
        padding: 30px;
    }

    .boletim-header {
        display: flex;
        align-items: center;
        gap: 20px;
        padding-bottom: 24px;
        border-bottom: 1px solid rgba(220, 38, 38, 0.2);
        margin-bottom: 25px;
    }

    .avatar-circle {
        width: 65px;
        height: 65px;
        border-radius: 50%;
        background: #991b1b;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 26px;
        font-weight: 800;
        box-shadow: 0 8px 20px rgba(153, 27, 27, 0.3);
    }

    .aluno-titulo {
        margin: 0;
        color: #ffffff;
        font-size: 24px;
        font-weight: 700;
    }

    .aluno-sub {
        color: #a1a1aa;
        font-size: 14px;
    }

    .situacao-badge {
        margin-left: auto;
        padding: 6px 16px;
        border-radius: 20px;
        font-weight: 700;
        font-size: 13px;
    }

    .situacao-badge.aprovado {
        background: rgba(34, 197, 94, 0.15);
        color: #4ade80;
        border: 1px solid rgba(34, 197, 94, 0.35);
    }

    .situacao-badge.destaque {
        background: rgba(245, 158, 11, 0.2);
        color: #fcd34d;
        border: 1px solid rgba(245, 158, 11, 0.4);
    }

    .notas-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 14px;
        margin-bottom: 25px;
    }

    .nota-item-card {
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(220, 38, 38, 0.15);
        border-radius: 10px;
        padding: 16px;
        text-align: center;
    }

    .nota-item-label {
        color: #a1a1aa;
        font-size: 12px;
        font-weight: 600;
        margin-bottom: 8px;
        text-transform: uppercase;
    }

    .nota-item-valor {
        font-size: 22px;
        font-weight: 700;
    }

    .nota-item-valor.excelente { color: #4ade80; }
    .nota-item-valor.bom { color: #60a5fa; }
    .nota-item-valor.regular { color: #fbbf24; }
    .nota-item-valor.baixo { color: #f87171; }

    .media-final-banner {
        background: linear-gradient(135deg, #7d1c22, #991b1b);
        border-radius: 12px;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .media-final-label {
        color: #ffffff;
        font-size: 16px;
        font-weight: 700;
    }

    .media-final-valor {
        color: #ffffff;
        font-size: 32px;
        font-weight: 800;
    }

    @media (max-width: 600px) {
        .home {
            padding: 30px 15px;
        }

        .home-card {
            padding: 45px 20px;
        }

        .boletim-header {
            flex-direction: column;
            text-align: center;
        }

        .situacao-badge {
            margin-left: 0;
        }
    }
`;

export default function Boletins() {
    const [alunos, setAlunos] = useState([]);
    const [notas, setNotas] = useState([]);
    const [alunoSelecionadoId, setAlunoSelecionadoId] = useState("");

    useEffect(() => {
        const listaAlunos = getAlunos();
        const listaNotas = getNotas();
        setAlunos(listaAlunos);
        setNotas(listaNotas);
        if (listaAlunos.length > 0) {
            setAlunoSelecionadoId(listaAlunos[0].id.toString());
        }
    }, []);

    const alunoAtual = alunos.find(a => a.id.toString() === alunoSelecionadoId) || alunos[0] || {
        nome: "Kelvin Destaque",
        serie: "3º Ano A",
        ra: "232300"
    };

    const notaAtual = notas.find(n => n.nome.toLowerCase() === alunoAtual.nome.toLowerCase()) || {
        trabalho1: 8.5,
        trabalho2: 9.0,
        nota1: 8.0,
        nota2: 8.5,
        nota3: 8.5,
        situacao: "Aprovado"
    };

    const t1 = parseFloat(notaAtual.trabalho1) || 0;
    const t2 = parseFloat(notaAtual.trabalho2) || 0;
    const n1 = parseFloat(notaAtual.nota1) || 0;
    const n2 = parseFloat(notaAtual.nota2) || 0;
    const n3 = parseFloat(notaAtual.nota3) || 0;
    const mediaGeral = ((t1 + t2 + n1 + n2 + n3) / 5).toFixed(1).replace('.', ',');

    const formatarVal = (v) => (parseFloat(v) || 0).toFixed(1).replace('.', ',');

    const getBadgeClass = (v) => {
        const val = parseFloat(v) || 0;
        if (val >= 9.0) return "excelente";
        if (val >= 7.0) return "bom";
        if (val >= 6.0) return "regular";
        return "baixo";
    };

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
                            Boletim <span>Escolar</span>
                        </h1>

                        <p className="home-description">
                            Consulte o boletim individual e desempenho acadêmico.
                        </p>
                    </div>

                    {alunos.length > 0 && (
                        <div className="seletor-container">
                            <label className="seletor-label">Selecionar Aluno</label>
                            <select 
                                value={alunoSelecionadoId} 
                                onChange={(e) => setAlunoSelecionadoId(e.target.value)}
                                className="seletor"
                            >
                                {alunos.map(a => (
                                    <option key={a.id} value={a.id}>
                                        {a.nome} — ({a.serie || '3º Ano'})
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="boletim-card">

                        <div className="boletim-header">
                            <div className="avatar-circle">
                                {alunoAtual.nome ? alunoAtual.nome.charAt(0) : 'A'}
                            </div>
                            <div>
                                <h2 className="aluno-titulo">{alunoAtual.nome}</h2>
                                <span className="aluno-sub">{alunoAtual.serie || "3º Ano A"} • RA: {alunoAtual.ra || "232300"}</span>
                            </div>
                            <div className={`situacao-badge ${notaAtual.situacao === 'Destaque' ? 'destaque' : 'aprovado'}`}>
                                {notaAtual.situacao || 'Aprovado'}
                            </div>
                        </div>

                        <div className="notas-grid">
                            <div className="nota-item-card">
                                <div className="nota-item-label">Trabalho 1</div>
                                <div className={`nota-item-valor ${getBadgeClass(notaAtual.trabalho1)}`}>
                                    {formatarVal(notaAtual.trabalho1)}
                                </div>
                            </div>
                            <div className="nota-item-card">
                                <div className="nota-item-label">Trabalho 2</div>
                                <div className={`nota-item-valor ${getBadgeClass(notaAtual.trabalho2)}`}>
                                    {formatarVal(notaAtual.trabalho2)}
                                </div>
                            </div>
                            <div className="nota-item-card">
                                <div className="nota-item-label">Nota 1</div>
                                <div className={`nota-item-valor ${getBadgeClass(notaAtual.nota1)}`}>
                                    {formatarVal(notaAtual.nota1)}
                                </div>
                            </div>
                            <div className="nota-item-card">
                                <div className="nota-item-label">Nota 2</div>
                                <div className={`nota-item-valor ${getBadgeClass(notaAtual.nota2)}`}>
                                    {formatarVal(notaAtual.nota2)}
                                </div>
                            </div>
                            <div className="nota-item-card">
                                <div className="nota-item-label">Nota 3</div>
                                <div className={`nota-item-valor ${getBadgeClass(notaAtual.nota3)}`}>
                                    {formatarVal(notaAtual.nota3)}
                                </div>
                            </div>
                        </div>

                        <div className="media-final-banner">
                            <span className="media-final-label">Média Geral do Aluno</span>
                            <span className="media-final-valor">{mediaGeral}</span>
                        </div>

                    </div>

                </section>
            </main>
        </>
    );
}