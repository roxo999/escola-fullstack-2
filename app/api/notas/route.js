import db from "../../db/banco.js";
import { NextResponse } from "next/server";

export async function ListNotas(request) {    

    const notas = db.prepare(`SELECT notas.id,notas.t1, notas.t2,
        notas.n1,notas.n2, notas.n3,
        alunos.nome, alunos.ra
        FROM notas INNER JOIN alunos
        ON notas.id_aluno = alunos.id_aluno
        ORDER BY alunos.nome`).all();

    return NextResponse.json(notas);
}

export async function SalvaNotas(request) {
    try {

        const dados = await request.json();

        const sql = db.prepare(`INSERT INTO notas
            (id_aluno, t1, t2, n1, n2, n3)
            VALUES (?, ?, ?, ?, ?, ?)`);
        sql.run(dados.id_aluno, dados.t1, dados.t2,
            dados.n1, dados.n2, dados.n3);

        return NextResponse.json({

            mensagem: "Nota cadastrada com sucesso!"
        });

    } catch (error) {

        console.error("Erro ao realizar cadastro:", error);

        return NextResponse.json(

            { mensagem: "Erro ao cadastrar nota!" },

            { status: 500 }
        );
    }
}

// editar nota pelo id_notas
export async function EditNotas(request) {
    try {
        const dados = await request.json();
        const sql = db.prepare(`
            UPDATE notas
            SET t1 = ?, t2 = ?, n1 = ?, n2 = ?, n3 = ?
            WHERE id_nota = ?
        `);
        sql.run(dados.t1, dados.t2, dados.n1, dados.n2, dados.n3, dados.id_nota);
        return NextResponse.json({
            message: "Nota atualizada com sucesso!"
        });
    } catch (error) {
        console.error('Erro ao editar a nota ', error);
        return NextResponse.json({ message: "Erro ao editar a nota." }, { status: 500 });
    };
}

// excluir nota pelo id_notas
export async function DeleteNota(request) {
    try {
        const dados = await request.json();
        const sql = db.prepare(`DELETE FROM notas WHERE id_nota = ?`);
        sql.run(dados.id_nota);
        return NextResponse.json({
            message: "Nota excluída com sucesso!"
        });
    } catch (error) {
        console.error('Erro ao excluir a nota ', error);
        return NextResponse.json({ message: "Erro ao excluir a nota." }, { status: 500 });
    };
}
