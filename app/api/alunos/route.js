import db from "../../db/banco.js";
import { NextResponse } from "next/server";

// Listar alunos ordenando por nome (suporta busca a partir de 3 caracteres)
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const busca = searchParams.get("busca") || searchParams.get("q") || "";
        const termo = busca.trim();

        let alunos;
        if (termo.length >= 3) {
            const query = `%${termo}%`;
            const stmt = db.prepare("SELECT * FROM alunos WHERE nome LIKE ? OR serie LIKE ? OR ra LIKE ? ORDER BY nome");
            alunos = stmt.all(query, query, query);
        } else {
            alunos = db.prepare("SELECT * FROM alunos ORDER BY nome").all();
        }

        return NextResponse.json(alunos);
    } catch (error) {
        console.error("Erro ao buscar alunos:", error);
        return NextResponse.json({ message: "Erro ao buscar alunos" }, { status: 500 });
    }
}

// Cadastrar aluno
export async function POST(request) {
    try {
        const dados = await request.json();
        const stmt = db.prepare("INSERT INTO alunos (nome, idade, serie, ra) VALUES (?, ?, ?, ?)");
        stmt.run(dados.nome, dados.idade, dados.serie, dados.ra);
        return NextResponse.json({ message: "Aluno cadastrado com sucesso" });
    } catch (error) {
        console.error("Erro ao cadastrar aluno:", error);
        return NextResponse.json({ message: "Erro ao cadastrar aluno" }, { status: 500 });
    }
}

// Editar aluno
export async function PUT(request) {
    try {
        const dados = await request.json();
        const id = dados.id_aluno || dados.id;
        const stmt = db.prepare("UPDATE alunos SET nome = ?, idade = ?, serie = ?, ra = ? WHERE id_aluno = ?");
        stmt.run(dados.nome, dados.idade, dados.serie, dados.ra, id);
        return NextResponse.json({ message: "Aluno editado com sucesso" });
    } catch (error) {
        console.error("Erro ao editar aluno:", error);
        return NextResponse.json({ message: "Erro ao editar aluno" }, { status: 500 });
    }
}

// Deletar aluno
export async function DELETE(request) {
    try {
        const dados = await request.json();
        const id = dados.id_aluno || dados.id;
        const stmt = db.prepare("DELETE FROM alunos WHERE id_aluno = ?");
        stmt.run(id);
        return NextResponse.json({ message: "Aluno deletado com sucesso" });
    } catch (error) {
        console.error("Erro ao deletar aluno:", error);
        return NextResponse.json({ message: "Erro ao deletar aluno" }, { status: 500 });
    }
}
