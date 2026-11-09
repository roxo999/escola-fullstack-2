import { NextResponse } from "next/server";
import db from "../../../db/banco";

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams?.id;

    const nota = db
      .prepare(`SELECT notas.id_nota, notas.id_aluno, notas.t1, notas.t2, notas.n1, notas.n2, notas.n3, alunos.nome, alunos.ra FROM notas 
      INNER JOIN alunos ON notas.id_aluno = alunos.id_aluno
      WHERE notas.id_nota = ?`)
      .get(id);

    if (!nota) {
      return NextResponse.json(
        { erro: "Nota não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(nota);
  } catch (erro) {
    return NextResponse.json(
      { erro: "Erro ao buscar nota" },
      { status: 500 }
    );
  }
}
