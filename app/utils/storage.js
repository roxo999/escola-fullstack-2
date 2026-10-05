export const ALUNOS_PADRAO = [
    { id: 1, nome: "Kelvin Destaque", idade: "18", serie: "3º Ano A", ra: "232300" },
    { id: 2, nome: "Ana Silva", idade: "17", serie: "3º Ano A", ra: "232301" },
    { id: 3, nome: "Carlos Eduardo", idade: "17", serie: "3º Ano B", ra: "232302" },
    { id: 4, nome: "Beatriz Lima", idade: "18", serie: "3º Ano A", ra: "232303" }
];

export const NOTAS_PADRAO = [
    {
        id: 1,
        nome: "Kelvin Destaque",
        serie: "3º Ano A",
        trabalho1: 8.5,
        trabalho2: 9.0,
        nota1: 8.0,
        nota2: 8.5,
        nota3: 8.5,
        situacao: "Aprovado"
    },
    {
        id: 2,
        nome: "Ana Silva",
        serie: "3º Ano A",
        trabalho1: 9.0,
        trabalho2: 8.5,
        nota1: 9.5,
        nota2: 9.0,
        nota3: 9.0,
        situacao: "Aprovado"
    },
    {
        id: 3,
        nome: "Carlos Eduardo",
        serie: "3º Ano B",
        trabalho1: 7.0,
        trabalho2: 7.5,
        nota1: 6.5,
        nota2: 8.0,
        nota3: 7.0,
        situacao: "Aprovado"
    },
    {
        id: 4,
        nome: "Beatriz Lima",
        serie: "3º Ano A",
        trabalho1: 9.5,
        trabalho2: 10.0,
        nota1: 9.0,
        nota2: 9.5,
        nota3: 10.0,
        situacao: "Destaque"
    }
];

export function getAlunos() {
    if (typeof window === 'undefined') return ALUNOS_PADRAO;
    try {
        const data = localStorage.getItem('escola_alunos');
        if (!data) {
            localStorage.setItem('escola_alunos', JSON.stringify(ALUNOS_PADRAO));
            return ALUNOS_PADRAO;
        }
        return JSON.parse(data);
    } catch {
        return ALUNOS_PADRAO;
    }
}

export function salvarAluno(aluno) {
    const alunos = getAlunos();
    const novo = { id: Date.now(), ...aluno };
    const atualizados = [...alunos, novo];
    if (typeof window !== 'undefined') {
        localStorage.setItem('escola_alunos', JSON.stringify(atualizados));
    }
    return novo;
}

export function getNotas() {
    if (typeof window === 'undefined') return NOTAS_PADRAO;
    try {
        const data = localStorage.getItem('escola_notas');
        if (!data) {
            localStorage.setItem('escola_notas', JSON.stringify(NOTAS_PADRAO));
            return NOTAS_PADRAO;
        }
        return JSON.parse(data);
    } catch {
        return NOTAS_PADRAO;
    }
}

export function salvarNota(novaNota) {
    const notas = getNotas();
    const index = notas.findIndex(n => n.nome.toLowerCase() === novaNota.nome.toLowerCase());
    let atualizadas;
    if (index >= 0) {
        atualizadas = [...notas];
        atualizadas[index] = { ...atualizadas[index], ...novaNota };
    } else {
        atualizadas = [...notas, { id: Date.now(), ...novaNota }];
    }
    if (typeof window !== 'undefined') {
        localStorage.setItem('escola_notas', JSON.stringify(atualizadas));
    }
    return atualizadas;
}
