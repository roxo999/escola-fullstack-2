
'use client';

import { useState, useEffect } from "react";
import Header from "../components/header";
import { useRouter } from "next/navigation";

const styles = `
    .notas-home {
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

    .notas-shell {
        width: 100%;
        max-width: 1250px;
        display: flex;
        flex-direction: column;
        gap: 30px;
        margin: 0 auto;
    }

    .notas-intro {
        padding: 35px;
        text-align: center;
        background: linear-gradient(145deg, #2d090c, #160405);
        border: 1px solid rgba(220, 38, 38, 0.25);
        border-radius: 20px;
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
    }

    .notas-tag {
        display: inline-block;
        margin-bottom: 18px;
        padding: 8px 18px;
        border: 1px solid rgba(220, 38, 38, 0.3);
        border-radius: 30px;
        background: rgba(127, 29, 29, 0.2);
        color: #fca5a8;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 1.5px;
        text-transform: uppercase;
    }

    .notas-titulo {
        margin: 0;
        color: #ffffff;
        font-size: clamp(28px, 4vw, 38px);
        font-weight: 700;
        line-height: 1.2;
    }

    .notas-descricao {
        max-width: 600px;
        margin: 15px auto 0;
        color: #a1a1aa;
        font-size: 15px;
        line-height: 1.7;
    }

    .notas-card {
        width: 100%;
        padding: 28px;
        background: linear-gradient(145deg, #2d090c, #160405);
        border: 1px solid rgba(220, 38, 38, 0.25);
        border-radius: 20px;
        box-shadow: 0 25px 70px rgba(0, 0, 0, 0.55);
        box-sizing: border-box;
    }

    .notas-card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 12px;
        margin-bottom: 22px;
    }

    .notas-card-titulo {
        margin: 0;
        color: #ffffff;
        font-size: 20px;
        font-weight: 700;
    }

    .notas-contador {
        padding: 8px 14px;
        background: rgba(127, 29, 29, 0.25);
        border: 1px solid rgba(220, 38, 38, 0.3);
        border-radius: 10px;
        color: #fca5a8;
        font-size: 13px;
        font-weight: 600;
    }

    .notas-tabela-container {
        width: 100%;
        overflow-x: auto;
        border: 1px solid rgba(220, 38, 38, 0.25);
        border-radius: 12px;
    }

    .notas-tabela {
        width: 100%;
        border-collapse: collapse;
        background: #180204;
        text-align: center;
    }

    .notas-tabela th {
        padding: 17px 15px;
        background: #7d1c22;
        color: #ffffff;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.8px;
        text-transform: uppercase;
        border-bottom: 1px solid rgba(220, 38, 38, 0.3);
        white-space: nowrap;
    }

    .notas-tabela td {
        padding: 16px 15px;
        color: #dddddd;
        border-bottom: 1px solid #461015;
        font-size: 14px;
        vertical-align: middle;
        white-space: nowrap;
    }

    .notas-tabela tbody tr {
        transition: background-color 0.2s ease;
    }

    .notas-tabela tbody tr:nth-child(even) {
        background: rgba(255, 255, 255, 0.02);
    }

    .notas-tabela tbody tr:hover {
        background-color: rgba(125, 28, 34, 0.2);
    }

    .notas-tabela tbody tr:last-child td {
        border-bottom: none;
    }

    .notas-id {
        color: #fca5a8 !important;
        font-weight: 700;
    }

    .notas-nome {
        color: #ffffff !important;
        font-weight: 600;
        text-align: left;
    }

    .notas-ra {
        display: inline-block;
        padding: 5px 9px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 6px;
        color: #d4d4d8;
        font-family: monospace;
    }

    .notas-valor {
        display: inline-block;
        min-width: 25px;
        padding: 5px 8px;
        background: rgba(127, 29, 29, 0.18);
        border: 1px solid rgba(220, 38, 38, 0.15);
        border-radius: 6px;
        color: #fca5a8;
        font-weight: 600;
    }

    .notas-acoes {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
    }

    .notas-btn-editar,
    .notas-btn-excluir {
        padding: 8px 13px;
        border: 1px solid transparent;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .notas-btn-editar {
        background: rgba(185, 28, 44, 0.15);
        color: #fca5a8;
        border-color: rgba(220, 38, 38, 0.3);
    }

    .notas-btn-editar:hover {
        background: #991b2b;
        color: #ffffff;
        border-color: #b91c2c;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(185, 28, 44, 0.2);
    }

    .notas-btn-excluir {
        background: rgba(239, 68, 68, 0.08);
        color: #f87171;
        border-color: rgba(239, 68, 68, 0.25);
    }

    .notas-btn-excluir:hover {
        background: #7f1d1d;
        color: #ffffff;
        border-color: #b91c1c;
        transform: translateY(-1px);
    }

    .notas-vazia {
        padding: 35px !important;
        color: #a1a1aa !important;
        text-align: center;
    }

    @media (max-width: 768px) {
        .notas-home {
            padding: 30px 15px;
        }

        .notas-intro {
            padding: 30px 20px;
        }

        .notas-card {
            padding: 18px;
        }

        .notas-card-titulo {
            font-size: 18px;
        }

        .notas-tabela th,
        .notas-tabela td {
            padding: 13px 11px;
        }
    }

    @media (max-width: 480px) {
        .notas-home {
            padding: 22px 10px;
        }

        .notas-shell {
            gap: 20px;
        }

        .notas-intro {
            padding: 25px 16px;
            border-radius: 14px;
        }

        .notas-descricao {
            font-size: 14px;
        }

        .notas-card {
            padding: 12px;
            border-radius: 14px;
        }

        .notas-card-header {
            align-items: flex-start;
            flex-direction: column;
        }

        .notas-acoes {
            flex-direction: column;
            gap: 6px;
        }

        .notas-btn-editar,
        .notas-btn-excluir {
            width: 100%;
        }
    }
`;

export default function ListNotas() {
    const [notas, setNotas] = useState([]);
    const router = useRouter();

    useEffect(() => {
        buscarNotas();
    }, []);

    async function buscarNotas() {
        const resposta = await fetch('/api/notas');
        const dados = await resposta.json();

        setNotas(dados);
    }

    function editarNota(id_nota) {
        router.push(`/editanota/${id_nota}`);
    }

    async function excluirNota(event) {
        event.preventDefault();

        if (!confirm("Deseja realmente excluir esta nota?")) {
            return;
        }

        const resposta = await fetch("/api/notas", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_nota: event.currentTarget.dataset.id,
            }),
        });

        const dados = await resposta.json();

        alert(dados.mensagem || dados.erro);

        buscarNotas();
    }

    return (
        <>
            <style>{styles}</style>

            <Header />

            <main className="notas-home">
                <div className="notas-shell">

                    <section className="notas-intro">
                        <span className="notas-tag">
                            Sistema Escolar
                        </span>

                        <h1 className="notas-titulo">
                            Lista de Notas
                        </h1>

                        <p className="notas-descricao">
                            Consulte as notas cadastradas no sistema
                            e acompanhe o desempenho dos alunos.
                        </p>
                    </section>

                    <section className="notas-card">

                        <div className="notas-card-header">
                            <h2 className="notas-card-titulo">
                                Notas dos alunos
                            </h2>

                            <span className="notas-contador">
                                {notas.length} registro(s)
                            </span>
                        </div>

                        <div className="notas-tabela-container">
                            <table className="notas-tabela">

                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>RA</th>
                                        <th>T1</th>
                                        <th>T2</th>
                                        <th>N1</th>
                                        <th>N2</th>
                                        <th>N3</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {notas && notas.length > 0 ? (
                                        notas.map((nota) => (
                                            <tr key={nota.id_nota}>
                                                <td className="notas-id">
                                                    {nota.id_nota}
                                                </td>

                                                <td className="notas-nome">
                                                    {nota.nome}
                                                </td>

                                                <td>
                                                    <span className="notas-ra">
                                                        {nota.ra}
                                                    </span>
                                                </td>

                                                <td>
                                                    <span className="notas-valor">
                                                        {nota.t1}
                                                    </span>
                                                </td>

                                                <td>
                                                    <span className="notas-valor">
                                                        {nota.t2}
                                                    </span>
                                                </td>

                                                <td>
                                                    <span className="notas-valor">
                                                        {nota.n1}
                                                    </span>
                                                </td>

                                                <td>
                                                    <span className="notas-valor">
                                                        {nota.n2}
                                                    </span>
                                                </td>

                                                <td>
                                                    <span className="notas-valor">
                                                        {nota.n3}
                                                    </span>
                                                </td>

                                                <td>
                                                    <div className="notas-acoes">
                                                        <button
                                                            className="notas-btn-editar"
                                                            onClick={() =>
                                                                editarNota(
                                                                    nota.id_nota
                                                                )
                                                            }
                                                        >
                                                            Editar
                                                        </button>

                                                        <button
                                                            className="notas-btn-excluir"
                                                            data-id={nota.id_nota}
                                                            onClick={excluirNota}
                                                        >
                                                            Excluir
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="9"
                                                className="notas-vazia"
                                            >
                                                Nenhuma nota encontrada.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
                        </div>

                    </section>

                </div>
            </main>
        </>
    );
}
