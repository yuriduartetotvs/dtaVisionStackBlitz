export interface DadosPessoaisModel {
    name: string;
    cpf: string;
    validade: Date;
    dataNascimento: Date;
}

export interface IAHistoricoEscolarResponse {
    aluno: string;
    cargaHoraria: number;
    cargaHorariaAtividade: number;
}


export interface IAContaLuzResponse {
    numeroContaLuz: string;
    ruaContaLuz: string;
    bairroContaLuz: string;
}

export interface IACarteiraMotoristaResponse {
    numeroCNH: string;
    dataEmissaoCNH: Date;
    dataValidadeCNH: Date;
}

export interface IARGResponse {
    cpf: string;
    dataNascimento: Date;
    dataValidade: Date;
}