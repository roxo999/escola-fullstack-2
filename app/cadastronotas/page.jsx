'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/header";
import { getAlunos, salvarNota } from "../utils/storage";

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
    const router = useRouter();

    const [alunos, setAlunos] = useState([]);
    const [alunoSelecionado, setAlunoSelecionado] = useState("");
    const [nomePersonalizado, setNomePersonalizado] = useState("");
    const [serie, setSerie] = useState("");

    const [trabalho1, setTrabalho1] = useState("");
    const [trabalho2, setTrabalho2] = useState("");
    const [nota1, setNota1] = useState("");
    const [nota2, setNota2] = useState("");
    const [nota3, setNota3] = useState("");

    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
        const listaAlunos = getAlunos();
        setAlunos(listaAlunos);
    }, []);

    const handleSelectAluno = (e) => {
        const valor = e.target.value;
        setAlunoSelecionado(valor);
        if (valor && valor !== "outro") {
            const encontrado = alunos.find(a => a.nome === valor);
            if (encontrado) {
                setSerie(encontrado.serie || "");
            }
        }
    };

    const t1 = parseFloat(trabalho1) || 0;
    const t2 = parseFloat(trabalho2) || 0;
    const n1 = parseFloat(nota1) || 0;
    const n2 = parseFloat(nota2) || 0;
    const n3 = parseFloat(nota3) || 0;

    const temNotas = trabalho1 !== "" || trabalho2 !== "" || nota1 !== "" || nota2 !== "" || nota3 !== "";
    const mediaCalculada = temNotas ? ((t1 + t2 + n1 + n2 + n3) / 5).toFixed(1) : "0,0";

    const getSituacao = (media) => {
        const num = parseFloat(media);
        if (num >= 9.0) return "Destaque";
        if (num >= 6.0) return "Aprovado";
        return "Recuperação";
    };

    const cadastrarNota = (e) => {
        e.preventDefault();

        const nomeFinal = alunoSelecionado === "outro" || !alunoSelecionado ? nomePersonalizado : alunoSelecionado;

        if (!nomeFinal) {
            alert("Por favor, informe ou selecione o nome do aluno.");
            return;
        }

        const novaNotaObj = {
            nome: nomeFinal,
            serie: serie || "3º Ano A",
            trabalho1: t1,
            trabalho2: t2,
            nota1: n1,
            nota2: n2,
            nota3: n3,
            situacao: getSituacao(mediaCalculada)
        };

        salvarNota(novaNotaObj);
        setMensagem("Notas salvas com sucesso!");

        setTimeout(() => {
            router.push("/notas");
        }, 1200);
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
                            Cadastro de <span>Notas</span>
                        </h1>

                        <p className="home-description">
                            Lance e atualize as notas de avaliações e trabalhos dos alunos.
                        </p>
                    </div>

                    {mensagem && (
                        <div className="alerta-sucesso">
                            ✓ {mensagem}
                        </div>
                    )}

                    <form onSubmit={cadastrarNota}>

                        <div className="secao-titulo">Aluno</div>
                        
                        <div className="input-group">
                            <label className="input-label">Selecionar Aluno</label>
                            <select 
                                value={alunoSelecionado} 
                                onChange={handleSelectAluno}
                                className="form-input"
                            >
                                <option value="">-- Selecione um aluno cadastrado --</option>
                                {alunos.map((a) => (
                                    <option key={a.id} value={a.nome}>
                                        {a.nome} ({a.serie || '3º Ano'})
                                    </option>
                                ))}
                                <option value="outro">+ Digitar outro aluno...</option>
                            </select>
                        </div>

                        {(alunoSelecionado === "outro" || alunos.length === 0) && (
                            <div className="input-group">
                                <label className="input-label">Nome Completo</label>
                                <input
                                    type="text"
                                    placeholder="Digite o nome completo do aluno"
                                    value={nomePersonalizado}
                                    onChange={(e) => setNomePersonalizado(e.target.value)}
                                    className="form-input"
                                    required
                                />
                            </div>
                        )}

                        <div className="input-group">
                            <label className="input-label">Série / Turma</label>
                            <input
                                type="text"
                                placeholder="Ex: 3º Ano A"
                                value={serie}
                                onChange={(e) => setSerie(e.target.value)}
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="secao-titulo">Trabalhos Práticos</div>
                        <div className="form-row">
                            <div className="input-group">
                                <label className="input-label">Trabalho 1</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    placeholder="0,0 a 10,0"
                                    value={trabalho1}
                                    onChange={(e) => setTrabalho1(e.target.value)}
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Trabalho 2</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    placeholder="0,0 a 10,0"
                                    value={trabalho2}
                                    onChange={(e) => setTrabalho2(e.target.value)}
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
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    placeholder="0,0 a 10,0"
                                    value={nota1}
                                    onChange={(e) => setNota1(e.target.value)}
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Nota 2</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    placeholder="0,0 a 10,0"
                                    value={nota2}
                                    onChange={(e) => setNota2(e.target.value)}
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Nota 3</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    placeholder="0,0 a 10,0"
                                    value={nota3}
                                    onChange={(e) => setNota3(e.target.value)}
                                    className="form-input"
                                    required
                                />
                            </div>
                        </div>

                        <div className="preview-card">
                            <div className="preview-item">
                                <span className="preview-label">Média Calculada</span>
                                <span className="preview-valor">{mediaCalculada.toString().replace('.', ',')}</span>
                            </div>
                            <div className="preview-item">
                                <span className="preview-label">Situação Prevista</span>
                                <span className={`preview-status ${getSituacao(mediaCalculada).toLowerCase()}`}>
                                    {getSituacao(mediaCalculada)}
                                </span>
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
