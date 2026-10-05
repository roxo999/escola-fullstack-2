'use client';

import { useState } from "react";
import Header from "../components/header";
import { salvarAluno } from "../utils/storage";

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
        max-width: 750px;
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

        .form-row {
            grid-template-columns: 1fr;
        }
    }
`;

export default function Cadastro() {
    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [serie, setSerie] = useState("");
    const [ra, setRa] = useState("");
    const [mensagem, setMensagem] = useState("");

    function cadastrarAluno(e) {
        e.preventDefault();

        if (!nome || !idade || !serie || !ra) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const novoAluno = {
            nome,
            idade,
            serie,
            ra
        };

        salvarAluno(novoAluno);

        setMensagem(`Aluno "${nome}" cadastrado com sucesso!`);

        setNome("");
        setIdade("");
        setSerie("");
        setRa("");

        setTimeout(() => {
            setMensagem("");
        }, 4000);
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
                            Cadastro de <span>Alunos</span>
                        </h1>

                        <p className="home-description">
                            Cadastre e gerencie os alunos no Sistema Escolar.
                        </p>
                    </div>

                    {mensagem && (
                        <div className="alerta-sucesso">
                            ✓ {mensagem}
                        </div>
                    )}

                    <form onSubmit={cadastrarAluno}>

                        <div className="input-group">
                            <label className="input-label">
                                Nome Completo
                            </label>
                            <input
                                type="text"
                                placeholder="Digite o nome completo"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="input-group">
                                <label className="input-label">
                                    Idade
                                </label>
                                <input
                                    type="number"
                                    placeholder="Ex: 17"
                                    value={idade}
                                    onChange={(e) => setIdade(e.target.value)}
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">
                                    Série / Turma
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ex: 3º Ano A"
                                    value={serie}
                                    onChange={(e) => setSerie(e.target.value)}
                                    className="form-input"
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">
                                RA (Registro do Aluno)
                            </label>
                            <input
                                type="number"
                                placeholder="Digite o RA do aluno"
                                value={ra}
                                onChange={(e) => setRa(e.target.value)}
                                className="form-input"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="home-button button-primary"
                        >
                            Cadastrar Aluno
                        </button>

                    </form>

                </section>

            </main>
        </>
    );
}