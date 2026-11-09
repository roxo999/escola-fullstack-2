'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/header";
import { getAlunos, salvarNota } from "../utils/storage";
import { redirect } from "next/navigation";

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
        max-width: 800px;
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

    .secao-titulo {
        color: #fca5a8;
        font-size: 13px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin: 22px 0 12px;
        padding-bottom: 6px;
        border-bottom: 1px solid rgba(220, 38, 38, 0.2);
        text-align: left;
    }

    .alerta-sucesso {
        background: rgba(127, 29, 29, 0.3);
        border: 1px solid rgba(220, 38, 38, 0.4);
        color: #fca5a8;
        padding: 14px;
        border-radius: 8px;
        text-align: center;
        font-weight: 600;
        margin-bottom: 25px;
    }

    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 18px;
    }

    .form-row-3 {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 18px;
    }

    .input-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        text-align: left;
    }

    .input-label {
        color: #ffffff;
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 8px;
    }

    .form-input {
        width: 100%;
        padding: 14px 16px;
        background: #180204;
        color: #ffffff;
        border: 1px solid #6f1a20;
        border-radius: 10px;
        outline: none;
        font-size: 15px;
        box-sizing: border-box;
        transition: all 0.25s ease;
    }

    .form-input:focus {
        border-color: #dc2626;
        box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.2);
    }

    select.form-input option {
        background: #180204;
        color: #ffffff;
    }

    .preview-card {
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: #180204;
        border: 1px solid rgba(220, 38, 38, 0.3);
        border-radius: 12px;
        padding: 20px;
        margin: 25px 0;
    }

    .preview-item {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .preview-label {
        color: #a1a1aa;
        font-size: 13px;
        font-weight: 600;
        margin-bottom: 4px;
    }

    .preview-valor {
        color: #ffffff;
        font-size: 28px;
        font-weight: 700;
    }

    .preview-status {
        font-weight: 700;
        font-size: 14px;
        padding: 5px 14px;
        border-radius: 20px;
    }

    .preview-status.destaque {
        background: rgba(245, 158, 11, 0.2);
        color: #fcd34d;
        border: 1px solid rgba(245, 158, 11, 0.4);
    }

    .preview-status.aprovado {
        background: rgba(34, 197, 94, 0.15);
        color: #4ade80;
        border: 1px solid rgba(34, 197, 94, 0.35);
    }

    .preview-status.recuperação {
        background: rgba(239, 68, 68, 0.15);
        color: #f87171;
        border: 1px solid rgba(239, 68, 68, 0.35);
    }

    .home-button {
        width: 100%;
        display: inline-block;
        padding: 15px;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.25s ease;
        text-align: center;
    }

    .button-primary {
        background: #991b1b;
        color: #ffffff;
        box-shadow: 0 8px 20px rgba(153, 27, 27, 0.25);
    }

    .button-primary:hover {
        background: #b91c1c;
        transform: translateY(-2px);
    }

    @media (max-width: 600px) {
        .home {
            padding: 30px 15px;
        }

        .home-card {
            padding: 45px 20px;
        }

        .form-row, .form-row-3 {
            grid-template-columns: 1fr;
        }
    }
`;

export default function CadastroNotas() {
    const [id_aluno, setIdAluno] = useState('');
    const [t1, setT1] = useState('');
    const [t2, setT2] = useState('');
    const [n1, setN1] = useState('');
    const [n2, setN2] = useState('');
    const [n3, setN3] = useState('');
    const [alunos, setAlunos] = useState([])

    useEffect(() => {
        buscarAlunos();
    }, []);

    async function buscarAlunos() {
        const resposta = await fetch("/api/alunos");
        const dados = await resposta.json();
        setAlunos(dados);
    }


    async function cadastraNotas(event) {
        event.preventDefault();
        const resposta = await fetch("/api/notas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id_aluno,
                t1,
                t2,
                n1,
                n2,
                n3
            })
        })
        const dados = await resposta.json();
        alert(dados.mensagem || dados.erro)
        if (resposta.ok) {
            redirect("/listnotas")
        }
    }

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
                            Cadastro de <span>Notas</span>
                        </h1>

                        <p className="home-description">
                            Lance e atualize as notas de avaliações e trabalhos dos alunos.
                        </p>
                    </div>

                   
                    <form onSubmit={cadastraNotas}>

                        <div className="secao-titulo">Aluno</div>
                        
                        <div className="input-group">
                            <label className="input-label">Selecionar Aluno</label>
                            <select
                                    value={id_aluno}
                                    onChange={(event) => setIdAluno(event.target.value)}
                                    className="form-input"
                                    required
                                >
                                    <option value="">Selecione um aluno</option>

                                    {alunos.map((aluno) => (
                                        <option key={aluno.id_aluno} value={aluno.id_aluno}>
                                            {aluno.nome} - RA {aluno.ra}
                                        </option>
                                    ))}
                                </select>
                        </div>



                        <div className="secao-titulo">Trabalhos Práticos</div>
                        <div className="form-row">
                            <div className="input-group">
                                <label className="input-label">Trabalho 1</label>
                                <input
                                    type="number"
                                    placeholder="0,0 a 10,0"
                                    value={t1}
                                    onChange={(e) => setT1(e.target.value)}
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Trabalho 2</label>
                                <input
                                    type="number"
                                    placeholder="0,0 a 10,0"
                                    value={t2}
                                    onChange={(e) => setT2(e.target.value)}
                                    className="form-input"
                                    required
                                />
                            </div>
                        </div>

                        <div className="secao-titulo">Provas e Avaliações</div>
                        <div className="form-row-3">
                            <div className="input-group">
                                <label className="input-label">Nota 1</label>
                                <input
                                    type="number"
                                    placeholder="0,0 a 10,0"
                                    value={n1}
                                    onChange={(e) => setN1(e.target.value)}
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Nota 2</label>
                                <input
                                    type="number"
                                    placeholder="0,0 a 10,0"
                                    value={n2}
                                    onChange={(e) => setN2(e.target.value)}
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Nota 3</label>
                                <input
                                    type="number"
                                    placeholder="0,0 a 10,0"
                                    value={n3}
                                    onChange={(e) => setN3(e.target.value)}
                                    className="form-input"
                                    required
                                />
                            </div>
                        </div>

                        

                        <button
                            type="submit"
                            className="home-button button-primary"
                        >
                            Salvar e Registrar Notas
                        </button>

                    </form>

                </section>
            </main>
        </>
    );
}
