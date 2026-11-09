
'use client';

import { useEffect, useState, use } from "react";
import Header from "../../components/header";
import { useRouter, useParams, useSearchParams } from "next/navigation";

const styles = `
    .editar-nota-page {
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

    .editar-nota-shell {
        width: 100%;
        max-width: 750px;
        margin: 0 auto;
    }

    .editar-nota-card {
        width: 100%;
        padding: 45px;
        background: linear-gradient(145deg, #2d090c, #160405);
        border: 1px solid rgba(220, 38, 38, 0.25);
        border-radius: 20px;
        box-shadow: 0 25px 70px rgba(0, 0, 0, 0.55);
        box-sizing: border-box;
    }

    .editar-nota-header {
        text-align: center;
        margin-bottom: 35px;
    }

    .editar-nota-tag {
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

    .editar-nota-titulo {
        margin: 0;
        color: #ffffff;
        font-size: clamp(28px, 4vw, 36px);
        font-weight: 700;
        line-height: 1.2;
    }

    .editar-nota-descricao {
        max-width: 500px;
        margin: 15px auto 0;
        color: #a1a1aa;
        font-size: 15px;
        line-height: 1.7;
    }

    .editar-nota-aluno-info {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-bottom: 25px;
        padding: 15px;
        background: #180204;
        border: 1px solid rgba(220, 38, 38, 0.2);
        border-radius: 12px;
    }

    .editar-nota-aluno-info span {
        color: #fca5a8;
        font-weight: 600;
        font-size: 14px;
    }

    .editar-nota-form {
        display: flex;
        flex-direction: column;
        gap: 22px;
    }

    .editar-nota-secao {
        color: #fca5a8;
        font-size: 13px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin: 5px 0 0;
        padding-bottom: 6px;
        border-bottom: 1px solid rgba(220, 38, 38, 0.2);
    }

    .editar-nota-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 18px;
    }

    .editar-nota-row-3 {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 18px;
    }

    .editar-nota-campo {
        display: flex;
        flex-direction: column;
        gap: 9px;
    }

    .editar-nota-campo label {
        color: #f5dada;
        font-size: 14px;
        font-weight: 600;
    }

    .editar-nota-campo input {
        width: 100%;
        padding: 14px 16px;
        background: #180204;
        border: 1px solid rgba(220, 38, 38, 0.3);
        border-radius: 10px;
        color: #ffffff;
        font-size: 14px;
        outline: none;
        box-sizing: border-box;
        transition:
            border-color 0.25s ease,
            box-shadow 0.25s ease,
            background-color 0.25s ease;
    }

    .editar-nota-campo input::placeholder {
        color: #9ca3af;
    }

    .editar-nota-campo input:focus {
        background: #200507;
        border-color: #dc2626;
        box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
    }

    .editar-nota-botoes {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 10px;
    }

    .editar-nota-submit {
        width: 100%;
        padding: 15px 20px;
        background: linear-gradient(90deg, #991b2b, #7f1d1d);
        border: 1px solid rgba(220, 38, 38, 0.4);
        border-radius: 10px;
        color: #ffffff;
        font-size: 15px;
        font-weight: 700;
        cursor: pointer;
        transition:
            background 0.25s ease,
            transform 0.25s ease,
            box-shadow 0.25s ease;
    }

    .editar-nota-submit:hover {
        background: linear-gradient(90deg, #b91c2c, #991b2b);
        box-shadow: 0 8px 20px rgba(153, 27, 43, 0.25);
        transform: translateY(-2px);
    }

    .editar-nota-submit:active {
        transform: translateY(0);
    }

    .editar-nota-loading {
        min-height: calc(100vh - 80px);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 30px 20px;
        background: radial-gradient(
            circle at top right,
            #4a0b0b 0%,
            #250709 35%,
            #0d0203 100%
        );
        color: #ffffff;
        text-align: center;
        box-sizing: border-box;
    }

    .editar-nota-loading h1 {
        margin-bottom: 12px;
        font-size: 28px;
    }

    .editar-nota-loading p {
        color: #c4b5b5;
        font-size: 15px;
    }

    @media (max-width: 600px) {
        .editar-nota-page {
            padding: 30px 15px;
        }

        .editar-nota-card {
            padding: 30px 20px;
            border-radius: 16px;
        }

        .editar-nota-header {
            margin-bottom: 28px;
        }

        .editar-nota-descricao {
            font-size: 14px;
        }

        .editar-nota-form {
            gap: 18px;
        }

        .editar-nota-campo input {
            padding: 13px 14px;
        }

        .editar-nota-row,
        .editar-nota-row-3 {
            grid-template-columns: 1fr;
        }

        .editar-nota-aluno-info {
            flex-direction: column;
            align-items: center;
            gap: 8px;
        }
    }
`;

export default function EditNotaPage({ params: paramsPromise }) {
    const router = useRouter();
    const routeParams = useParams();
    const searchParams = useSearchParams();

    const resolvedParams = paramsPromise ? use(paramsPromise) : null;
    const id = resolvedParams?.id || routeParams?.id || searchParams?.get("id");

    const [id_nota, setIdNota] = useState("");
    const [nomeAluno, setNomeAluno] = useState("");
    const [raAluno, setRaAluno] = useState("");
    const [t1, setT1] = useState("");
    const [t2, setT2] = useState("");
    const [n1, setN1] = useState("");
    const [n2, setN2] = useState("");
    const [n3, setN3] = useState("");
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        if (id) {
            buscarNota(id);
        } else {
            setCarregando(false);
        }
    }, [id]);

    async function buscarNota(idNota) {
        try {
            setCarregando(true);

            const resposta = await fetch(`/api/notas/${idNota}`);

            if (!resposta.ok) {
                alert("Nota não encontrada!");
                router.push("/listnotas");
                return;
            }

            const dados = await resposta.json();

            setIdNota(dados.id_nota || "");
            setNomeAluno(dados.nome || "");
            setRaAluno(dados.ra || "");
            setT1(dados.t1 ?? "");
            setT2(dados.t2 ?? "");
            setN1(dados.n1 ?? "");
            setN2(dados.n2 ?? "");
            setN3(dados.n3 ?? "");
        } catch (erro) {
            console.error("Erro ao carregar nota:", erro);
            alert("Erro ao carregar dados da nota.");
        } finally {
            setCarregando(false);
        }
    }

    async function editarNota(event) {
        event.preventDefault();

        if (!id) {
            alert("ID da nota não foi encontrado.");
            return;
        }

        const resposta = await fetch("/api/notas", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_nota,
                t1,
                t2,
                n1,
                n2,
                n3,
            }),
        });

        const dados = await resposta.json();

        alert(dados.mensagem || dados.erro);

        if (resposta.ok) {
            router.push("/listnotas");
        }
    }

    if (carregando) {
        return (
            <>
                <style>{styles}</style>
                <Header />

                <main className="editar-nota-loading">
                    <h1>Editar Nota</h1>
                    <p>Carregando informações da nota...</p>
                </main>
            </>
        );
    }

    return (
        <>
            <style>{styles}</style>

            <Header />

            <main className="editar-nota-page">
                <div className="editar-nota-shell">

                    <section className="editar-nota-card">

                        <header className="editar-nota-header">
                            <span className="editar-nota-tag">
                                Sistema Escolar
                            </span>

                            <h1 className="editar-nota-titulo">
                                Edição de Notas
                            </h1>

                            <p className="editar-nota-descricao">
                                Atualize as notas do aluno
                                nos campos abaixo.
                            </p>
                        </header>

                        <div className="editar-nota-aluno-info">
                            <span>Aluno: {nomeAluno}</span>
                            <span>RA: {raAluno}</span>
                        </div>

                        <form
                            className="editar-nota-form"
                            onSubmit={editarNota}
                        >
                            <input
                                type="hidden"
                                value={id_nota}
                                onChange={(event) =>
                                    setIdNota(event.target.value)
                                }
                            />

                            <div className="editar-nota-secao">Trabalhos Práticos</div>

                            <div className="editar-nota-row">
                                <div className="editar-nota-campo">
                                    <label htmlFor="t1">Trabalho 1</label>

                                    <input
                                        id="t1"
                                        type="number"
                                        step="0.1"
                                        value={t1}
                                        onChange={(e) => setT1(e.target.value)}
                                        placeholder="0,0 a 10,0"
                                    />
                                </div>

                                <div className="editar-nota-campo">
                                    <label htmlFor="t2">Trabalho 2</label>

                                    <input
                                        id="t2"
                                        type="number"
                                        step="0.1"
                                        value={t2}
                                        onChange={(e) => setT2(e.target.value)}
                                        placeholder="0,0 a 10,0"
                                    />
                                </div>
                            </div>

                            <div className="editar-nota-secao">Provas e Avaliações</div>

                            <div className="editar-nota-row-3">
                                <div className="editar-nota-campo">
                                    <label htmlFor="n1">Nota 1</label>

                                    <input
                                        id="n1"
                                        type="number"
                                        step="0.1"
                                        value={n1}
                                        onChange={(e) => setN1(e.target.value)}
                                        placeholder="0,0 a 10,0"
                                    />
                                </div>

                                <div className="editar-nota-campo">
                                    <label htmlFor="n2">Nota 2</label>

                                    <input
                                        id="n2"
                                        type="number"
                                        step="0.1"
                                        value={n2}
                                        onChange={(e) => setN2(e.target.value)}
                                        placeholder="0,0 a 10,0"
                                    />
                                </div>

                                <div className="editar-nota-campo">
                                    <label htmlFor="n3">Nota 3</label>

                                    <input
                                        id="n3"
                                        type="number"
                                        step="0.1"
                                        value={n3}
                                        onChange={(e) => setN3(e.target.value)}
                                        placeholder="0,0 a 10,0"
                                    />
                                </div>
                            </div>

                            <div className="editar-nota-botoes">
                                <button
                                    type="submit"
                                    className="editar-nota-submit"
                                >
                                    Salvar alterações
                                </button>
                            </div>
                        </form>

                    </section>

                </div>
            </main>
        </>
    );
}
