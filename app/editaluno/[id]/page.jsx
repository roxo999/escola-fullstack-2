
'use client';

import { useEffect, useState, use } from "react";
import Header from "../../components/header";
import { useRouter, useParams, useSearchParams } from "next/navigation";

const styles = `
    .editar-aluno-page {
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

    .editar-aluno-shell {
        width: 100%;
        max-width: 750px;
        margin: 0 auto;
    }

    .editar-aluno-card {
        width: 100%;
        padding: 45px;
        background: linear-gradient(145deg, #2d090c, #160405);
        border: 1px solid rgba(220, 38, 38, 0.25);
        border-radius: 20px;
        box-shadow: 0 25px 70px rgba(0, 0, 0, 0.55);
        box-sizing: border-box;
    }

    .editar-aluno-header {
        text-align: center;
        margin-bottom: 35px;
    }

    .editar-aluno-tag {
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

    .editar-aluno-titulo {
        margin: 0;
        color: #ffffff;
        font-size: clamp(28px, 4vw, 36px);
        font-weight: 700;
        line-height: 1.2;
    }

    .editar-aluno-descricao {
        max-width: 500px;
        margin: 15px auto 0;
        color: #a1a1aa;
        font-size: 15px;
        line-height: 1.7;
    }

    .editar-aluno-form {
        display: flex;
        flex-direction: column;
        gap: 22px;
    }

    .editar-aluno-campo {
        display: flex;
        flex-direction: column;
        gap: 9px;
    }

    .editar-aluno-campo label {
        color: #f5dada;
        font-size: 14px;
        font-weight: 600;
    }

    .editar-aluno-campo input {
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

    .editar-aluno-campo input::placeholder {
        color: #9ca3af;
    }

    .editar-aluno-campo input:focus {
        background: #200507;
        border-color: #dc2626;
        box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
    }

    .editar-aluno-botoes {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 10px;
    }

    .editar-aluno-submit {
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

    .editar-aluno-submit:hover {
        background: linear-gradient(90deg, #b91c2c, #991b2b);
        box-shadow: 0 8px 20px rgba(153, 27, 43, 0.25);
        transform: translateY(-2px);
    }

    .editar-aluno-submit:active {
        transform: translateY(0);
    }

    .editar-aluno-loading {
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

    .editar-aluno-loading h1 {
        margin-bottom: 12px;
        font-size: 28px;
    }

    .editar-aluno-loading p {
        color: #c4b5b5;
        font-size: 15px;
    }

    @media (max-width: 600px) {
        .editar-aluno-page {
            padding: 30px 15px;
        }

        .editar-aluno-card {
            padding: 30px 20px;
            border-radius: 16px;
        }

        .editar-aluno-header {
            margin-bottom: 28px;
        }

        .editar-aluno-descricao {
            font-size: 14px;
        }

        .editar-aluno-form {
            gap: 18px;
        }

        .editar-aluno-campo input {
            padding: 13px 14px;
        }
    }
`;

export default function EditAlunoPage({ params: paramsPromise }) {
    const router = useRouter();
    const routeParams = useParams();
    const searchParams = useSearchParams();

    const resolvedParams = paramsPromise ? use(paramsPromise) : null;
    const id = resolvedParams?.id || routeParams?.id || searchParams?.get("id");

    const [id_aluno, setIdAluno] = useState("");
    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [serie, setSerie] = useState("");
    const [ra, setRa] = useState("");
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        if (id) {
            buscarAluno(id);
        } else {
            setCarregando(false);
        }
    }, [id]);

    async function buscarAluno(idAluno) {
        try {
            setCarregando(true);

            const resposta = await fetch(`/api/alunos/${idAluno}`);

            if (!resposta.ok) {
                alert("Aluno não encontrado!");
                router.push("/listaluno");
                return;
            }

            const dados = await resposta.json();

            setIdAluno(dados.id_aluno || "");
            setNome(dados.nome || "");
            setIdade(dados.idade || "");
            setSerie(dados.serie || "");
            setRa(dados.ra || "");
        } catch (erro) {
            console.error("Erro ao carregar aluno:", erro);
            alert("Erro ao carregar dados do aluno.");
        } finally {
            setCarregando(false);
        }
    }

    async function editarAluno(event) {
        event.preventDefault();

        if (!id) {
            alert("ID do aluno não foi encontrado.");
            return;
        }

        const resposta = await fetch("/api/alunos", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_aluno,
                nome,
                idade,
                serie,
                ra,
            }),
        });

        const dados = await resposta.json();

        alert(dados.mensagem || dados.erro);

        if (resposta.ok) {
            router.push("/listaluno");
        }
    }

    if (carregando) {
        return (
            <>
                <style>{styles}</style>
                <Header />

                <main className="editar-aluno-loading">
                    <h1>Editar Aluno</h1>
                    <p>Carregando informações do aluno...</p>
                </main>
            </>
        );
    }

    return (
        <>
            <style>{styles}</style>

            <Header />

            <main className="editar-aluno-page">
                <div className="editar-aluno-shell">

                    <section className="editar-aluno-card">

                        <header className="editar-aluno-header">
                            <span className="editar-aluno-tag">
                                Sistema Escolar
                            </span>

                            <h1 className="editar-aluno-titulo">
                                Edição de Alunos
                            </h1>

                            <p className="editar-aluno-descricao">
                                Atualize as informações do aluno
                                nos campos abaixo.
                            </p>
                        </header>

                        <form
                            className="editar-aluno-form"
                            onSubmit={editarAluno}
                        >
                            <input
                                type="hidden"
                                value={id_aluno}
                                onChange={(event) =>
                                    setIdAluno(event.target.value)
                                }
                            />

                            <div className="editar-aluno-campo">
                                <label htmlFor="nome">Nome completo</label>

                                <input
                                    id="nome"
                                    type="text"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    placeholder="Digite o nome do aluno"
                                />
                            </div>

                            <div className="editar-aluno-campo">
                                <label htmlFor="idade">Idade</label>

                                <input
                                    id="idade"
                                    type="number"
                                    value={idade}
                                    onChange={(e) => setIdade(e.target.value)}
                                    placeholder="Digite a idade"
                                />
                            </div>

                            <div className="editar-aluno-campo">
                                <label htmlFor="serie">Série</label>

                                <input
                                    id="serie"
                                    type="text"
                                    value={serie}
                                    onChange={(e) => setSerie(e.target.value)}
                                    placeholder="Digite a série"
                                />
                            </div>

                            <div className="editar-aluno-campo">
                                <label htmlFor="ra">RA</label>

                                <input
                                    id="ra"
                                    type="number"
                                    value={ra}
                                    onChange={(e) => setRa(e.target.value)}
                                    placeholder="Digite o RA"
                                />
                            </div>

                            <div className="editar-aluno-botoes">
                                <button
                                    type="submit"
                                    className="editar-aluno-submit"
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
