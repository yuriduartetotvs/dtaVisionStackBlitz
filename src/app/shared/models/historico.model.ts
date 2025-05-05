export interface Historico {
    alunoInfo: AlunoInfo
    disciplinas: Disciplina[]
}

export interface AlunoInfo {
    nomeAluno: string
    matricula: string
}

export interface Disciplina {
    disciplina: string
    nota: string
    cargaHoraria: string,
    credito: string 
}
