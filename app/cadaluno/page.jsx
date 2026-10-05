"use client";

import { useState } from "react";
import Header from "../components/header";

export default function Cadluno() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [serie, setSerie] = useState("");
  const [ra, setRa] = useState("");

  async function cadastrarAluno(evento){
    evento.preventDefault();
    const resposta = await fetch('/api/alunos', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome,
        idade,
        serie,
        ra
    })
    })

    const dados = await resposta.json();
    alert(dados.mensagem || dados.erro);
    if(resposta.ok){
      setNome("");
      setIdade("");
      setSerie("");
      setRa("");
    }
  }

  return (
    <>
      <Header />

      <main className="container-cadastro">
        <div className="cabecalho-cadastro">
          <span className="form-tag">[ REGISTRO ]</span>

          <h2>Cadastro de Aluno</h2>

          <p>
            Insira os dados do novo estudante.
          </p>
        </div>

        <form className="form-cadastro">
          <div className="form-group">
            <label htmlFor="nome">Nome do aluno</label>

            <input
              type="text"
              id="nome"
              placeholder="Digite o nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>

            <input
              type="email"
              id="email"
              placeholder="Digite o e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="idade">Idade</label>

            <input
              type="number"
              id="idade"
              placeholder="Digite a idade"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-enviar">
            Cadastrar Aluno
            <span>→</span>
          </button>
        </form>
      </main>
    </>
  );
}
