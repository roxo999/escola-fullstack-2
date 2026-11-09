
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../auth.module.css';

export default function Login() {
    const router = useRouter();

    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    function entrar(e) {
        e.preventDefault();

        const cadastro = localStorage.getItem('usuarioCadastrado');

        if (!cadastro) {
            alert('Nenhum usuário cadastrado!');
            return;
        }

        const dados = JSON.parse(cadastro);

        if (
            usuario === dados.usuario &&
            senha === dados.senha
        ) {
            alert('Login realizado com sucesso!');

            router.push('/principal');
        } else {
            alert('Usuário ou senha incorretos!');
        }
    }

    return (
        <main className={styles.container}>
            <div className={styles.card}>

                <h1 className={styles.titulo}>
                    Bem-vindo!
                </h1>

                <p className={styles.subtitulo}>
                    Entre com seus dados para acessar o sistema escolar.
                </p>

                <form onSubmit={entrar}>

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
                        <label>Senha</label>
                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>

                    <button type="submit" className={styles.botao}>
                        Entrar no sistema
                    </button>

                </form>

                <p className={styles.link}>
                    Ainda não possui uma conta?{' '}
                    <Link href="/registro">
                        Criar registro
                    </Link>
                </p>

            </div>
        </main>
    );
}
