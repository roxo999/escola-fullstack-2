'use client';
import { useState, useEffect } from 'react';
import Header from "../components/header";
import styles from "./page.module.css";
import { getAlunos } from "../utils/storage";

export default function ListAluno() {
    const [alunos, setAlunos] = useState([]);
    const [busca, setBusca] = useState('');

    // Busca todos os alunos uma única vez ao carregar a página
    async function buscarAlunos() {
        try {
            const resposta = await fetch('/api/alunos');
            if (resposta.ok) {
                const dados = await resposta.json();
                if (Array.isArray(dados)) {
                    setAlunos(dados);
                    return;
                }
            }
        } catch (error) {
            console.error('Erro ao buscar alunos na API:', error);
        }
        // Fallback para o storage local
        const local = getAlunos();
        setAlunos(local || []);
    }

    useEffect(() => {
        buscarAlunos();
    }, []);

    // ===== REGRA DE PESQUISA =====
    // A filtragem SÓ acontece quando o usuário digitar 3 ou mais caracteres.
    // Com 0 caracteres: mostra todos os alunos.
    // Com 1 ou 2 caracteres: mostra todos os alunos (pesquisa ainda não iniciada).
    // Com 3+ caracteres: filtra por nome, série ou RA.
    const termo = busca.trim().toLowerCase();

    let alunosExibidos;
    if (termo.length >= 3) {
        alunosExibidos = alunos.filter((aluno) => {
            const nome = (aluno.nome || '').toLowerCase();
            const serie = (aluno.serie || '').toLowerCase();
            const ra = String(aluno.ra || '').toLowerCase();
            return nome.includes(termo) || serie.includes(termo) || ra.includes(termo);
        });
    } else {
        alunosExibidos = alunos;
    }

    return (
        <>
            <Header />
            <main className={styles.page}>
                <div className={styles.shell}>
                    <header className={styles.intro}>
                        <div>
                            <p className={styles.eyebrow}>Gestão escolar</p>
                            <h1 className={styles.title}>Alunos cadastrados</h1>
                            <p className={styles.description}>
                                Consulte os estudantes registrados e acompanhe as informações principais de cada turma.
                            </p>
                        </div>
                        <p className={styles.counter}>
                            <strong>{alunos.length}</strong>
                            aluno{alunos.length !== 1 ? 's' : ''} registrado{alunos.length !== 1 ? 's' : ''}
                        </p>
                    </header>

                    <section className={styles.tableCard} aria-label="Lista de alunos">
                        <div className={styles.searchBox}>
                            <input
                                type="text"
                                className={styles.searchInput}
                                placeholder="Buscar aluno (mínimo 3 caracteres)..."
                                value={busca}
                                onChange={(e) => setBusca(e.target.value)}
                            />
                        </div>

                        {busca.trim().length > 0 && busca.trim().length < 3 && (
                            <p style={{ color: '#fca5a8', fontSize: '13px', margin: '-10px 0 14px', textAlign: 'right' }}>
                                Digite pelo menos 3 caracteres para pesquisar.
                            </p>
                        )}

                        <div className={styles.tableWrapper}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Idade</th>
                                        <th scope="col">Série</th>
                                        <th scope="col">RA</th>
                                        <th scope="col">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {alunosExibidos.length > 0 ? (
                                        alunosExibidos.map((aluno, index) => {
                                            const idAluno = aluno.id_aluno || aluno.id || (index + 1);
                                            return (
                                                <tr key={idAluno}>
                                                    <td className={styles.id}>{idAluno}</td>
                                                    <td className={styles.name}>{aluno.nome}</td>
                                                    <td>{aluno.idade} anos</td>
                                                    <td>{aluno.serie || 'N/A'}</td>
                                                    <td className={styles.ra}>{aluno.ra}</td>
                                                    <td className={styles.actions}>
                                                        <button type="button" className={styles.btnEdit}>Editar</button>
                                                        <button type="button" className={styles.btnDelete}>Excluir</button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="6" style={{ textAlign: 'center', padding: '24px', color: '#a1a1aa' }}>
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
                </div>
            </main>
        </>
    );
}
