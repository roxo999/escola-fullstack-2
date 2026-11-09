
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../auth.module.css';

export default function Registro() {
    const router = useRouter();

    const [usuario, setUsuario] = useState('');
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');

    function cadastrar(e) {
        e.preventDefault();

        if (!usuario || !nome || !senha) {
            alert('Preencha todos os campos!');
            return;
        }

        const dados = {
            usuario,
            nome,
            senha
        };

        localStorage.setItem('usuarioCadastrado', JSON.stringify(dados));

        alert('Registro realizado com sucesso!');

        router.push('/login');
    }

    return (
        <main className={styles.container}>
            <div className={styles.card}>

                <h1 className={styles.titulo}>
                    Criar conta
                </h1>

                <p className={styles.subtitulo}>
                    Preencha os dados para realizar seu cadastro.
                </p>

                <form onSubmit={cadastrar}>

                    <div className={styles.grupo}>
                        <label>Usuário</label>
                        <input
                            type="text"
                            placeholder="Digite seu usuário"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                        />
                    </div>

                    <div className={styles.grupo}>
                        <label>Nome</label>
                        <input
                            type="text"
                            placeholder="Digite seu nome completo"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>

                    <div className={styles.grupo}>
                        <label>Senha</label>
                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>

                    <button type="submit" className={styles.botao}>
                        Salvar registro
                    </button>

                </form>

                <p className={styles.link}>
                    Já possui uma conta?{' '}
                    <Link href="/login">
                        Fazer login
                    </Link>
                </p>

            </div>
        </main>
    );
}
